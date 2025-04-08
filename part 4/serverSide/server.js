import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import supplierRouter from './routes/supplierRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import connectToDB from './config/db.js';

dotenv.config();

const app = express();

// Connect to the database
connectToDB();

// Middleware setup
app.use(cors()); 
app.use(express.json()); 

// Set up routes
app.use('/api/supplier', supplierRouter); 
app.use('/api/order', orderRouter); 

// Set up the server to listen on the specified port
let port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log('App is listening on port ' + port);
});
