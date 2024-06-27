# My To-Do App

## Project Overview

This project is a simple to-do list application built with Blitz.js, Prisma ORM, and Tailwind CSS. It demonstrates full-stack development capabilities, including frontend and backend integration, database management, and styling.

## Table of Contents

- [Setup and Run](#setup-and-run)
- [Architectural Choices](#architectural-choices)
- [Challenges Faced](#challenges-faced)

## Setup and Run

### Prerequisites

- Node.js (>=14.x)
- npm (>=6.x) or yarn (>=1.x)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/vahe-nikoghosyan/TODO-APP.git
   cd TODO-APP
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up the database:**

   Ensure you have a `.env` file in the root of your project with the following content:

   ```env
   DATABASE_URL="file:./db.sqlite"
   ```

4. **Run Prisma migrations:**

   ```bash
   blitz prisma migrate dev --name init
   ```

5. **Start the development server:**

   ```bash
   blitz dev
   ```

6. **Open your browser and navigate to:**

   ```
   http://localhost:3000
   ```

## Architectural Choices

### Blitz.js

Blitz.js is chosen for its full-stack capabilities, which provide a seamless integration between frontend and backend. It abstracts much of the boilerplate associated with building a full-stack application, enabling rapid development.

### Prisma ORM

Prisma ORM is used for database management. It simplifies database interactions and migrations with a type-safe API, enhancing developer productivity and code reliability.

### Tailwind CSS

Tailwind CSS is chosen for styling due to its utility-first approach, which allows for rapid and consistent UI development. It provides a robust set of design utilities directly in the markup, reducing the need for custom CSS.

## Challenges Faced

### State Management and Validation

Ensuring proper state management and validation across the form and database was a key challenge. This involved:

- Implementing robust schema validation using Zod to prevent invalid data entries.
- Managing form state and validation using `react-hook-form` to provide a seamless user experience.

### CSS Styling

Aligning elements consistently regardless of the text length required careful use of Tailwind CSS utilities and flexbox properties to maintain a clean and responsive layout.

### Running the Application
```
After setting up the project and starting the development server, you can create, update, and delete to-do items using the provided UI. The to-do items will be stored in the SQLite database, and the UI will reflect changes in real-time.

By following this documentation, you should have a clear understanding of how to set up, run, and develop the to-do list application. If you have any questions or run into issues, feel free to reach out for assistance.
```
