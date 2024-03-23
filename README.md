Exam System

Overview
This project is a web-based exam system built using SharePoint Framework (SPFx) and React.js. It allows users to take exams online in a user-friendly and interactive environment. The project primarily focuses on providing functionalities for exam management, user information management, and result visualization.

Technology Stack
SharePoint Framework (SPFx)
React.js

Design Frameworks
Fluent UI
Bootstrap

Features
Form Validation: Implemented form validation to ensure the accuracy of user-provided information.
Alert Component (Alert.tsx): Shows the exam result in a modal dialog for user convenience.
Main Exam Center (QuestionsList): Central component for taking exams, displaying questions, and collecting answers.
User Information Component (UserInformation): Allows users to provide personal information required for the exam.

Pages:
Home: Landing page for the exam system.
ResultSurveys: Page to view exam results and surveys.
TimeIO_Api: Integration with TimeIO API to manage time-related functionalities. (Note: Limited by CORS policies)
UserSurvey: Page for users to provide feedback and surveys.
Timer: Custom timer component created to handle time-related issues with the TimeIO API.

Approach
The project follows a functional component-based approach for building reusable and scalable components. Each component is designed to perform specific tasks related to exam management and user interaction. The use of React.js allows for efficient state management and component re-rendering, enhancing the overall user experience.

Usage
To use the exam system, follow these steps:
Clone the repository to your local machine.
Install dependencies using npm install.
Run the project using npm start.
Access the exam system through the provided URLs for different pages.

Contributors
Muhammad Zaheer Ahmed
Consultant SharePoint & Power Platform

Note: it is just a proto type version, there's alot more to come.
