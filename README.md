# 🎓 Fundraising Intern Portal

A full-stack web application for managing fundraising intern activities, built with Node.js, Express.js, and vanilla JavaScript.

## 📋 **Prerequisites**

Before running this project, make sure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

### **How to Check if Node.js is Installed:**
```bash
node --version
npm --version
```

### **How to Install Node.js:**
1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the LTS version
3. Run the installer
4. Follow the installation wizard

## 🚀 **Quick Start Guide**

### **Step 1: Download/Clone the Project**
```bash
# If you have the project files, extract them to a folder
# If using git:
git clone <repository-url>
cd fundraising-intern-portal
```

### **Step 2: Install Dependencies**
```bash
npm install
```

### **Step 3: Start the Server**
```bash
npm start
```

### **Step 4: Access the Application**
Open your web browser and go to: `http://localhost:3000`

## 📁 **Project Structure**

```
fundraising-intern-portal/
├── server.js              # Main server file
├── package.json           # Project dependencies
├── package-lock.json      # Locked dependency versions
├── README.md             # This file
├── BACKEND_TUTORIAL.md   # Backend development guide
├── test-backend.js       # API testing script
├── start.bat            # Windows startup script
└── public/              # Frontend files
    ├── index.html       # Main HTML file
    ├── styles.css       # CSS styles
    └── script.js        # JavaScript functionality
```

## 🔧 **Available Scripts**

### **Start the Application:**
```bash
npm start
```

### **Development Mode (Auto-restart on changes):**
```bash
npm run dev
```

### **Test the Backend API:**
```bash
node test-backend.js
```

## 🌐 **API Endpoints**

### **Authentication:**
- `POST /api/register` - Create new account
- `POST /api/login` - User login

### **Data Endpoints:**
- `GET /api/intern-data/:userId` - Get user data
- `GET /api/donations/:userId` - Get donation statistics
- `GET /api/rewards/:userId` - Get user rewards
- `POST /api/update-donations/:userId` - Add new donation

## 👤 **Default Login Credentials**

For testing purposes, you can use these credentials:

**Email:** `raymondmontfort07@gmail.com`  
**Password:** `password123`

## 🛠️ **Troubleshooting**

### **Port 3000 Already in Use:**
```bash
# Kill all Node.js processes
taskkill /f /im node.exe

# Then start again
npm start
```

### **Module Not Found Error:**
```bash
# Reinstall dependencies
npm install
```

### **Node.js Not Found:**
1. Download and install Node.js from [https://nodejs.org/](https://nodejs.org/)
2. Restart your terminal/command prompt
3. Try running the commands again

### **Permission Denied (Windows):**
1. Run Command Prompt as Administrator
2. Navigate to your project directory
3. Run the commands again

## 🎯 **Features**

- ✅ User authentication (login/signup)
- ✅ Fundraising dashboard
- ✅ Donation tracking
- ✅ Rewards and achievements system
- ✅ Responsive design
- ✅ Real-time data updates
- ✅ Modern UI with animations

## 🏗️ **Technology Stack**

- **Backend:** Node.js, Express.js
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Database:** In-memory storage (JavaScript objects)
- **Styling:** Custom CSS with gradients and animations
- **Icons:** Font Awesome

## 📱 **Browser Compatibility**

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🔒 **Security Notes**

- This is a demo project with basic authentication
- Passwords are stored in plain text (not recommended for production)
- No HTTPS implementation (add for production)

## 📞 **Support**

If you encounter any issues:

1. Check the troubleshooting section above
2. Ensure Node.js is properly installed
3. Verify all dependencies are installed
4. Check if port 3000 is available

## 🎉 **Success Indicators**

When the application is running correctly, you should see:

```
🚀 Fundraising Intern Portal server running on http://localhost:3000
📊 API endpoints available at http://localhost:3000/api/
```

And you can access the application at `http://localhost:3000`

---

**Happy Coding! 🚀**

*This project was created as part of a Full Stack Developer Internship task.* 