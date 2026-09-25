# Sai Krishna — Full-Stack Personal Portfolio Website

A professional, modern, responsive portfolio website built with **Django**, **MySQL**, **HTML5**, **CSS3**, and **Vanilla JavaScript**.

## Tech Stack

| Layer       | Technology            |
|-------------|-----------------------|
| Frontend    | HTML5, CSS3, JavaScript |
| Backend     | Python + Django 4.2   |
| Database    | MySQL                 |

## Project Structure

```
project/
│
├── manage.py              # Django command-line tool
├── .env.example           # Template for environment variables
├── .env                   # Your actual environment variables (not committed)
├── requirements.txt       # Python dependencies
├── README.md
│
├── portfolio/             # Django project package (settings)
│   ├── __init__.py
│   ├── settings.py        # Django settings (reads .env for DB config)
│   ├── urls.py            # Root URL configuration
│   ├── wsgi.py            # WSGI entry point
│   └── asgi.py            # ASGI entry point
│
└── main/                  # Django app (the portfolio)
    ├── __init__.py
    ├── migrations/
    │   └── __init__.py
    ├── templates/
    │   └── main/
    │       └── index.html  # The full portfolio webpage
    ├── static/
    │   ├── css/
    │   │   └── style.css   # All styling
    │   ├── js/
    │   │   └── script.js  # All JavaScript
    │   └── images/        # Put your images here
    ├── admin.py           # Admin configuration for contact messages
    ├── apps.py
    ├── forms.py           # Contact form (ModelForm)
    ├── models.py          # Contact model
    ├── urls.py            # App URL routes
    └── views.py           # View that renders page + handles form
```

## Setup Instructions (Step by Step)

### 1. Install Python

Make sure Python 3.10+ is installed:
```bash
python --version
```

### 2. Create and activate a virtual environment

```bash
# Create it
python -m venv venv

# Activate it
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

This installs:
- **Django** — the web framework
- **mysqlclient** — MySQL database driver
- **python-dotenv** — reads `.env` files

> **Troubleshooting mysqlclient on Windows:** If the install fails, download a pre-compiled wheel from https://www.lfd.uci.edu/~gohlke/pythonlibs/ and install it with `pip install mysqlclient‑<version>.whl`

### 4. Create the MySQL database

Open MySQL in your terminal:
```bash
mysql -u root -p
```

Then run:
```sql
CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Type `exit;` to leave MySQL.

### 5. Configure environment variables

Copy the example file:
```bash
cp .env.example .env
```

Open `.env` and fill in your values:
```
DB_NAME=portfolio_db
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306
SECRET_KEY=your_generated_secret_key
```

Generate a secret key:
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### 6. Run database migrations

This creates the tables Django needs (including the Contact table):
```bash
python manage.py makemigrations
python manage.py migrate
```

### 7. Create an admin user

This lets you log in at `/admin/` to view contact messages:
```bash
python manage.py createsuperuser
```

Follow the prompts to set a username, email, and password.

### 8. Start the development server

```bash
python manage.py runserver
```

Open your browser to: **http://127.0.0.1:8000/**

The admin panel is at: **http://127.0.0.1:8000/admin/**

## How the Contact Form Works

1. A visitor fills out the form on the Contact section.
2. JavaScript does a quick check for empty fields and valid email format.
3. The form submits to Django (POST request).
4. Django's `ContactForm` validates the data again (server-side).
5. If valid, the message is saved to the MySQL `main_contact` table.
6. A green success message is shown to the visitor.
7. If invalid, red error messages appear under each field.
8. You can view all messages in the Django admin panel.

## Customizing Your Portfolio

### Update personal info
Edit the text directly in `main/templates/main/index.html`. Search for the section you want to change (Home, About, Skills, etc.) and update the text.

### Add your profile photo
Place an image in `main/static/images/` and reference it in the template with:
```html
{% load static %}
<img src="{% static 'images/profile.jpg' %}" alt="Sai Krishna">
```

### Add project links
In the Projects section of `index.html`, replace the `href="#"` on the GitHub and Live Demo buttons with your real URLs.

### Add your contact details
In the Contact section, replace "Add your email here" and "Add your phone here" with your real information.

### Change colors
All colors are defined as CSS variables at the top of `main/static/css/style.css` under `:root`. Change the `--primary-*` values to use a different color scheme.

## Features

- Fully responsive (mobile, tablet, desktop)
- Sticky navigation bar with mobile hamburger menu
- Smooth scrolling and active link highlighting
- Scroll reveal animations (fade-in as you scroll)
- Back-to-top button
- Contact form with server-side validation (Django)
- Messages saved to MySQL database
- Django admin panel to view all contact messages
- Auto-updating copyright year in footer
- Semantic HTML and accessible markup
