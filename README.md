# E-commerce-Website
# Fashion Hub E-commerce Website

Welcome to the **Fashion Hub** repository! This project is an e-commerce platform designed to deliver a seamless shopping experience for fashion enthusiasts. It features a wide range of functionalities for users, admins, and vendors, focusing on usability, scalability, and performance.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### User Features

- Browse and search for fashion products.
- Secure user authentication and authorization.
- Product filtering and sorting by category, price, and ratings.
- Shopping cart and wishlist functionalities.

### Admin Features

- Dashboard to manage products, users, and orders.
- Role-based access control.

---

## Technologies Used

- **Frontend**: React.js, Redux, Ant Design, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT-based authentication



---

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/fashion_hub.git
   ```

2. Navigate to the project directory:

   ```bash
   cd fashion_hub
   ```

3. Install dependencies for both frontend and backend:

   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

4. Create a `.env` file in the `backend` folder with the following variables:

   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   STRIPE_KEY=your_stripe_key
   ```

5. Run the application:

   - Start the backend server:
     ```bash
     cd backend && npm start
     ```
   - Start the frontend server:
     ```bash
     cd frontend && npm start
     ```

---

## Usage

Visit `http://localhost:5173` to access the application locally.

- **Users**: Register, log in, and start shopping.
- **Admins**: Use `/admin` to access the admin dashboard.



