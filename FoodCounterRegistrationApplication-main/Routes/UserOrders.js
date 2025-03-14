const { json } = require("body-parser");
const db = require("../db");
const express = require("express");
const router = express.Router();
const { getIo } = require("../socket"); // Import io from socket.js
const ExcelJS = require("exceljs");
const moment = require("moment");

// creating table dynamically

const io = getIo();

const ordersTable = `
    CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    OrderDetails JSON NOT NULL,  
    userName VARCHAR(255) NOT NULL,
    userMobile VARCHAR(20) NOT NULL,
    status JSON NOT NULL,
    ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

    `;

const ordersHistoryTable = `
    CREATE TABLE IF NOT EXISTS orderhistory (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    orderId BIGINT,
    OrderDetails JSON NOT NULL,  
    userName VARCHAR(255) NOT NULL,
    userMobile VARCHAR(20) NOT NULL,
    status JSON NOT NULL,
    ordered_at TIMESTAMP ,
    delivered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

    `;

// const ordersTable = `
//       CREATE TABLE IF NOT EXISTS orders (
//     id BIGINT AUTO_INCREMENT PRIMARY KEY,
//     counter_id BIGINT NOT NULL,
//     item_id BIGINT NOT NULL,
//     quantity INT NOT NULL CHECK (quantity > 0),
//     total_price DECIMAL(10,2) NOT NULL,
//     status ENUM('Pending', 'Preparing', 'Completed', 'Cancelled') DEFAULT 'Pending',
//     ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     FOREIGN KEY (counter_id) REFERENCES usersregistrationcounter(id) ON DELETE CASCADE,
//     FOREIGN KEY (item_id) REFERENCES menu_items(id) ON DELETE CASCADE
// );
//     `;

// Database queries
const insertQuery =
  "INSERT INTO orders (item_id,counter_id,total_price,quantity) VALUES(?,?,?,?)";
const readQuery = "SELECT * FROM orders ";
const readQueryById = "SELECT * FROM orders WHERE ID = ?";
const readQueryByCounterId = "SELECT * FROM orders WHERE counter_id = ?";

const deleteQueryById = "DELETE FROM orders WHERE ID = ?";

// checking the counter id is Existing or not
const checkCounterId = "SELECT * FROM USERSREGISTRATIONCOUNTER WHERE ID = ?";
const checkItemId = "SELECT * FROM menu_items WHERE ID = ?";

const dailyPrice =
  "SELECT SUM(total_price) as total_price,count(*) as total_orders_plaaced FROM orders WHERE counter_id = ?";

const dailyPricedetails =
  "SELECT counter_id,SUM(total_price) as total_price,count(*) as total_orders_plaaced FROM orders GROUP BY counter_id ";

db.query(ordersTable, (err, res) => {
  if (err) {
    console.log(err);

    return console.log("Table was not created" + err);
  } else return console.log("Table was created successfully" + res);
});

db.query(ordersHistoryTable, (err, res) => {
  if (err) {
    console.log(err);

    return console.log("Table was not created" + err);
  } else {
    console.log(res);

    return console.log("Table was created successfully" + res);
  }
});

// router.post("/saveOrder", (req, res) => {

//     console.log(req.body);

//     try {

//         const { orderDetails, userName, userMobile } = req.body;

//         const status = [];

//         orderDetails.map((counter, index) => {
//             console.log(counter);

//             const counterStatus = {  // Declare inside to create a new object each time
//                 counterId: counter.counterId,
//                 orderStatus: 'Received'
//             };

//             status.push(counterStatus);
//         });

//         const serializedOrderDetails = JSON.stringify(orderDetails);
//         console.log(serializedOrderDetails);

//         const orderedAt = new Date().toLocaleString();

//         const serializedStatus = JSON.stringify(status);
//         console.log('serializedStatus: ' + serializedStatus);

//         const insertQuery = 'INSERT INTO orders ( OrderDetails,userName,userMobile, status) values (?,?,?,?)';

//         db.query(insertQuery, [serializedOrderDetails, userName, userMobile, serializedStatus], (err, result) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(500).json({ message: 'err while saving order' });
//             }
//             else return res.status(201).json({ message: 'order saved sucessfully' })
//         })

//     } catch (error) {
//         console.log(error);
//     }
// })

