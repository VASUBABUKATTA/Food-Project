/*eslint-disable no-unused-vars */
/*eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import dayjs from 'dayjs';
import InputAdornment from '@mui/material/InputAdornment';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Service from '../Api_Services/CategoryService';
import socket from '../Api_Services/socket';
// import Service from '../Api_Services/CategoryService';
import { Button, Modal } from 'react-bootstrap';
import { ArrowBackIosTwoTone, History, HistoryEdu, Inventory, Payments, RestaurantMenu, Shop, ShoppingBag } from '@mui/icons-material';
import { toast } from 'react-toastify';
import CounterRegistrationApis from '../Api_Services/CounterRegistrationApis';
import DataTable from 'react-data-table-component';

// import InventoryIcon from "@mui/icons-material/Inventory";



const crads = [
    { name: "ORDER RECEIVED", imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/006/800/354/small_2x/acknowledgment-received-abstract-concept-illustration-acknowledgment-receipt-letter-payment-received-confirmation-message-order-status-correct-delivery-notification-abstract-metaphor-vector.jpg', icon: <HistoryEdu /> },
    { name: "ORDER HISTORY", imageUrl: 'https://cdn.vectorstock.com/i/preview-1x/66/88/history-textbook-on-school-chalkboard-background-vector-47556688.jpg', icon: <History /> },
    { name: "FINANCIAL REPORT", imageUrl: 'https://macquariegreekstudiesfoundation.org.au/wp-content/uploads/2023/02/financial-statements-importance.jpg', icon: <Payments /> }
]







function Dashboard() {

    const API_BASE_URL = import.meta.env.VITE_BASE_URL;

    const [counterDetails, setCounterId] = useState('');

    const [socketId, setSocketId] = useState()
    //  console.log(sessionStorage.getItem('mobieNo'));
    const mobdata = sessionStorage.getItem('mobieNo');

    // async function fetchCounterId() {
    //     try {
    //         const response = await CounterRegistrationApis.counterIdByMobNo(mobdata);
    //         // console.log(response)
    //         if (response.status === 200) {
    //             setCounterId(response.data.message);
    //         }
    //     } catch (error) {
    //         // console.error("Error fetching counter ID:", error);
    //         toast.warn("Error fetching counter ID:", error);
    //     }
    // }


    const [rows, setRows] = useState([]);

    const [orderHistory, setOrderHistory] = useState([]);


    // const getOrders = async () => {

    //     // console.log(counterDetails);
    //     // (counterDetails)
    //     try {
    //         const res = await Service.get(`/order/getOrdersByCounterId/${counterDetails.ID}`);
    //         if (res.status == 200) {
    //             console.log(res);
    //             console.log(res.data);
    //             setRows(res.data);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const getOrderHistory = async () => {

    //     try {
    //         const res = await Service.get(`/order/getOrderHistoryByCounterId/${counterDetails.ID}`)
    //         if (res.status == 200) {
    //             console.log(res.data);

    //             setOrderHistory(res.data);
    //         }
    //     } catch (error) {
    //         console.log(error);

    //     }
    // }

    const [dayWiseReport, setDayWiseReport] = useState([])





    // Fetch Counter ID
    const fetchCounterId = async () => {
        try {
            const response = await CounterRegistrationApis.counterIdByMobNo(mobdata);
            console.log(response);

            if (response.status == 200) {
                setCounterId(response.data.message.ID);
                console.log(response.data.message.ID);

            }
        } catch (error) {
            toast.warn("Error fetching counter ID:", error);
        }
    };

    useEffect(() => {
        if (mobdata) fetchCounterId();
    }, []);

    // Fetch Orders
    const getOrders = async () => {
        console.log(counterDetails);

        if (!counterDetails) return; // Prevent fetching with undefined ID
        try {
            const res = await Service.get(`/order/getOrdersByCounterId/${counterDetails}`);
            console.log(res)
            if (res.status == 200) {

                setRows(res.data);
                getOrderHistory();
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    // Fetch Order History
    const getOrderHistory = async () => {

        if (!counterDetails) return; // Prevent fetching with undefined ID
        try {
            const res = await Service.get(`/order/getOrderHistoryByCounterId/${counterDetails}`);
            if (res.status === 200) {
                setOrderHistory(res.data);
                getDayWiseReport();

            }
        } catch (error) {
            console.error("Error fetching order history:", error);
        }
    };





    const getDayWiseReport = async () => {
        try {
            const res = await Service.get(`/order/getCounterWiseTotalPerDay/${counterDetails}`)
            if (res.status == 200) {
                console.log(res.data);
                setDayWiseReport(res.data);

            }
        } catch (error) {
            console.log(error);

        }
    }

    const handleDownload = async () => {
        try {
            const counterId = counterDetails;

            const response = await fetch(`${API_BASE_URL}/order/download-history/${counterId}`, {
                method: "GET",
            });

            console.log("Response Headers:", response.headers);
            if (!response.ok) throw new Error("Failed to download file");

            const blob = await response.blob();
            const contentType = response.headers.get("content-type");
            console.log("File Content Type:", contentType);

            if (!contentType.includes("spreadsheet")) {
                throw new Error("Downloaded file is not an Excel sheet.");
            }

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `OrderHistory_Counter_${counterId}.xlsx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };


    // const handleDownload = async () => {
    //     try {

    //       const counterId = counterDetails.ID;

    //       const response = await fetch(`http://183.82.106.55:9095/order/download-history/${counterId}`, {
    //         method: "GET",
    //       });

    //       console.log(response);


    //       if (!response.ok) throw new Error("Failed to download file");

    //       // Create a Blob from the response
    //       const blob = await response.blob();
    //       const url = window.URL.createObjectURL(blob);

    //       // Create a link element and trigger download
    //       const a = document.createElement("a");
    //       a.href = url;
    //       a.download = `OrderHistory_Counter_${counterId}.xlsx`; // Set file name
    //       document.body.appendChild(a);
    //       a.click();
    //       document.body.removeChild(a);
    //     } catch (error) {
    //       console.error("Error downloading file:", error);
    //     }
    //   };




    const handleNewOrder = (newOrder) => {
        console.log("New order received:", newOrder);

        // // Filter orderDetails and status for the specific counterId
        // const filteredOrderDetails = newOrder.orderDetails.filter(item => item.counterId === counterDetails);
        // const filteredStatus = newOrder.status.filter(item => item.counterId === counterDetails);

        // // If there are matching entries, update state
        // if (filteredOrderDetails.length > 0) {
        //     const filteredOrder = {
        //         id: newOrder.id,
        //         userName: newOrder.userName,
        //         userMobile: newOrder.userMobile,
        //         orderDetails: filteredOrderDetails,
        //         status: filteredStatus,
        //         orderedAt:newOrder.orderedAt
        //     };

        //     setRows(prevOrders => [filteredOrder, ...prevOrders]);
        // }

        getOrders();


    };


    const handleOrderStatusUpdate = (updatedOrder) => {
        // console.log("Order status update received:", updatedOrder);

        // setRows(prevOrders =>
        //     prevOrders.map(order =>
        //         order.id === updatedOrder.id
        //             ? {
        //                 ...order,
        //                 status: order.status.map(item =>
        //                     item.counterId === counterDetails
        //                         ? updatedOrder.status.find(updated => updated.counterId === counterDetails) || item
        //                         : item
        //                 )
        //             }
        //             : order
        //     )
        // );

        getOrders();
        getOrderHistory();
    };


    // const handleOrderStatusUpdate = (updatedOrder) => {
    //     console.log(updatedOrder, updatedOrder.id);

    //     // Loop through the updated orders
    //     updatedOrder.status.map((order) => {
    //         // Check if the order should be removed
    //         if (order.counterId == counterDetails && order.orderStatus == 'Delivered') {
    //             // Remove the order from the rows
    //             console.log(rows)
    //             let updatedRows = rows.filter((order) => order.id != updatedOrder.id)
    //             console.log(updatedRows);

    //             setRows(updatedRows);

    //         }
    //     });
    // }



    useEffect(() => {


    }, [])

    useEffect(() => {

        if (counterDetails)
            getOrders();

        // ✅ Listen for new order events
        socket.on("newOrder", handleNewOrder);


        socket.on("orderStatusUpdated", handleOrderStatusUpdate);


        // Cleanup: Remove event listener when component unmounts
        return () => {
            socket.off("newOrder", handleNewOrder);
            socket.off("orderStatusUpdated", handleOrderStatusUpdate);
        };


    }, [counterDetails]);

    const [showOrderReceived, setShowOrderReceived] = useState(false);
    const [selectionType, setSelectionType] = useState('')

    const handleClick = (item) => {
        if (item === "ORDER RECEIVED") {
            setShowOrderReceived(!showOrderReceived);
            setSelectionType('ORDER RECEIVED');
        }
        if (item === "ORDER HISTORY") {
            setShowOrderReceived(!showOrderReceived);
            setSelectionType('ORDER HISTORY');
        }

        if (item === 'FINANCIAL REPORT') {
            setSelectionType('FINANCIAL REPORT');
        }

    }

    const goBack = () => {
        setShowOrderReceived(false);
    }

    const [dayReport, setdayReport] = useState(false)

    const goBack1 = () => {
        setSelectionType('');
    }

    if (selectionType == 'FINANCIAL REPORT') {
        return (<DayWiseReport dayWiseReport={dayWiseReport} goBack1={goBack1} />)
    }



    const OrderReceived = ({ selectionType, rows, orderHistory, goBack }) => {

        console.log(rows);


        const [dateRange, setDateRange] = useState('');

        // Filter orders based on Delivered Date
        const filteredOrders = orderHistory.filter(order => {
            if (!dateRange) return true; // No filter if no date is selected

            const deliveredDate = dayjs(order.delivered_at).format("YYYY-MM-DD"); // Format to match input type="date"
            console.log(deliveredDate);

            return deliveredDate === dateRange; // Compare exact date match
        });

        const date = new Date();

        const newDate = date.toLocaleDateString('default', { year: 'numeric', month: 'long' });

        console.log(newDate);

        const downloadExcel = () => {
            const date = new Date();
            if (date.getDate == 1) {
                console.log("first of month");

            }
        }

        useEffect(() => {
            downloadExcel();
        }, [])




        return (
            <>
                <>
                    <div className='col-12 col-xs-12 col-sm-12 col-md-8 col-lg-9 col-xl-9'>
                        <div className='text-start mt-2 text-primary fs-4 fw-bold'>
                            <ArrowBackIosTwoTone
                                onClick={goBack}
                                style={{ fontSize: 30, color: "dark", cursor: "pointer", fontWeight: "bold", }}
                            />
                            {selectionType}</div>
                    </div>
                </>
                {rows.length > 0 || orderHistory.length > 0 ? (
                    <div>
                        {/* Sticky Typography Section */}
                        <div style={{
                            position: "sticky",
                            top: 0,
                            backgroundColor: "white",
                            zIndex: 1100,  // Higher than TableHead
                            padding: ""
                        }}>
                            <Typography variant="h5" className=' mb-2'>

                                <div className='p-3'>
                                    {selectionType === 'ORDER HISTORY' && (
                                        <div className='w-100 h-100 row  align-items-center'>
                                            <div className="justify-content-start col-xs-12 col-sm-8 col-md-9 col-xl-10 col-lg-10 " >

                                                <input
                                                    type="date"
                                                    value={dateRange}
                                                    className='px-4 py-2 border-2 rounded-pill'
                                                    onChange={(e) => { setDateRange(e.target.value), console.log(e.target.value) }}
                                                />

                                            </div>
                                            {/* <div className='col-xs-0 col-sm-0 col-md-0 col-xl-4 col-lg-4 '></div> */}
                                            <div className=" col-xs-12 col-sm-4  col-md-3 col-lg-2 col-xl-2  " style={{ float: 'right' }}>
                                                <button className="btn btn-outline-primary w-100 p-2" onClick={handleDownload}>
                                                    Download
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Typography>
                        </div>

                        {/* Table Section */}
                        <div className='border border-5 rounded'>
                            <TableContainer component={Paper}>
                                <Table aria-label="collapsible table">
                                    <TableHead >
                                        <TableRow>
                                            <TableCell />
                                            {selectionType === 'ORDER HISTORY' && <TableCell align="center" sx={{ color: "black", fontWeight: "bold" }}>SI.NO</TableCell>}
                                            <TableCell align="center" sx={{ color: "black", fontWeight: "bold" }}>ORDER ID</TableCell>
                                            <TableCell align="center" sx={{ color: "black", fontWeight: "bold" }}>MOBILE NUMBER</TableCell>
                                            <TableCell align="center" sx={{ color: "black", fontWeight: "bold" }}>{selectionType === 'ORDER HISTORY' ? 'ORDERED DATE & TIME' : 'DATE & TIME'}</TableCell>
                                            {selectionType === 'ORDER HISTORY' && <TableCell align="center" sx={{ color: "black", fontWeight: "bold" }}>DELIVERED DATE & TIME</TableCell>}
                                            <TableCell align="center" sx={{ color: "black", fontWeight: "bold" }}>STATUS</TableCell>
                                            <TableCell />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {selectionType === 'ORDER HISTORY' ?
                                            filteredOrders.map((order, index) => (
                                                <Row key={order.id} selectionType={selectionType} orderHistory={order} index={index + 1} />
                                            )) :
                                            rows.map((row) => (
                                                <Row key={row.id} row={row} selectionType={selectionType} />
                                            ))
                                        }


                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                ) : <h3>No Orderes yet</h3>}


            </>
        )
    }



    function Row(props) {

        console.log(props);

        const { row, selectionType, orderHistory } = props;
        console.log(orderHistory);
        console.log(row);



        const [open, setOpen] = useState(false);
        const [status, setStatus] = useState(selectionType === "ORDER RECEIVED" ? row.status[0].orderStatus || 'received' : ''); // Default status



        const handleStatusChange = async (event, orderId, counterId) => {
            const newStatus = event.target.value; // Capture the new status

            try {
                setStatus(newStatus); // Update the state

                const data = {
                    orderId,
                    counterIdToUpdate: counterId,
                    statusToUpdate: newStatus // Use the updated status
                };

                console.log("Sending Data:", data);

                const res = await Service.put("/order/updateOrderStatus", data);
                console.log("Response:", res);
                // getOrderHistory();
                // getOrders()
            } catch (error) {
                console.error("Error updating status:", error);
            }
        };


        const getStatusColor = (status) => {
            switch (status) {
                case "Received":
                    return "green";
                case "InProgress":
                    return "orange";
                case "Ready":
                    return "blue";
                case "Delivered":
                    return "purple";
                default:
                    return "transparent"; // Default color if status is not matched
            }
        };

        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon sx={{ color: 'black' }} /> : <KeyboardArrowDownIcon sx={{ color: 'black' }} />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                        {selectionType === "ORDER RECEIVED" ? row.id : orderHistory.id}
                    </TableCell>
                    {selectionType === "ORDER RECEIVED" ? "" : <TableCell align="center">{orderHistory.orderId}</TableCell>}
                    {/* <TableCell align="center">{ selectionType === "ORDER RECEIVED" ? orderHistory.OrderId : ""}</TableCell> */}
                    <TableCell align="center">{selectionType === "ORDER RECEIVED" ? row.userMobile : orderHistory.userMobile}</TableCell>
                    <TableCell align="center">{selectionType === "ORDER RECEIVED" ? row.orderedAt : orderHistory.orderedAt}</TableCell>
                    {selectionType === "ORDER RECEIVED" ? '' : <TableCell align="center">{orderHistory.delivered_at}</TableCell>}


                    <TableCell align="center" sx={{ color: 'gray' }} >
                        {selectionType === "ORDER RECEIVED" ? <Select
                            value={status}
                            onChange={(event) => handleStatusChange(event, row.id, counterDetails, status)}
                            size="small"
                            sx={{ width: 130, backgroundColor: getStatusColor(status), color: 'white' }}

                        >

                            <MenuItem value="Received" sx={{ color: 'green' }}>Received</MenuItem>
                            <MenuItem value="InProgress" sx={{ color: 'orange' }}>In Progress</MenuItem>
                            <MenuItem value="Ready" sx={{ color: 'blue' }}>Ready</MenuItem>
                            <MenuItem value="Delivered" sx={{ color: 'purple' }}>Delivered</MenuItem>


                        </Select> : "Delivered"}
                    </TableCell>
                    {/* <TableCell align="right">{row.protein}</TableCell> */}
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, color: 'black', paddingTop: 0 }} colSpan={7}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Order Details
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><span className='fw-bold'>Item Name</span></TableCell>
                                            <TableCell><span className='fw-bold'>Quantity</span></TableCell>
                                            <TableCell align="right"><span className='fw-bold'>Amount</span></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {selectionType === "ORDER RECEIVED" ?
                                            row.orderDetails.map((item) => (
                                                item.items.map((item) => (
                                                    < TableRow key={item.itemName} >
                                                        <TableCell component="th" scope="row">
                                                            {item.itemName}
                                                        </TableCell>
                                                        <TableCell>{item.quantity}</TableCell>
                                                        <TableCell align="right">{item.price * item.quantity}</TableCell>
                                                    </TableRow>
                                                ))
                                            ))
                                            :
                                            orderHistory.orderDetails.map((item) => (
                                                item.items.map((item) => (
                                                    < TableRow key={item.itemName} >
                                                        <TableCell component="th" scope="row">
                                                            {item.itemName}
                                                        </TableCell>
                                                        <TableCell>{item.quantity}</TableCell>
                                                        <TableCell align="right">{item.price * item.quantity}</TableCell>
                                                    </TableRow>
                                                ))


                                            ))}
                                        <TableRow>
                                            <TableCell colSpan={2} align="right"><strong>Total:</strong></TableCell>
                                            <TableCell align="right">
                                                <strong>
                                                    {selectionType === "ORDER RECEIVED"
                                                        ? row.orderDetails.reduce((total, items) =>
                                                            total + items.items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0), 0).toFixed(2)
                                                        : orderHistory.orderDetails.reduce((total, items) =>
                                                            total + items.items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0), 0).toFixed(2)}
                                                </strong>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment >
        );
    }


    function DayWiseReport({ dayWiseReport, goBack1 }) {


        const columns = [
            { name: "ID", selector: (row, index) => index + 1, sortable: true, width: '70px' },
            { name: "Date", selector: (row) => row.date.replace(/\d{2}:\d{2}:\d{2} GMT[^\)]+\)/, "").trim(), sortable: true, width: '400px' },
            { name: "No Of Orders", selector: (row) => Number(row.numOrders), sortable: true },
            { name: "Total Price (₹)", selector: (row) => Number(row.totalPrice), sortable: true },
            { name: "Admin Share (₹)", selector: (row) => Number(row.adminShare), sortable: true },
            { name: "Counter Share (₹)", selector: (row) => Number(row.counterShare), sortable: true },


        ];

        const customStyles = {
            headRow: {
                style: {
                    backgroundColor: 'darkblue',
                    fontSize: '14px',
                    fontWeight: 'bold',
                },
            },
            headCells: {
                style: {
                    color: 'white',
                    fontWeight: 'bold',
                },
            },
            rows: {
                style: {
                    fontSize: '13px',
                },
            },
            pagination: {
                style: {
                    backgroundColor: 'aliceblue',
                    color: 'black',
                    fontSize: '13px',
                    fontWeight: 'bold',
                },
            },
        };

        return (
            <>
                <>
                    <div className='col-12 col-xs-12 col-sm-12 col-md-8 col-lg-9 col-xl-9'>
                        <h3 className='text-start mt-2 text-primary'>
                            <ArrowBackIosTwoTone
                                onClick={goBack1}
                                style={{ fontSize: 30, color: "dark", cursor: "pointer", fontWeight: "bold", }}
                            />
                            Go Back </h3>
                    </div>
                </>
                <div className="text-center mb-4 row align-items-center justify-content-center">
                    <div className="">
                        <h4 className="fw-bold fs-4 text-primary">DAY WISE FINANCIAL REPORT</h4>
                    </div>
                    {/* <div className="col-12 col-md-4 col-lg-2 text-md-end text-lg-end text-xl-end mt-2 mt-md-0">
                        <button className="btn btn-outline-primary w-100" onClick={handleDownload}>
                            Download
                        </button>
                    </div> */}
                </div>

                <div>
                    {/* <table className='table table-bordered text-center  '>
                        <thead className='table-dark'>
                            <tr>
                                <th>SI.NO</th>
                                <th>Date</th>
                                <th>No of Orders</th>
                                <th>Total Price (₹)</th>
                                <th>Admin Share (₹)</th>
                                <th>Counter Share (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dayWiseReport.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.date}</td>
                                    <td>{item.numOrders}</td>
                                    <td>{item.totalPrice}</td>
                                    <td>{item.adminShare}</td>
                                    <td>{item.counterShare}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table> */}
                    <DataTable
                        columns={columns}
                        data={dayWiseReport}
                        defaultSortField="date"
                        pagination
                        highlightOnHover
                        striped
                        responsive
                        customStyles={customStyles}
                    />

                </div>
            </>
        );
    }



    if (showOrderReceived)
        return <OrderReceived selectionType={selectionType} rows={rows} orderHistory={orderHistory} goBack={goBack} />




    return (
        <>
            <div className='container mt-1'>
                <div className='row row-gap-5'>

                    {crads.map((item, index) =>
                    (<div className='col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4' key={index}>
                        <div className='container'>
                            <div className='  justify-content-between align-items-center'>
                                <div className='' style={{ cursor: 'pointer' }} onClick={() => handleClick(item.name)}>
                                    <div className="card card_data" style={{
                                        // backgroundColor: 'aliceblue',
                                        border: 0,
                                        // borderRadius: '10px',
                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                        transition: 'all ease-in-out 0.5s',
                                      
                                    }}>
                                        <div className="card-body">
                                            <img src={item.imageUrl} alt="Counter Images" style={{ height: "200px", width: "100%", objectFit: "cover" }} />
                                        </div>
                                        <div className="card-footer text-center" style={{
                                            backgroundColor: "darkblue",
                                            color: "white",
                                            borderTopLeftRadius: "0px",
                                            borderTopRightRadius: "0px",
                                        }}>
                                            <h4>
                                                {item.name}{""}
                                                {item.icon && <span className="text-white">{item.icon}</span>}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>))}

                </div>

            </div>
        </>

    )
}

export default Dashboard