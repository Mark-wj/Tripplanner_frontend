# TripPlanner
Welcome to TripPlanner! This project is a full-stack application built with Django and React that takes trip details as input and outputs both route instructions and Electronic Logging Device (ELD) logs.
* Frontend: Deployed at [tripplanner2.netlify.app](https://tripplanner2.netlify.app) for a seamless, fast user experience.
## Project Overview
This app serves as an all-in-one tool for drivers and fleet managers to:

**Input Trip Details*:

1. Current Location

2. Pickup Location

3. Dropoff Location

4. Current Cycle Used (in hours)

**Output Route Information*:

A map displaying the route, including stops, rests, and fueling points.

**Generate Daily Log Sheets*:

Automatically filled-out logs based on the trip inputs. Multiple log sheets are generated for longer trips.


## Tech Stack
* Frontend
Built with React and styled using Tailwind CSS. The key frontend dependencies include:

@tabler/icons-react@3.30.0

@tailwindcss/vite@4.0.12

clsx@2.1.1

motion@12.4.4

tailwind-merge@3.0.1

tailwindcss@4.0.12

* Backend
Powered by Django (with Django REST Framework) along with Flask for additional API handling. Key backend dependencies include:

Django==4.2.19

djangorestframework==3.15.2

djangorestframework-simplejwt==5.3.1

django-cors-headers==4.4.0

Flask==3.0.3

Flask-Cors==5.0.0

Flask-JWT-Extended==4.6.0

Flask-Migrate==4.1.0

Flask-RESTful==0.3.10

Flask-SQLAlchemy==3.1.1

(Plus many other supportive libraries like SQLAlchemy, Gunicorn, Alembic, etc.)

For a full list of dependencies, please refer to the requirements.txt and package.json files.


## Deployment
* Frontend: Deployed via Vercel.app for a seamless, fast user experience.

* Backend: Can be hosted on your preferred cloud service .

## Contributing
Contributions, issues, and feature requests are welcome! Feel free to check Issues or create a new issue to discuss potential changes.

## Contact
For any questions, please reach out via GitHub:

GitHub: [Mark-wj](https://github.com/Mark-wj)

