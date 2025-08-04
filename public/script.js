
let internData = null;
let isAuthenticated = false;
let currentUser = null;
const authSection = document.getElementById('auth-section');
const dashboardSection = document.getElementById('dashboard-section');
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already authenticated
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            isAuthenticated = true;
            showDashboard();
            loadDashboardData();
        } catch (error) {
            console.error('Error parsing saved user:', error);
            logout();
        }
    }
});
function switchTab(tab) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginBtn = document.querySelector('.tab-btn:first-child');
    const signupBtn = document.querySelector('.tab-btn:last-child');
    
    if (tab === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        loginBtn.classList.add('active');
        signupBtn.classList.remove('active');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        loginBtn.classList.remove('active');
        signupBtn.classList.add('active');
    }
}

async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    try {
        showMessage('Logging in...', 'success');
        
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const result = await response.json();
        
        if (result.success) {
            currentUser = result.user;
            isAuthenticated = true;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            showDashboard();
            loadDashboardData();
            showMessage(result.message, 'success');
        } else {
            showMessage(result.message, 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showMessage('Login failed. Please try again.', 'error');
    }
}

async function signup() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    if (!name || !email || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage('Password must be at least 6 characters long', 'error');
        return;
    }
    
    try {
        showMessage('Creating account...', 'success');
        
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        
        const result = await response.json();
        
        if (result.success) {
            currentUser = result.user;
            isAuthenticated = true;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            showDashboard();
            loadDashboardData();
            showMessage(result.message, 'success');
        } else {
            showMessage(result.message, 'error');
        }
    } catch (error) {
        console.error('Signup error:', error);
        showMessage('Account creation failed. Please try again.', 'error');
    }
}

function logout() {
    isAuthenticated = false;
    currentUser = null;
    localStorage.removeItem('currentUser');
    showAuth();
    showMessage('Logged out successfully', 'success');
}

function showAuth() {
    authSection.classList.remove('hidden');
    dashboardSection.classList.add('hidden');
}

function showDashboard() {
    authSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');
}

async function loadDashboardData() {
    if (!currentUser) {
        showMessage('User not authenticated', 'error');
        return;
    }
    
    try {
        const response = await fetch(`/api/intern-data/${currentUser.id}`);
        internData = await response.json();
        updateDashboard();
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showMessage('Failed to load dashboard data', 'error');
    }
}

function updateDashboard() {
    if (!internData) return;
    
    // Update user name
    document.getElementById('user-name').textContent = internData.name;
    
    // Update stats
    document.getElementById('total-amount').textContent = `$${internData.totalDonations.toLocaleString()}`;
    document.getElementById('referral-code').textContent = internData.referralCode;
    
    const unlockedRewards = internData.rewards.filter(reward => reward.unlocked).length;
    document.getElementById('rewards-count').textContent = `${unlockedRewards}/${internData.rewards.length}`;
    
    // Update rewards
    updateRewards();
    
    // Update donations
    updateDonations();
}

function updateRewards() {
    const rewardsContainer = document.getElementById('rewards-container');
    rewardsContainer.innerHTML = '';
    
    internData.rewards.forEach(reward => {
        const rewardElement = document.createElement('div');
        rewardElement.className = `reward-item ${reward.unlocked ? 'unlocked' : 'locked'}`;
        
        rewardElement.innerHTML = `
            <div class="reward-icon">${reward.icon}</div>
            <div class="reward-info">
                <h4>${reward.name}</h4>
                <p>${reward.description}</p>
            </div>
            <div class="reward-status ${reward.unlocked ? 'unlocked' : 'locked'}">
                ${reward.unlocked ? 'Unlocked' : 'Locked'}
            </div>
        `;
        
        rewardsContainer.appendChild(rewardElement);
    });
}

function updateDonations() {
    const donationsContainer = document.getElementById('donations-container');
    donationsContainer.innerHTML = '';
    
    internData.recentDonations.forEach(donation => {
        const donationElement = document.createElement('div');
        donationElement.className = 'donation-item';
        
        donationElement.innerHTML = `
            <div class="donation-info">
                <h4>${donation.donor}</h4>
                <p>${formatDate(donation.date)}</p>
            </div>
            <div class="donation-amount">$${donation.amount}</div>
        `;
        
        donationsContainer.appendChild(donationElement);
    });
}

async function addDonation() {
    if (!currentUser) {
        showMessage('User not authenticated', 'error');
        return;
    }
    
    const amount = parseFloat(document.getElementById('donation-amount').value);
    const donorName = document.getElementById('donor-name').value || 'Anonymous';
    
    if (!amount || amount <= 0) {
        showMessage('Please enter a valid amount', 'error');
        return;
    }
    
    try {
        const response = await fetch(`/api/update-donations/${currentUser.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: amount })
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Reload dashboard data to get updated information
            await loadDashboardData();
            
            // Clear form
            document.getElementById('donation-amount').value = '';
            document.getElementById('donor-name').value = '';
            
            showMessage(result.message, 'success');
        } else {
            showMessage(result.message, 'error');
        }
    } catch (error) {
        console.error('Error adding donation:', error);
        showMessage('Failed to add donation. Please try again.', 'error');
    }
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    
    // Add to appropriate container
    const container = isAuthenticated ? dashboardSection : authSection;
    container.insertBefore(messageElement, container.firstChild);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.remove();
        }
    }, 3000);
}

// Copy referral code functionality
function copyReferralCode() {
    const referralCode = document.getElementById('referral-code').textContent;
    navigator.clipboard.writeText(referralCode).then(() => {
        showMessage('Referral code copied to clipboard!', 'success');
    }).catch(() => {
        showMessage('Failed to copy referral code', 'error');
    });
}

// Add click event to referral code for copying
document.addEventListener('DOMContentLoaded', function() {
    const referralCodeElement = document.getElementById('referral-code');
    if (referralCodeElement) {
        referralCodeElement.style.cursor = 'pointer';
        referralCodeElement.title = 'Click to copy';
        referralCodeElement.addEventListener('click', copyReferralCode);
    }
}); 