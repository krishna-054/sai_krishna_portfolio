"""
Views for the portfolio app.

The homepage renders the portfolio template and also handles
contact form submission (POST) and display (GET).
"""

import os
import requests

from django.shortcuts import render
from django.contrib import messages
from .forms import ContactForm


def index(request):
    """Render the portfolio homepage and process the contact form."""

    if request.method == 'POST':
        form = ContactForm(request.POST)

        if form.is_valid():
            contact = form.save()

            subject = f"New Portfolio Enquiry: {contact.subject}"

            message = (
                f"Name: {contact.name}\n"
                f"Email: {contact.email}\n"
                f"Phone: {contact.phone}\n"
                f"Subject: {contact.subject}\n\n"
                f"Message:\n{contact.message}"
            )

            resend_api_key = os.environ.get('RESEND_API_KEY')
            recipient = os.environ.get('CONTACT_RECEIVER_EMAIL')
            print("CONTACT_RECEIVER_EMAIL TYPE:", type(recipient).__name__)
            print("CONTACT_RECEIVER_EMAIL LENGTH:", len(recipient) if recipient else 0)

            response = requests.post(
                'https://api.resend.com/emails',
                headers={
                    'Authorization': f'Bearer {resend_api_key}',
                    'Content-Type': 'application/json',
                },
                json={
                    'from': 'Portfolio <onboarding@resend.dev>',
                    'to': recipient,
                    'subject': subject,
                    'text': message,
                },
                timeout=15,
            )

            if response.ok:
                messages.success(
                    request,
                    'Thank you! Your message has been sent successfully.'
                )
                form = ContactForm()
           
            else:
                print("RESEND ERROR STATUS:", response.status_code)
                print("RESEND ERROR BODY:", response.text)

                messages.error(
                request,
                'Your message was saved, but the email notification could not be sent.'
                )

        else:
            messages.error(
                request,
                'Please correct the errors below.'
            )

    else:
        form = ContactForm()

    return render(
        request,
        'main/index.html',
        {'form': form}
    )