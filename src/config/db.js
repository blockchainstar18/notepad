const mongoose = require('mongoose');
const db = "mongodb+srv://blockchainstar18:3366Gol8@cluster0.7nwcpni.mongodb.net/notepad"
// "mongodb://localhost:27017/notepad"
// mongodb+srv://blockchainstar18:3366Gol8@cluster0.7nwcpni.mongodb.net/test
// 
const connectDB = async () => {
    try {
        // mongoose.set('strictQuery', true)
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
// connectDB()
