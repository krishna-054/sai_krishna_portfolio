"""
Views for the portfolio app.

The homepage renders the portfolio template and also handles
contact form submission (POST) and display (GET).
"""

from django.shortcuts import render
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from .forms import ContactForm


def index(request):
    """Render the portfolio homepage and process the contact form."""

    if request.method == 'POST':
        form = ContactForm(request.POST)

        if form.is_valid():
            contact = form.save()

            send_mail(
                subject=f"New Portfolio Enquiry: {contact.subject}",
                message=(
                    f"Name: {contact.name}\n"
                    f"Email: {contact.email}\n"
                    f"Phone: {contact.phone}\n"
                    f"Subject: {contact.subject}\n\n"
                    f"Message:\n{contact.message}"
                ),
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[settings.CONTACT_RECEIVER_EMAIL],
                fail_silently=False,
            )

            messages.success(
                request,
                'Thank you! Your message has been sent successfully.'
            )

            form = ContactForm()

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