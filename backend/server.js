require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const https = require("https");
const fs = require("fs");
const path = require("path");
const { initializeSocket } = require("./socket");
const crypto = require('crypto');
const axios = require('axios')
const Razorpay = require("razorpay");

const app = express();

// Load SSL Certificates
const sslOptions = {
    key: fs.readFileSync("/etc/letsencrypt/live/backend.proslogics.com/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/backend.proslogics.com/fullchain.pem"),
};

// Initialize Socket.io
const server = https.createServer(sslOptions, app);
initializeSocket(server);

// Middleware configurations
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Import and use routes
const counterRegistrationApis = require("./Routes/CounterRegistration");
const menuItemRegistrationApis = require("./Routes/MenuItems");
const userOrders = require("./Routes/UserOrders");

app.use("/counter", counterRegistrationApis);
app.use("/menuItem", menuItemRegistrationApis);
app.use("/order", userOrders);

// Serve images from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// const MERCHANT_ID = "M10ECVZ6171L"; 
const MERCHANT_TRANSACTION_ID = "TXN" + Date.now();
const MERCHANT_USER_ID = "USER123";
const PHONEPE_API_KEY = "72f8b9fb-5763-4b43-a379-4282c50ddfa4";
const CALLBACK_URL = "https://theplace.proslogics.com/userPannel";


const PHONEPE_API_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"; // Production URL
// const PHONEPE_API_URL = "https://api-preprod.phonepe.com/apis/hermes/pg/v1/pay"; // Use this for Sandbox (Testing)

// app.post("/initiate-payment", async (req, res) => {
//     try {
//         const amount = req.body.amount;

//         // Generate a unique transaction ID
//         const MERCHANT_TRANSACTION_ID = "txn_" + Date.now();

//         const payload = {
//             merchantId: MERCHANT_ID,
//             merchantTransactionId: MERCHANT_TRANSACTION_ID,
//             merchantUserId: "user_" + Date.now(),
//             amount: amount * 100, // Convert to paise
//             redirectUrl: CALLBACK_URL,
//             redirectMode: "POST",
//             mobileNumber: "9999999999",
//             paymentInstrument: { type: "PAY_PAGE" },
//         };

//         const payloadString = JSON.stringify(payload);

//         // Generate SHA256 signature
//         const keyIndex = 1;
//         const dataToSign = payloadString + "/pg/v1/pay" + PHONEPE_API_KEY;
//         const sha256 = crypto.createHash("sha256").update(dataToSign).digest("hex");
//         const checksum = sha256 + "###" + keyIndex;

//         const response = await axios.post(
//             PHONEPE_API_URL,
//             { request: payloadString },
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                     "X-VERIFY": checksum,
//                     "X-MERCHANT-ID": MERCHANT_ID,
//                 },
//             }
//         );

//         res.json({
//             success: true,
//             transactionId: MERCHANT_TRANSACTION_ID,
//             deepLink: response.data.data.instrumentResponse.redirectInfo.url,
//         });
//     } catch (error) {
//         console.error("Error initiating payment:", error.response ? error.response.data : error.message);
//         res.status(500).json({ success: false, message: "Payment initiation failed", error: error.message });
//     }
// });

// app.post("/initiate-payment", async (req, res) => {
//     try {
//         const amount = req.body.amount;

//         // Generate a unique transaction ID
//         const MERCHANT_TRANSACTION_ID = "txn_" + Date.now();

//         const payload = {
//             merchantId: MERCHANT_ID,
//             merchantTransactionId: MERCHANT_TRANSACTION_ID,
//             merchantUserId: "user_" + Date.now(),
//             amount: amount , // Convert to paise
//             redirectUrl: CALLBACK_URL,
//             redirectMode: "POST",
//             mobileNumber: "9999999999",
//             paymentInstrument: { type: "PAY_PAGE" },
//         };

//         const payloadString = JSON.stringify(payload);

//         // Generate SHA256 signature
//         const keyIndex = 1;
//         const dataToSign = payloadString + "/pg/v1/pay" + PHONEPE_API_KEY;
//         const sha256 = crypto.createHash("sha256").update(dataToSign).digest("hex");
//         const checksum = sha256 + "###" + keyIndex;

//         const response = await axios.post(
//             PHONEPE_API_URL,
//             { request: payloadString },
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                     "X-VERIFY": checksum,
//                     "X-MERCHANT-ID": MERCHANT_ID,
//                 },
//             }
//         );

//         res.json({
//             success: true,
//             transactionId: MERCHANT_TRANSACTION_ID,
//             deepLink: response.data.data.instrumentResponse.redirectInfo.url,
//         });
//     } catch (error) {
//         console.error("Error initiating payment:", error.response ? error.response.data : error.message);
//         res.status(500).json({ success: false, message: "Payment initiation failed", error: error.message });
//     }
// });

