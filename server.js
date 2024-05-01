const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const colors = require('colors')
const dotenv = require('dotenv')
const connectDB = require('./db')
// env config
dotenv.config();
const PORT = process.env.PORT || 8080;
const DEV_MODE = process.env.DEV_MODE || 'development';

// rest object
const app = express()

// mongoDB connection 
connectDB();

//routes import
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

// middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// routes for API
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);

app.listen(PORT, () => {
    console.log(`server is running on ${DEV_MODE} port ${PORT}`);
})
