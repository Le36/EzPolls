# EzPolls

A dynamic platform for instant online polling. Whether you're gauging favorite movies or conducting business surveys,
EzPolls provides an intuitive experience for creating and participating in polls. Users can swiftly create polls, cast
votes, and witness results unfold in real-time. With features like multiple voting restrictions, Google's reCAPTCHA for
enhanced security, and a user-friendly interface, EzPolls is where simplicity meets functionality.

# Live Demo

Check out the live demo of EzPolls at

### [https://ezpolls.fly.dev/](https://ezpolls.fly.dev/)

[![EzPolls](frontend/public/favicon.ico)](https://ezpolls.fly.dev/)

## Tech Stack

- Frontend: React.js
- Backend: Java with Spring Boot
- Database: MongoDB
- Deployment: Docker, Fly.io

## Features

#### User Authentication and Profile Management

- User registration and login with JWT-based session management.
- Intuitive user interfaces for registration, login, password change, and email change.
- Input validation, error handling, and notifications for secure and seamless user interactions.
- Passwords encrypted with BCrypt for storage and never sent to the client.

#### Poll Creation and Management

- Dynamic poll creation form supporting multiple options and customizable voting restrictions.
- Display of user-created polls with easy navigation to detailed views.
- Ability to delete user-created polls with confirmation prompts.

#### Voting System

- User-friendly interface for casting and changing votes based on poll settings.
- Voting restrictions options: once per IP, once per user, or no restrictions.
- Optional reCAPTCHA verification during voting for anti-spam measures.
- Real-time updates on vote counts using Server-Sent Events (SSE).

#### Visual Data Display

- Live charts representing poll results with selectable types: Pie, Bar, Doughnut, and List.
- Automatic and immediate chart updates upon new votes.

#### Security and Anti-Spam Measures

- Google's reCAPTCHA verification integrated for user login and selected poll activities.
- Rate limiting to mitigate potential abuse in poll creation and voting.

#### Sharing and Accessibility

- Clean URLs for sharing polls and viewing results.
- Tooltips for enhanced user guidance and responsive design for various devices.

#### Frontend Infrastructure

- Modern and interactive UI developed with React.js, ensuring a smooth and intuitive user experience.
- Responsive design optimized for a wide range of devices, from mobile phones to desktop screens, ensuring consistent
  usability and aesthetics.
- Component-based architecture facilitates maintainability, reusability, and efficient state management.
- Strong focus on UX with clear notifications, visual feedback, and seamless transitions to maximize user engagement.

#### Backend Infrastructure

- Robust backend built with Java and Spring Boot, interacting with MongoDB for data storage.
- Efficient querying, custom exceptions, and advanced features ensuring optimal performance and user experience.

## Running the project locally

### With Docker

First you have to build the Docker image. To do so, run the following command in the root directory of the project:

```docker build -t ezpolls .```

Then, you can run the Docker image with the following command:

```docker run -p 8080:8080 ezpolls```

The project will be available at http://localhost:8080.

#### Environment variables

You should add the environment variables to the Docker run command.

For this you need Atlas MongoDB URI, Google reCAPTCHA secret and JWT secret.

Atlas MongoDB URI is the connection string to your MongoDB database. You can get it from the Atlas dashboard.

Google reCAPTCHA secret is the secret key for your reCAPTCHA. You will also need to add the site key to the frontend
reCAPTCHA component.

For JWT secret, you can use any Base64 encoded string.

```docker run -p 8080:8080 -e MONGODB_URI='text' -e RECAPTCHA_SECRET='text' -e JWT_SECRET='text' ezpolls```

### Without Docker

You can also run the project without Docker. To do so, you need to have Java 17, Gradle and npm installed.

Backend can be run with the following command in the backend directory:

```./gradlew bootRun```

and frontend can be run with the following commands in the frontend directory:

```npm install```

```npm start```

Project will be available at http://localhost:3000.

Remember to add the environment variables to your backend.

They can be added like this:

```export MONGODB_URI='text'```

### Timesheet

[timesheet.md](timesheet.md)