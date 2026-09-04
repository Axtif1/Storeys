# Storeys Real Estate

Storeys is a luxury real estate agency based in Dubai, specializing in off-plan investments and premium properties.

## Architecture

This project is divided into two parts:
1. **Frontend**: React, Vite, Tailwind CSS v4, React Router
2. **Backend**: Node.js, Express, MongoDB, JWT Authentication

## Environment Variables

### Backend (`server/.env`)
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/storeys
PORT=5000
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=https://storeys.ae
ADMIN_EMAIL=admin@storeys.ae
ADMIN_PASSWORD=your_secure_password
```
*(Do NOT commit the `.env` file to version control.)*

### Frontend (`.env`)
```
VITE_API_URL=https://api.storeys.ae
```

## Setup & Development

### 1. Backend Setup
1. `cd server`
2. `npm install`
3. Configure your `server/.env` file with a valid MongoDB connection string and credentials.
4. `npm run dev` to start the server on `http://localhost:5000`.

*Note on Admin User: When the backend starts up, it will automatically create the default admin user using the `ADMIN_EMAIL` and `ADMIN_PASSWORD` from your `.env` file if it does not already exist.*

### 2. Frontend Setup
1. From the root directory: `npm install`
2. Configure `.env` with `VITE_API_URL`.
3. `npm run dev` to start the frontend on `http://localhost:5173`.

### Admin CMS
Once both servers are running, access the Admin CMS at `http://localhost:5173/admin/login`. Log in using the credentials you defined in the backend `.env`.

## Production Build
1. Update `VITE_API_URL` to your production backend URL.
2. Run `npm run build` from the root directory.
3. Deploy the `dist/` folder to your static hosting provider (Vercel, Netlify, etc.).
4. Deploy the `server/` directory to your Node.js hosting provider (Render, Heroku, AWS, etc.).