// app.post("/initiate-payment", async (req, res) => {
//     try {
//         const amount = req.body.amount;  // Ensure this is in paise (smallest unit)

//         // Generate a unique transaction ID
//         const MERCHANT_TRANSACTION_ID = "txn_" + Date.now();

//         const payload = {
//             merchantId: MERCHANT_ID,
//             merchantTransactionId: MERCHANT_TRANSACTION_ID,
//             merchantUserId: "user_" + Date.now(),
//             amount: amount,  // Amount in paise
//             redirectUrl: CALLBACK_URL,
//             redirectMode: "POST",
//             mobileNumber: "7013230194",  // Validate the phone number
//             paymentInstrument: { type: "UPI_INTENT", targetApp : "com.phonepe.app" },
//         };

//         const payloadString = JSON.stringify(payload);
//         const keyIndex = 1;

//         const dataToSign = payloadString + "/pg/v1/pay" + PHONEPE_API_KEY;
//         console.log("Data to sign:", dataToSign);  // Log the string to be signed

//         const sha256 = crypto.createHash("sha256").update(dataToSign).digest("hex");
//         const checksum = sha256 + "###" + keyIndex;
//         console.log("Checksum:", checksum);  // Log the checksum

//         const response = await axios.post(
//             PHONEPE_API_URL,
//             { request: payloadString },
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                     "X-VERIFY": checksum,
//                     "X-MERCHANT-ID": MERCHANT_ID,
//                 },
//             }
//         );
//         console.log(response);
//         res.json({
//             success: true,
//             transactionId: MERCHANT_TRANSACTION_ID,
//             deepLink: response.data.data.instrumentResponse.redirectInfo.url,
//         });
//     } catch (error) {
//         console.error("Error initiating payment:", error.response ? error.response.data : error.message);
//         res.status(500).json({ success: false, message: "Payment initiation failed", error: error.message });
//     }
// });

// const PHONEPE_API_URL = "https://api-preprod.phonepe.com/apis/hermes/pg/v1/pay"; 
const MERCHANT_ID = "M10ECVZ6171L";
const PHONEPE_SALT_KEY = "72f8b9fb-5763-4b43-a379-4282c50ddfa4";

app.post("/initiate-payment", async (req, res) => {
    try {
        const amount = req.body.amount * 100; // Convert to paisa
        const MERCHANT_TRANSACTION_ID = "txn_" + Date.now();

        const payload = {
            "merchantId": MERCHANT_ID,
            "merchantTransactionId": MERCHANT_TRANSACTION_ID,
            "merchantUserId": "user_" + Date.now(),
            "amount": amount,
            "redirectUrl": CALLBACK_URL,
            "redirectMode": "POST",
            "mobileNumber": "8074266336",
            "paymentInstrument": { type: "UPI_COLLECT" }
        };

        // Convert payload to Base64
        const base64Payload = Buffer.from(JSON.stringify(payload), "utf-8").toString("base64");

        // Generate the checksum
        const dataToSign = base64Payload + "/pg/v1/pay" + PHONEPE_SALT_KEY;
        const sha256 = crypto.createHash("sha256").update(dataToSign).digest("hex");
        const checksum = sha256 + "###1";

        console.log("Request Payload:", JSON.stringify(payload, null, 2));
        console.log("Base64 Encoded Payload:", base64Payload);
        console.log("X-VERIFY:", checksum);
        console.log("Decoded Payload:", Buffer.from(base64Payload, "base64").toString("utf-8"));


        // Send request to PhonePe API
        const response = await axios.post(
            PHONEPE_API_URL,
            { request: base64Payload },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-VERIFY": checksum
                    // "X-MERCHANT-ID": MERCHANT_ID,
                },
            }
        );

        console.log("PhonePe Response:", response.data);

        if (response.data.success) {
            res.json({
                success: true,
                transactionId: MERCHANT_TRANSACTION_ID,
                deepLink: response.data.data.instrumentResponse.redirectInfo.url,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "PhonePe Payment failed",
                error: response.data,
            });
        }
    } catch (error) {
        console.error("Error initiating payment:", error.response ? error.response.data : error.message);
        res.status(500).json({
            success: false,
            message: "Payment initiation failed",
            error: error.message,
        });
    }
});

const razorpay = new Razorpay({
    key_id: "rzp_live_noaz9jpyachSdC", 
    key_secret: "YOzrwgLsiAInFaYFQCZYd9Of", 
  });
  
  // Create order API
  app.post("/create-order", async (req, res) => {
    try {
      const options = {
        amount: req.body.amount , 
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        payment_capture: 1, 
      };
  
      const order = await razorpay.orders.create(options);
      res.json({ success: true, order });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
  

// Root endpoint
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Node Js Backend.. API's!" });
});

// Start the server
const Port = process.env.APP_Port || 5000;
server.listen(Port, () => console.log(`Server running on https://backend.proslogics.com:${Port}`));

