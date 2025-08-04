# 🚀 Setup Guide - Fundraising Intern Portal

This guide will help you set up and run the Fundraising Intern Portal on any computer.

## 📋 **System Requirements**

- **Operating System:** Windows, macOS, or Linux
- **Node.js:** Version 14 or higher
- **npm:** Comes with Node.js
- **Browser:** Chrome, Firefox, Safari, or Edge

## 🪟 **Windows Setup**

### **Method 1: Using the Batch File (Easiest)**

1. **Download/Extract the project** to a folder
2. **Double-click** `start.bat`
3. **Wait** for the server to start
4. **Open your browser** and go to: `http://localhost:3000`

### **Method 2: Using Command Prompt**

1. **Open Command Prompt:**
   - Press `Windows key + R`
   - Type `cmd`
   - Press Enter

2. **Navigate to your project:**
   ```cmd
   cd "C:\path\to\your\project\folder"
   ```

3. **Install dependencies:**
   ```cmd
   npm install
   ```

4. **Start the server:**
   ```cmd
   npm start
   ```

5. **Open browser** and go to: `http://localhost:3000`

### **Method 3: Using PowerShell**

1. **Open PowerShell:**
   - Press `Windows key`
   - Type `powershell`
   - Click "Windows PowerShell"

2. **Navigate to your project:**
   ```powershell
   cd "C:\path\to\your\project\folder"
   ```

3. **Install dependencies:**
   ```powershell
   npm install
   ```

4. **Start the server:**
   ```powershell
   npm start
   ```

5. **Open browser** and go to: `http://localhost:3000`

## 🍎 **macOS Setup**

### **Method 1: Using Terminal**

1. **Open Terminal:**
   - Press `Cmd + Space`
   - Type `Terminal`
   - Press Enter

2. **Navigate to your project:**
   ```bash
   cd /path/to/your/project/folder
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

5. **Open browser** and go to: `http://localhost:3000`

### **Method 2: Using Finder**

1. **Open Finder** and navigate to your project folder
2. **Right-click** in the folder
3. **Select** "New Terminal at Folder"
4. **Run the commands:**
   ```bash
   npm install
   npm start
   ```

## 🐧 **Linux Setup**

### **Method 1: Using Terminal**

1. **Open Terminal:**
   - Press `Ctrl + Alt + T`

2. **Navigate to your project:**
   ```bash
   cd /path/to/your/project/folder
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

5. **Open browser** and go to: `http://localhost:3000`

## 🔧 **Installing Node.js**

### **Windows:**
1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the LTS version
3. Run the installer
4. Follow the installation wizard

### **macOS:**
1. **Using Homebrew (recommended):**
   ```bash
   brew install node
   ```

2. **Or download from website:**
   - Go to [https://nodejs.org/](https://nodejs.org/)
   - Download the macOS installer
   - Run the installer

### **Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install nodejs npm
```

### **Linux (CentOS/RHEL):**
```bash
sudo yum install nodejs npm
```

## ✅ **Verification Steps**

### **Check if Node.js is installed:**
```bash
node --version
npm --version
```

You should see version numbers like:
```
v18.17.0
9.6.7
```

### **Check if the server is running:**
1. Look for this message in the terminal:
   ```
   🚀 Fundraising Intern Portal server running on http://localhost:3000
   📊 API endpoints available at http://localhost:3000/api/
   ```

2. Open your browser and go to: `http://localhost:3000`

## 🛠️ **Troubleshooting**

### **"Node.js is not installed" Error:**
1. Download and install Node.js from [https://nodejs.org/](https://nodejs.org/)
2. Restart your terminal/command prompt
3. Try running the commands again

### **"Port 3000 already in use" Error:**

**Windows:**
```cmd
taskkill /f /im node.exe
npm start
```

**macOS/Linux:**
```bash
pkill node
npm start
```

### **"Permission denied" Error:**

**Windows:**
1. Run Command Prompt as Administrator
2. Navigate to your project directory
3. Run the commands again

**macOS/Linux:**
```bash
sudo npm install
sudo npm start
```

### **"Module not found" Error:**
```bash
npm install
```

### **Browser shows "Cannot connect":**
1. Make sure the server is running
2. Check if you're using the correct URL: `http://localhost:3000`
3. Try a different browser
4. Check if your firewall is blocking the connection

## 🎯 **Success Indicators**

When everything is working correctly:

1. **Terminal shows:**
   ```
   🚀 Fundraising Intern Portal server running on http://localhost:3000
   📊 API endpoints available at http://localhost:3000/api/
   ```

2. **Browser shows:**
   - Beautiful login page with gradient design
   - Login form with email and password fields
   - "Fundraising Intern Portal" title

3. **You can:**
   - Login with the default credentials
   - See the dashboard with statistics
   - Add donations
   - View rewards

## 📞 **Getting Help**

If you're still having issues:

1. **Check the main README.md** file
2. **Verify Node.js installation** with `node --version`
3. **Check if port 3000 is available**
4. **Try restarting your computer**
5. **Contact support** with specific error messages

## 🎉 **Congratulations!**

Once you see the login page in your browser, your Fundraising Intern Portal is successfully running! You can now:

- Login with: `raymondmontfort07@gmail.com` / `password123`
- Explore all the features
- Test the donation system
- View the rewards and achievements

---

**Happy Coding! 🚀** 