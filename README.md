# Recipe Book

## Overview

**Recipe Book** is a full-stack web application that allows users to discover, share, and manage their favorite recipes. The application is built using React for the frontend and Django for the backend. It also leverages the Spoonacular API for fetching recipe data and Tailwind CSS for styling.

## Features

- **User Authentication**: Secure login and registration.
- **Recipe Management**: Add, edit, delete, and view recipes.
- **Favorites**: Save your favorite recipes for quick access.
- **Responsive Design**: Mobile-friendly and accessible on all devices.

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

### Backend
- **Django**: A high-level Python web framework.
- **Django REST Framework**: For building robust and scalable RESTful APIs.
- **SQLite**: A lightweight, disk-based database.

## Project Structure

- **See file structure**


## Getting Started

### Prerequisites

- Node.js
- Python 3.x
- Django
- Git

### Installation

1. **Clone the repositories**:
    ```sh
    git clone https://github.com/your-username/recipe-client-project.git
    cd recipe-client-project
    git clone https://github.com/your-username/recipeapi.git
    cd recipeapi
    ```

2. **Frontend Setup**:
    ```sh
    cd recipe-client-project
    npm install
    npm start
    ```

3. **Backend Setup**:
    ```sh
    cd recipeapi
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py runserver
    ```

### Environment Variables

Create a `.env` file in both the `frontend` and `backend` directories to store your environment variables.

**Frontend (.env)**:



### Running the Application

1. **Start the backend**:
    ```sh
    cd recipeapi
    python manage.py runserver
    ```

2. **Start the frontend**:
    ```sh
    cd recipe-client-project
    npm start
    ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.

## Contact

**Andrew Goodman**  
Email: goodman.drew1@gmail.com  
LinkedIn: [linkedin.com/in/andrew-goodman-736740101](https://www.linkedin.com/in/andrew-goodman-736740101)  
GitHub: [github.com/drewgoodman1](https://github.com/drewgoodman1)




