# Code Editor

This project is a code editor built using React.js for the frontend and Express.js for the backend. It provides an interface for writing, editing and executing code written in a [custom programming language](https://github.com/Raghav-KM/Compiler-Design/blob/main/Grammar.md)

## Table of Contents

-   [Technologies Used](#technologies-used)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Screenshots](#screenshots)

## Technologies Used

### Frontend

-   React.js
-   Tailwind CSS (for styling)
-   Recoil (for state management)

### Backend

-   Express.js
-   TypeScript
-   Zod (for type validation)
-   Prisma (ORM)

## Installation

### Prerequisites

-   Git
-   Node.js
-   NASM
-   Docker (Optional)

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/Raghav-KM/code-editor.git
    ```

2. Navigate to the project directory:

    ```bash
    cd code-editor
    ```

3. Set up frontend :

    ```bash
    cd frontend
    npm install
    ```

4. Set up backend :

    1. Locally :

        ```bash
        cd backend

        mkdir input-code
        mkdir asm-code

        npm install
        npx prisma generate
        ```

    2. Using Docker :

        ```bash
        cd backend

        docker build -t code-editor-backend .
        ```

5. Set up Environment Variables

    1. Frontend

        ```bash
        cd frontend

        // create .env file with the following variable

        BACKEND_URL = https://localhost:3000
        ```

    2. Backend

        ```bash
        cd backend

        // create .env file with the following variable

        DATABASE_URL = <DATABASE_URL>
        ```

## Usage

1. Start the backend server:

    1. Locally :

        ```bash
        cd backend

        tsc -b
        node dist/index.js
        ```

    2. Using Docker :

        ```bash
        cd backend

        docker run -p 3000:3000 --env-file ./.env code-editor-backend
        ```

2. Start the frontend development server:
    ```bash
    cd frontend
    npm run dev
    ```
3. Open your browser and navigate to `http://localhost:5173`.

## Screenshots

![alt text](<Screenshot from 2024-08-14 18-33-20.png>)

```

```
