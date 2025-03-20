import { Button, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FormControl, FormLabel, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserDashboard from "./UserDashboard";
import AddSharpIcon from '@mui/icons-material/AddSharp';
import axios from "axios";
import CategoryService from "../Api_Services/CategoryService";
import pic13 from '../../assets/pic13.webp';
import { Home } from "@mui/icons-material";
import { motion } from "framer-motion";
import UserHeader from "./UserHeader";

const Payment = ({ inputValues, cartData, cartItems, removeItem, updateCart, showItems, handleIncrement, handleDecrement, totalAmount, itemCounts, gotoCart }) => {

    const navigate = useNavigate('');
    const [paymentMethod, setpaymentMethod] = useState()
    const [paymentMethodselected, setpaymentMethodselected] = useState(false)
    const [showOrderDetails, setshowOrderDetails] = useState(false);
    const [showdashboard, setshowdashboard] = useState(false);

    const [paymentId, setpaymnetId] = useState('')


    const handleClose = () => {
        setshowOrderDetails(false);
        setshowdashboard(true);
    }
    const data = {
        orderDetails: cartData,
        userMobile: inputValues.userMobile,
        userName: inputValues.userName
    }
    // console.log(data);

    const amount = data.orderDetails[0]?.totalPrice;
    // console.log(amount, data.orderDetails[0]?.totalPrice)

    const OrderFun = async () => {

        const res = await CategoryService.post("/order/saveOrder", data);
        if (res.status == 201) {
            // console.log("Entered Values:", inputValues);
            toast.success("order places successfully");
            setshowOrderDetails(true)
        }
        // setshowOrderDetails(true)
    }

    useEffect(() => {
        if (showOrderDetails) {
            const timer = setTimeout(() => {
                handleClose();
            }, 10000)
            return () => clearTimeout(timer);
        }
    }, [showOrderDetails, setshowOrderDetails])
    // const handleSubmitt = (event) => {
    //     event.preventDefault();
    //     const var4 = 'https://api.razorpay.com/v1/payments/qr_codes/qr_FuZIYx6rMbP6gs';
    //     const options = {
    //         key: 'YOzrwgLsiAInFaYFQCZYd9Of',
    //         entity: var4,
    //         amount: Math.round(totalAmount),
    //         name: 'The Place Drive In',
    //         description: 'The Place Drive In',
    //         image: pic13,
    //         handler: function (response) {
    //             // alert(response.razorpay_payment_id);

    //             setpaymnetId(response.razorpay_payment_id)
    //             toast.success("Payment SuccessFully Completed Thank You");
    //             //   navigate("/paymentsuccess");
    //             setshowOrderDetails(true)


    //         },

    //         prefill: {
    //             name: data.userName,
    //             //   email: email,
    //             contact: data.userMobile,
    //         },

    //         theme: {
    //             color: '#F37254',
    //         },
    //     }
    //     var pay = new window.Razorpay(options);
    //     pay.open();
    // }

    const handleRazorPay = async () => {

        const response = await fetch("https://backend.proslogics.com:9097/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: totalAmount * 100 }), // ₹5.00
        });

        const { order } = await response.json();

        const options = {
            key: "rzp_live_noaz9jpyachSdC",
            amount: order.amount,
            currency: order.currency,
            name: "The Place Drive In",
            description: "Test Transaction",
            order_id: order.id,
            image: `${pic13}`,
            handler: function (response) {
                // console.log("Payment successful:", response);

                setpaymnetId(response.razorpay_payment_id)
                toast.success("Payment SuccessFully Completed Thank You");
                OrderFun()
                //   navigate("/paymentsuccess");

            },
            prefill: {
                name: data.userName,
                email: "user@example.com",
                contact: data.userMobile,
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    }


    const handlePayment = async (event) => {
        event.preventDefault();
        // console.log(paymentMethod);
        // alert(paymentMethod)

        if (paymentMethod === 'RazorPay') {
            handleRazorPay();
        }
        if (paymentMethod === 'PhonePe') { handlePhonePePayment() }
        if (paymentMethod === 'Pay At Counter') {
            OrderFun();
        }
    };

    const handlePhonePePayment = async () => {
        // event.preventDefault();
        toast.warn('will Be Implemented Soon')
        // try {
        //     const response = await axios.post("https://backend.proslogics.com:9097/initiate-payment", {
        //         amount: Math.round(totalAmount) * 100, // Amount in rupees
        //     });

        //     if (response.data.success) {
        //         const res = await CategoryService.post("/order/saveOrder", data);
        //         if (res.status == 201) {
        //             console.log("Entered Values:", inputValues);
        //             toast.success("order placed successfully");
        //             setpaymnetId(response.razorpay_payment_id);
        //             toast.success("Payment Successfully Completed! Thank You");
        //             setshowOrderDetails(true);
        //         }

        //         // Redirect to PhonePe App
        //         window.location.href = response.data.deepLink;
        //     } else {
        //         toast.error("Payment initiation failed!");
        //     }
        // } catch (error) {
        //     console.error("Error initiating payment", error);
        //     toast.error("Something went wrong. Please try again.");
        // }
    };

    const handleChange = (event) => {
        // event.preventDefault();
        setpaymentMethod(event.target.value);
        if (paymentMethod != '') {
            setpaymentMethodselected(true)
        }
    }

    const orderReceipt = () => {
        return (
            <div className="container border p-3 rounded ">
                <h4 className="text-center bg-success text-white p-3 rounded">🧾 Order Receipt</h4>
                <hr />
                {/* <p><strong>Counter Name:</strong> {data.orderDetails[0].counterName}</p> */}
                <p><strong>Payment Method : </strong><strong className="fw-bold fs-6 text-primary justify-content-between">
                    {paymentMethod != 'Pay At Counter' ? (
                        'Online'
                    ) : ('Need to Pay')}</strong></p>

                {paymentMethod != 'Pay At Counter' && (
                    <p><strong>Payment Id / Oreder Id : </strong><strong className="fw-bold fs-6 text-primary justify-content-between">{paymentId}</strong></p>
                )}
                <p><strong>Customer Name :</strong> {data.userName.toUpperCase()}</p>
                <p><strong>Mobile :</strong> {data.userMobile}</p>

                <h5>🛒 Items Ordered :</h5>
                <hr />
                {data.orderDetails.map((order, index) => (
                    <>
                        <p><strong>Counter Name :</strong> <span className="text-primary fw-bold fs-6">{order.counterName}</span></p>
                        {/* <hr/> */}

                        <ul className="list-group mb-3">
                            {order.items.map((item, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between">
                                    <span>{item.itemName} ( x {item.quantity})</span>
                                    <span>₹{item.totalPrice}</span>
                                </li>
                            ))}
                        </ul>

                    </>
                ))}
                <hr />
                <h5 className="text-end">Total: ₹{totalAmount}</h5>
                <hr />

                <div className="text-center">
                    {/* <button className="btn btn-success me-2" onClick={() => window.print()}>🖨️ Print Receipt</button> */}
                    <button className="btn btn-success" onClick={handleClose}> Go to Home <Home /></button>
                </div>
            </div>
        )
    }


    return (
        <div >
            {showdashboard ? (<div >
                <UserDashboard />
            </div>) :
                (
                    <>
                        <div style={{backgroundColor:'whitesmoke',minHeight:'100vh'}}>


                            {/* <div className="mt-3">
                                <Typography variant="h5" className="text-center text-primary fw-bold fs-4"  > Payment Page </Typography>
                            </div> */}
                            <div className=" mx-auto bg-white"  style={{width:'100%',maxWidth:'500px',minHeight:'100vh'}}>
                                <UserHeader />
                                <div className="ms-2">
                                    <Typography variant="h5" className="text-darkblue fw-bold fs-4">Choose Payment Method </Typography>
                                </div>
                                <form onSubmit={handlePayment} className=" justify-content-center align-items-center">
                                    <div className="ms-5  justify-content-center align-items-center">
                                        <div className="form-group me-2 justify-content-center align-items-center p-2">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="RazorPay"
                                                onChange={handleChange}
                                                className="me-2"
                                                required
                                            />
                                            <label htmlFor="razorpay"> RazorPay</label>
                                        </div>
                                        <div className="form-group me-2 justify-content-center align-items-center p-2">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="PhonePe"
                                                onChange={handleChange}
                                                required
                                                className="me-2"
                                            />
                                            <label htmlFor="phonepe"> PhonePe</label>
                                        </div>
                                        <div className="form-group me-2 justify-content-center align-items-center p-2">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="Pay At Counter"
                                                onChange={handleChange}
                                                required
                                                className="me-2"
                                            />
                                            <label htmlFor="Pay At Counter"> Pay At Counter</label>
                                        </div>
                                    </div>
                                    {/* <div> <Button sx={{ backgroundColor: "blue", margin: '20px' }} className="text-light" onClick={showItems}> Add More items <span><AddSharpIcon /></span> </Button></div> */}
                                    {/* <Button className="text-white   btn btn-blue mt-2" style={{backgroundColor:'darkblue'}} onClick={showItems} >Add More Items <span><AddSharpIcon /></span></Button> */}
                                    {/* <Button className="btn btn-primary mt-2 bg-success text-white" sx={{ width: '200px', float: 'right' }} type="submit">Make Payment</Button> */}
                                    {/* {paymentMethod && (<>
                                        <div className=" align-items-center justify-content-center text-center" style={{float:'right',height:'80px',borderRadius:'8px',}}>
                                            <motion.div
                                                className=" bg-success"
                                                style={{ height: "", padding: "", position: '' }}
                                                initial={{ opacity: 0, y: 50 }} // Animation starts from bottom
                                                animate={{ opacity: 1, y: 0 }} // Moves up smoothly
                                                exit={{ opacity: 0, y: 50 }} // Fades out when cart is empty
                                                transition={{ duration: 0.5 }}

                                            >
                                                         <button className="btn   text-white" sx={{ width: '200px', float: 'right' }} type="submit">Make Payment</button>
                                               
                                            </motion.div>
                                        </div>
                                    </>)} */}
                                    {paymentMethod && (
                                        <footer
                                            className="bg-success text-center col-xs-6 col-sm-6 col-md-5 col-lg-4 col-xl-4"
                                            style={{
                                                position: "fixed",
                                                bottom: 0,
                                                width: "100%",
                                                maxWidth:'500px',
                                                overflow:'hidden',
                                                padding: "10px",
                                                // borderRadius: "8px",
                                            }}
                                        >
                                            <motion.div
                                                initial={{ opacity: 0, y: 50 }} // Animation starts from bottom
                                                animate={{ opacity: 1, y: 0 }} // Moves up smoothly
                                                exit={{ opacity: 0, y: 50 }} // Fades out when hidden
                                                transition={{ duration: 0.5 }}
                                            >
                                                <Button
                                                    className="btn text-white"
                                                    sx={{ width: "200px" }}
                                                    type="submit"
                                                >
                                                    Make Payment
                                                </Button>
                                            </motion.div>
                                        </footer>
                                    )}

                                </form>

                            </div>
                            <div>
                                <Modal
                                    show={showOrderDetails}
                                    onHide={() => setshowOrderDetails(!showOrderDetails)}
                                    backdrop="static"
                                    keyboard={false}
                                    centered // This will center the modal
                                >
                                    {/* <Modal.Header closeButton>
                        <Modal.Title className="w-100 text-center">Review Your Order Detaisl</Modal.Title>
                    </Modal.Header> */}

                                    <Modal.Body>
                                        {orderReceipt()}
                                    </Modal.Body>
                                </Modal>
                            </div>
                        </div>
                    </>
                )}


        </div>
    )
}
export default Payment;