router.post("/saveOrder", (req, res) => {
  console.log(req.body);

  try {
      const { orderDetails, userName, userMobile } = req.body;

      // Prepare order status mapping
      const status = orderDetails.map(counter => ({
          counterId: counter.counterId,
          orderStatus: 'Received'
      }));

      // Serialize the objects to store in MySQL
      const serializedOrderDetails = JSON.stringify(orderDetails);
      const serializedStatus = JSON.stringify(status);

      const insertQuery = 'INSERT INTO orders (OrderDetails, userName, userMobile, status) VALUES (?, ?, ?, ?)';

      db.query(insertQuery, [serializedOrderDetails, userName, userMobile, serializedStatus], (err, result) => {
          if (err) {
              console.error(err);
              return res.status(500).json({ message: 'Error while saving order' });
          }

          // Extract the inserted order ID
          const orderId = result.insertId;

          // Create the order object with the necessary details
          const newOrder = {
              id: orderId,
              orderDetails: orderDetails.map(item => ({
                  counterId: item.counterId,
                  items: item.items || [] // Ensure items exist
              })),
              userName,
              userMobile,
              status: status.map(item => ({
                  counterId: item.counterId,
                  orderStatus: item.orderStatus
              })),
              orderedAt: new Date().toISOString()
          };

          // Emit event when order is saved
          const io = getIo();
          io.emit("newOrder", newOrder); // Notify all clients

          return res.status(201).json({ message: "Order saved successfully", order: newOrder });
      });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});


// router.post("/saveOrder", (req, res) => {
//     try {
//         console.log(req.body);

//         const { orderDetails, userName, userMobile } = req.body;

//         if (!orderDetails || !Array.isArray(orderDetails) || orderDetails.length === 0) {
//             return res.status(400).json({ message: "Order details must be a non-empty array." });
//         }

//         const orderedAt = new Date();
//         const insertQuery = `INSERT INTO orders (OrderDetails, userName, userMobile, ordered_at) VALUES (?, ?, ?, ?)`;

//         let completedQueries = 0;
//         let errors = [];

//         orderDetails.forEach((order, index) => {
//             const serializedOrder = JSON.stringify(order);

//             db.query(insertQuery, [serializedOrder, userName, userMobile, orderedAt], (err, result) => {
//                 if (err) {
//                     console.error(`Error in order ${index + 1}:`, err);
//                     errors.push({ orderIndex: index, error: err.message });
//                 }

//                 completedQueries++;

//                 // When all queries are finished, send a single response
//                 if (completedQueries === orderDetails.length) {
//                     if (errors.length > 0) {
//                         return res.status(500).json({ message: "Some orders failed to save", errors });
//                     }
//                     return res.status(201).json({ message: "All orders saved successfully" });
//                 }
//             });
//         });

//     } catch (error) {
//         console.error("Server error:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });

// router.get("/getOrdersByCounterId/:counterId", (req, res) => {
//     try {
//         const { counterId } = req.params; // Extract counterId from URL params

//         if (!counterId) {
//             return res.status(400).json({ error: "counterId is required" });
//         }

//         const query = `
//             SELECT id, userName, userMobile, orderDetails
//             FROM orders
//             WHERE JSON_CONTAINS(orderDetails, JSON_OBJECT('counterId', ?));
//         `;

//         db.query(query, [Number(counterId)], (err, result) => {
//             if (err) {
//                 console.error("Error: ", err);
//                 return res.status(500).json({ error: "Database query failed" });
//             }

//             // If no data found
//             if (result.length === 0) {
//                 return res.json({ message: "No orders found for this counterId" });
//             }

//             // Process each order and extract only the required counter details
//             const filteredResults = result.map(order => {
//                 const orderDetailsArray = JSON.parse(order.orderDetails);
//                 console.log("orderDetailsArray: " + orderDetailsArray);

//                 console.log(Array.isArray(orderDetailsArray)); // Should print: true

//                 const filteredOrderDetails = orderDetailsArray.filter(item => item.counterId === Number(counterId));

//                 return {
//                     id: order.id,
//                     userName: order.userName,
//                     userMobile: order.userMobile,
//                     orderDetails: filteredOrderDetails
//                 };
//             });

//             return res.json(filteredResults);
//         });

//     } catch (error) {
//         console.error("Catch Error: ", error);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// router.get("/getOrdersByCounterId/:counterId", (req, res) => {
//     try {
//         const { counterId } = req.params; // Extract counterId from URL params

//         console.log(counterId);

//         const query = `
//             SELECT id, userName, userMobile, orderDetails, status, ordered_at
//             FROM orders ORDER BY ordered_at DESC;
//         `;

//         db.query(query, (err, results) => {
//             if (err) {
//                 console.error("Database Error:", err);
//                 return res.status(500).json({ error: "Database query failed" });
//             }

//             const filteredResults = results.map(order => {
//                 let orderDetailsArray = [];
//                 let statusArray = [];

//                 try {
//                     console.log("Raw orderDetails:", order.orderDetails);

//                     orderDetailsArray = typeof order.orderDetails === "string"
//                         ? JSON.parse(order.orderDetails)
//                         : order.orderDetails;

//                     statusArray = typeof order.status === "string"
//                         ? JSON.parse(order.status)
//                         : order.status;

//                 } catch (parseError) {
//                     console.error("JSON Parse Error:", parseError);
//                 }

//                 const filteredOrderDetails = orderDetailsArray.filter(item => item.counterId === Number(counterId));
//                 const filteredStatus = statusArray.filter(item => item.counterId === Number(counterId));

//                 return {
//                     id: order.id,
//                     userName: order.userName,
//                     orderedAt: order.ordered_at,
//                     userMobile: order.userMobile,
//                     status: filteredStatus,
//                     orderDetails: filteredOrderDetails,

//                 };
//             }).filter(order => order.orderDetails.length > 0); // Remove empty results

//             return res.status(200).json(filteredResults);
//         });

//     } catch (error) {
//         console.error("Catch Error:", error);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// router.get("/getOrdersByCounterId/:counterId", (req, res) => {
//   try {
//     const { counterId } = req.params; // Extract counterId from URL params

//     console.log(counterId);

//     const query = `
//             SELECT id, userName, userMobile, orderDetails, status, ordered_at
//             FROM orders ORDER BY ordered_at DESC;
//         `;

//     db.query(query, (err, results) => {
//       if (err) {
//         console.error("Database Error:", err);
//         return res.status(500).json({ error: "Database query failed" });
//       }

//       const filteredResults = results
//         .map((order) => {
//           let orderDetailsArray = [];
//           let statusArray = [];

//           try {
//             console.log("Raw orderDetails:", order.orderDetails);

//             orderDetailsArray =
//               typeof order.orderDetails === "string"
//                 ? JSON.parse(order.orderDetails)
//                 : order.orderDetails;

//             statusArray =
//               typeof order.status === "string"
//                 ? JSON.parse(order.status)
//                 : order.status;
//           } catch (parseError) {
//             console.error("JSON Parse Error:", parseError);
//             return null;
//           }

//           const filteredOrderDetails = orderDetailsArray
//             .filter((order) => order.counterId === Number(counterId))
//             .map((order) => ({
//               ...order,
//               items: order.items.map((item) => ({
//                 price: item.price,
//                 itemName: item.itemName,
//                 quantity: item.quantity,
//                 totalPrice: item.totalPrice,
//               })),
//             }));

//           const filteredStatus = statusArray.filter(
//             (item) => item.counterId === Number(counterId)
//           );

//           const orderedAt = new Date(order.ordered_at).toLocaleString('en-US', {
//             timeZone: 'Asia/Kolkata'
//           })

//           return {
//             id: order.id,
//             userName: order.userName,
//             orderedAt: orderedAt,
//             userMobile: order.userMobile,
//             status: filteredStatus,
//             orderDetails: filteredOrderDetails,
//           };
//         })
//         .filter((order) => order && order.orderDetails.length > 0); // Remove empty results
//       console.log(filteredResults);

//       return res.status(200).json(filteredResults);
//     });
//   } catch (error) {
//     console.error("Catch Error:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });

router.get("/getOrdersByCounterId/:counterId", (req, res) => {
  try {
    const { counterId } = req.params; // Extract counterId from URL params
    console.log("Counter ID:", counterId);

    const query = `
        SELECT id, userName, userMobile, orderDetails, status, ordered_at
        FROM orders ORDER BY ordered_at DESC;
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: "Database query failed" });
      }

      const filteredResults = results
        .map((order) => {
          let orderDetailsArray = [];
          let statusArray = [];

          try {
            console.log("Raw orderDetails:", order.orderDetails);
            orderDetailsArray =
              typeof order.orderDetails === "string"
                ? JSON.parse(order.orderDetails)
                : order.orderDetails;

            statusArray =
              typeof order.status === "string"
                ? JSON.parse(order.status)
                : order.status;
          } catch (parseError) {
            console.error("JSON Parse Error:", parseError);
            return null;
          }

          // Filter orderDetails by counterId and map items to include necessary fields
          const filteredOrderDetails = orderDetailsArray
            .filter((item) => item.counterId === Number(counterId))
            .map((item) => ({
              ...item,
              items: item.items.map(({ price, itemName, quantity, totalPrice }) => ({
                price,
                itemName,
                quantity,
                totalPrice,
              })),
            }));

          // Filter status by counterId
          const filteredStatus = statusArray.filter(
            (item) => item.counterId === Number(counterId)
          );

          // Convert ordered_at to IST (Asia/Kolkata timezone)
          const orderedAt = new Date(order.ordered_at).toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
          });

          return {
            id: order.id,
            userName: order.userName,
            userMobile: order.userMobile,
            orderedAt,
            status: filteredStatus,
            orderDetails: filteredOrderDetails,
          };
        })
        .filter((order) => order && order.orderDetails.length > 0); // Remove empty results

      console.log("Filtered Results:", filteredResults);
      return res.status(200).json(filteredResults);
    });
  } catch (error) {
    console.error("Catch Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/getOrderHistoryByCounterId/:counterId", (req, res) => {
  try {
    const { counterId } = req.params; // Extract counterId from URL params

    const query = `
            SELECT id,orderId, userName, userMobile, orderDetails, ordered_at, delivered_at
            FROM orderhistory ORDER BY delivered_at DESC;
        `;

    db.query(query, (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: "Database query failed" });
      }

      const filteredResults = results
        .map((order) => {
          let orderDetailsArray = [];
          // let statusArray = [];
          try {
            console.log(order.orderDetails);

            try {
              orderDetailsArray =
                typeof order.orderDetails === "string"
                  ? JSON.parse(order.orderDetails)
                  : order.orderDetails; // ✅ Handle already parsed objects
            } catch (parseError) {
              console.error("JSON Parse Error:", parseError);
              orderDetailsArray = []; // Prevent app crash
            }

            // statusArray = JSON.parse(order.status)
          } catch (parseError) {
            console.error("JSON Parse Error:", parseError);
          }

          const filteredOrderDetails = orderDetailsArray.filter(
            (item) => item.counterId === Number(counterId)
          );
          // const filteredStatus = statusArray.filter(item => item.counterId === Number(counterId));
          const orderedAt = new Date(order.ordered_at).toLocaleString('en-US', {
            timeZone: 'Asia/Kolkata'
          })
          const deliveredAt = new Date(order.delivered_at).toLocaleString('en-US', {
            timeZone: 'Asia/Kolkata'
          })

          return {
            id: order.id,
            orderId: order.orderId,
            userName: order.userName,
            orderedAt: orderedAt,
            userMobile: order.userMobile,
            // status: filteredStatus,
            orderDetails: filteredOrderDetails,
            delivered_at: deliveredAt,
          };
        })
        .filter((order) => order.orderDetails.length > 0); // Remove empty results

      return res.status(200).json(filteredResults);
    });
  } catch (error) {
    console.error("Catch Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/download-history/:counterId", async (req, res) => {
  console.log("Excel API called");

  try {
    const { counterId } = req.params;

    const query = `
      SELECT id, orderId, userName, userMobile, orderDetails, status, ordered_at, delivered_at
      FROM orderhistory
      ORDER BY delivered_at DESC;
    `;

    db.query(query, async (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: "Database query failed" });
      }

      const filteredResults = results.map((order) => {
        let orderDetailsArray = [];
        let statusArray = [];

        console.log("Raw orderDetails:", order.orderDetails);
        console.log("Raw status:", order.status);

        try {
          orderDetailsArray =
            typeof order.orderDetails === "string"
              ? JSON.parse(order.orderDetails)
              : order.orderDetails;
          statusArray =
            typeof order.status === "string"
              ? JSON.parse(order.status)
              : order.status;
        } catch (parseError) {
          console.error("JSON Parse Error:", parseError);
          return null;
        }

        const filteredOrderDetails = orderDetailsArray?.filter(
          (item) => item.counterId === Number(counterId)
        ) || [];
        const filteredStatus = statusArray?.filter(
          (item) => item.counterId === Number(counterId)
        ) || [];

        console.log("filteredStatus:", JSON.stringify(filteredStatus));
        console.log("filteredOrderDetails:", JSON.stringify(filteredOrderDetails));

        return {
          id: order.id,
          orderId: order.orderId,
          userName: order.userName,
          userMobile: order.userMobile,
          orderedAt: moment(order.ordered_at).format("YYYY-MM-DD HH:mm:ss"),
          deliveredAt: order.delivered_at
            ? moment(order.delivered_at).format("YYYY-MM-DD HH:mm:ss")
            : "Not Delivered",
          status: filteredStatus.length > 0 ? filteredStatus[0].orderStatus : "N/A",
          orderDetails: filteredOrderDetails
            .flatMap((counter) => counter.items)
            .map((item) => `${item.itemName} - ${item.quantity}`)
            .join(", "),
          totalPrice: filteredOrderDetails
            .flatMap((counter) => counter.items)
            .map((item) => `${item.totalPrice}`)
            .join(", "),
        };
      }).filter(order => order !== null && order.orderDetails.length > 0);

      if (filteredResults.length === 0) {
        return res.status(404).json({ message: "No orders found for this counter" });
      }

      // Create Excel file
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet(`OrderHistory_Counter${counterId}`);

      worksheet.columns = [
        { header: "Order ID", key: "orderId", width: 15 },
        { header: "Customer Name", key: "userName", width: 20 },
        { header: "Mobile Number", key: "userMobile", width: 15 },
        { header: "Ordered Date & Time", key: "orderedAt", width: 20 },
        { header: "Delivered Date & Time", key: "deliveredAt", width: 20 },
        { header: "Status", key: "status", width: 15 },
        { header: "Order Details", key: "orderDetails", width: 40 },
        { header: "Total Price", key: "totalPrice", width: 40 },
      ];

      filteredResults.forEach((order) => worksheet.addRow(order));

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=OrderHistory_Counter${counterId}.xlsx`
      );

      await workbook.xlsx.write(res);
      res.end();
    });
  } catch (error) {
    console.error("Catch Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


// router.get("/download-history/:counterId", async (req, res) => {
//   console.log("Excel API called");

//   try {
//     const { counterId } = req.params; // Extract counterId from request params

//     const query = `
//             SELECT id, orderId, userName, userMobile, orderDetails, status, ordered_at, delivered_at
//             FROM orderhistory
//             ORDER BY delivered_at DESC;
//         `;
//         db.query(query, async (err, results) => {
//           if (err) {
//             console.error("Database Error:", err);
//             return res.status(500).json({ error: "Database query failed" });
//           }

//           const filteredResults = results
//             .map((order) => {
//               let orderDetailsArray = [];
//               let statusArray = [];

//               console.log("Raw orderDetails:", order.orderDetails);
//               console.log("Raw status:", order.status);

//               try {
//                 orderDetailsArray =
//                   typeof order.orderDetails === "string"
//                     ? JSON.parse(order.orderDetails)
//                     : order.orderDetails;
//                 statusArray =
//                   typeof order.status === "string"
//                     ? JSON.parse(order.status)
//                     : order.status;
//               } catch (parseError) {
//                 console.error("JSON Parse Error:", parseError);
//               }

//               // Filter by counterId
//               const filteredOrderDetails = orderDetailsArray?.filter(
//                 (item) => item.counterId === Number(counterId)
//               ) || [];
//               const filteredStatus = statusArray?.filter(
//                 (item) => item.counterId === Number(counterId)
//               ) || [];

//               console.log("filteredStatus:", JSON.stringify(filteredStatus));
//               console.log("filteredOrderDetails:", JSON.stringify(filteredOrderDetails));

//               return {
//                 id: order.id,
//                 orderId: order.orderId,
//                 userName: order.userName,
//                 userMobile: order.userMobile,
//                 orderedAt: moment(order.ordered_at).format("YYYY-MM-DD HH:mm:ss"),
//                 deliveredAt: order.delivered_at
//                   ? moment(order.delivered_at).format("YYYY-MM-DD HH:mm:ss")
//                   : "Not Delivered",
//                 status:
//                   filteredStatus.length > 0 ? filteredStatus[0].orderStatus : "N/A",
//                 orderDetails: filteredOrderDetails
//                   .flatMap((counter) => counter.items)
//                   .map((item) => `${item.itemName} - ${item.quantity}`)
//                   .join(", "),
//               };
//             })
//             .filter((order) => order.orderDetails.length > 0); 
//           })

//   } catch (error) {
//     console.error("Catch Error:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.put("/updateOrderStatus", (req, res) => {

//     const getStatus = "SELECT status from orders where id=?";

//     const updateStatus = "UPDATE orders SET status = ? where id=?"

//     try {

//         const { orderId } = req.params;
//         const { counterIdToUpdate, statusToUpdate } = req.body;
//         db.query(getStatus, [orderId], (err, result) => {
//             if (err) {
//                 console.log(`err while retriving status of orderID: ${orderId}` + err);
//                 return res.status(500).send(`err while retriving status of orderID: ${orderId}`);
//             }
//             else {
//                 console.log(result);

//                 db.query(updateStatus, [statusToUpdate, counterIdToUpdate], (err, result) => {
//                     if (err) {
//                         console.log(`err while updating status to ${statusToUpdate} for counterId ${counterIdToUpdate}` + err);
//                         return res.status(500).send(`err while updating status to ${statusToUpdate} for counterId ${counterIdToUpdate}`);
//                     }
//                     else {
//                         console.log(`status updated status to ${statusToUpdate} for counterId ${counterIdToUpdate} ` + result);
//                         return res.status(201).json({ message: `status updated status to ${statusToUpdate} for counterId ${counterIdToUpdate}` })
//                     }
//                 })

//             }

//         })

//         const updateCounterStatus = (counterIdToUpdate, newStatus) => {
//             const updatedStatus = status.map(counter =>
//                 counter.counterId === counterIdToUpdate
//                     ? { ...counter, orderStatus: newStatus } // Update specific counter
//                     : counter // Keep others unchanged
//             );
//             return updatedStatus;
//         };

//     } catch (error) {

//     }
// })

// router.put("/updateOrderStatus", (req, res) => {
//     const getStatusQuery = "SELECT status FROM orders WHERE id = ?";
//     const updateStatusQuery = "UPDATE orders SET status = ? WHERE id = ?";

//     try {
//         const { orderId, counterIdToUpdate, statusToUpdate } = req.body;

//         db.query(getStatusQuery, [orderId], (err, result) => {
//             if (err) {
//                 console.error(`Error retrieving status of orderID: ${orderId}`, err);
//                 return res.status(500).send(`Error retrieving status of orderID: ${orderId}`);
//             }

//             if (result.length === 0) {
//                 return res.status(404).send(`Order ID ${orderId} not found`);
//             }

//             let statusArray = JSON.parse(result[0].status); // Parse JSON array

//             // Update the status for the given counterId
//             statusArray = statusArray.map(counter =>
//                 counter.counterId === counterIdToUpdate
//                     ? { ...counter, orderStatus: statusToUpdate }
//                     : counter
//             );

//             const updatedStatusJSON = JSON.stringify(statusArray);

//             // Update the database with the modified status array
//             db.query(updateStatusQuery, [updatedStatusJSON, orderId], (err, result) => {
//                 if (err) {
//                     console.error(`Error updating status for counterId ${counterIdToUpdate}`, err);
//                     return res.status(500).send(`Error updating status for counterId ${counterIdToUpdate}`);
//                 }

//                 console.log(`Status updated for counterId ${counterIdToUpdate}: ${statusToUpdate}`);
//                 return res.status(200).json({
//                     message: `Status updated for counterId ${counterIdToUpdate} to ${statusToUpdate}`,
//                     updatedStatus: statusArray
//                 });
//             });
//         });
//     } catch (error) {
//         console.error("Unexpected error:", error);
//         return res.status(500).send("An unexpected error occurred.");
//     }
// });

router.put("/updateOrdersta", (req, res) => {
  const getStatusQuery = "SELECT * FROM orders WHERE id = ?";
  const updateStatusQuery = "UPDATE orders SET status = ? WHERE id = ?";
  const insertHistoryQuery = `INSERT INTO orderhistory (orderId, OrderDetails, userName, userMobile, status, ordered_at) VALUES (?, ?, ?, ?, ?,?)`;
  const deleteOrderQuery = "DELETE FROM orders WHERE id = ?";

  try {
    const { orderId, counterIdToUpdate, statusToUpdate } = req.body;

    db.query(getStatusQuery, [orderId], (err, result) => {
      if (err) {
        console.error(`Error retrieving order ${orderId}:`, err);
        return res.status(500).send(`Error retrieving order ${orderId}`);
      }

      if (result.length === 0) {
        return res.status(404).send(`Order ID ${orderId} not found`);
      }

      let order = result[0];
      console.log("order: " + order);

      let statusArray = JSON.parse(order.status); // Parse JSON array

      // Update the status for the given counterId
      statusArray = statusArray.map((counter) =>
        counter.counterId === counterIdToUpdate
          ? { ...counter, orderStatus: statusToUpdate }
          : counter
      );

      console.log("statusArray2: " + statusArray);

      const updatedStatusJSON = JSON.stringify(statusArray);

      // Update the database with the modified status array
      db.query(updateStatusQuery, [updatedStatusJSON, orderId], (err) => {
        if (err) {
          console.error(
            `Error updating status for counterId ${counterIdToUpdate}`,
            err
          );
          return res
            .status(500)
            .send(`Error updating status for counterId ${counterIdToUpdate}`);
        }

        console.log(
          `Status updated for counterId ${counterIdToUpdate}: ${statusToUpdate}`
        );

        // Check if all counters are "Delivered"
        const allDelivered = statusArray.every(
          (counter) => counter.orderStatus === "Delivered"
        );

        if (allDelivered) {
          // Move order to orderhistory table
          db.query(
            insertHistoryQuery,
            [
              order.id,
              order.OrderDetails,
              order.userName,
              order.userMobile,
              order.status,
              order.ordered_at,
            ],
            (err) => {
              if (err) {
                console.error(
                  `Error inserting order ${orderId} into history`,
                  err
                );
                return res
                  .status(500)
                  .send(`Error moving order ${orderId} to history`);
              }

              // Delete from orders table
              db.query(deleteOrderQuery, [orderId], (err) => {
                if (err) {
                  console.error(
                    `Error deleting order ${orderId} from orders`,
                    err
                  );
                  return res
                    .status(500)
                    .send(`Error deleting order ${orderId}`);
                }

                console.log(
                  `Order ${orderId} moved to history and deleted from orders`
                );
                return res.status(200).json({
                  message: `Order ${orderId} moved to history and deleted`,
                  updatedStatus: statusArray,
                });
              });
            }
          );
        } else {
          return res.status(200).json({
            message: `Status updated for counterId ${counterIdToUpdate} to ${statusToUpdate}`,
            updatedStatus: statusArray,
          });
        }
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).send("An unexpected error occurred.");
  }
});

router.put("/updateOrderStatus", (req, res) => {
  const getStatusQuery = "SELECT * FROM orders WHERE id = ?";
  const updateStatusQuery = "UPDATE orders SET status = ? WHERE id = ?";
  const insertHistoryQuery = `
        INSERT INTO orderhistory (orderId, OrderDetails, userName, userMobile, status, ordered_at) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
  const deleteOrderQuery = "DELETE FROM orders WHERE id = ?";

  try {
    const { orderId, counterIdToUpdate, statusToUpdate } = req.body;

    db.query(getStatusQuery, [orderId], (err, result) => {
      if (err) {
        console.error(`Error retrieving order ${orderId}:`, err);
        return res.status(500).send(`Error retrieving order ${orderId}`);
      }

      if (result.length === 0) {
        return res.status(404).send(`Order ID ${orderId} not found`);
      }

      let order = result[0];

      // With this:
      let statusArray =
        typeof order.status === "string"
          ? JSON.parse(order.status)
          : order.status;

      // Update the status for the given counterId
      statusArray = statusArray.map((counter) =>
        counter.counterId === counterIdToUpdate
          ? { ...counter, orderStatus: statusToUpdate }
          : counter
      );

      const updatedStatusJSON = JSON.stringify(statusArray);

      // **First Update the Database**
      db.query(updateStatusQuery, [updatedStatusJSON, orderId], (err) => {
        if (err) {
          console.error(
            `Error updating status for counterId ${counterIdToUpdate}`,
            err
          );
          return res
            .status(500)
            .send(`Error updating status for counterId ${counterIdToUpdate}`);
        }

        console.log(
          `Status updated for counterId ${counterIdToUpdate}: ${statusToUpdate}`
        );

        // **Fetch Updated Order to Check All Statuses**
        db.query(getStatusQuery, [orderId], (err, updatedResult) => {
          if (err) {
            console.error(`Error retrieving updated order ${orderId}:`, err);
            return res
              .status(500)
              .send(`Error retrieving updated order ${orderId}`);
          }

          const updatedOrder = updatedResult[0];
          const updatedStatusArray =
            typeof updatedOrder.status === "string"
              ? JSON.parse(updatedOrder.status)
              : updatedOrder.status;

          // Check if all counters are "Delivered"
          const allDelivered = updatedStatusArray.every(
            (counter) => counter.orderStatus === "Delivered"
          );

          if (allDelivered) {
            // Move order to orderhistory table
            db.query(
              insertHistoryQuery,
              [
                order.id,
                JSON.stringify(order.OrderDetails), // Convert to JSON string
                order.userName,
                order.userMobile,
                JSON.stringify(updatedOrder.status),
                order.ordered_at,
              ],
              (err) => {
                if (err) {
                  console.error(
                    `Error inserting order ${orderId} into history`,
                    err
                  );
                  return res
                    .status(500)
                    .send(`Error moving order ${orderId} to history`);
                }

                // Delete from orders table
                db.query(deleteOrderQuery, [orderId], (err) => {
                  if (err) {
                    console.error(
                      `Error deleting order ${orderId} from orders`,
                      err
                    );
                    return res
                      .status(500)
                      .send(`Error deleting order ${orderId}`);
                  }

                  console.log(
                    `Order ${orderId} moved to history and deleted from orders`
                  );

                  // const updatedorder = {
                  //   id: orderId,
                  //   status: statusToUpdate
                  // };

                  io.emit("orderStatusUpdated", updatedOrder)

                  return res.status(200).json({
                    message: `Order ${orderId} moved to history and deleted`,
                    updatedStatus: updatedStatusArray,
                  });
                });
              }
            );
          } else {

            // const updatedorder = {
            //   id: orderId,
            //   status: statusToUpdate
            // };

            // io.emit("orderStatusUpdated", updatedorder)

            io.emit("orderStatusUpdated", updatedOrder)



            return res.status(200).json({
              message: `Status updated for counterId ${counterIdToUpdate} to ${statusToUpdate}`,
              updatedStatus: updatedStatusArray,
            });
          }
        });
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).send("An unexpected error occurred.");
  }
});

//from orderHistory Table
// router.get("/getCounterWiseTotalPerDay/:counterId", (req, res) => {
//   try {
//     const { counterId } = req.params;

//     // Get first day of current month and today's date
//     const today = new Date();
//     const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
//       .toISOString()
//       .split("T")[0]; // Format: YYYY-MM-DD
//     const todayDate = new Date(
//       today.getFullYear(),
//       today.getMonth(),
//       today.getDate() + 1
//     )
//       .toISOString()
//       .split("T")[0]; // Next day to include full today

//     const query = `
//             SELECT orderDetails, ordered_at 
//             FROM orderhistory 
//             WHERE DATE(ordered_at) BETWEEN ? AND ?
//             ORDER BY ordered_at ASC;
//         `;

//     db.query(query, [firstDayOfMonth, todayDate], (err, results) => {
//       if (err) {
//         console.error("Database Error:", err);
//         return res.status(500).json({ error: "Database query failed" });
//       }

//       const dailyTotals = {};

//       results.forEach((order) => {
//         let orderDetailsArray = [];

//         try {
//           orderDetailsArray = JSON.parse(order.orderDetails); // Convert string to array
//         } catch (parseError) {
//           console.error("JSON Parse Error:", parseError);
//         }

//         // Filter items for the given counterId
//         const filteredOrderDetails = orderDetailsArray.filter(
//           (item) => item.counterId === Number(counterId)
//         );

//         if (filteredOrderDetails.length > 0) {
//           const orderDate = order.ordered_at.toISOString().split("T")[0]; // Extract YYYY-MM-DD from timestamp

//           const totalForDay = filteredOrderDetails.reduce((sum, item) => {
//             return sum + (parseFloat(item.totalPrice) || 0);
//           }, 0);

//           // Accumulate total price per day
//           if (!dailyTotals[orderDate]) {
//             dailyTotals[orderDate] = { totalPrice: 0, numOrders: 0 };
//           }

//           console.log("dailyTotals: " + JSON.stringify(dailyTotals));

//           // Update daily totals
//           dailyTotals[orderDate].totalPrice += totalForDay;
//           dailyTotals[orderDate].numOrders += 1; // Count this order
//         }
//       });

//       return res.status(200).json(
//         Object.keys(dailyTotals).map((date) => ({
//           date,
//           numOrders: dailyTotals[date].numOrders, // Number of orders per day
//           counterShare:
//             dailyTotals[date].totalPrice - 0.02 * dailyTotals[date].totalPrice,
//           adminShare: 0.02 * dailyTotals[date].totalPrice,
//           totalPrice: dailyTotals[date].totalPrice,
//           // counterShare: totalPrice - adminShare
//         }))
//       );
//     });
//   } catch (error) {
//     console.error("Catch Error:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// router.get("/getCounterWiseTotalPerDay/:counterId", (req, res) => {
//   try {
//     const { counterId } = req.params;

//     // Get first day of the month and today’s date
//     const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
//     const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
//       .toISOString()
//       .split("T")[0]; // YYYY-MM-DD

//     const query = `
//             SELECT orderDetails, DATE(ordered_at) AS orderDate
//             FROM orderhistory 
//             WHERE DATE(ordered_at) BETWEEN ? AND ?
//             ORDER BY ordered_at ASC;
//         `;

//     db.query(query, [firstDayOfMonth, today], (err, results) => {
//       if (err) {
//         console.error("Database Error:", err);
//         return res.status(500).json({ error: "Database query failed" });
//       }

//       const dailyTotals = {};

//       // results.forEach((order) => {
//       //   console.log("Processing Order:", order);

//       //   let orderDetailsArray = [];

//       //   try {
//       //     orderDetailsArray = JSON.parse(order.orderDetails);
//       //   } catch (parseError) {
//       //     console.error("JSON Parse Error:", parseError);
//       //     return;
//       //   }

//       //   console.log("Parsed OrderDetails:", orderDetailsArray);

//       //   const counterOrder = orderDetailsArray.find(
//       //     (orderDetail) => orderDetail.counterId === Number(counterId)
//       //   );

//       //   if (counterOrder) {
//       //     console.log("Matched Counter Order:", counterOrder);
//       //   } else {
//       //     console.log("No match for counterId:", counterId);
//       //   }
//       // });

//       results.forEach((order) => {
//         console.log("Processing Order:", order);
//         console.log("Type of orderDetails:", typeof order.orderDetails);

//         let orderDetailsArray = [];

//         if (typeof order.orderDetails === "string") {
//           try {
//             orderDetailsArray = JSON.parse(order.orderDetails);
//           } catch (parseError) {
//             console.error("JSON Parse Error:", parseError);
//             return;
//           }
//         } else if (typeof order.orderDetails === "object") {
//           // If orderDetails is already an object, assign it directly
//           orderDetailsArray = order.orderDetails;
//         } else {
//           console.error("Unexpected orderDetails format:", order.orderDetails);
//           return;
//         }

//         console.log("Parsed OrderDetails:", orderDetailsArray);
//       });

//       return res.status(200).json(
//         Object.keys(dailyTotals).map((date) => ({
//           date,
//           numOrders: dailyTotals[date].numOrders, // Number of orders per day
//           counterShare: dailyTotals[date].totalPrice * 0.98, // 98% goes to counter
//           adminShare: dailyTotals[date].totalPrice * 0.02, // 2% goes to admin
//           totalPrice: dailyTotals[date].totalPrice, // Total revenue
//         }))
//       );
//     });
//   } catch (error) {
//     console.error("Catch Error:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.get("/getCounterWiseTotalPerDay/:counterId", (req, res) => {
//   try {
//     const { counterId } = req.params;

//     // Get first day of the month and today’s date
//     const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
//     const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
//       .toISOString()
//       .split("T")[0]; // YYYY-MM-DD

//     const query = `
//             SELECT orderDetails, DATE(ordered_at) AS orderDate
//             FROM orderhistory 
//             WHERE DATE(ordered_at) BETWEEN ? AND ?
//             ORDER BY ordered_at ASC;
//         `;

//     db.query(query, [firstDayOfMonth, today], (err, results) => {
//       if (err) {
//         console.error("Database Error:", err);
//         return res.status(500).json({ error: "Database query failed" });
//       }

//       const dailyTotals = {};

//       results.forEach((order) => {
//         console.log("Processing Order:", order);
//         console.log("Type of orderDetails:", typeof order.orderDetails);

//         let orderDetailsArray = [];

//         if (typeof order.orderDetails === "string") {
//           try {
//             orderDetailsArray = JSON.parse(order.orderDetails);
//           } catch (parseError) {
//             console.error("JSON Parse Error:", parseError);
//             return;
//           }
//         } else if (Array.isArray(order.orderDetails)) {
//           orderDetailsArray = order.orderDetails;
//         } else {
//           console.error("Unexpected orderDetails format:", order.orderDetails);
//           return;
//         }

//         console.log("Parsed OrderDetails:", orderDetailsArray);

//         const counterOrder = orderDetailsArray.find(
//           (orderDetail) => orderDetail.counterId === Number(counterId)
//         );

//         if (counterOrder) {
//           console.log("Matched Counter Order:", counterOrder);

//           const orderDate = order.orderDate;
//           const orderAmount = counterOrder.totalPrice || 0;

//           if (!dailyTotals[orderDate]) {
//             dailyTotals[orderDate] = { numOrders: 0, totalPrice: 0 };
//           }

//           dailyTotals[orderDate].numOrders += 1;
//           dailyTotals[orderDate].totalPrice += orderAmount;
//         }
//       });

//       return res.status(200).json(
//         Object.keys(dailyTotals).map((date) => ({
//           date,
//           numOrders: dailyTotals[date].numOrders,
//           counterShare: dailyTotals[date].totalPrice * 0.98, // 98% goes to counter
//           adminShare: dailyTotals[date].totalPrice * 0.02, // 2% goes to admin
//           totalPrice: dailyTotals[date].totalPrice,
//         }))
//       );
//     });
//   } catch (error) {
//     console.error("Catch Error:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });


router.get("/getCounterWiseTotalPerDay/:counterId", (req, res) => {
  try {
    const { counterId } = req.params;

    // Get first day of the month and today’s date
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      .toISOString()
      .split("T")[0]; // YYYY-MM-DD

    const query = `
            SELECT orderDetails, DATE(ordered_at) AS orderDate
            FROM orderhistory 
            WHERE DATE(ordered_at) BETWEEN ? AND ?
            ORDER BY ordered_at ASC;
        `;

    db.query(query, [firstDayOfMonth, today], (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: "Database query failed" });
      }

      const dailyTotals = {};

      results.forEach((order) => {
        console.log("Processing Order:", order);

        let orderDetailsArray = [];

        // Ensure orderDetails is parsed correctly
        if (typeof order.orderDetails === "string") {
          try {
            orderDetailsArray = JSON.parse(order.orderDetails);
          } catch (parseError) {
            console.error("JSON Parse Error:", parseError);
            return;
          }
        } else if (Array.isArray(order.orderDetails)) {
          orderDetailsArray = order.orderDetails;
        } else {
          console.error("Unexpected orderDetails format:", order.orderDetails);
          return;
        }

        console.log("Parsed OrderDetails:", orderDetailsArray);

        // Get all orders for the given counterId
        const counterOrders = orderDetailsArray.filter(
          (orderDetail) => Number(orderDetail.counterId) === Number(counterId)
        );

        if (counterOrders.length > 0) {
          console.log("Matched Counter Orders:", counterOrders);

          const orderDate = order.orderDate;

          if (!dailyTotals[orderDate]) {
            dailyTotals[orderDate] = { numOrders: 0, totalPrice: 0 };
          }

          counterOrders.forEach((counterOrder) => {
            const orderAmount = parseFloat(counterOrder.totalPrice) || 0;

            dailyTotals[orderDate].numOrders += 1;
            dailyTotals[orderDate].totalPrice += orderAmount;
          });
        }
      });

      return res.status(200).json(
        Object.keys(dailyTotals).map((date) => ({
          date,
          numOrders: dailyTotals[date].numOrders,
          counterShare: dailyTotals[date].totalPrice * 0.98, // 98% goes to counter
          adminShare: dailyTotals[date].totalPrice * 0.02, // 2% goes to admin
          totalPrice: dailyTotals[date].totalPrice,
        }))
      );
    });
  } catch (error) {
    console.error("Catch Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});



// // calling the Api whether is working or not
// router.get('/', (req, res) => {
//     res.json({ message: "Welcome to the Node Js Backend.. for OrdersTable Api's !" });
// })

// // API route to save orders
// router.post('/save', async (req, res) => {
//     const { counter_id, orders } = req.body;

//     // Validate request
//     if (!counter_id || !Array.isArray(orders) || orders.length === 0) {
//         return res.status(400).json({ message: "Invalid JSON Request" });
//     }

//     try {
//         // Check if counter_id exists
//         const [counterCheck] = await db.promise().query(checkCounterId, [counter_id]);

//         if (counterCheck.length === 0) {
//             return res.status(404).json({ message: `Counter ID ${counter_id} does not exist` });
//         }

//         // Insert each order using for...of loop (Correct way to handle async operations in loops)
//         for (const { item_id, quantity, total_price } of orders) {
//             // Check if item_id exists
//             const [itemCheck] = await db.promise().query(checkItemId, [item_id]);

//             if (itemCheck.length === 0) {
//                 return res.status(404).json({ message: `Item ID ${item_id} does not exist` });
//             }

//             // Insert order
//             await db.promise().query(insertQuery, [item_id, counter_id, total_price, quantity]);
//         }

//         return res.status(201).json({ message: "Orders placed successfully" });

//     } catch (error) {
//         console.error("Error placing orders:", error);
//         return res.status(500).json({ message: "Failed to place orders", error });
//     }
// });

// // get call to read the data in db
// router.get('/getAll', (req, res) => {
//     db.query(readQuery, (err, result) => {
//         if (err) return res.status(400).json(err);
//         else return res.status(200).json(result)
//     })
// })

// // get calling based on id to read the data in db
// router.get('/getById/:id', (req, res) => {
//     const id = req.params.id;
//     if (!id) return res.status(400).json({ message: " ID Parameter is required" })

//     db.query(readQueryById, [id], (err, result) => {
//         if (err) return res.status(400).json(err);
//         else {
//             if (result.length > 0) {
//                 return res.status(200).json(result[0]);
//             } else {
//                 return res.status(404).json({ message: "No record found for ID: " + id });
//             }
//         }
//     })

// })

// // get the items details based on counterid
// router.get('/getByCounterId/:counterId', (req, res) => {
//     const counterId = req.params.counterId;
//     if (!counterId) return res.status(400).json({ message: " CounterId Parameter is required" })

//     db.query(readQueryByCounterId, [counterId], (err, result) => {
//         if (err) return res.status(400).json(err);
//         else {
//             if (result.length > 0) {
//                 return res.status(200).json(result);
//             } else {
//                 return res.status(404).json({ message: "No record found for the CounterId: " + counterId });
//             }
//         }
//     })

// })

// router.delete('/delete/:id', (req, res) => {
//     const id = req.params.id;

//     if (!id) {
//         return res.status(400).json({ message: "ID parameter required" });
//     }
//     // Checking whether the ID exists in the DB
//     db.query(readQueryById, [id], (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: "Database error", details: err });
//         }

//         if (result.length > 0) {
//             // After checking, proceed to delete
//             db.query(deleteQueryById, [id], (deleteErr, deleteResult) => {
//                 if (deleteErr) {
//                     return res.status(500).json({ error: "Deletion failed", details: deleteErr });
//                 }
//                 return res.status(200).json({ message: "Successfully deleted record with ID: " + id });
//             });
//         } else {
//             return res.status(404).json({ message: "No record found for ID: " + id });
//         }
//     });
// });

// router.get('/getDailyPriseDetailsByCounterId/:counterId', (req, res) => {
//     const counterId = req.params.counterId;
//     if (!counterId) { return res.status(400).json({ message: "counter id should required : " + counterId }) };
//     db.query(readQueryByCounterId, [counterId], (err, result) => {
//         if (err) return res.status(400).json(err);
//         else {
//             if (result.length > 0) {
//                 db.query(dailyPrice, [counterId], (priceerr, priceresult) => {
//                     if (err) return res.status(400).json(err);
//                     return res.status(400).json(priceresult)
//                 })
//             } else {
//                 return res.status(404).json({ message: "No record found for the CounterId: " + counterId });
//             }
//         }
//     })
// })

// router.get('/getDailyPriseDetails', (req, res) => {
//     db.query(dailyPricedetails, (priceerr, priceresult) => {
//         if (priceerr) return res.status(400).json(priceerr);
//         return res.status(200).json(priceresult)
//     })
// })

module.exports = router;
