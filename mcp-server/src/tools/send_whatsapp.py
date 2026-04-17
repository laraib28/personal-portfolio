"""Send WhatsApp notification using Twilio API.

This tool sends WhatsApp notifications to the portfolio owner
when a visitor submits their contact information via the chatbot.
"""

import logging
from typing import Any

from twilio.rest import Client as TwilioClient
from twilio.base.exceptions import TwilioRestException

from ..config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()


async def send_whatsapp_notification(
    name: str,
    email: str,
    message: str,
    consent: bool = False,
) -> dict[str, Any]:
    """Send WhatsApp notification to portfolio owner.

    Args:
        name: Visitor's name
        email: Visitor's email address
        message: Visitor's message/inquiry
        consent: Whether visitor consented to contact (REQUIRED to be True)

    Returns:
        Dictionary with success status and message

    Raises:
        ValueError: If consent is False or credentials not configured
    """
    # Consent validation - MUST be True
    if not consent:
        logger.warning("WhatsApp send rejected: consent not provided")
        return {
            "success": False,
            "error": "Consent is required to send contact information",
        }

    # Check Twilio configuration
    if not settings.twilio_account_sid or not settings.twilio_auth_token:
        logger.error("Twilio credentials not configured")
        return {
            "success": False,
            "error": "WhatsApp service not configured",
        }

    if not settings.owner_whatsapp:
        logger.error("Owner WhatsApp number not configured")
        return {
            "success": False,
            "error": "Owner WhatsApp not configured",
        }

    try:
        # Initialize Twilio client
        client = TwilioClient(settings.twilio_account_sid, settings.twilio_auth_token)

        # Compose WhatsApp message
        whatsapp_message = f"""New Portfolio Lead:
Name: {name}
Email: {email}
Message: {message}"""

        # Send via Twilio WhatsApp
        twilio_message = client.messages.create(
            body=whatsapp_message,
            from_=settings.twilio_whatsapp_from,
            to=f"whatsapp:{settings.owner_whatsapp}",
        )

        logger.info(f"WhatsApp sent successfully: {twilio_message.sid}")
        return {
            "success": True,
            "message": "WhatsApp notification sent to portfolio owner",
            "sid": twilio_message.sid,
        }

    except TwilioRestException as e:
        logger.error(f"Twilio error: {e}")
        return {
            "success": False,
            "error": f"Failed to send WhatsApp: {str(e)}",
        }
    except Exception as e:
        logger.error(f"Failed to send WhatsApp: {e}")
        return {
            "success": False,
            "error": f"Failed to send WhatsApp: {str(e)}",
        }
