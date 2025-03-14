

// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const http = require("http");
// const path = require("path");
// const { initializeSocket } = require("./socket");

// const fs = require("fs");
// const path = require("path");
// const multer = require("multer");
// const host = "0.0.0.0";

// // configurations for express , cors and body parser
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true })); // Parse form data

// const corsOptions = {
//   origin: "*",
//   methods: ["GET", "POST", "PUT", "DELETE"],
// };
// app.use(cors(corsOptions));

// // Import routes
// const counterRegistrationApis = require("./Routes/CounterRegistration");
// // const menuItemRegistrationApis = require('./Routes/MenuItemsForCounter')
// const menuItemRegistrationApis = require("./Routes/MenuItems");
// const userOrders = require("./Routes/UserOrders");
// const { default: axios } = require("axios");

// // Use routes
// app.use("/counter", counterRegistrationApis);
// app.use("/menuItem", menuItemRegistrationApis);
// app.use("/order", userOrders);

// // Serve images from the uploads directory
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // checking the Application is running or not
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to the Node Js Backend.. Api's !" });
// });

// const MERCHANT_ID = "M10ECVZ6171L"; 
// const MERCHANT_TRANSACTION_ID = "TXN" + Date.now(); 
// const MERCHANT_USER_ID = "USER123";
// const PHONEPE_API_KEY = "72f8b9fb-5763-4b43-a379-4282c50ddfa4"; 
// const CALLBACK_URL = "http://192.168.1.52:9092/userpannel"; 


// const PHONEPE_API_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"; // Production URL
// // const PHONEPE_API_URL = "https://api-preprod.phonepe.com/apis/hermes/pg/v1/pay"; // Use this for Sandbox (Testing)

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

// // Application Running Under Port Number By Using below statement
// const Port = process.env.APP_Port;
// app.listen(Port, host, () =>
//   console.log(`Server running on port ${Port} and ${host}`)
// );


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const path = require("path");
const { initializeSocket } = require("./socket");

const app = express();
const server = http.createServer(app);

// Initialize Socket.io
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

// Root endpoint
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Node Js Backend.. Api's!" });
});

// Start the server
const Port = process.env.APP_Port;
server.listen(Port, () => console.log(`Server running on port ${Port}`));