// server.js
import express from 'express';

const app = express();
app.use(express.json());

const latestOrder = {
  customerName: "John Doe",
  customerPhone: "1234567890",
  orderItems: ["Apples", "Bananas"],
  totalAmount: 299,
  createdAt: new Date().toISOString(),
  status: 'pending',
};

app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.get('/order', (req, res) => {
  console.log("Latest Order:", latestOrder);
  res.send("Order data logged to server console.");
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
