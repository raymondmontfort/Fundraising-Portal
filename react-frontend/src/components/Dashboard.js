import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, 
  faSignOutAlt, 
  faDollarSign, 
  faUsers, 
  faTrophy,
  faMedal,
  faHistory,
  faPlusCircle,
  faCopy
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const [internData, setInternData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [donationForm, setDonationForm] = useState({
    amount: '',
    donorName: ''
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await axios.get(`/api/intern-data/${user.id}`);
      setInternData(response.data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      showMessage('Failed to load dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(''), 3000);
  };

  const handleAddDonation = async (e) => {
    e.preventDefault();
    
    const amount = parseFloat(donationForm.amount);
    if (!amount || amount <= 0) {
      showMessage('Please enter a valid amount', 'error');
      return;
    }

    try {
      const response = await axios.post(`/api/update-donations/${user.id}`, {
        amount: amount
      });

      if (response.data.success) {
        await loadDashboardData(); // Reload data
        setDonationForm({ amount: '', donorName: '' }); // Clear form
        showMessage(response.data.message, 'success');
      } else {
        showMessage(response.data.message, 'error');
      }
    } catch (error) {
      console.error('Error adding donation:', error);
      showMessage('Failed to add donation. Please try again.', 'error');
    }
  };

  const copyReferralCode = () => {
    if (internData?.referralCode) {
      navigator.clipboard.writeText(internData.referralCode);
      showMessage('Referral code copied to clipboard!', 'success');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!internData) {
    return (
      <div className="error-container">
        <p>Failed to load dashboard data</p>
      </div>
    );
  }

  const unlockedRewards = internData.rewards.filter(reward => reward.unlocked).length;

  return (
    <div className="dashboard-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-brand">
          <FontAwesomeIcon icon={faHeart} />
          <span>Fundraising Portal</span>
        </div>
        <div className="nav-user">
          <span>{internData.name}</span>
          <button className="btn btn-danger" onClick={onLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        </div>
      </nav>

      {message && (
        <div className={`message ${message.type}`} style={{ margin: '20px auto', maxWidth: '1200px' }}>
          {message.text}
        </div>
      )}

      <div className="dashboard-content">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card fade-in">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faDollarSign} />
            </div>
            <div className="stat-info">
              <h3>Total Raised</h3>
              <p>${internData.totalDonations.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="stat-card fade-in">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <div className="stat-info">
              <h3>Referral Code</h3>
              <p 
                style={{ cursor: 'pointer' }} 
                onClick={copyReferralCode}
                title="Click to copy"
              >
                {internData.referralCode}
              </p>
            </div>
          </div>
          
          <div className="stat-card fade-in">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faTrophy} />
            </div>
            <div className="stat-info">
              <h3>Rewards Earned</h3>
              <p>{unlockedRewards}/{internData.rewards.length}</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="content-grid">
          {/* Rewards Section */}
          <div className="card fade-in">
            <div className="card-header">
              <h2>
                <FontAwesomeIcon icon={faMedal} /> Rewards & Achievements
              </h2>
            </div>
            <div className="card-body">
              <div className="rewards-grid">
                {internData.rewards.map(reward => (
                  <div 
                    key={reward.id} 
                    className={`reward-item ${reward.unlocked ? 'unlocked' : 'locked'}`}
                  >
                    <div className="reward-icon">{reward.icon}</div>
                    <div className="reward-info">
                      <h4>{reward.name}</h4>
                      <p>{reward.description}</p>
                    </div>
                    <div className={`reward-status ${reward.unlocked ? 'unlocked' : 'locked'}`}>
                      {reward.unlocked ? 'Unlocked' : 'Locked'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Donations */}
          <div className="card fade-in">
            <div className="card-header">
              <h2>
                <FontAwesomeIcon icon={faHistory} /> Recent Donations
              </h2>
            </div>
            <div className="card-body">
              <div className="donations-list">
                {internData.recentDonations.map(donation => (
                  <div key={donation.id} className="donation-item">
                    <div className="donation-info">
                      <h4>{donation.donor}</h4>
                      <p>{formatDate(donation.date)}</p>
                    </div>
                    <div className="donation-amount">${donation.amount}</div>
                  </div>
                ))}
                {internData.recentDonations.length === 0 && (
                  <p style={{ textAlign: 'center', color: '#666' }}>
                    No donations yet. Add your first donation!
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Add Donation Form */}
          <div className="card fade-in">
            <div className="card-header">
              <h2>
                <FontAwesomeIcon icon={faPlusCircle} /> Add Donation
              </h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleAddDonation}>
                <div className="form-group">
                  <label htmlFor="donation-amount">Amount ($)</label>
                  <input
                    type="number"
                    id="donation-amount"
                    value={donationForm.amount}
                    onChange={(e) => setDonationForm(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="Enter amount"
                    min="1"
                    step="0.01"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="donor-name">Donor Name (Optional)</label>
                  <input
                    type="text"
                    id="donor-name"
                    value={donationForm.donorName}
                    onChange={(e) => setDonationForm(prev => ({ ...prev, donorName: e.target.value }))}
                    placeholder="Anonymous"
                  />
                </div>
                <button type="submit" className="btn btn-success" style={{ width: '100%' }}>
                  <FontAwesomeIcon icon={faPlusCircle} /> Add Donation
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 