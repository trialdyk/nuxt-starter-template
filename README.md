# Nuxt 3 Course Platform Starter Template

Welcome to this starter template! This project provides a solid and well-structured foundation for building modern, full-stack web applications using Nuxt 3. It comes pre-configured with Nuxt UI for a rich component library and a layout system designed for real-world applications like a course-selling platform.

This template is designed to accelerate your development process by providing a clean, scalable, and powerful setup right out of the box.

## Key Features

* **Framework**: Nuxt 3, offering the power of Vue 3, Vite's speed, and the Nitro server engine.
* **User Interface**: [Nuxt UI](https://ui.nuxt.com) is fully integrated, providing a beautiful and customizable set of components.
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) is configured and ready to use for utility-first styling.
* **Centralized Configuration**: The main sidebar navigation is managed from a single `app.config.ts` file for easy updates and maintenance.
* **Responsive Layout**: Includes a pre-built, responsive layout with an expandable/collapsible sidebar that adapts to mobile and desktop screens.
* **TypeScript Ready**: The project is set up with TypeScript for type safety and an improved developer experience.
* **Organized Structure**: A clear and logical folder structure (`layouts`, `pages`, `components`, `types`) to keep your code organized as the project grows.

## Prerequisites

Before you begin, ensure your development environment has the following installed:

* [Node.js](https://nodejs.org/) (latest LTS version is recommended)
* [Bun](https://bun.sh/) (used as the package manager and runtime)

## Installation & Setup

Follow these steps to get your project up and running:

1.  **Clone the Repository**
    Replace `your-repo-url` with the actual URL of your repository.
    ```bash
    git clone <your-repo-url> my-course-platform
    cd my-course-platform
    ```

2.  **Install Dependencies**
    This command will install all the necessary packages defined in `package.json`.
    ```bash
    bun install
    ```

3.  **Set Up Environment Variables**
    If the project uses environment variables, copy the example file to create your local configuration.
    ```bash
    cp .env.example .env
    ```
    Then, open the `.env` file and fill in any required variables.

4.  **Run the Development Server**
    Start the Nuxt development server.
    ```bash
    bun run dev
    ```

Your application should now be running and accessible at **`http://localhost:3000`**.

## Development

The development server starts with Hot Module Replacement (HMR) enabled, providing instant feedback as you make changes to your code.

* **Frontend & Backend**: Nuxt handles both in a single, unified environment.
* **Pages**: Create new pages by adding `.vue` files to the `pages/` directory.
* **Components**: Build reusable components inside the `components/` directory.
* **API Routes**: Create server-side API endpoints by adding files to the `server/api/` directory. For example, `server/api/hello.ts` creates an endpoint at `/api/hello`.

## Core Concepts & Project Structure

This starter template follows a standard yet powerful Nuxt project structure:

* `app.config.ts`: Contains app-level configuration that is accessible on both the client and server. We use this file to centrally manage the **sidebar navigation menu**.
* `nuxt.config.ts`: The main configuration file for Nuxt itself, where you manage modules, plugins, and other core settings.
* `layouts/`: Contains your application's layout components. The main layout (`default.vue`) orchestrates the header, sidebar, and main content area.
* `pages/`: This directory contains your application's views and routes. Nuxt reads all the `.vue` files inside this directory and creates the application router automatically.
* `components/`: This is where your reusable Vue components go. For example, `SidebarHeader.vue`, `Sidebar.vue`, and the user profile dropdown would be located here.
* `types/`: Contains your TypeScript type definitions, such as the `NavItem` interface used for the navigation menu.
* `server/api/`: Your server-side API endpoints live here. This is perfect for handling form submissions, database queries, and user authentication logic like logout.

## Building for Production

When you're ready to deploy your application, you can build a production-optimized version.

1.  **Build the Application**
    This command bundles your application into a highly optimized format.
    ```bash
    bun run build
    ```

2.  **Preview the Production Build**
    You can run this command to start a server that serves your built application.
    ```bash
    bun run preview
    ```

## License

This project is licensed under the **MIT License**. See the `LICENSE` file for more details.
