# Frontend Project with Mantine and React

This project is a modern, responsive frontend application built using React and the Mantine UI library. Mantine offers a comprehensive suite of components and hooks to build high-quality user interfaces with ease.

## Features

- React 18+ for building functional UIs.
- Mantine for stylish, responsive components.
- Easy to customize and extend.
- Fully responsive design.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (14.x or later)
- npm (6.x or later) or yarn (1.22.x or later)

## Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/tolgaozgun/DevinsightFrontend.git
cd frontend
```

2. Install the dependencies:

Using yarn:

```bash
yarn
```

Or using npm:

```bash
npm install
```

# Configuration

Add the following environment variables to a `.env` file in the root of the project:

```bash
VITE_BACKEND_URL=http://localhost:8080/dev/api/v1
VITE_GEMINI_KEY=<GOOGLE_GEMINI_KEY_GOES_HERE>
```

In order to get a Google Gemini API key, you need to create a project in the Google Cloud Console and enable the Google Gemini API. Then, create an API key and add it to the `.env` file.
Backend URL is the URL of the backend server that the frontend will communicate with.

# Usage

To start the development server:

Using yarn:

```bash
yarn dev
```

Or using npm:

```bash
npm start dev
```

# Contributing

Contributions are not accepted at this moment, as this is a term project.

# License

This project is licensed under the MIT License - see the LICENSE file for details
