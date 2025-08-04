const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// User authentication data (in-memory storage)
const users = [
  {
    id: 1,
    name: "Raymond Montfort",
    email: "raymondmontfort07@gmail.com",
    password: "password123", // In real app, this would be hashed
    referralCode: "raymond2025",
    totalDonations: 1250,
    rewards: [
      {
        id: 1,
        name: "Bronze Badge",
        description: "Raise your first $100",
        unlocked: true,
        icon: "🥉"
      },
      {
        id: 2,
        name: "Silver Badge",
        description: "Raise $500",
        unlocked: true,
        icon: "🥈"
      },
      {
        id: 3,
        name: "Gold Badge",
        description: "Raise $1000",
        unlocked: true,
        icon: "🥇"
      },
      {
        id: 4,
        name: "Diamond Badge",
        description: "Raise $2000",
        unlocked: false,
        icon: "💎"
      },
      {
        id: 5,
        name: "Platinum Badge",
        description: "Raise $5000",
        unlocked: false,
        icon: "🏆"
      }
    ],
    recentDonations: [
      { id: 1, amount: 50, donor: "Anonymous", date: "2025-01-30" },
      { id: 2, amount: 100, donor: "John Doe", date: "2025-01-29" },
      { id: 3, amount: 75, donor: "Jane Smith", date: "2025-01-28" },
      { id: 4, amount: 200, donor: "Anonymous", date: "2025-01-27" }
    ]
  }
];

// Helper function to find user by email
function findUserByEmail(email) {
  return users.find(user => user.email === email);
}

// Helper function to generate referral code
function generateReferralCode(name) {
  const cleanName = name.toLowerCase().replace(/\s+/g, '');
  const randomNum = Math.floor(Math.random() * 1000);
  return `${cleanName}${randomNum}`;
}

// Authentication Routes
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  
  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }
  
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters long'
    });
  }
  
  // Check if user already exists
  const existingUser = findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User with this email already exists'
    });
  }
  
  // Create new user
  const newUser = {
    id: users.length + 1,
    name: name,
    email: email,
    password: password, // In real app, hash this password
    referralCode: generateReferralCode(name),
    totalDonations: 0,
    rewards: [
      {
        id: 1,
        name: "Bronze Badge",
        description: "Raise your first $100",
        unlocked: false,
        icon: "🥉"
      },
      {
        id: 2,
        name: "Silver Badge",
        description: "Raise $500",
        unlocked: false,
        icon: "🥈"
      },
      {
        id: 3,
        name: "Gold Badge",
        description: "Raise $1000",
        unlocked: false,
        icon: "🥇"
      },
      {
        id: 4,
        name: "Diamond Badge",
        description: "Raise $2000",
        unlocked: false,
        icon: "💎"
      },
      {
        id: 5,
        name: "Platinum Badge",
        description: "Raise $5000",
        unlocked: false,
        icon: "🏆"
      }
    ],
    recentDonations: []
  };
  
  users.push(newUser);
  
  res.json({
    success: true,
    message: 'Account created successfully!',
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      referralCode: newUser.referralCode
    }
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  // Validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }
  
  // Find user
  const user = findUserByEmail(email);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }
  
  // Check password
  if (user.password !== password) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }
  
  res.json({
    success: true,
    message: 'Login successful!',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      referralCode: user.referralCode
    }
  });
});

// Protected API Routes (require user ID)
app.get('/api/intern-data/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  res.json({
    name: user.name,
    referralCode: user.referralCode,
    totalDonations: user.totalDonations,
    rewards: user.rewards,
    recentDonations: user.recentDonations
  });
});

app.get('/api/donations/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  res.json({
    total: user.totalDonations,
    recent: user.recentDonations
  });
});

app.get('/api/rewards/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  res.json(user.rewards);
});

app.post('/api/update-donations/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const { amount } = req.body;
  
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  if (amount && typeof amount === 'number' && amount > 0) {
    user.totalDonations += amount;
    
    // Add to recent donations
    const newDonation = {
      id: Date.now(),
      amount: amount,
      donor: "Anonymous",
      date: new Date().toISOString().split('T')[0]
    };
    
    user.recentDonations.unshift(newDonation);
    if (user.recentDonations.length > 5) {
      user.recentDonations.pop();
    }
    
    // Update rewards based on total donations
    updateUserRewards(user);
    
    res.json({ 
      success: true, 
      newTotal: user.totalDonations,
      message: `Successfully added $${amount} to total donations`
    });
  } else {
    res.status(400).json({ 
      success: false, 
      message: 'Invalid amount provided' 
    });
  }
});

// Helper function to update user rewards
function updateUserRewards(user) {
  const total = user.totalDonations;
  
  user.rewards.forEach(reward => {
    switch (reward.id) {
      case 1: // Bronze Badge
        reward.unlocked = total >= 100;
        break;
      case 2: // Silver Badge
        reward.unlocked = total >= 500;
        break;
      case 3: // Gold Badge
        reward.unlocked = total >= 1000;
        break;
      case 4: // Diamond Badge
        reward.unlocked = total >= 2000;
        break;
      case 5: // Platinum Badge
        reward.unlocked = total >= 5000;
        break;
    }
  });
}

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Fundraising Intern Portal server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api/`);
}); 