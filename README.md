# Healthcare Services Management System

This project is a healthcare services management system built with React, Firebase Firestore, and Ant Design. It allows users to manage healthcare services, including adding, updating, and deleting services.

## Features

- **List Services**: View a list of healthcare services with details such as name, description, and price.
- **Update Service**: Edit the details of an existing service.
- **Delete Service**: Remove a service from the database.
- **Firebase Firestore**: Data is stored and managed in Firestore.
- **Ant Design UI**: Utilizes Ant Design for a clean and modern user interface.
- **Bootstrap**: Some components styled using Bootstrap.

## Technologies Used

- **Frontend**: React, Ant Design, Bootstrap
- **Backend**: Firebase Firestore (NoSQL database)
- **State Management**: React Hooks (`useState`, `useEffect`)
- **Routing**: React Router

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/healthcare-services-management.git
   cd healthcare-services-management
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Firebase:

   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Add a Firestore database to your project.
   - Get your Firebase configuration and create a `firebaseconfig.js` file in the `src/config` folder:

   ```js
   // src/config/firebaseconfig.js
   import { initializeApp } from "firebase/app";
   import { getFirestore } from "firebase/firestore";

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
   };

   const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);

   export { db };
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

## File Structure

```src/
│
├── components/
│   ├── Servicelist/
│   │   ├── Servicelist.js
│   │   └── Servicelist.module.css
│
├── config/
│   └── firebaseconfig.js
│
├── pages/
│   ├── AddService.js
│   ├── UpdateService.js
│   └── Home.js
│
├── App.js
├── index.js
└── ...  # Other necessary files
```
