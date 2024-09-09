const express = require('express');
 const path = require('path');
 const Razorpay = require('razorpay');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: 'rzp_test_PQaz9v7UwOl5SN', // Replace with your Razorpay key_id
    key_secret: '5aMs2FXDRsEo7UHXGuG96PSc' // Replace with your Razorpay key_secret
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Create an order route
app.post('/create-order', (req, res) => {
    const { amount, name, email, contact } = req.body;

    // Create an order with Razorpay
    const options = {
        amount: amount, // Amount in smallest currency unit, e.g., paise for INR
        currency: "INR",
        receipt: "receipt_order_74394", // You can customize this
        payment_capture: 1 // Auto capture after payment
    };

    razorpay.orders.create(options, (err, order) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Send the order details back to the client
        res.json({
            key: 'rzp_test_PQaz9v7UwOl5SN', // Replace with your Razorpay key_id
            amount: order.amount,
            order_id: order.id
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
/* const express = require('express');
 const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Example backend API route
app.post('/create-order', (req, res) => {
    const { amount, name, email, contact } = req.body;

    // Simulate order creation and respond with order details
    const orderData = {
        key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay key
        amount: amount,
        order_id: 'order_123456789' // Replace with actual order ID from Razorpay
    };

    res.json(orderData);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});*/
