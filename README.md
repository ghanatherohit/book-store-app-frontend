# 📚 Book Store React App

This project is a Book Store application built with React and Vite. It uses Redux Toolkit for state management and RTK Query for data fetching.

## 📖 Table of Contents

- [What is Book Store React App?](#what-is-book-store-react-app)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [APIs](#apis)
- [Contributing](#contributing)
- [License](#license)

## 📚 What is Book Store React App?

The Book Store React App is a web application designed to provide users with a seamless experience for browsing, searching, and purchasing books online. The application features a modern and responsive user interface built with React and Vite, ensuring fast load times and a smooth user experience.

### Key Features

- **Book Browsing**: Users can browse through a wide selection of books, view details, and read descriptions.
- **Search Functionality**: Users can search for books by title, author, or genre.
- **Shopping Cart**: Users can add books to their cart and manage their selections before proceeding to checkout.
- **Order Management**: Users can view their order history and track the status of their orders.
- **State Management**: The application uses Redux Toolkit for efficient state management.
- **Data Fetching**: RTK Query is used for fetching data from APIs, ensuring efficient and optimized data handling.

## 🚀 Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

Make sure you have the following installed:

- Node.js (>=14.x) 🟢
- npm (>=6.x) or yarn (>=1.x) 📦

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/book-store-react-app.git
    ```
2. Navigate to the project directory:
    ```sh
    cd book-store-react-app/frontend
    ```
3. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

### Running the App

To start the development server, run:
```sh
npm run dev
# or
yarn dev
```
This will start the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev` or `yarn dev`: Starts the development server.
- `npm run build` or `yarn build`: Builds the app for production.
- `npm run serve` or `yarn serve`: Serves the production build locally.
- `npm run lint` or `yarn lint`: Runs ESLint to check for linting errors.

## 🗂 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/                    # Source files
│   ├── app/                # App configuration
│   ├── components/         # Reusable components
│   ├── features/           # Redux slices and RTK Query APIs
│   │   ├── Books/          # Books feature
│   │   ├── Cart/           # Cart feature
│   │   └── Orders/         # Orders feature
│   ├── pages/              # Application pages
│   ├── redux/              # Redux store configuration
│   └── index.js            # Entry point
├── .eslintrc.js            # ESLint configuration
├── vite.config.js          # Vite configuration
└── package.json            # Project metadata and dependencies
```

## 🌐 APIs

This project uses RTK Query to fetch data from APIs. The following APIs are integrated:

- **Books API**: Manages book data.
- **Orders API**: Manages order data.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
#   b o o k - s t o r e - a p p - f r o n t e n d  
 #   b o o k - s t o r e - a p p - f r o n t e n d  
 