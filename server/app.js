process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
require('dotenv').config()
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit');
const connectToDatabase = require('./services/dbService')
const userRoute = require('./routes/userRoute')
const {loggedIn, adminOnly} = require('./middleware/authMiddleware')
const businessRoute = require('./routes/businessRoute');
const serviceRoute = require('./routes/serviceRoute')
const meetingRoute = require('./routes/meetingRoute')
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const path = require('path');
const port = process.env.PORT

const app = express()
app.use(cors());

connectToDatabase().catch((err) => console.log(err))

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rate Limiter middleware
const loginLimiter = rateLimit({
    windowMs:  2 * 60 * 1000, // 2 minutes
    max: 10, // Limit each IP to 10 login attempts per windowMs
    message: 'Too many login attempts, please try again more 2 secondes.'
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Apply the rate limiter to login route
app.use('/user/login', loginLimiter);

app.use('/user', userRoute)
app.use('/business', loggedIn, businessRoute)
app.use('/service', loggedIn, serviceRoute)
app.use('/meeting', loggedIn ,meetingRoute)

app.use((err, req, res, next) => {
  res.status(500).send('יש בעיה בשרת כרגע נסה שוב מאוחר יותר ' + err.message);
});

// יצירת האפליקציה כך שתהיה ניתנת לבדיקה מבלי להאזין לפורט
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
  });
}

module.exports = app;  // Export האפליקציה לבדיקות
