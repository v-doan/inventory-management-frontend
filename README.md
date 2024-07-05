# Inventory Management Front End

This is the front end application for the Inventory Management System. It is built using React.js and interacts with the backend API to manage products and ingredients.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with the front end, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/<your_github_username>/inventory-management-frontend.git

2. Navigate to the project directory::

   ```sh
   cd inventory-management-frontend
3. Install the dependencies:

   ```sh
   npm install

## Installation
Create a config.js file in the src directory with the following content:

   ```javascript
   const config = {
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL || "https://inventory-management-backend-f36ec1d11345.herokuapp.com/api",
    };

    export default config;```

Make sure to set the REACT_APP_API_BASE_URL environment variable to the backend API URL when deploying.
