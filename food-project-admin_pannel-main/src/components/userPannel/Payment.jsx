import { Button, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useState } from "react";
import { FormControl, FormLabel, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserDashboard from "./UserDashboard";
import AddSharpIcon from '@mui/icons-material/AddSharp';

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
    console.log(data);

    // const amount = data.orderDetails[0]?.totalPrice;
    // console.log(amount, data.orderDetails[0]?.totalPrice)



    const handleSubmitt = (event) => {
        event.preventDefault();
        const var4 = 'https://api.razorpay.com/v1/payments/qr_codes/qr_FuZIYx6rMbP6gs';
        const options = {
            key: 'rzp_test_Su4WV4zdBIGTmZ',
            entity: var4,
            amount: Math.round(totalAmount) * 100,
            name: 'Ramana Soft Insurance Company',
            description: 'IS A INSURANCE COMPANY',
            image: '',
            handler: function (response) {
                // alert(response.razorpay_payment_id);

                setpaymnetId(response.razorpay_payment_id)
                toast.success("Payment SuccessFully Completed Thank You");
                //   navigate("/paymentsuccess");
                setshowOrderDetails(true)

            },

            prefill: {
                name: data.userName,
                //   email: email,
                contact: data.userMobile,
            },

            theme: {
                color: '#F37254',
            },
        }
        var pay = new window.Razorpay(options);
        pay.open();
    }



    const handleChange = (event) => {
        event.preventDefault();
        setpaymentMethod(event.target.value);
        if (paymentMethod != '') {
            setpaymentMethodselected(true)
        }
    }

    const orderReceipt = () => {
        return (
            <div className="container border p-3 rounded ">
                <h4 className="text-center bg-success text-primary p-3 rounded">🧾 Order Receipt</h4>
                <hr />
                {/* <p><strong>Counter Name:</strong> {data.orderDetails[0].counterName}</p> */}

                <p><strong>Payment Id / Oreder Id : </strong><strong className="fw-bold fs-6 text-primary justify-content-between">{paymentId}</strong></p>
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
                    <button className="btn btn-success me-2" onClick={() => window.print()}>🖨️ Print Receipt</button>
                    <button className="btn btn-danger" onClick={handleClose}>Add More Items</button>
                </div>
            </div>
        )
    }


    return (
        <div className="">
            {showdashboard ? (<>
                <UserDashboard />
            </>) :
                (
                    <>
                        <>
                            <div className="mt-3">
                                <Typography variant="h5" className="text-center text-primary fw-bold fs-4"  > PayMent Page </Typography>
                            </div>
                            <div className="card ms-5 me-5 mt-2 bordered border 2px solid black boxshadow " >
                                <div className="m-3">
                                    <Typography variant="h5" className="text-darkblue fw-bold fs-4">Choose Payment Method Below </Typography>
                                </div>
                                <form onSubmit={handleSubmitt} className="card-body justify-content-center align-items-center">
                                    <div className=" justify-content-center align-items-center">
                                        <div className="form-group me-2 justify-content-center align-items-center">
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
                                        <div className="form-group me-2 justify-content-center align-items-center">
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
                                    </div>
                                    {/* <div> <Button sx={{ backgroundColor: "blue", margin: '20px' }} className="text-light" onClick={showItems}> Add More items <span><AddSharpIcon /></span> </Button></div> */}
                                    {/* <Button className="text-white   btn btn-blue mt-2" style={{backgroundColor:'darkblue'}} onClick={showItems} >Add More Items <span><AddSharpIcon /></span></Button> */}
                                    <Button className="btn btn-primary mt-2 bg-success text-white" type="submit">Make Payment</Button>
                                   
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
                        </>
                    </>
                )}
        </div>
    )
}
export default Payment;