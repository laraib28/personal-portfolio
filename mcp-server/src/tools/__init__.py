"""Notification tools for lead capture."""

from .send_email import send_email_notification
from .send_whatsapp import send_whatsapp_notification

__all__ = ["send_email_notification", "send_whatsapp_notification"]
