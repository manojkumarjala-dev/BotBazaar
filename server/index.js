require('dotenv').config();
const express = require('express');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');


const app = express();
const path = require('path');

const port = process.env.PORT || 5001;
const uri = process.env.MONGO_URI;

const userRouter = require('./routes/userRoutes.js');
const authRouter = require('./routes/auth.js');
const productRouter = require('./routes/productRoutes.js');
const orderRouter = require('./routes/orderRoutes.js');
const complaintRouter = require('./routes/complaintRoutes.js');
const messageRouter = require('./routes/messageRoutes.js');


app.use(express.json()); 

app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
const corsOptions = {
  origin: 'http://your-frontend-domain.com', // Update this to match your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add the methods you need
  credentials: true
};
app.use(cors(corsOptions));


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);
app.use('/api/complaint', complaintRouter);
app.use('/api/message', messageRouter);

mongoose.connect(uri, {
  useNewUrlParser: true,
});
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});


// log your server is running and the port
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Click here to open: http://localhost:${port}`);
});
module.exports =app
