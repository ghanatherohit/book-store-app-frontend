---

# 📚 Bookstore Frontend  

A **modern, full-featured online bookstore** built using the **MERN stack**. This repository contains the **frontend**, developed with **React.js, Redux, Tailwind CSS, Firebase Authentication, and JWT** for secure user authentication.

Users can **browse books, add them to the cart, and place orders**, while **admins** can **manage inventory and orders**.

---

## 🚀 Features  

### 🛍️ User Features  
- 🔍 **Browse & Search** books.  
- 📖 **View Book Details** including price, description, and author.  
- 🛒 **Add & Remove** books from the shopping cart.  
- 🏷️ **Category-based filtering** for books.  
- 💳 **Secure Checkout** with **Cash-on-Delivery**.  
- 📦 **Order Tracking** in the user dashboard.  

### 🔐 Authentication & Security  
- 🔥 **Firebase Authentication** for secure user login & signup.  
- 🔑 **JWT-based authentication** for API security.  
- 🏠 **Protected Routes** to restrict unauthorized access.  

### 🛠️ Admin Features  
- 🖥️ **Admin Dashboard** for managing books and orders.  
- 📚 **Add, Update, and Delete** books.  
- 📊 **Manage Orders** and user transactions.  

### 🎨 UI/UX Enhancements  
- 🌐 **Fully Responsive** design for mobile and desktop.  
- 🎨 **Tailwind CSS** for a modern & clean UI.  
- 🏎️ **Framer Motion** for smooth animations.  
- 📚 **Swiper.js** for book carousels.  

---

## 🛠️ Tech Stack  

| Technology      | Description                      |  
|----------------|----------------------------------|  
| **React.js**   | Frontend framework              |  
| **Redux & RTK Query** | State management & API fetching |  
| **Firebase**   | Authentication system           |  
| **JWT (JSON Web Tokens)** | Secure authentication |  
| **React Router** | Client-side navigation        |  
| **Tailwind CSS** | Modern styling framework      |  
| **Framer Motion** | Animations & UI interactions |  
| **Swiper.js**  | Carousel for featured books    |  

---

## 📂 Folder Structure  

```
📦 frontend/  
├── 📁 src  
│   ├── 📁 assets       # Images and icons  
│   ├── 📁 components   # Reusable UI components (Navbar, Footer, etc.)  
│   ├── 📁 pages        # Page components (Home, Cart, Checkout, etc.)  
│   ├── 📁 redux        # Redux store, slices & API management  
│   ├── 📁 context      # Firebase authentication context  
│   ├── 📁 utils        # Helper functions  
│   ├── App.jsx         # Main application file  
│   ├── main.jsx        # React entry point  
│   ├── index.css       # Global styles  
│   ├── App.css         # Component-specific styles  
```

---

## 🔐 Authentication Flow  

1. **User Sign Up/Login**  
   - Firebase Authentication handles user signup & login.  
   - Users log in with **email & password**.  

2. **Token Generation**  
   - Upon login, the backend generates a **JWT token**.  
   - The token is stored securely in **HTTP-only cookies**.  

3. **Protected Routes**  
   - Certain pages (Cart, Checkout, Orders) require authentication.  
   - JWT is validated before granting access.  

---

## 🚀 Installation Guide  

### Prerequisites  
- **Node.js** (v16 or later)  
- **npm** or **yarn**  
- **Firebase Project** set up  

### Steps to Run the Project  

1. **Clone the Repository**  
   ```sh  
   git clone https://github.com/your-username/bookstore-frontend.git  
   cd bookstore-frontend  
   ```

2. **Install Dependencies**  
   ```sh  
   npm install  
   ```

3. **Set Up Firebase**  
   - Create a `.env` file in the root directory and add:  
     ```env  
     VITE_FIREBASE_API_KEY=your-firebase-api-key  
     VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain  
     VITE_FIREBASE_PROJECT_ID=your-firebase-project-id  
     ```

4. **Start the Development Server**  
   ```sh  
   npm run dev  
   ```

5. **Visit the App**  
   - Open **http://localhost:5173/** in your browser.  

---

## 🔧 Environment Variables  

Create a `.env` file and add the following:  

```env  
VITE_API_BASE_URL=http://localhost:5000  
VITE_FIREBASE_API_KEY=your-firebase-api-key  
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain  
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id  
```

---

## 📷 Screenshots  

| Navbar | Footer |
|---------|--------|
| ![Screenshot 2025-03-24 193823](https://github.com/user-attachments/assets/38542714-69b7-4d0f-aeaf-531b921467d8) | ![Screenshot 2025-03-24 193650](https://github.com/user-attachments/assets/6454ef7f-4d23-4a6d-b148-74be29996d7f) | 

| Home Page | Book Details |  
|-----------|-------------|
| ![Screenshot 2025-03-24 190154](https://github.com/user-attachments/assets/212fec4b-63b4-4d2c-8d30-6b9d3f6d13f9) | ![Screenshot 2025-03-24 193444](https://github.com/user-attachments/assets/66cfe209-f03d-470e-a86b-ca2c8c756835) |  

| Cart Page | Checkout | Orders Page | 
|-----------|-------------|----------|
| ![Screenshot 2025-03-24 194314](https://github.com/user-attachments/assets/c185c998-9704-4652-8f35-224bf4896b05) | ![Screenshot 2025-03-24 194535](https://github.com/user-attachments/assets/324a3ad5-041e-47e1-bbfb-ab7bb0098a30) | ![Screenshot 2025-03-24 202217](https://github.com/user-attachments/assets/1c7cfa84-6cb9-4360-bff5-37d925cc35f9)

---

## 📬 Contact  

- **Email**: 2004ghanatherohit@gmail.com  
- **GitHub**: [ghanatherohit](https://github.com/your-username)  

---
#
