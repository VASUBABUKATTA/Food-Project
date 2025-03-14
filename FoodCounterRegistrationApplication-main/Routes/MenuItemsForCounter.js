const express = require('express');
const router = express.Router();
const db = require('../db');

// creating table dynamically
const createMenuItemsTable = `
       CREATE TABLE IF NOT EXISTS menu_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    counter_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (counter_id) REFERENCES usersregistrationcounter(id) ON DELETE CASCADE
);
    `;

    // Database queries
const insertQuery = "INSERT INTO menu_items (item_name,description,price,category,available,counter_id) VALUES(?,?,?,?,?,?)"
const readQuery = "SELECT * FROM menu_items "
const readQueryById = "SELECT * FROM menu_items WHERE ID = ?"
const readQueryByCounterId = "SELECT * FROM menu_items WHERE counter_id = ?"
const readQueryByCategory = "SELECT * FROM menu_items WHERE category = ?"
const readQueryByItem = "SELECT * FROM menu_items WHERE item_name = ?"
const deleteQueryById = "DELETE FROM menu_items WHERE ID = ?"

// checking the counter id is Existing or not
const checkCounterId = "SELECT * FROM USERSREGISTRATIONCOUNTER WHERE ID = ?"
const updateQueryById = "UPDATE menu_items SET item_name = ?, description = ?, price = ?, category = ?, available = ?, counter_id = ? WHERE ID = ?";


    db.query(createMenuItemsTable,(err,res)=>{
        if(err) return console.log("Table was not created"+err);
        else return console.log("Table was created successfully"+res);
    });

    // calling the Api whether is working or not
router.get('/',(req,res)=>{
    res.json({ message: "Welcome to the Node Js Backend.. for MenuItemsTable Api's !" });
})

router.post('/save',(req,res)=>{
    const {item_name,description,price,category,available,counter_id} = req.body;
    if(!req.body) return res.status(400).json(err);
    db.query(checkCounterId,[counter_id],(err,result)=>{
        if(err) return res.status(400).json(err);
        if(result.length > 0){
            db.query(insertQuery,[item_name,description,price,category,available,counter_id],(err,result)=>{
                if(err) return res.status(400).json(err);
                else return res.status(201).json({message : "Counter added Successfully ",menuId : result.insertId});
            })
        }
        else{
            return res.status(404).json({message : "CounterId was not available in counter table : "+counter_id});
        }
    })
   
})

router.get("/getcategorysById/:counterId", (req, res) => {
    const { counterId } = req.params;
    console.log("Requested Counter ID:", counterId);

    const getQuery = `
        SELECT c.id AS categoryId, c.name AS categoryName, c.available AS categoryAvailability, 
               m.id AS itemId, m.name AS itemName, m.price, m.available AS itemAvailability
        FROM Categorys c  
        LEFT JOIN menuitems m ON c.id = m.category_id
        WHERE c.counter_id = ? 
    `;

    db.query(getQuery, [counterId], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error while retrieving categories by counterId" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No data found for the given counter ID" });
        }

        // Transform the result to match the expected JSON structure
        const categoryMap = {};

        results.forEach(row => {
            const { categoryId, categoryName, categoryAvailability, itemId, itemName, price, itemAvailability } = row;

            // If category doesn't exist, create it
            if (!categoryMap[categoryId]) {
                categoryMap[categoryId] = {
                    name: categoryName,
                    categoryId,
                    categoryAvailability,
                    menu: []
                };
            }

            // Add menu items if available
            if (itemId) {
                categoryMap[categoryId].menu.push({
                    name: itemName,
                    price,
                    itemId,
                    itemAvailability
                });
            }
        });



        // Convert the map to an array
        const formattedResponse = Object.values(categoryMap);


        return res.status(200).json(formattedResponse);
    });
});


// get call to read the data in db
router.get('/getAll',(req,res)=>{
    db.query(readQuery,(err,result)=>{
        if(err) return res.status(400).json(err);
        else return res.status(200).json(result)
    })
})

// get calling based on id to read the data in db
router.get('/getById/:id',(req,res)=>{
    const id = req.params.id;
    if(!id)return res.status(400).json({message :" ID Parameter is required"})
    
        db.query(readQueryById,[id],(err,result)=>{
            if(err) return res.status(400).json(err);
            else{
                if (result.length > 0) {
                    return res.status(200).json(result[0]); 
                } else {
                    return res.status(404).json({ message: "No record found for ID: " + id });
                }
            } 
        })
    
})


// get the items details based on counterid
router.get('/getByCounterId/:counterId',(req,res)=>{
    const counterId = req.params.counterId;
    if(!counterId)return res.status(400).json({message :" CounterId Parameter is required"})
        
        db.query(readQueryByCounterId,[counterId],(err,result)=>{
            if(err) return res.status(400).json(err);
            else{
                if (result.length > 0) {
                    return res.status(200).json(result); 
                } else {
                    return res.status(404).json({ message: "No record found for the CounterId: " + counterId });
                }
            } 
        })
    
})

// get the items details based on Category
router.get('/getByCategory/:category',(req,res)=>{
    const category = req.params.category;
    if(!category)return res.status(400).json({message :" Category Parameter is required"})
        
        db.query(readQueryByCategory,[category],(err,result)=>{
            if(err) return res.status(400).json(err);
            else{
                if (result.length > 0) {
                    return res.status(200).json(result); 
                } else {
                    return res.status(404).json({ message: "No record found for the Category: " + category });
                }
            } 
        })
    
})


// get the items details based on Item
router.get('/getByItem/:item',(req,res)=>{
    const item = req.params.item;
    if(!item)return res.status(400).json({message :" Category Parameter is required"})
        
        db.query(readQueryByItem,[item],(err,result)=>{
            if(err) return res.status(400).json(err);
            else{
                if (result.length > 0) {
                    return res.status(200).json(result); 
                } else {
                    return res.status(404).json({ message: "No record found for the Item: " + item });
                }
            } 
        })
})

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ message: "ID parameter required" });
    }
    // Checking whether the ID exists in the DB
    db.query(readQueryById, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error", details: err });
        }

        if (result.length > 0) {
            // After checking, proceed to delete
            db.query(deleteQueryById, [id], (deleteErr, deleteResult) => {
                if (deleteErr) {
                    return res.status(500).json({ error: "Deletion failed", details: deleteErr });
                }
                return res.status(200).json({ message: "Successfully deleted record with ID: " + id });
            });
        } else {
            return res.status(404).json({ message: "No record found for ID: " + id });
        }
    });
});



router.put('/update/:id',(req,res)=>{
    const id = req.params.id;
    const {item_name,description,price,category,available,counter_id} = req.body;
    if (!id || !req.body) {
        return res.status(400).json({ message: "ID and body parameters required" });
    }
     // Checking whether the ID exists in the DB
     db.query(readQueryById, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error", details: err });
        }
        if (result.length > 0) {

            db.query(checkCounterId,[counter_id],(err,result)=>{
                if(err) return res.status(400).json(err);
                if(result.length > 0){
                    // After checking, proceed to delete
                    db.query(updateQueryById, [item_name,description,price,category,available,counter_id,id], (updateErr, updateResult) => {
                        if (updateErr) {
                            return res.status(500).json({ error: "Updation failed", details: updateErr });
                        }
                        return res.status(201).json({ message: "Successfully updated for the record with ID: " + id });
                    });
                }
                else{
                    return res.status(404).json({message : "CounterId was not available in counter table : "+counter_id});
                }
            })
        } else {
            return res.status(404).json({ message: "No record found for ID: " + id });
        }
    });
});

    module.exports = router;
