require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const xss = require('xss-clean');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const rateLimiter = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

// database
const connectDB = require('./db/connect');

//  routers
const authRouter = require('./routes/authRoutes');

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use('/api/v1/auth', authRouter);


const port = process.env.PORT || 6000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();