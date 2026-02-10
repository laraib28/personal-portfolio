"""OpenAI agent implementation with tool calling.

The agent uses the OpenAI SDK to process messages and call MCP tools
to fetch portfolio data. It streams responses for better UX.
"""

import json
import logging
from collections.abc import AsyncGenerator
from typing import Any

from openai import AsyncOpenAI

from ..config import get_settings
from .prompts import SYSTEM_PROMPT
from .tools import TOOLS, execute_tool, execute_tool_async

logger = logging.getLogger(__name__)

settings = get_settings()


class PortfolioAgent:
    """AI agent for portfolio chatbot with tool-based reasoning."""

    def __init__(self):
        """Initialize the agent with OpenAI client."""
        self.client = AsyncOpenAI(api_key=settings.openai_api_key)
        self.model = "gpt-4o-mini"  # Cost-effective model with good tool calling
        self.conversation_history: dict[str, list[dict[str, Any]]] = {}

    def _get_conversation(self, conversation_id: str) -> list[dict[str, Any]]:
        """Get or create conversation history."""
        if conversation_id not in self.conversation_history:
            self.conversation_history[conversation_id] = [
                {"role": "system", "content": SYSTEM_PROMPT}
            ]
        return self.conversation_history[conversation_id]

    def _add_message(
        self, conversation_id: str, role: str, content: str, **kwargs: Any
    ) -> None:
        """Add a message to conversation history."""
        conversation = self._get_conversation(conversation_id)
        message = {"role": role, "content": content, **kwargs}
        conversation.append(message)

        # Keep conversation history manageable (last 20 messages + system)
        if len(conversation) > 21:
            # Keep system message and last 20 messages
            self.conversation_history[conversation_id] = [
                conversation[0]
            ] + conversation[-20:]

    async def _process_tool_calls(
        self, tool_calls: list[Any], conversation_id: str
    ) -> None:
        """Execute tool calls and add results to conversation."""
        for tool_call in tool_calls:
            function_name = tool_call.function.name
            try:
                arguments = json.loads(tool_call.function.arguments)
            except json.JSONDecodeError:
                arguments = {}

            logger.info(f"Executing tool: {function_name} with args: {arguments}")

            try:
                # Use async executor for notification tools
                result = await execute_tool_async(function_name, arguments)
                result_str = json.dumps(result, indent=2)
            except Exception as e:
                logger.error(f"Tool execution error: {e}")
                result_str = json.dumps({"error": str(e)})

            # Add tool call and result to conversation
            self._add_message(
                conversation_id,
                "assistant",
                content="",
                tool_calls=[
                    {
                        "id": tool_call.id,
                        "type": "function",
                        "function": {
                            "name": function_name,
                            "arguments": tool_call.function.arguments,
                        },
                    }
                ],
            )
            self._add_message(
                conversation_id,
                "tool",
                content=result_str,
                tool_call_id=tool_call.id,
            )

    async def chat(
        self, message: str, conversation_id: str = "default"
    ) -> AsyncGenerator[str, None]:
        """Process a chat message and stream the response.

        Args:
            message: User message to process
            conversation_id: Optional conversation ID for context

        Yields:
            Response text chunks for streaming
        """
        # Add user message to conversation
        self._add_message(conversation_id, "user", message)
        conversation = self._get_conversation(conversation_id)

        max_iterations = 5  # Prevent infinite tool calling loops
        iteration = 0

        while iteration < max_iterations:
            iteration += 1

            # Call OpenAI API
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=conversation,
                tools=TOOLS,
                tool_choice="auto",
                stream=True,
            )

            # Collect the response
            collected_content = []
            collected_tool_calls: list[Any] = []
            current_tool_call = None

            async for chunk in response:
                delta = chunk.choices[0].delta if chunk.choices else None
                if not delta:
                    continue

                # Handle content
                if delta.content:
                    collected_content.append(delta.content)
                    yield delta.content

                # Handle tool calls
                if delta.tool_calls:
                    for tool_call_delta in delta.tool_calls:
                        if tool_call_delta.index is not None:
                            # New or existing tool call
                            while len(collected_tool_calls) <= tool_call_delta.index:
                                collected_tool_calls.append(
                                    {
                                        "id": "",
                                        "function": {"name": "", "arguments": ""},
                                    }
                                )
                            current_tool_call = collected_tool_calls[
                                tool_call_delta.index
                            ]

                            if tool_call_delta.id:
                                current_tool_call["id"] = tool_call_delta.id
                            if tool_call_delta.function:
                                if tool_call_delta.function.name:
                                    current_tool_call["function"][
                                        "name"
                                    ] = tool_call_delta.function.name
                                if tool_call_delta.function.arguments:
                                    current_tool_call["function"][
                                        "arguments"
                                    ] += tool_call_delta.function.arguments

            # Check if we have tool calls to process
            if collected_tool_calls and collected_tool_calls[0]["id"]:
                # Convert to proper tool call objects
                class ToolCall:
                    def __init__(self, data: dict[str, Any]):
                        self.id = data["id"]
                        self.function = type(
                            "Function",
                            (),
                            {
                                "name": data["function"]["name"],
                                "arguments": data["function"]["arguments"],
                            },
                        )()

                tool_call_objects = [ToolCall(tc) for tc in collected_tool_calls if tc["id"]]
                await self._process_tool_calls(tool_call_objects, conversation_id)
                # Continue loop to get final response after tool execution
            else:
                # No tool calls, we're done
                if collected_content:
                    full_response = "".join(collected_content)
                    self._add_message(conversation_id, "assistant", full_response)
                break

    async def chat_non_streaming(
        self, message: str, conversation_id: str = "default"
    ) -> str:
        """Process a chat message and return the full response.

        Args:
            message: User message to process
            conversation_id: Optional conversation ID for context

        Returns:
            Complete response text
        """
        chunks = []
        async for chunk in self.chat(message, conversation_id):
            chunks.append(chunk)
        return "".join(chunks)

    def clear_conversation(self, conversation_id: str = "default") -> None:
        """Clear conversation history."""
        if conversation_id in self.conversation_history:
            del self.conversation_history[conversation_id]


# Singleton instance
_agent_instance: PortfolioAgent | None = None


def get_agent() -> PortfolioAgent:
    """Get or create the agent singleton."""
    global _agent_instance
    if _agent_instance is None:
        _agent_instance = PortfolioAgent()
    return _agent_instance
