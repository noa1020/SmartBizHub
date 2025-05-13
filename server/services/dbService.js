const mongoose = require('mongoose');

mongoose.set('strictQuery', false); // מתן תמיכה בשאילתות גמישות

const mongoDB = process.env.MONGODB_URI || 'mongodb://localhost:27017/defaultdb'; // ברירת מחדל אם משתנה הסביבה חסר

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // משליך את השגיאה כדי שהשרת לא יתחיל
  }
};

module.exports = connectToDatabase;