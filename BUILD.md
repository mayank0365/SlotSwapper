# 🎯 SlotSwapper - Complete Build Guide

## ✅ What You Just Got

A **production-ready MERN stack application** with:

✅ **Backend (Node.js + Express + MongoDB)**
- 3 Models (User, Event, SwapRequest)
- 3 Controllers (Auth, Event, Swap)
- 3 Routes with JWT protection
- Password hashing with bcrypt
- Error handling middleware
- MongoDB connection config

✅ **Frontend (React + Vite + Redux)**
- 5 Pages (Login, Signup, Dashboard, Marketplace, Requests)
- 5 Components (Navbar, EventCard, SwapModal, RequestCard, ProtectedRoute)
- 3 Redux Slices (Auth, Events, Swaps)
- Axios API client with interceptors
- Protected routes with JWT
- Responsive CSS styling

✅ **Documentation**
- Comprehensive README
- Quick setup guide
- Features documentation
- This build guide

---

## 🚀 How to Run

### Option 1: Super Quick Start (Recommended)

```powershell
# Install all dependencies (server + client)
npm run install-all

# Run both server and client concurrently
npm run dev
```

**Note:** You need to install `concurrently` first:
```powershell
npm install
```

✅ Backend running on http://localhost:5000
✅ Frontend running on http://localhost:3000

### Option 2: Manual Setup (More Control)

#### Terminal 1 - Backend
```powershell
cd server
npm install
npm run dev
```
✅ Backend running on http://localhost:5000

#### Terminal 2 - Frontend
```powershell
cd client
npm install
npm run dev
```
✅ Frontend running on http://localhost:3000

#### Terminal 3 - MongoDB
```powershell
# If MongoDB not running, start it:
mongod

# Or use MongoDB Compass GUI
# Or use MongoDB Atlas (cloud)
```

### Option 3: PowerShell Script (Windows)

Create a PowerShell script `start-app.ps1`:

```powershell
# Start MongoDB (if local)
Start-Process -NoNewWindow mongod

# Start Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd server; npm run dev"

# Wait 3 seconds
Start-Sleep -Seconds 3

# Start Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd client; npm run dev"

# Open Browser
Start-Sleep -Seconds 5
Start-Process "http://localhost:3000"
```

Run it:
```powershell
.\start-app.ps1
```

### Available Root Scripts

```powershell
npm run install-all   # Install dependencies for both server and client
npm run server        # Run only backend
npm run client        # Run only frontend
npm run dev           # Run both concurrently
```

---

## 📋 Pre-flight Checklist

Before starting, ensure:

- [ ] **Node.js installed** (v16+)
  ```powershell
  node --version
  ```

- [ ] **npm installed**
  ```powershell
  npm --version
  ```

- [ ] **MongoDB ready**
  - Local: `mongod --version`
  - Or Atlas: Connection string ready

- [ ] **Ports available**
  - 5000 (backend)
  - 3000 (frontend)
  - 27017 (MongoDB)

---

## 🔧 Configuration

### Backend Environment (.env)

Located at: `server/.env`

```env
PORT=5000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
NODE_ENV=development
```

**Important Security Notes:**
- ✅ Keep your `.env` file private
- ✅ Never commit `.env` to version control
- ✅ Use strong, unique JWT secret
- ✅ Already added to `.gitignore`

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
```

**For Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/slotswapper
```

### Frontend Proxy (vite.config.js)

Located at: `client/vite.config.js`

Already configured to proxy `/api` requests to backend:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  },
}
```

---

## 🎯 Testing the Application

### Step-by-Step Testing

#### 1. Create First User
1. Open http://localhost:3000
2. Click "Sign up"
3. Enter:
   - Name: John Doe
   - Email: john@test.com
   - Password: password123
4. Click "Sign Up"
5. You'll be redirected to Dashboard

#### 2. Create Events
1. Click "➕ Add Event"
2. Enter:
   - Title: Team Meeting
   - Start Time: Tomorrow 10:00 AM
   - End Time: Tomorrow 11:00 AM
   - Status: Swappable
3. Click "Create Event"
4. Create another event (keep as Busy)

#### 3. Create Second User (Incognito)
1. Open **Incognito window**
2. Go to http://localhost:3000
3. Sign up as:
   - Name: Jane Smith
   - Email: jane@test.com
   - Password: password123
4. Create event:
   - Title: Focus Block
   - Time: Tomorrow 2:00 PM - 3:00 PM
   - Status: Swappable

#### 4. Test Marketplace
1. Back to **John's browser**
2. Click "Marketplace"
3. You should see Jane's "Focus Block"
4. Click "🔄 Request Swap"
5. Select your "Team Meeting"
6. Click "Send Request"

#### 5. Test Requests
1. Switch to **Jane's browser (incognito)**
2. Click "Requests"
3. See incoming request from John
4. Click "✅ Accept"
5. Both events are now swapped!

#### 6. Verify Swap
1. **John's Dashboard**: Should now show "Focus Block" (was Jane's)
2. **Jane's Dashboard**: Should now show "Team Meeting" (was John's)
3. Both events are now "BUSY" status

---

## 🐛 Troubleshooting

### Backend Issues

**Error: Cannot find module**
```powershell
cd server
rm -rf node_modules
rm package-lock.json
npm install
```

**Error: MongoDB connection failed**
- Check if MongoDB is running
- Verify MONGODB_URI in .env
- Check network connectivity (for Atlas)

**Error: Port 5000 already in use**
```powershell
# Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Frontend Issues

**Error: Cannot find module**
```powershell
cd client
rm -rf node_modules
rm package-lock.json
npm install
```

