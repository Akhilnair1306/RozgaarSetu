# RozgaarSetu

## Overview

RozgaarSetu (रोजगारसेतु) aims to be a platform connecting job seekers with employment opportunities. This project seeks to bridge the gap between individuals looking for work and organizations seeking talent.

## Features

* **Job Posting:** Organizations can easily post job openings with relevant details.
* **Job Searching:** Job seekers can search for jobs based on keywords, location, skills, and more.
* **User Profiles:** Both employers and job seekers can create profiles to showcase their information.
* **Application System:** A streamlined process for job seekers to apply for listed positions.
* **[Add more features as your project develops]**

## Technologies Used

* **Frontend:** React, Vite, Tailwind CSS
* **Backend:** Flask (Python)
* **Database:** [Specify database technologies, e.g., PostgreSQL, MySQL, MongoDB]
* **Other:** [Mention any other relevant tools or libraries]

## Getting Started

### Prerequisites

* **Backend:** Python 3.x installed on your system.
* **Frontend:** Node.js and npm (or yarn/pnpm) installed on your system.

### Backend Setup (Flask with venv)

1.  **Navigate to your backend directory:**
    ```bash
    cd backend
    ```

2.  **Create a virtual environment:**
    ```bash
    python -m venv venv
    ```

3.  **Activate the virtual environment:**
    * **macOS and Linux:**
        ```bash
        source venv/bin/activate
        ```
    * **Windows (Command Prompt):**
        ```bash
        venv\Scripts\activate
        ```
    * **Windows (PowerShell):**
        ```powershell
        .\venv\Scripts\Activate.ps1
        ```

4.  **Install Flask and other backend dependencies:**
    ```bash
    pip install Flask
    # Install other backend dependencies as needed
    # pip install Flask-SQLAlchemy
    # pip install Flask-CORS
    ```

5.  **Run your Flask application:**
    Navigate to the directory containing your main Flask application file (usually `app.py`) and run it.
    ```bash
    python app.py
    ```
    Your Flask development server should now be running (typically on `http://127.0.0.1:5000/`).

6.  **Deactivate the virtual environment (when you're done):**
    ```bash
    deactivate
    ```

### Frontend Setup (React Vite Tailwind CSS)

1.  **Navigate to your frontend directory:**
    ```bash
    cd frontend
    ```

2.  **If you haven't created a React Vite project yet:**
    ```bash
    npm create vite@latest frontend -- --template react
    # or
    yarn create vite frontend --template react
    # or
    pnpm create vite frontend --template react
    ```
    Navigate into the newly created `frontend` directory:
    ```bash
    cd frontend
    ```

3.  **Install Tailwind CSS and its peer dependencies:**
    ```bash
    npm install -D tailwindcss postcss autoprefixer
    # or
    yarn add -D tailwindcss postcss autoprefixer
    # or
    pnpm add -D tailwindcss postcss autoprefixer
    ```

4.  **Initialize Tailwind CSS:**
    ```bash
    npx tailwindcss init -p
    # or
    yarn tailwindcss init -p
    # or
    pnpm tailwindcss init -p
    ```

5.  **Configure Tailwind CSS:**
    Open your `tailwind.config.js` file and modify the `content` array:
    ```javascript
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```

6.  **Add Tailwind directives to your CSS (e.g., `src/index.css`):**
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

7.  **Install project dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

8.  **Start the React development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
    Your React Vite application should now be running (typically on `http://localhost:5173/`).

## Usage

* **For Job Seekers:** Explain how to create an account, search for jobs, and apply.
* **For Employers:** Explain how to create an account and post job listings.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature`).
3.  Make your changes.
4.  Commit your changes (`git commit -am 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature`).
6.  Create a new Pull Request.
