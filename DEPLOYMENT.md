# Storeys Real Estate — Full Stack Application

This project consists of a **Vite + React Frontend** and an **Express + Node.js + MongoDB Backend**.

---

## 📁 Directory Structure

```
Storeys/
├── client/     # Frontend (React + Vite + Tailwind CSS)
└── server/     # Backend (Express REST API + MongoDB + Cloudinary)
```

---

## 🚀 Deployment Instructions

### 1. Deploy Backend (e.g. Render / Railway / Vercel)

1. Connect your repository to **Render** (or your chosen platform).
2. Set the **Root Directory** to `server`.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Configure Environment Variables:
   - `MONGODB_URI`: `mongodb+srv://aatif:aatif@cluster0.zmydec2.mongodb.net/storeys-db?retryWrites=true&w=majority`
   - `JWT_SECRET`: `storeys`
   - `CLIENT_URL`: `https://your-frontend-domain.vercel.app`
   - `ADMIN_EMAIL`: `admin@storeys.ae`
   - `ADMIN_PASSWORD`: `password123`
   - `CLOUDINARY_CLOUD_NAME`: `dclmrpuiq`
   - `CLOUDINARY_API_KEY`: `572188198611849`
   - `CLOUDINARY_API_SECRET`: `lGDFMI4Z33x2APIz1dtfBqwToeU`

---

### 2. Deploy Frontend (e.g. Vercel / Netlify)

1. Connect your repository to **Vercel** or **Netlify**.
2. Set the **Root Directory** to `client`.
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Configure Environment Variable:
   - `VITE_API_URL`: `https://your-backend-url.onrender.com`

---

## 💻 Local Development

1. **Backend**:
   ```bash
   cd server
   npm run dev
   ```
   Runs on `http://localhost:5000`

2. **Frontend**:
   ```bash
   cd client
   npm run dev
   ```
   Runs on `http://localhost:5173`
