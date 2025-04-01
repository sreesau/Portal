PortalDjango is a web application built using Django (for the backend) and React (for the frontend). The application allows users to upload files and manage their profile. The backend is connected to a MariaDB database running on port 3307. The application provides authentication, file management, and a dashboard displaying file uploads by users.

Technologies Used
Backend: Django 5.0.6

Frontend: React

Database: MariaDB (Port 3307)

Authentication: Django's built-in authentication system

Setup Instructions
Backend Setup (Django)
Clone the repository:
git clone https://github.com/sreesau/Portal.git
Navigade to Project Directory
cd PortalDjango
Activate the virtual environment:
Install dependencies:
pip install -r requirements.txt
Configure your MariaDB database:
Ensure your MariaDB server is running on port 3307.
Update the DATABASES section in settings.py with the connection details.
Run migrations to set up the database:
python manage.py migrate
Start the server:
python manage.py runserver
Frontend Setup (React)
Navigate to the frontend directory:
npm install
Npm start


