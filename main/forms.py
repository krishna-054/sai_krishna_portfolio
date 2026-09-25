"""
Forms for the portfolio app.

We use a Django ModelForm so the Contact form automatically
generates fields that match our Contact model.
"""

from django import forms
from .models import Contact


class ContactForm(forms.ModelForm):
    """Form that validates and saves contact messages."""

    class Meta:
        model = Contact
        fields = ['name', 'email', 'phone', 'subject', 'message']

    # Add CSS classes and placeholders for a nicer look
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['name'].widget.attrs.update({
            'class': 'form-input',
            'placeholder': 'Your full name',
        })
        self.fields['email'].widget.attrs.update({
            'class': 'form-input',
            'placeholder': 'you@example.com',
        })
        self.fields['phone'].widget.attrs.update({
            'class': 'form-input',
            'placeholder': 'Your phone number',
        })
        self.fields['subject'].widget.attrs.update({
            'class': 'form-input',
            'placeholder': 'What is this about?',
        })
        self.fields['message'].widget.attrs.update({
            'class': 'form-input form-textarea',
            'placeholder': 'Tell me about your project...',
            'rows': 5,
        })
