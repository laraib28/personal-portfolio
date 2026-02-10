"""Send email notification using Resend API.

This tool sends lead notification emails to the portfolio owner
when a visitor submits their contact information via the chatbot.
"""

import logging
from typing import Any

import resend

from ..config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()


async def send_email_notification(
    name: str,
    email: str,
    message: str,
    consent: bool = False,
) -> dict[str, Any]:
    """Send lead notification email to portfolio owner.

    Args:
        name: Visitor's name
        email: Visitor's email address
        message: Visitor's message/inquiry
        consent: Whether visitor consented to contact (REQUIRED to be True)

    Returns:
        Dictionary with success status and message

    Raises:
        ValueError: If consent is False or API key not configured
    """
    # Consent validation - MUST be True
    if not consent:
        logger.warning("Email send rejected: consent not provided")
        return {
            "success": False,
            "error": "Consent is required to send contact information",
        }

    # Check API key configuration
    if not settings.resend_api_key:
        logger.error("Resend API key not configured")
        return {
            "success": False,
            "error": "Email service not configured",
        }

    if not settings.owner_email:
        logger.error("Owner email not configured")
        return {
            "success": False,
            "error": "Owner email not configured",
        }

    # Initialize Resend
    resend.api_key = settings.resend_api_key

    try:
        # Compose email
        email_html = f"""
        <h2>New Portfolio Lead</h2>
        <p>Someone is interested in your services!</p>

        <h3>Contact Details</h3>
        <ul>
            <li><strong>Name:</strong> {name}</li>
            <li><strong>Email:</strong> <a href="mailto:{email}">{email}</a></li>
        </ul>

        <h3>Message</h3>
        <p>{message}</p>

        <hr>
        <p style="color: #666; font-size: 12px;">
            This lead was captured via your portfolio AI chatbot.
            The visitor has consented to be contacted.
        </p>
        """

        # Send via Resend
        response = resend.Emails.send(
            {
                "from": "Portfolio Bot <noreply@resend.dev>",
                "to": settings.owner_email,
                "subject": f"New Portfolio Lead: {name}",
                "html": email_html,
                "reply_to": email,
            }
        )

        logger.info(f"Email sent successfully: {response.get('id', 'unknown')}")
        return {
            "success": True,
            "message": f"Email notification sent to portfolio owner",
            "id": response.get("id"),
        }

    except Exception as e:
        logger.error(f"Failed to send email: {e}")
        return {
            "success": False,
            "error": f"Failed to send email: {str(e)}",
        }
