const mongoose = require('mongoose');
require('dotenv').config();

// Test MongoDB connection
async function testConnection() {
    console.log('Testing MongoDB connection...');
    console.log('MongoDB URI:', process.env.MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        
        console.log('✅ MongoDB connection successful!');
        
        // Test basic database operation
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('📁 Available collections:', collections.map(c => c.name));
        
    } catch (error) {
        console.error('❌ MongoDB connection failed:');
        console.error('Error:', error.message);
        
        console.log('\n🔧 Troubleshooting steps:');
        console.log('1. Check if MongoDB Atlas cluster is running');
        console.log('2. Verify your IP is whitelisted in Atlas Network Access');
        console.log('3. Ensure the connection string is correct');
        console.log('4. Try using local MongoDB: mongodb://localhost:27017/healthtracker');
        
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

testConnection();