import React, { useEffect, useState } from 'react'
import {
    IconButton, Menu,
    MenuItem,
    Button,
    TextField, Container, Typography, Box
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom';

import CounterRegistrationApis from '../Api_Services/CounterRegistrationApis';

import { Accessibility, AccountCircle, ArrowBackIosTwoTone, CalendarMonth, CurrencyRupee, Email, LocalMall, Phone, Storefront, Tapas } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';


function Dashboard() {
    const API_BASE_URL = import.meta.env.VITE_BASE_URL;

    const [tab, setTab] = useState("cards");
    const [showUpdateCounter, setShowUpdateCounter] = useState(false);
    const navigate = useNavigate();
    const [counter, setCounter] = useState(false);
    const [show, setShow] = useState(false);
    const [counters, setCounters] = useState([]);  // Corrected state name

    const [showProfile, setShowProfile] = useState(false);
    const [counterDetails, setCounterDetails] = useState('')

    const handleShow = () => setShow(true);


    const handleShow1 = () => setShowUpdateCounter(true);

    const fetchData = async () => {
        try {
            const response = await CounterRegistrationApis.fetchAllRegisteredCounterDetails();
            if (response.status === 200) {
                // console.log("Collected data:", response.data);
                setCounters(response.data);  // Corrected state update
            }
        } catch (error) {
            console.error("API call failed:", error);
            // alert("API was not called");
            // toast.warn("API was not called!", {
            //     position: "top-right",
            //     autoClose: 5000, // Closes after 3 seconds
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light",
            //   });
        }
    };

    useEffect(() => {
        fetchData();
    },[]);

    const [id, setId] = useState('')

    const handleCardClick = (counter) => {
        // console.log("handleCardClick");
        // console.log(counter);
        setTab('');
        setShowProfile(true)
        setCounterDetails(counter);
    }

    const handleBack = () => {
        setTab("cards");
        setShowProfile(false);
        setCounterDetails('');
    };

    const [formData, setFormData] = useState({
        ownerName: "",
        mobileNo: "",
        email: "",
        counterName: "",
        imagePath: null,
    });

    const [formData1, setFormData1] = useState({
        ownerName: "",
        mobileNo: "",
        email: "",
        counterName: "",
        imagePath: null,
    });

    const [formDataError, setFormDataError] = useState({
        ownerName: "",
        mobileNo: "",
        email: "",
        counterName: "",
        imagePath: null,
    });

    const [formDataError1, setFormDataError1] = useState({
        ownerName: "",
        mobileNo: "",
        email: "",
        counterName: "",
        imagePath: null,
    });
    const handleClose1 = () => {
        setShowUpdateCounter(false);
        setFormData1({
            ownerName: "",
            mobileNo: "",
            email: "",
            counterName: "",
            imagePath: null,
        });
        setFormDataError1({
            ownerName: "",
            mobileNo: "",
            email: "",
            counterName: "",
            imagePath: null,
        })
    }
    const handleClose = () => {
        setShow(false);
        setFormData({
            ownerName: "",
            mobileNo: "",
            email: "",
            counterName: "",
            imagePath: null,
        });
        setFormDataError({
            ownerName: "",
            mobileNo: "",
            email: "",
            counterName: "",
            imagePath: null,
        })
    }
    const editCounter = (counter) => {
        setShowUpdateCounter(true);

        // console.log(counter);
        formData1.counterName = counter.COUNTERNAME

        formData1.email = counter.EMAIL

        formData1.mobileNo = counter.MOBILENO

        formData1.ownerName = counter.OWNERNAME
        formData1.imagePath = ""
        setId(counter.ID);

    }

    const deleteCounter = async (counter) => {

        const deleteId = counter.ID;
        confirmAlert({
            title: "Confirm Update",
            message:"Are you sure you want to delete this counter?",
            
            buttons:[
                {
                    label:"Ok",
                    onClick:async ()=>{
                        try {
                            const response = await CounterRegistrationApis.registerCounterDelete(deleteId);
                            // console.log("delete APi response :", response)
                            // alert("Record deleted Successfully")
                            toast.success("Record deleted Successfully..!", {
                                position: "top-right",
                                autoClose: 5000, // Closes after 3 seconds
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                              });
                            fetchData();
                        } catch (error) {
                            // console.log(error.response.data.message);
                        }
                    }
                    
                    
                },
                {
                    label:"Cancel",
                    onClick:()=>{}
                }
            ]
        })

       
        // const isConfirmed = window.confirm("Are you sure you want to delete this counter?");
        // if (isConfirmed) {
        //     try {
        //         const response = await CounterRegistrationApis.registerCounterDelete(deleteId);
        //         // console.log("delete APi response :", response)
        //         // alert("Record deleted Successfully")
        //         toast.success("Record deleted Successfully..!", {
        //             position: "top-right",
        //             autoClose: 5000, // Closes after 3 seconds
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "light",
        //           });
        //         fetchData();
        //     } catch (error) {
        //         // console.log(error.response.data.message);
        //     }
        // }
    }

   



    const handleMenuItemClick = (tab) => {
        setTab(tab);
        if (tab === 'counterProfile') {
            navigate('/counterProfile');
        }
        if (tab === 'counterEdit') {
            setCounter(true);
        }
    };


    //   const regexUsername = new RegExp(/^[A-Za-z][A-Za-z. ]{1,50}[A-Za-z. ]$/);
    const regexUsername = new RegExp(/^[a-zA-Z]{3,60}(?:\s[a-zA-Z]{1,60})*$/);

    const regexEmail = new RegExp(/^(?!.*?\.\.)(?!.*?\.(_|_\.|\._))([a-zA-Z0-9]+[a-zA-Z]*)(?:[._][a-zA-Z0-9]+)?(?:[._]?[a-zA-Z0-9]+)?@[a-zA-Z.]+(?:_[a-zA-Z0-9]+)?\.[a-zA-Z]{2,3}$/);
    const regexMobileNo = new RegExp(/^[6-9][0-9]{9}$/);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name == 'ownerName') {
            if (!regexUsername.test(value)) {
                setFormDataError({ ...formDataError, [name]: 'Owner Name must be 3 or more character ex: xxx' });
            }
            else {
                setFormDataError({ ...formDataError, [name]: "" });
            }
        }
        if (name == 'counterName') {
            if (!regexUsername.test(value)) {
                setFormDataError({ ...formDataError, [name]: 'Counter Name must be 3 or more character ex: xxx' });
            }
            else {
                setFormDataError({ ...formDataError, [name]: "" });
            }
        }
        if (name == 'mobileNo') {
            if (!regexMobileNo.test(value)) {
                setFormDataError({ ...formDataError, [name]: 'Phone No must start with 6,7,8,9 series with  10 digits' });
            }
            else {
                setFormDataError({ ...formDataError, [name]: "" });
            }
        }
        if (name == 'email') {
            if (!regexEmail.test(value)) {
                setFormDataError({ ...formDataError, [name]: 'Please enter valid email ex: example@gmail.com' });
            }
            else {
                setFormDataError({ ...formDataError, [name]: "" });
            }
        }
    };

    const handleChange1 = (e) => {
        const { name, value } = e.target;
        setFormData1((prev) => ({ ...prev, [name]: value }));

        if (name == 'ownerName') {
            if (!regexUsername.test(value)) {
                setFormDataError1({ ...formDataError1, [name]: 'Owner Name must be 3 or more character ex: xxx' });
            }
            else {
                setFormDataError1({ ...formDataError1, [name]: "" });
            }
        }
        if (name == 'counterName') {
            if (!regexUsername.test(value)) {
                setFormDataError1({ ...formDataError1, [name]: 'Counter Name must be 3 or more character ex: xxx' });
            }
            else {
                setFormDataError1({ ...formDataError1, [name]: "" });
            }
        }
        if (name == 'mobileNo') {
            if (!regexMobileNo.test(value)) {
                setFormDataError1({ ...formDataError1, [name]: 'Phone No must start with 6,7,8,9 series with  10 digits' });
            }
            else {
                setFormDataError1({ ...formDataError1, [name]: "" });
            }
        }
        if (name == 'email') {
            if (!regexEmail.test(value)) {
                setFormDataError1({ ...formDataError1, [name]: 'Please enter valid email ex: example@gmail.com' });
            }
            else {
                setFormDataError1({ ...formDataError1, [name]: "" });
            }
        }
    };

    const handleImageChange = (e) => {
        const { name, value } = e.target;
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, imagePath: file }));
        if (!file) {
            setFormDataError({ ...formDataError, [name]: 'Please Select a File' });
        }
        else {
            setFormDataError({ ...formDataError, [name]: "" });
        }
    };
    const handleImageChange1 = (e) => {
        const { name, value } = e.target;
        const file = e.target.files[0];
        setFormData1((prev) => ({ ...prev, imagePath: file }));
        if (!file) {
            setFormDataError1({ ...formDataError1, [name]: 'Please Select a File' });
        }
        else {
            setFormDataError1({ ...formDataError1, [name]: "" });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Form Data:", formData);
        // console.log("Form Data Errors:", formDataError);

        if (!formData.imagePath) {
            setFormDataError((prev) => ({ ...prev, imagePath: 'File not selected' }));
            // return;
        }

        else if (
            regexUsername.test(formData.ownerName) &&
            regexUsername.test(formData.counterName) &&
            regexMobileNo.test(formData.mobileNo) &&
            regexEmail.test(formData.email)
        ) {
            let formDataToSend = new FormData();
            formDataToSend.append('OWNERNAME', formData.ownerName);
            formDataToSend.append('MOBILENO', formData.mobileNo);
            formDataToSend.append('EMAIL', formData.email);
            formDataToSend.append('COUNTERNAME', formData.counterName);
            formDataToSend.append('IMAGE', formData.imagePath);

            try {
                const response = await CounterRegistrationApis.registerCounter(formDataToSend);
                // console.log("Response:", response);

                if (response.status === 201) {
                    // alert(response.data.message);
                    toast.success("Counter Added Successfully!", {
                        position: "top-right",
                        autoClose: 5000, // Closes after 3 seconds
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
                    setFormData({
                        ownerName: "",
                        mobileNo: "",
                        email: "",
                        counterName: "",
                        imagePath: null,
                    });

                    document.getElementById("add_counter").reset();
                    setShow(false);
                    fetchData();
                }
            } catch (error) {
                // console.error("Error:", error);
                if (error.response?.status === 400) {
                    // alert(error.response.data.message);
                    toast.warn(error.response.data.message, {
                        position: "top-right",
                        autoClose: 5000, // Closes after 3 seconds
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
                }
            }
        } else {
            alert('Validation failed');
        }
    };
    const handleSubmit1 = async (e) => {
        e.preventDefault();
        // console.log("Form Data:", formData1);
        // console.log("Form Data Errors:", formDataError1);

        if (!formData1.imagePath) {
            // setFormDataError1((prev) => ({ ...prev, imagePath: 'File not selected' }));
            // return;
        }
        else {
            try {
                let formDataToSend2 = new FormData();
                formDataToSend2.append('image', formData1.imagePath);
                const response = await CounterRegistrationApis.registerCounterUpdateForImage(id, formDataToSend2)

                // console.log(response);
                setFormData1({
                    imagePath: null,
                });
                if (response.status == 201) {
                    alert(response.data.message)
                }
            } catch (error) {
                alert(error.response.data.message);
            }
        }

        if (
            regexUsername.test(formData1.ownerName) &&
            regexUsername.test(formData1.counterName) &&
            regexMobileNo.test(formData1.mobileNo) &&
            regexEmail.test(formData1.email)
        ) {
            let formDataToSend1 = new FormData();
            formDataToSend1.append('OWNERNAME', formData1.ownerName);
            formDataToSend1.append('MOBILENO', formData1.mobileNo);
            formDataToSend1.append('EMAIL', formData1.email);
            formDataToSend1.append('COUNTERNAME', formData1.counterName);
            // formDataToSend1.append('IMAGE', formData1.imagePath);

            const data1 = {
                OWNERNAME: formData1.ownerName,
                MOBILENO: formData1.mobileNo,
                EMAIL: formData1.email,
                COUNTERNAME: formData1.counterName
            }
            const data = JSON.stringify(data1, null, 2);
            // console.log(data);


            try {
                const response = await CounterRegistrationApis.registerCounterUpdate(id, data);
                // console.log("Response:", response);

                if (response.status === 201) {
                    // alert(response.data.message);
                    toast.success("Counter Details were Updated Successfully!", {
                        position: "top-right",
                        autoClose: 5000, // Closes after 3 seconds
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
                    setFormData1({
                        ownerName: "",
                        mobileNo: "",
                        email: "",
                        counterName: "",
                        imagePath: null,
                    });

                    document.getElementById("add_counter1").reset();
                    setShowUpdateCounter(false);
                    fetchData();
                }
            } catch (error) {
                // console.error("Error:", error);
                if (error.response?.status === 400) {
                    alert(error.response.data.message);
                }
            }
        } else {
            alert('Validation failed');
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <>
            <div>


                {tab === 'cards' && (

                    <div className='container mx-2'>
                        <div className="row mb-3">
                            <div className="col-sm-12 col-xs-6 col-md-6 ">
                                <Typography variant='h5' className='ms-3 mb-4 text-primary' fontWeight="bold">
                                    List of Counters Profiles :
                                </Typography>
                            </div>
                            <div className="text-end col-sm-12 col-xs-6 col-md-6">
                                <Button
                                    variant="contained"
                                    sx={{ width: { xs: "50%", md: "50%",lg:"25%" }, height: "75", mr: 3 }}
                                    onClick={() => setShow(true)}
                                >
                                    Add Counter
                                </Button>
                            </div>
                        </div>
                        <div className='row row-gap-4'>
                            {counters.map((counter, index) => (
                                <div key={index} className='col-xl-3 col-md-4 col-sm-6'>
                                    <div className='card rounded '
                                        style={counter.AVAILABLE == 0 ? { filter: "blur(0px)", pointerEvents: "", opacity: "0.1", transition: "0.3s ease-in-out", border: '3px solid black' } : {}} >
                                        <div
                                            className='text-end'
                                            style={{
                                                height: '200px',
                                                width: '100%',
                                                backgroundImage: counter.IMAGEPATH ? `url(${API_BASE_URL}${counter.IMAGEPATH})` : 'none',
                                                backgroundSize: 'cover',
                                                borderRadius: '5px 5px 0 0'
                                            }}
                                        >
                                            <div className="btn dropdown-toggle" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                                <SettingsIcon style={{ width: '20px', color: 'white' }} />
                                            </div>
                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                <li><button className="dropdown-item" type="button" onClick={() => { editCounter(counter) }}>Edit</button></li>
                                                <li><button className="dropdown-item" type="button" onClick={() => { deleteCounter(counter) }}>Delete</button></li>
                                            </ul>
                                        </div>
                                        <div className='card-body counter_card profile_Cards1' onClick={() => handleCardClick(counter)}>
                                            <h5 className='card-title text-center'>{counter.COUNTERNAME}</h5>
                                            <h6>Vendor Name: <span className='text-primary'>{counter.OWNERNAME}</span></h6>
                                            <h6>Vendor Mobile: <span className='text-primary'>{counter.MOBILENO}</span></h6>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {show ? (<>
                    {/* Modal for Adding Counter */}
                    <Modal show={show} onHide={handleClose} style={{ marginTop: '35px' }} backdrop="static" keyboard={false}>

                        <Modal.Body>
                            <Typography variant="body2" sx={{ mt: 1, textAlign: 'center', fontWeight: "bold", fontSize: '20px' }}>
                                ADD COUNTER
                            </Typography>
                            <form onSubmit={handleSubmit} id='add_counter'>
                                <TextField
                                    fullWidth label="Owner Name" name="ownerName"
                                    value={formData.ownerName} onChange={handleChange}
                                    margin="normal" required
                                    // style={{border:'2px light black'}}
                                    error={formDataError.ownerName}
                                    helperText={formDataError.ownerName}
                                    variant='outlined'
                                    onKeyPress={(e) => {
                                        const isValidInput = /^[a-zA-Z\s]*$/; // Allows letters and spaces
                                        if (!isValidInput.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    inputProps={{
                                        minLength: 3,
                                        maxLength: 50, // Restrict input length
                                    }}

                                />
                                {/* <small> */}
                                    {/* {formDataError.ownerName && <span className="text-danger">{formDataError.ownerName}</span>}</small> */}
                                <TextField
                                    fullWidth label="Mobile Number" name="mobileNo" type="tel"
                                    onKeyPress={(e) => {
                                        const isValidInput = /[0-9]/;
                                        if (!isValidInput.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    inputProps={{
                                        maxLength: 10, // Restrict input length
                                    }}
                                    error={formDataError.mobileNo}
                                    helperText={formDataError.mobileNo}
                                    value={formData.mobileNo} onChange={handleChange}
                                    margin="normal" required
                                />
                                {/* <small> {formDataError.mobileNo && <span className="text-danger">{formDataError.mobileNo}</span>}</small> */}
                                <TextField
                                    fullWidth label="Email" name="email" type="email"
                                    error={formDataError.email}
                                    helperText={formDataError.email}
                                    value={formData.email} onChange={handleChange}
                                    margin="normal" required
                                    inputProps={{
                                        maxLength: 60, // Restrict input length
                                    }}

                                />
                                {/* <small> {formDataError.email && <span className="text-danger">{formDataError.email}</span>}</small> */}
                                <TextField
                                    fullWidth label="Counter Name" name="counterName"
                                    error={formDataError.counterName}
                                    helperText={formDataError.counterName}
                                    value={formData.counterName} onChange={handleChange}
                                    margin="normal" required
                                    onKeyPress={(e) => {
                                        const isValidInput = /^[a-zA-Z\s]*$/; // Allows letters and spaces
                                        if (!isValidInput.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    inputProps={{
                                        minLength: 3,
                                        maxLength: 60, // Restrict input length
                                    }}
                                />
                                {/* <small> {formDataError.counterName && <span className="text-danger">{formDataError.counterName}</span>}</small> */}



                                <div className="align-items-center d-flex gap-2 mt-3">
                                    <Button component="span" sx={{ width: "40%", height: "40px" }}>
                                        <input
                                            type="file"
                                            id="fileInput"
                                            name="imagePath"
                                            style={{ display: "none" }} // Hide the input
                                            onChange={handleImageChange}
                                        />

                                        <label htmlFor="fileInput">

                                            Upload Image

                                        </label>
                                    </Button>

                                    {formData.imagePath && (
                                        <Typography variant="body2">
                                            Selected: {formData.imagePath.name}
                                        </Typography>
                                    )}
                                </div>

                                {/* Error Message */}
                                {formDataError.imagePath && (
                                    <small className="text-danger">{formDataError.imagePath}</small>
                                )}


                                <div className='row container justify-content-between align-items-center'>
                                    <div className='col-6'>
                                        <Button variant="contained" color="white" sx={{ mt: 3 }} onClick={handleClose}>
                                            Cancel
                                        </Button></div>
                                    <div className='col-6'>
                                        <Button type='submit' variant="contained" color="primary" sx={{ mt: 3 }}>
                                            Submit
                                        </Button></div>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                </>) : (<></>)}

                {showUpdateCounter ? (<>
                    {/* Modal for Adding Counter */}
                    <Modal show={showUpdateCounter} onHide={handleClose1} style={{ marginTop: '35px' }} backdrop="static" keyboard={false}>

                        <Modal.Body>
                            <Typography variant="body2" sx={{ mt: 1, textAlign: 'center', fontWeight: "bold", fontSize: '20px' }}>
                                UPDATE COUNTER DETAILS
                            </Typography>
                            <form onSubmit={handleSubmit1} id='add_counter1'>
                                <TextField
                                    fullWidth label="Owner Name" name="ownerName"
                                    error={formDataError1.ownerName}
                                    helperText={formDataError1.ownerName}
                                    value={formData1.ownerName} onChange={handleChange1}
                                    margin="normal" required
                                    // style={{border:'2px light black'}}
                                    variant='outlined'
                                    onKeyPress={(e) => {
                                        const isValidInput = /^[a-zA-Z\s]*$/; // Allows letters and spaces
                                        if (!isValidInput.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    inputProps={{
                                        minLength: 3,
                                        maxLength: 50, // Restrict input length
                                    }}

                                />
                                {/* <small>
                                    {formDataError1.ownerName && <span className="text-danger">{formDataError1.ownerName}</span>}</small> */}
                                <TextField
                                    fullWidth label="Mobile Number" name="mobileNo" type="tel"
                                    error={formDataError1.mobileNo}
                                    helperText={formDataError1.mobileNo}
                                    onKeyPress={(e) => {
                                        const isValidInput = /[0-9]/;
                                        if (!isValidInput.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    inputProps={{
                                        maxLength: 10, // Restrict input length
                                    }}
                                    value={formData1.mobileNo} onChange={handleChange1}
                                    margin="normal" required
                                />
                                {/* <small> {formDataError1.mobileNo && <span className="text-danger">{formDataError1.mobileNo}</span>}</small> */}
                                <TextField
                                    fullWidth label="Email" name="email" type="email"
                                    error={formDataError1.email}
                                    helperText={formDataError1.email}
                                    value={formData1.email} onChange={handleChange1}
                                    margin="normal" required
                                    inputProps={{
                                        maxLength: 60, // Restrict input length
                                    }}

                                />
                                {/* <small> {formDataError1.email && <span className="text-danger">{formDataError1.email}</span>}</small> */}
                                <TextField
                                    fullWidth label="Counter Name" name="counterName"
                                    error={formDataError1.counterName}
                                    helperText={formDataError1.counterName}
                                    value={formData1.counterName} onChange={handleChange1}
                                    margin="normal" required
                                    onKeyPress={(e) => {
                                        const isValidInput = /^[a-zA-Z\s]*$/; // Allows letters and spaces
                                        if (!isValidInput.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    inputProps={{
                                        minLength: 3,
                                        maxLength: 60, // Restrict input length
                                    }}
                                />
                                {/* <small> {formDataError1.counterName && <span className="text-danger">{formDataError1.counterName}</span>}</small> */}



                                <div className="align-items-center d-flex gap-2 mt-3">
                                    <Button component="span" sx={{ width: "40%", height: "40px" }}>
                                        <input
                                            type="file"
                                            id="fileInput"
                                            name="imagePath"
                                            style={{ display: "none" }} // Hide the input
                                            onChange={handleImageChange1}
                                        />

                                        <label htmlFor="fileInput">

                                            Upload Image

                                        </label>
                                    </Button>

                                    {formData1.imagePath && (
                                        <Typography variant="body2">
                                            Selected: {formData1.imagePath.name}
                                        </Typography>
                                    )}
                                </div>

                                {/* Error Message */}
                                {formDataError1.imagePath && (
                                    <small className="text-danger">{formDataError1.imagePath}</small>
                                )}


                                <div className='row container justify-content-between align-items-center'>
                                    <div className='col-6'>
                                        <Button variant="contained" color="white" sx={{ mt: 3 }} onClick={handleClose1}>
                                            Cancel
                                        </Button></div>
                                    <div className='col-6'>
                                        <Button type='submit' variant="contained" color="primary" sx={{ mt: 3 }}>
                                            Submit
                                        </Button></div>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                </>) : (<></>)}

                {showProfile ? (<> <>
                    <div className='mb-2 ms-1'>
                        <div className='row mt-3'> 
                            <div className='ms-2 me-2 col-sm-12 col-xs-6 col-md-6 d-flex'><Link  style={{ textDecoration: "none" }}> <ArrowBackIosTwoTone
                            onClick={handleBack}
                            style={{ fontSize: 30, color:'black', cursor: "pointer", fontWeight: "bold" }}
                        /></Link> <Typography variant="h5" className='text-center text-primary fw-bold fs-4'>Counter Profile Information</Typography></div>
                          </div>


                    </div>
                 

                    <div className="border card rounded m-4 h-75">

                        {/* Card Body - Centered Image */}
                        <div className="card-body border p-3 d-flex flex-column align-items-center justify-content-center shadow-sm" style={{backgroundColor:'aliceblue'}}>
                            <div
                                className="rounded-circle"
                                style={{
                                    height: '200px',
                                    width: '200px',
                                    backgroundImage: counterDetails.IMAGEPATH ? `url(${API_BASE_URL}${counterDetails.IMAGEPATH})` : 'none',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    border: '2px solid #ccc',

                                }}
                            ></div>
                        </div>

                        {/* Counter Profile Information */}


                        {/* Footer with Row and Column Layout */}
                        <div className="card-footer border p-3">
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className="p-1">

                                        <div className="form-group d-flex text-center align-items-center justify-content-center gap-2 mt-1">
                                            <AccountCircle />
                                            <input
                                                type="text"
                                                value={counterDetails.OWNERNAME}
                                                name="OWNERNAME"
                                                disabled
                                                style={{
                                                    width: '100%',
                                                    border: '1px solid rgb(229, 231, 235)',
                                                    padding: '0.75rem',
                                                    borderRadius: '8px',
                                                    fontSize: '1rem',
                                                    transition: 'border-color 0.2s'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="p-1">

                                        <div className="form-group d-flex text-center align-items-center justify-content-center gap-2 mt-1">
                                            <Storefront />
                                            <input
                                                type="text"
                                                value={counterDetails.COUNTERNAME}
                                                name="OWNERNAME"
                                                disabled
                                                style={{
                                                    width: '100%',
                                                    border: '1px solid rgb(229, 231, 235)',
                                                    padding: '0.75rem',
                                                    borderRadius: '8px',
                                                    fontSize: '1rem',
                                                    transition: 'border-color 0.2s'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="p-1">

                                        <div className="form-group d-flex text-center align-items-center justify-content-center gap-2 mt-1">
                                            <Email />
                                            <input
                                                type="text"
                                                value={counterDetails.EMAIL}
                                                name="OWNERNAME"
                                                disabled
                                                style={{
                                                    width: '100%',
                                                    border: '1px solid rgb(229, 231, 235)',
                                                    padding: '0.75rem',
                                                    borderRadius: '8px',
                                                    fontSize: '1rem',
                                                    transition: 'border-color 0.2s'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="p-1">

                                        <div className="form-group d-flex text-center align-items-center justify-content-center gap-2 mt-1">
                                        <Phone />
                                            <input
                                                type="text"
                                                value={counterDetails.MOBILENO}
                                                name="OWNERNAME"
                                                disabled
                                                style={{
                                                    width: '100%',
                                                    border: '1px solid rgb(229, 231, 235)',
                                                    padding: '0.75rem',
                                                    borderRadius: '8px',
                                                    fontSize: '1rem',
                                                    transition: 'border-color 0.2s'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="p-1">

                                        <div className="form-group d-flex text-center align-items-center justify-content-center gap-2 mt-1">
                                        <CalendarMonth />
                                            <input
                                                type="text"
                                                value={counterDetails.CREATED_AT}
                                                name="OWNERNAME"
                                                disabled
                                                style={{
                                                    width: '100%',
                                                    border: '1px solid rgb(229, 231, 235)',
                                                    padding: '0.75rem',
                                                    borderRadius: '8px',
                                                    fontSize: '1rem',
                                                    transition: 'border-color 0.2s'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="p-1">

                                        <div className="form-group d-flex text-center align-items-center justify-content-center gap-2 mt-1">
                                        <Accessibility />
                                            <input
                                                type="text"
                                                value={counterDetails.AVAILABLE == 1 ? "Opened":"Closed"}
                                                name="OWNERNAME"
                                                disabled
                                                style={{
                                                    width: '100%',
                                                    border: '1px solid rgb(229, 231, 235)',
                                                    padding: '0.75rem',
                                                    borderRadius: '8px',
                                                    fontSize: '1rem',
                                                    transition: 'border-color 0.2s'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="p-1">

                                        <div className="form-group d-flex text-center align-items-center justify-content-center gap-2 mt-1">
                                        <LocalMall />
                                            <input
                                                type="text"
                                                value={"10"}
                                                name="OWNERNAME"
                                                disabled
                                                style={{
                                                    width: '100%',
                                                    border: '1px solid rgb(229, 231, 235)',
                                                    padding: '0.75rem',
                                                    borderRadius: '8px',
                                                    fontSize: '1rem',
                                                    transition: 'border-color 0.2s'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="p-1">

                                        <div className="form-group d-flex text-center align-items-center justify-content-center gap-2 mt-1">
                                        <CurrencyRupee />
                                            <input
                                                type="text"
                                                value={"1000"}
                                                name="OWNERNAME"
                                                disabled
                                                style={{
                                                    width: '100%',
                                                    border: '1px solid rgb(229, 231, 235)',
                                                    padding: '0.75rem',
                                                    borderRadius: '8px',
                                                    fontSize: '1rem',
                                                    transition: 'border-color 0.2s'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </>
                </>) : (<></>)}

            </div>
        </>
    );
}

export default Dashboard;

