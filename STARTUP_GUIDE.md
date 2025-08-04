# 🚀 Startup Guide - Fundraising Intern Portal

This guide explains all the different ways to start your Fundraising Intern Portal.

## 🪟 **Windows Startup Methods**

### **Method 1: Double-Click start.bat (Recommended)**

1. **Navigate to your project folder**
2. **Double-click** `start.bat`
3. **Wait** for the server to start
4. **Open browser** to `http://localhost:3000`

**If the batch file doesn't work:**
- Try right-clicking and "Run as Administrator"
- Check if Node.js is installed
- Try the alternative methods below

### **Method 2: Using open-here.bat (Alternative)**

1. **Double-click** `open-here.bat`
2. **Type** `npm start` in the command prompt
3. **Press Enter**
4. **Open browser** to `http://localhost:3000`

### **Method 3: Manual Command Prompt**

1. **Open Command Prompt:**
   - Press `Windows key + R`
   - Type `cmd`
   - Press Enter

2. **Navigate to your project:**
   ```cmd
   cd "C:\Users\Raymond\Desktop\internshala project\intern dashboard project"
   ```

3. **Install dependencies:**
   ```cmd
   npm install
   ```

4. **Start the server:**
   ```cmd
   npm start
   ```

5. **Open browser** to `http://localhost:3000`

### **Method 4: Using PowerShell**

1. **Open PowerShell:**
   - Press `Windows key`
   - Type `powershell`
   - Click "Windows PowerShell"

2. **Navigate to your project:**
   ```powershell
   cd "C:\Users\Raymond\Desktop\internshala project\intern dashboard project"
   ```

3. **Install dependencies:**
   ```powershell
   npm install
   ```

4. **Start the server:**
   ```powershell
   npm start
   ```

5. **Open browser** to `http://localhost:3000`

### **Method 5: Using PowerShell Script**

1. **Right-click** `start.ps1`
2. **Select** "Run with PowerShell"
3. **Wait** for the server to start
4. **Open browser** to `http://localhost:3000`

## 🛠️ **Troubleshooting Batch File Issues**

### **Problem: Batch file opens and closes immediately**

**Solution 1: Run as Administrator**
1. Right-click `start.bat`
2. Select "Run as Administrator"

**Solution 2: Check Node.js Installation**
1. Open Command Prompt
2. Type: `node --version`
3. If you get an error, install Node.js from https://nodejs.org/

**Solution 3: Use Manual Method**
1. Open Command Prompt
2. Navigate to your project folder
3. Run: `npm install`
4. Run: `npm start`

### **Problem: "package.json not found" Error**

**Solution:**
1. Make sure you're in the correct project folder
2. Check if `package.json` exists in the folder
3. If not, you're in the wrong directory

### **Problem: "Node.js is not installed" Error**

**Solution:**
1. Download Node.js from https://nodejs.org/
2. Install it following the wizard
3. Restart your computer
4. Try the batch file again

### **Problem: "Port 3000 already in use" Error**

**Solution:**
1. Open Command Prompt as Administrator
2. Run: `taskkill /f /im node.exe`
3. Try starting the server again

## ✅ **Success Indicators**

When the server starts successfully, you should see:

```
🚀 Fundraising Intern Portal server running on http://localhost:3000
📊 API endpoints available at http://localhost:3000/api/
```

## 🌐 **Accessing Your Application**

Once the server is running:

1. **Open your web browser** (Chrome, Firefox, Edge, etc.)
2. **Go to:** `http://localhost:3000`
3. **You should see** the login page

## 🔧 **Alternative Startup Methods**

### **Using VS Code:**
1. Open VS Code
2. Open your project folder
3. Press `Ctrl + `` (backtick) to open terminal
4. Run: `npm start`

### **Using File Explorer:**
1. Navigate to your project folder
2. Right-click in the folder
3. Select "Open in Terminal" (if available)
4. Run: `npm start`

## 📱 **Quick Commands Reference**

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Install dependencies
npm install

# Start the server
npm start

# Development mode (auto-restart)
npm run dev

# Stop the server
Ctrl + C
```

## 🎯 **Recommended Workflow**

1. **First time setup:**
   - Install Node.js
   - Run `npm install`
   - Run `npm start`

2. **Daily use:**
   - Double-click `start.bat`
   - Or use `npm start` in terminal

3. **If batch file doesn't work:**
   - Use `open-here.bat`
   - Or manual command prompt method

## 🆘 **Getting Help**

If none of the methods work:

1. **Check Node.js installation:**
   ```bash
   node --version
   npm --version
   ```

2. **Check if you're in the right directory:**
   ```bash
   dir
   # Should show: package.json, server.js, etc.
   ```

3. **Try reinstalling dependencies:**
   ```bash
   npm install
   ```

4. **Check for errors in the terminal output**

## 🎉 **Success!**

Once you see the login page in your browser, your Fundraising Intern Portal is running successfully!

**Default Login:**
- Email: `raymondmontfort07@gmail.com`
- Password: `password123`

---

**Happy Coding! 🚀** 