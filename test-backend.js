const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const BASE_URL = 'http://localhost:3000/api';

async function testBackend() {
    console.log('🧪 Testing Fundraising Intern Portal Backend\n');
    
    try {
        // Test 1: Register a new user
        console.log('1️⃣ Testing POST /api/register');
        const registerResponse = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            })
        });
        const registerResult = await registerResponse.json();
        console.log('✅ Response:', JSON.stringify(registerResult, null, 2));
        console.log('');
        
        // Test 2: Login with the registered user
        console.log('2️⃣ Testing POST /api/login');
        const loginResponse = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'test@example.com',
                password: 'password123'
            })
        });
        const loginResult = await loginResponse.json();
        console.log('✅ Response:', JSON.stringify(loginResult, null, 2));
        console.log('');
        
        if (loginResult.success) {
            const userId = loginResult.user.id;
            
            // Test 3: Get user data
            console.log('3️⃣ Testing GET /api/intern-data/:userId');
            const userDataResponse = await fetch(`${BASE_URL}/intern-data/${userId}`);
            const userData = await userDataResponse.json();
            console.log('✅ Response:', JSON.stringify(userData, null, 2));
            console.log('');
            
            // Test 4: Add a donation
            console.log('4️⃣ Testing POST /api/update-donations/:userId');
            const addDonationResponse = await fetch(`${BASE_URL}/update-donations/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: 100 })
            });
            const addDonationResult = await addDonationResponse.json();
            console.log('✅ Response:', JSON.stringify(addDonationResult, null, 2));
            console.log('');
            
            // Test 5: Verify the donation was added
            console.log('5️⃣ Verifying updated data');
            const updatedDataResponse = await fetch(`${BASE_URL}/intern-data/${userId}`);
            const updatedData = await updatedDataResponse.json();
            console.log('✅ Updated total donations:', updatedData.totalDonations);
            console.log('');
        }
        
        // Test 6: Try to login with wrong password
        console.log('6️⃣ Testing login with wrong password');
        const wrongLoginResponse = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'test@example.com',
                password: 'wrongpassword'
            })
        });
        const wrongLoginResult = await wrongLoginResponse.json();
        console.log('✅ Response:', JSON.stringify(wrongLoginResult, null, 2));
        console.log('');
        
        console.log('🎉 All tests completed successfully!');
        
    } catch (error) {
        console.error('❌ Error testing backend:', error.message);
        console.log('\n💡 Make sure your server is running with: npm start');
    }
}


testBackend(); 