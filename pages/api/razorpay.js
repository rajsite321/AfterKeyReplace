const Razorpay = require("razorpay");
const shortid = require("shortid");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {cartTotal} = req.body
    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: 'rzp_live_04rWgbNNjYGjEt',
      key_secret: '4TyP6TmXEK4zNtZEF3YoEOak',
    });

    // Create an order -> generate the OrderID -> Send it to the Front-end
    const payment_capture = 1;
    const amount = cartTotal
    const currency = "INR";
    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    // Handle any other HTTP method
  }
}
