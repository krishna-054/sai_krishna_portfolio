"""
Database models for the portfolio app.

The only model we need is Contact — it stores every message submitted
through the contact form on the website.
"""

from django.db import models


class Contact(models.Model):
    """A message sent by a visitor through the contact form."""

    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']  # newest messages first
        verbose_name = 'Contact Message'
        verbose_name_plural = 'Contact Messages'

    def __str__(self):
        return f'{self.name} — {self.subject}'
