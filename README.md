# User Management System

This project is a User Management System with a backend built using Flask and MongoDB, and a frontend built with React. The system allows users to add, update, delete, and view user details.

## Features

- **View Users**: Fetch and display a list of all users.
- **Add User**: Add a new user with a unique ID, name, and age.
- **Update User**: Update the details of an existing user.
- **Delete User**: Remove a user from the system.

## Installation

### Backend
    ```bash
    cd backend
    python3 -m venv venv
    source venv/bin/activate
    pip install -r req.txt
    python main.py
    ```

### Frontend
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

### MongoDB
    ```bash
    sudo docker pull mongo:latest
    sudo docker run -d -p 27017:27017 --name=mongo-container mongo:latest
    ```

### Access:
    Go to `http://localhost:5173/` and start!