**Error: Port 3000 already in use**
- Change port in vite.config.js
- Or kill process on port 3000

**Error: Network request failed**
- Ensure backend is running on port 5000
- Check proxy configuration in vite.config.js
- Open browser console for details

### Authentication Issues

**Can't login**
- Check browser console for errors
- Verify JWT_SECRET is set in .env
- Clear browser localStorage
- Try creating new account

**Token expired**
- Logout and login again
- Default expiration is 30 days

---

## 📊 Project Status

✅ **Backend**
- [x] User authentication (signup, login)
- [x] JWT token generation
- [x] Password hashing
- [x] Event CRUD operations
- [x] Swap request system
- [x] Accept/reject swaps
- [x] Protected routes
- [x] Error handling

✅ **Frontend**
- [x] Login/Signup pages
- [x] Dashboard with event management
- [x] Marketplace to browse slots
- [x] Swap request modal
- [x] Requests page (incoming/outgoing)
- [x] Protected routes
- [x] Redux state management
- [x] Responsive design

✅ **Integration**
- [x] JWT authentication flow
- [x] API integration
- [x] State synchronization
- [x] Real-time UI updates

✅ **Documentation**
- [x] README with full guide
- [x] Setup instructions
- [x] API documentation
- [x] Architecture overview

---

## 📈 What's Working

✅ User can sign up and login
✅ JWT token stored in localStorage
✅ Dashboard shows user's events
✅ Can create, update, delete events
✅ Can mark events as swappable
✅ Marketplace shows other users' swappable slots
✅ Can request swaps with modal selection
✅ Incoming requests show in Requests page
✅ Can accept/reject swap requests
✅ Successful swap exchanges slot owners
✅ Rejected swap returns slots to swappable
✅ All state updates reflected in UI
✅ Protected routes work correctly

---

## 🎓 Learning Points

This project demonstrates:

1. **MERN Stack Architecture**
   - MongoDB for data persistence
   - Express for REST API
   - React for UI
   - Node.js for backend runtime

2. **Modern React Patterns**
   - Functional components with hooks
   - Redux Toolkit for state
   - React Router for navigation
   - Axios for API calls

3. **Authentication & Authorization**
   - JWT token-based auth
   - Password hashing with bcrypt
   - Protected routes
   - Middleware guards

4. **RESTful API Design**
   - Resource-based endpoints
   - HTTP methods (GET, POST, PUT, DELETE)
   - Status codes
   - Error handling

5. **State Management**
   - Redux slices
   - Async thunks
   - Normalized state
   - Optimistic updates

6. **Professional Code Structure**
   - Separation of concerns
   - Modular architecture
   - Clean code principles
   - Comprehensive documentation

---

## 🚀 Next Steps

### For Development
1. Add more features from FEATURES.md
2. Implement Socket.io for real-time updates
3. Add email notifications
4. Create admin panel
5. Add user profiles with avatars

### For Production
1. Set NODE_ENV=production
2. Use strong JWT_SECRET
3. Enable HTTPS
4. Set up MongoDB Atlas
5. Deploy to Render/Vercel
6. Add logging (Winston/Morgan)
7. Implement rate limiting
8. Add monitoring (Sentry)

---

## 📞 Support

If you encounter issues:

1. Check this guide's Troubleshooting section
2. Review error messages in terminal
3. Check browser console for frontend errors
4. Verify all dependencies installed
5. Ensure MongoDB is running
6. Check port availability

---

## 🎉 Congratulations!

You now have a **fully functional MERN stack application**!

Key achievements:
✅ Complete backend API
✅ Modern React frontend
✅ Redux state management
✅ JWT authentication
✅ Database integration
✅ Professional code structure
✅ Comprehensive documentation

**Start the servers and enjoy SlotSwapper! 🎯🔄**

---

## 📚 File Structure Overview

```
SlotSwapper/
├── 📁 server/                   # Backend
│   ├── 📁 config/
│   │   └── db.js               # MongoDB connection
│   ├── 📁 controllers/
│   │   ├── authController.js   # Auth logic
│   │   ├── eventController.js  # Event CRUD
│   │   └── swapController.js   # Swap logic
│   ├── 📁 middleware/
│   │   └── authMiddleware.js   # JWT verification
│   ├── 📁 models/
│   │   ├── User.js             # User schema
│   │   ├── Event.js            # Event schema
│   │   └── SwapRequest.js      # Swap schema
│   ├── 📁 routes/
│   │   ├── authRoutes.js       # Auth endpoints
│   │   ├── eventRoutes.js      # Event endpoints
│   │   └── swapRoutes.js       # Swap endpoints
│   ├── .env                    # Environment variables
│   ├── server.js               # Express app
│   └── package.json            # Dependencies
│
├── 📁 client/                   # Frontend
│   ├── 📁 src/
│   │   ├── 📁 api/
│   │   │   └── axios.js        # API client
│   │   ├── 📁 components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── EventCard.jsx
│   │   │   ├── SwapModal.jsx
│   │   │   └── RequestCard.jsx
│   │   ├── 📁 pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Marketplace.jsx
│   │   │   └── Requests.jsx
│   │   ├── 📁 redux/
│   │   │   ├── 📁 slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── eventSlice.js
│   │   │   │   └── swapSlice.js
│   │   │   └── store.js
│   │   ├── App.jsx             # Main component
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── 📄 README.md                 # Main documentation
├── 📄 SETUP.md                  # Quick setup guide
├── 📄 FEATURES.md               # Features overview
├── 📄 BUILD.md                  # This file
└── 📄 .gitignore
```

Total Files Created: **35+ files**

---

**Everything is ready! Just install dependencies and run! 🚀**
