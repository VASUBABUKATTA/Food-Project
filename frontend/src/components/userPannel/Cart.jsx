

import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { motion } from "framer-motion";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
// import Payment from "./Payment";
import TextField from "@mui/material/TextField";
// import Service from '../../service/ApiService';
import { Modal } from 'react-bootstrap'
import Service from "../Api_Services/CategoryService";
import Payment from "./Payment";


function Cart({ cartItems, removeItem, updateCart, showItems, handleIncrement, handleDecrement, totalAmount, itemCounts, gotoCart }) {
    console.log(cartItems);

    const [cartData, setCartData] = useState([]);
    const [showPaymentpage, setShowPaymentPage] = useState(false);

    useEffect(() => {
        setCartData(cartItems);
    }, [])

    // useEffect(() => {
    //     setCartData((prevCartItems) => {
    //         return prevCartItems.map((counter) => {
    //             if (!counter.items || counter.items.length === 0) return counter; // Skip if no items

    //             const updatedItems = counter.items.map((item) => ({
    //                 ...item,
    //                 totalPrice: (parseFloat(item.price) * (item.quantity ?? 1)).toFixed(2) // Add totalPrice
    //             }));

    //             return {
    //                 ...counter,
    //                 items: updatedItems
    //             };
    //         });
    //     });




    // }, []); // Add cartItems as a dependency








    // Sync itemCounter with cartItems when cartItems change
    // useEffect(() => {
    //     setItemCounter(cartItems.map(item => item.quantity));
    // }, [cartItems]);

    // const setCounters = (index, value) => {
    //     if (value < 1) {
    //         removeItem(index);  // Remove the item when quantity reaches 0
    //         return;
    //     }
    //     setItemCounter(prev =>
    //         prev.map((count, i) => (i === index ? value : count))
    //     );
    //     updateCart(index, value); // Update cart globally
    // };



    // const handleAdditems = (itemName, counterName, counterId) => {
    //     handleIncrement(counterId, counterName, itemName);



    // }


    useEffect(() => {
        setCartData((prevCartItems) => {
            return prevCartItems.map((counter) => {
                if (!counter.items || counter.items.length === 0) return counter; // Skip if no items

                // Update totalPrice per item
                const updatedItems = counter.items.map((item) => ({
                    ...item,
                    totalPrice: (parseFloat(item.price) * (item.quantity ?? 1)).toFixed(2)
                }));


                console.log(updatedItems);


                // Calculate total price for the counter by summing up all item totalPrices
                const counterTotalPrice = updatedItems.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0);

                return {
                    ...counter,
                    items: updatedItems,
                    totalPrice: counterTotalPrice.toFixed(2) // Add totalPrice per counter
                };
            });
        });
    }, []);




    const handleAddItems = (itemName, counterName, counterId) => {
        setCartData((prevCartItems) => {
            return prevCartItems.map((counter) => {
                if (counter.counterId === counterId) {
                    const updatedItems = counter.items.map((item) => {
                        if (item.itemName === itemName) {
                            const newQuantity = (item.quantity || 1) + 1; // Increase quantity
                            return {
                                ...item,
                                quantity: newQuantity,
                                totalPrice: (parseFloat(item.price) * newQuantity).toFixed(2), // Update total price
                            };
                        }
                        return item;
                    });

                    // Calculate counter-wise total price
                    const counterTotalPrice = updatedItems.reduce((sum, item) =>
                        sum + parseFloat(item.totalPrice), 0
                    );

                    return {
                        ...counter,
                        items: updatedItems,
                        totalPrice: counterTotalPrice.toFixed(2), // Add total price at counter level
                    };
                }
                return counter;
            });
        });

        handleIncrement(counterId, counterName, itemName);
    };

    const handleRemoveItems = (itemName, counterName, counterId) => {
        setCartData((prevCartItems) => {
            return prevCartItems.map((counter) => {
                if (counter.counterId === counterId) {
                    const updatedItems = counter.items
                        .map((item) => {
                            if (item.itemName === itemName) {
                                const newQuantity = item.quantity - 1;
                                if (newQuantity === 0) return null; // Remove item if quantity reaches 0
                                return {
                                    ...item,
                                    quantity: newQuantity,
                                    totalPrice: (parseFloat(item.price) * newQuantity).toFixed(2), // Update total price
                                };
                            }
                            return item;
                        })
                        .filter(Boolean); // Remove null values (items with 0 quantity)

                    // Calculate counter-wise total price
                    const counterTotalPrice = updatedItems.reduce((sum, item) =>
                        sum + parseFloat(item.totalPrice), 0
                    );

                    return {
                        ...counter,
                        items: updatedItems,
                        totalPrice: counterTotalPrice.toFixed(2), // Add total price at counter level
                    };
                }
                return counter;
            });
        });

        handleDecrement(counterId, counterName, itemName);
    };



    const [showPayment, setShowPayment] = useState();

    // if (showPayment) {
    //     return <Payment />;
    // }


    const [inputValues, setInputValues] = useState({
        userName: "",
        userMobile: "",
    });

    const [err, setErr] = useState({
        userNameErr: '',
        userMobileErr: ''
    })



    // Handle input change
    const handleChange = (e) => {

        const value = e.target.value;
        const name = e.target.name
        setInputValues({ ...inputValues, [name]: value });
        if (name == 'userName')
            setErr({
                ...err, userNameErr: /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(value) && value.length >= 3 && value.length <= 20 ? "" : "3-20 characters"
            })
        else
            setErr((prev) => ({
                ...prev,
                userMobileErr: /^[6-9][0-9]{9}$/.test(value)
                    ? ""
                    : "Invalid mobile number (should start with 6-9 and be 10 digits)",
            }));


    };

    // Handle button click
    const handleProceed = async (e) => {

        e.preventDefault();


        const data = {
            orderDetails: cartData,
            userMobile: inputValues.userMobile,
            userName: inputValues.userName
        }
        console.log(data);

        const regexUsername = new RegExp(/^[a-zA-Z]{3,60}(?:\s[a-zA-Z]{1,60})*$/);

        const regexEmail = new RegExp(/^(?!.*?\.\.)(?!.*?\.(_|_\.|\._))([a-zA-Z0-9]+[a-zA-Z]*)(?:[._][a-zA-Z0-9]+)?(?:[._]?[a-zA-Z0-9]+)?@[a-zA-Z.]+(?:_[a-zA-Z0-9]+)?\.[a-zA-Z]{2,3}$/);
        const regexMobileNo = new RegExp(/^[6-9][0-9]{9}$/);

        console.log(err.userMobileErr == '' && err.userNameErr == '');

        if (err.userMobileErr == '' && err.userNameErr == '') {
            try {
                // const res = await Service.post("/order/saveOrder", data);
                // if (res.status == 201) {
                //     console.log("Entered Values:", inputValues);
                //     alert("order places successfully");
                //     gotoCart();
                //     // setShowPaymentPage(true);

                // }
                setShowPaymentPage(true);


            } catch (error) {
                console.log(error);

            }

        }

    };


    return (

        <>
            <div className="col-12 col-md-8 mx-auto">


                <div className='w-100 h-100 mb-2 d-flex text-light w-100  justify-content-between align-items-center' style={{ height: '60px', backgroundColor: 'midnightblue', borderRadius: '5px' }}>
                    <div>
                        <h3 className="ms-3">The Place Drive In</h3>
                    </div>

                </div>
                {showPaymentpage ? (<>
                    <Payment inputValues={inputValues} cartData={cartData} cartItems={cartItems} removeItem={removeItem} updateCart={updateCart} showItems={showItems} handleIncrement={handleIncrement} handleDecrement={handleDecrement} totalAmount={totalAmount} itemCounts={itemCounts} gotoCart={gotoCart} /></>)
                    : (
                        <>
                            <div className="container mt-3">
                                <h4 className="mb-3">Your Cart <ShoppingCartIcon /> </h4>

                                {cartData.length === 0 ? (
                                    <Typography variant="h6" color="textSecondary">
                                        Your cart is empty.
                                    </Typography>
                                ) : (

                                    cartData.map((counter, index) => (
                                        counter?.items?.length > 0 ? (
                                            <>
                                                <div className="card m-3" key={index}>
                                                    <div className="card-body">
                                                        <Typography variant="h6">{counter.counterName}</Typography>

                                                        {counter.items.map((item, idx) => (
                                                            <div className="card m-3 p-3" key={idx}>
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <div>
                                                                        <Typography variant="body2" color="textSecondary">
                                                                            {item.itemName}
                                                                        </Typography>
                                                                        <Typography variant="body2" color="textSecondary">
                                                                            Price: {item.totalPrice}
                                                                        </Typography>
                                                                    </div>

                                                                    <div className="d-flex align-items-center">
                                                                        <Button sx={{ backgroundColor: "blue" }} className="text-light">
                                                                            <span
                                                                                onClick={() => handleRemoveItems(item.itemName, counter.counterName, counter.counterId)}
                                                                                sx={{ backgroundColor: "blue", color: "white", minWidth: "40px" }}
                                                                            >
                                                                                <RemoveSharpIcon />
                                                                            </span>
                                                                            <Typography variant="body1" className="mx-2">
                                                                                {itemCounts[counter.counterId]?.[item.itemName] || 0}
                                                                            </Typography>
                                                                            <span
                                                                                onClick={() => handleAddItems(item.itemName, counter.counterName, counter.counterId)}
                                                                                sx={{ backgroundColor: "blue", color: "white", minWidth: "40px" }}
                                                                            >
                                                                                <AddSharpIcon />
                                                                            </span>
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                </div>

                                                <div>
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <h6>Missed somthing..?</h6>
                                                        <Button sx={{ backgroundColor: "blue" }} className="text-light" onClick={showItems}> Add More items <span><AddSharpIcon /></span> </Button>
                                                    </div>
                                                    <motion.nav
                                                        className="navbar sticky-bottom bg-success text-light bottom-0"
                                                        style={{ height: "80px", padding: "10px", marginTop: "20px" }}
                                                        initial={{ opacity: 0, y: 0 }} // Animation starts from bottom
                                                        animate={{ opacity: 1, y: 0 }} // Moves up smoothly
                                                        exit={{ opacity: 0, y: 50 }} // Fades out when cart is empty
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                        <div className="container-fluid text-center d-flex justify-content-between align-items-center">
                                                            {/* <a className="navbar-brand text-light fw-bold" href="#"> */}
                                                            <h5> Total Amount <span className=" fw-bold "><span className="fw-bold"><CurrencyRupeeIcon />{totalAmount}</span></span> </h5>
                                                            {/* </a>     */}
                                                            <h5 style={{ cursor: 'pointer' }} onClick={() => setShowPayment(true)}> Continue to Pay <span className="fs-3 fw-bold"><span className="fs-3"><DoubleArrowIcon /></span></span> </h5>
                                                        </div>
                                                    </motion.nav>

                                                </div>
                                            </>
                                        ) : <>
                                            <h6 className="text-center">Your Cart Empty</h6>
                                            <div className="d-flex justify-content-center align-items-center mt-5">
                                                <h6 >Missed somthing..?</h6>
                                                <Button sx={{ backgroundColor: "blue" }} className="text-light" onClick={showItems}> Add More items <span><AddSharpIcon /></span> </Button>

                                            </div>
                                        </>
                                    ))
                                )
                                }


                                <Modal
                                    show={showPayment}
                                    onHide={() => setShowPayment(!showPayment)}
                                    backdrop="static"
                                    keyboard={false}
                                    centered // This will center the modal
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title className="w-100 text-center">Please fill the details</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>
                                        <form onSubmit={handleProceed}>
                                            <Box
                                                // component="form"
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center", // Centers form fields horizontally
                                                    "& > :not(style)": { m: 1, width: "25ch" },
                                                }}
                                                autoComplete="off"
                                            >
                                                <TextField
                                                    id="standard-basic"
                                                    label="FullName"
                                                    variant="standard"
                                                    name="userName"
                                                    error={err.userNameErr}
                                                    helperText={err.userNameErr}
                                                    value={inputValues.userName}
                                                    onKeyPress={(e) => {
                                                        // const charCode = e.which || e.keyCode;
                                                        if (!/^[a-zA-Z\s]+$/.test(e.key)) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    onChange={handleChange}
                                                    required
                                                />

                                                <TextField
                                                    id="standard-basic2"
                                                    label="Mobile"
                                                    variant="standard"
                                                    name="userMobile"
                                                    error={err.userMobileErr}
                                                    helperText={err.userMobileErr}
                                                    value={inputValues.userMobile}
                                                    onKeyPress={(e) => {
                                                        // const charCode = e.which || e.keyCode;
                                                        if (!/^[0-9]$/.test(e.key)) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    inputProps={{ maxLength: 10 }}
                                                    onChange={handleChange}
                                                    required
                                                />

                                                <Button type="submitt" variant="contained"  >
                                                    Proceed
                                                </Button>
                                            </Box>
                                        </form>
                                    </Modal.Body>
                                </Modal>

                            </div >
                        </>
                    )}
            </div>
        </>

    );
}

export default Cart;
