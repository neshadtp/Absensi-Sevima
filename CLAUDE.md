## Project Overview

Absensi-Sevima is a web-based student attendance management application. It helps manage classes, students, class enrollments, meetings, attendance records, and attendance summaries.

## Technology Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js and Express
- Database: PostgreSQL

## Main Features

1. Class management (CRUD).
2. Student management (CRUD).
3. Student enrollment in classes.
4. Meeting management by class and date.
5. Attendance input for all enrolled students in a meeting.
6. Attendance status options: Hadir, Izin, Sakit, and Alpa.
7. Attendance summaries by class and student.

## Development Guidelines

- Keep the user interface text in Bahasa Indonesia.
- Use clear and consistent naming for variables and functions.
- Write code that is readable and easy to maintain.
- Validate user input before saving data.
- Prevent duplicate student enrollment in the same class.
- Ensure attendance records are associated with the correct student, class, and meeting.
- Keep data from different classes separate.
- Do not remove existing features without a clear reason.
- Avoid unnecessary changes to working code.
- Handle errors and display understandable messages to users.

## Database Guidelines

- Use PostgreSQL for persistent data storage.
- Use appropriate primary keys and foreign keys.
- Maintain relationships between classes, students, enrollments, meetings, and attendance records.
- Use parameterized SQL queries to prevent SQL injection.
- Store database credentials in environment variables, not directly in source code.

## Testing Guidelines

- Test create, read, update, and delete operations.
- Test student enrollment and duplicate enrollment prevention.
- Test attendance input for each meeting.
- Verify that attendance summaries match saved records.
- Test that students and attendance records from different classes do not get mixed up.

## AI Assistance Guidelines

- Explain significant code changes before or after implementing them.
- Prefer small, incremental changes over rewriting the entire application.
- Do not claim a feature is complete unless it has been implemented and tested.
- Keep project documentation updated when the architecture or features change.