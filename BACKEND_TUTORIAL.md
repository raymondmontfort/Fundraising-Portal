# 🎓 Backend Tutorial - Fundraising Intern Portal

## 📚 **What You'll Learn**

This tutorial will teach you how to:
- Understand the backend structure
- Test API endpoints
- Modify backend data
- Add new features
- Debug common issues

## 🏗️ **Backend Architecture**

### **Technology Stack**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Data Storage**: In-memory (JavaScript objects)
- **Port**: 3000

### **File Structure**
```
server.js          # Main backend server
package.json       # Dependencies and scripts
test-backend.js    # Testing script (for learning)
```

## 🔧 **How the Backend Works**

### **1. Server Setup (server.js)**
```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware setup
app.use(cors());                    // Allow cross-origin requests
app.use(bodyParser.json());         // Parse JSON requests
app.use(express.static('public'));  // Serve static files
```

### **2. Data Storage**
```javascript
const internData = {
  name: "Raymond Montfort",
  referralCode: "raymond2025",
  totalDonations: 1250,
  rewards: [...],
  recentDonations: [...]
};
```

### **3. API Endpoints**

#### **GET /api/intern-data**
- **Purpose**: Get all intern information
- **Response**: Complete data object
- **Use Case**: Dashboard initialization

#### **GET /api/donations**
- **Purpose**: Get donation statistics
- **Response**: Total and recent donations
- **Use Case**: Display donation metrics

#### **GET /api/rewards**
- **Purpose**: Get rewards/achievements
- **Response**: Array of reward objects
- **Use Case**: Show achievement badges

#### **POST /api/update-donations**
- **Purpose**: Add new donation
- **Request Body**: `{ "amount": 100 }`
- **Response**: Success status and new total
- **Use Case**: Update donation total

## 🧪 **Testing the Backend**

### **Method 1: Browser Testing**
Open these URLs in your browser:

```
http://localhost:3000/api/intern-data
http://localhost:3000/api/donations
http://localhost:3000/api/rewards
```

### **Method 2: PowerShell Testing**
```powershell
# Get all data
Invoke-WebRequest -Uri "http://localhost:3000/api/intern-data" -Method GET

# Add donation
Invoke-WebRequest -Uri "http://localhost:3000/api/update-donations" -Method POST -ContentType "application/json" -Body '{"amount": 50}'
```

### **Method 3: Using the Test Script**
```bash
node test-backend.js
```

## 🔄 **How to Modify Backend Data**

### **1. Change Intern Information**
Edit the `internData` object in `server.js`:

```javascript
const internData = {
  name: "Your Name",           // Change this
  referralCode: "yourcode2025", // Change this
  totalDonations: 0,           // Reset to 0
  // ... rest of the data
};
```

### **2. Add New Rewards**
Add to the `rewards` array:

```javascript
rewards: [
  // ... existing rewards
  {
    id: 6,
    name: "New Badge",
    description: "Custom achievement",
    unlocked: false,
    icon: "🌟"
  }
]
```

### **3. Add New API Endpoint**
Add this to `server.js`:

```javascript
app.get('/api/custom-endpoint', (req, res) => {
  res.json({
    message: "This is a custom endpoint",
    data: "Your custom data here"
  });
});
```

## 🚀 **Common Backend Operations**

### **Starting the Server**
```bash
npm start
# or
node server.js
```

### **Stopping the Server**
Press `Ctrl + C` in the terminal

### **Restarting the Server**
```bash
# Stop with Ctrl+C, then:
npm start
```

### **Checking if Server is Running**
```bash
# Check if port 3000 is in use
netstat -an | findstr :3000
```

## 🐛 **Troubleshooting**

### **Port Already in Use**
```bash
# Kill all Node.js processes
taskkill /f /im node.exe

# Then restart
npm start
```

### **Module Not Found**
```bash
# Reinstall dependencies
npm install
```

### **Server Won't Start**
1. Check if Node.js is installed: `node --version`
2. Check if dependencies are installed: `npm install`
3. Check for syntax errors in `server.js`

## 📊 **Understanding API Responses**

### **Successful Response Format**
```json
{
  "success": true,
  "data": "Your data here",
  "message": "Success message"
}
```

### **Error Response Format**
```json
{
  "success": false,
  "message": "Error description"
}
```

### **HTTP Status Codes**
- `200`: Success
- `400`: Bad Request (invalid data)
- `404`: Not Found
- `500`: Server Error

## 🔍 **Debugging Tips**

### **1. Console Logging**
Add this to your endpoints:
```javascript
app.get('/api/test', (req, res) => {
  console.log('Request received:', req.query);
  res.json({ message: 'Test successful' });
});
```

### **2. Check Server Logs**
Watch the terminal where you started the server for:
- Request logs
- Error messages
- Console.log outputs

### **3. Browser Developer Tools**
- Open F12 in browser
- Check Network tab for API calls
- Check Console for JavaScript errors

## 🎯 **Practice Exercises**

### **Exercise 1: Add a New Endpoint**
Create an endpoint that returns the current date and time.

### **Exercise 2: Modify Data**
Change the intern's name and referral code to your own.

### **Exercise 3: Add Validation**
Add validation to ensure donation amounts are positive numbers.

### **Exercise 4: Create a New Data Type**
Add a "goals" array to track fundraising goals.

## 📝 **Key Concepts to Remember**

1. **Express.js**: Web framework for Node.js
2. **Middleware**: Functions that process requests
3. **REST API**: Standard way to structure web services
4. **JSON**: Data format for API communication
5. **HTTP Methods**: GET (read), POST (create), PUT (update), DELETE (delete)

## 🎉 **Next Steps**

1. **Practice**: Try modifying the data and adding new endpoints
2. **Explore**: Look at the frontend code to see how it uses the API
3. **Experiment**: Add new features like user authentication
4. **Learn More**: Study Express.js documentation

---

**Happy Coding! 🚀**

*This tutorial is part of your Full Stack Developer Internship project.* 