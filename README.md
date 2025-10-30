# 🎯 SlotSwapper

**SlotSwapper** is a peer-to-peer time-slot swapping platform built with the MERN stack. Users can trade calendar events with each other by marking slots as swappable, requesting swaps, and accepting/rejecting incoming requests.

---

## 🚀 Features

- ✅ **User Authentication** - JWT-based signup/login with secure password hashing
- ✅ **Event Management** - Create, update, delete, and view personal calendar events
- ✅ **Slot Status** - Mark events as BUSY, SWAPPABLE, or SWAP_PENDING
- ✅ **Marketplace** - Browse other users' swappable slots
- ✅ **Swap Requests** - Send swap requests offering your own slots
- ✅ **Accept/Reject** - Receivers can accept (swap owners) or reject requests
- ✅ **Real-time State Updates** - Redux-powered automatic UI updates
- ✅ **Protected Routes** - JWT middleware secures all API endpoints
- ✅ **Responsive Design** - Clean, modern UI that works on all devices

---

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express.js** - RESTful API server
- **MongoDB** + **Mongoose** - Database and ODM
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Vite** - Fast build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client with interceptors

---

## 📁 Project Structure

```
SlotSwapper/
├── server/                  # Backend (Node.js + Express)
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   └── swapController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Event.js
│   │   └── SwapRequest.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   └── swapRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── client/                  # Frontend (React + Vite)
    ├── src/
    │   ├── api/
    │   │   └── axios.js    # Axios instance with interceptors
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── EventCard.jsx
    │   │   ├── SwapModal.jsx
    │   │   └── RequestCard.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Marketplace.jsx
    │   │   └── Requests.jsx
    │   ├── redux/
    │   │   ├── slices/
    │   │   │   ├── authSlice.js
    │   │   │   ├── eventSlice.js
    │   │   │   └── swapSlice.js
    │   │   └── store.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 🔧 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud instance like MongoDB Atlas)
- **Git**

### 1️⃣ Navigate to Project Directory

```bash
cd SlotSwapper
```

### 2️⃣ Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

```env
PORT=5000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
NODE_ENV=development
```

**Example for MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database-name>
JWT_SECRET=your_random_secret_key_here
```

**Example for Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/slotswapper
JWT_SECRET=your_random_secret_key_here
```

**Note:** Replace placeholders with your actual values:
- `<username>` - Your MongoDB username
- `<password>` - Your MongoDB password
- `<cluster>` - Your MongoDB cluster name
- `<database-name>` - Your database name (e.g., slotswapper)
- `<your-secret-key>` - Any random string for JWT signing

Start the backend server:

```bash
npm run dev
```

Server will run on **http://localhost:5000**

### 3️⃣ Setup Frontend

Open a new terminal:

```bash
cd client
npm install
```

Start the frontend dev server:

```bash
npm run dev
```

Frontend will run on **http://localhost:3000**

---

## 🔐 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/profile` | Update user profile |

### Events
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/events` | Create event | ✅ |
| GET | `/api/events` | Get user's events | ✅ |
| PUT | `/api/events/:id` | Update event | ✅ |
| DELETE | `/api/events/:id` | Delete event | ✅ |

### Swaps
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/swappable-slots` | Get all swappable slots | ✅ |
| POST | `/api/swap-request` | Create swap request | ✅ |
| POST | `/api/swap-response/:id` | Accept/reject swap | ✅ |
| GET | `/api/swap-requests/incoming` | Get incoming requests | ✅ |
| GET | `/api/swap-requests/outgoing` | Get outgoing requests | ✅ |

---

## 📖 Usage Guide

### 1. Sign Up / Login
- Navigate to `/signup` to create an account
- Login at `/login` with your credentials
- JWT token is stored in localStorage

### 2. Dashboard
- View all your events
- Create new events with title, start/end time
- Mark events as "Swappable" or "Busy"
- Delete events

### 3. Marketplace
- Browse swappable slots from other users
- Click "Request Swap" on any slot
- Choose one of your swappable slots to offer in exchange

### 4. Requests
- **Incoming**: Accept or reject swap requests from others
- **Outgoing**: View status of your sent requests (Pending/Accepted/Rejected)
- When accepted, both slots exchange owners and become BUSY
- When rejected, both slots return to SWAPPABLE status

---

## 🎬 Example Scenario

1. **User A** creates "Team Meeting (Tue 10-11 AM)" → marks as SWAPPABLE
2. **User B** creates "Focus Block (Wed 2-3 PM)" → marks as SWAPPABLE
3. **User A** sees User B's slot in Marketplace → clicks "Request Swap"
4. **User A** selects their "Team Meeting" slot → sends request
5. **User B** receives incoming request → clicks "Accept"
6. ✅ **Slots swapped!** User A now owns "Focus Block", User B owns "Team Meeting"
7. Both slots automatically set to BUSY

---

## 🔒 Security Features

- ✅ Passwords hashed with bcrypt (10 salt rounds)
- ✅ JWT tokens with 30-day expiration
- ✅ Protected routes with middleware
- ✅ Authorization checks (users can only modify their own events)
- ✅ Input validation on all forms
- ✅ Mongoose schema validation

---

## 🚀 Deployment

### Backend (Render / Railway / Heroku)

1. Push code to GitHub
2. Create new Web Service on Render
3. Set environment variables (MONGODB_URI, JWT_SECRET, NODE_ENV=production)
4. Deploy from GitHub repo

### Frontend (Vercel / Netlify)

1. Update `vite.config.js` to point to deployed backend URL
2. Run `npm run build` to create production build
3. Deploy `dist` folder to Vercel or Netlify

---

## 🛡️ Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
NODE_ENV=development
```

**Important:** Never commit your `.env` file to GitHub! It's already in `.gitignore`.

---

## 🧪 Testing

To test the application:

1. Create 2 user accounts (User A, User B)
2. Login as User A → Create events → Mark one as SWAPPABLE
3. Login as User B (in incognito) → Create events → Mark one as SWAPPABLE
4. User A goes to Marketplace → sees User B's slot → requests swap
5. User B goes to Requests → sees incoming request → accepts
6. Both users refresh Dashboard → see swapped events

---

## 📝 License

MIT License - feel free to use this project for learning or production!

---

## 👨‍💻 Author

Built with ❤️ using the MERN stack

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

## 📚 Additional Notes

- All API responses follow REST conventions
- Error handling implemented with try-catch and async handlers
- Redux slices use createAsyncThunk for async operations
- UI updates automatically after state changes (no manual reloads)
- Code is modular, scalable, and production-ready

---

**Happy Swapping! 🎯🔄**
