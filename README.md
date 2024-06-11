# Frontend Mentor - Kanban Task Management Web App Solution

This is a solution to
the [Kanban task management web app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB).
Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
    - [Features](#Features)
    - [Screenshot](#screenshot)
    - [Links](#links)
- [My process](#my-process)
    - [Built with](#built-with)
    - [Continued development](#continued-development)

## Overview

### Features

- **Responsive Design:** Optimized for various device screen sizes.
- **Interactive Elements:** Hover states for better UX.
- **CRUD Operations:** Create, read, update, and delete boards and tasks.
- **Form Validations:** Ensuring data integrity during board and task creation/editing.
- **Subtask Management:** Mark subtasks as complete.
- **Drag and Drop:** Change task status and reorder within columns.
- **Sidebar Management:** Show/hide the board sidebar.
- **Theme Toggle:** Switch between light and dark modes.

### Screenshot

![Preview](public/screenshots/preview.jpg)

### Links

- Solution URL: [Frontend Mentor](https://www.frontendmentor.io/solutions/kanban-with-nextjs-RDQEiTAlkN)
- Live Site URL: [kanban-ee](https://kanban-ee.vercel.app/)

## My process

### Built with

- HTML
- CSS
- [Next.js](https://nextjs.org/) - React framework
- [Hello-Pangea-Dnd](https://github.com/hello-pangea/dnd) - Drag-and-drop library
- [React-Indiana-Drag-Scroll](https://www.npmjs.com/package/react-indiana-drag-scroll) - Drag-scroll library

### Continued development

- **Autoscrolling on Drag and Drop:**
    - Implement autoscrolling for smoother drag-and-drop interactions when tasks are moved to the edges of the screen.

- **Advanced Task Management Features:**
    - Task Dependencies: Allow users to set dependencies between tasks, ensuring a task can only start when another task
      is completed.
    - Task Priorities: Implement a priority system to help users identify high-priority tasks.
    - Sprint Planning and Tracking: Add features to plan and track sprints, similar to agile methodologies.
    - Burndown Charts: Visualize the progress of tasks over time.
    - User Mentions and Comments: Enable users to mention others and add comments to tasks for better collaboration.

- **Enhanced Task Functionalities:**
    - Due Dates and Reminders: Allow users to set due dates for tasks and receive reminders.
    - Task Assignments: Enable task assignment to specific users for better task management.
        - File Attachments: Allow users to attach files to tasks for better documentation.

- **Full-Stack Integration**:
    - Database Integration: Use a database (e.g., PostgreSQL, MongoDB) to store and retrieve data, ensuring data
      persistence.
    - API Development: Develop a robust API for handling CRUD operations and other functionalities.
    - Authentication and Authorization: Implement user authentication and role-based access control.
