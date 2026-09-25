"""
Django admin configuration for contact messages.

This lets you log in at /admin/ and view, search, and filter
every message submitted through the contact form.
"""

from django.contrib import admin
from .models import Contact


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'subject', 'created_at')
    list_filter = ('created_at',)           # filter by date on the right sidebar
    search_fields = ('name', 'email', 'subject', 'message')  # search bar at top
    ordering = ('-created_at',)             # newest first
    readonly_fields = ('created_at',)       # timestamp can't be edited
    date_hierarchy = 'created_at'           # date drill-down at top
