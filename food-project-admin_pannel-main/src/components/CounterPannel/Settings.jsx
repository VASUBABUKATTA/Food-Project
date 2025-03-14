import React, { useEffect, useState } from 'react'
import CounterRegistrationApis from '../Api_Services/CounterRegistrationApis';
import { Button, TextField, Typography } from '@mui/material';
import { Accessibility, AccountCircle, CalendarMonth, CurrencyRupee, Edit, Email, LocalMall, Phone, Storefront } from '@mui/icons-material';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import { confirmAlert } from 'react-confirm-alert';


function Settings() {
    const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  const [counterDetails, setCounterId] = useState('')

    //  console.log(sessionStorage.getItem('mobieNo'));
    const mobdata = sessionStorage.getItem('mobieNo');

    async function fetchCounterId() {
        try {
            const response = await CounterRegistrationApis.counterIdByMobNo(mobdata);
            // console.log(response)
            if (response.status === 200) {
                setCounterId(response.data.message);
            }
        } catch (error) {
            // console.error("Error fetching counter ID:", error);
            toast.warn("Error fetching counter ID:", error);
        }
    }

    useEffect(() => {
        fetchCounterId();
    }, [mobdata]);

    const handleShow1 = () => setShowUpdateCounter(true);
    const [showUpdateCounter, setShowUpdateCounter] = useState(false);
    
  const [id,setId] = useState('')

     const [formData1, setFormData1] = useState({
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

     //   const regexUsername = new RegExp(/^[A-Za-z][A-Za-z. ]{1,50}[A-Za-z. ]$/);
     const regexUsername = new RegExp(/^[a-zA-Z]{3,60}(?:\s[a-zA-Z]{1,60})*$/);

     const regexEmail = new RegExp(/^(?!.*?\.\.)(?!.*?\.(_|_\.|\._))([a-zA-Z0-9]+[a-zA-Z]*)(?:[._][a-zA-Z0-9]+)?(?:[._]?[a-zA-Z0-9]+)?@[a-zA-Z.]+(?:_[a-zA-Z0-9]+)?\.[a-zA-Z]{2,3}$/);
     const regexMobileNo = new RegExp(/^[6-9][0-9]{9}$/);
 
    
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
                    fetchCounterId();
                     toast.success(response.data.message)
                 }
             } catch (error) {
                 toast.warn(error.response.data.message);
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
                    sessionStorage.setItem('mobieNo',formData1.mobileNo);
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
                     
                     fetchCounterId();
                    //  CounterProfileDetails(counterDetails)
                    //  fetchData();
                 }
             } catch (error) {
                 // console.error("Error:", error);
                 if (error.response?.status === 400) {
                     toast.warn(error.response.data.message);
                 }
             }
         } else {
             toast.warn('Validation failed');
         }
     };

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


const handleChange = async (counter) => {
   
    const id = counter.ID;
    const availability = counter.AVAILABLE == 1 ? 0 : 1; 

    // console.log(counter,id,availability);
    
    confirmAlert({
        title: 'Conform Update',
        message: `Are You Sure You want to Update the Counter Availability Status --${availability == 1 ? "Closed" : "Open"} to ${availability== 1 ? "Open" : "Close"}--? `,
        buttons: [
          {
            label: 'Ok',
            onClick: async () => {
                try {
                    const response = await CounterRegistrationApis.registerCounterUpdateForAvailability(id, availability);
                    // console.log(response);
            
                    if (response.status === 201) {
                        // alert(response.data.message);
                         toast.success("Counter Details Updated Successfully", {
                                              position: "top-right",
                                              autoClose: 5000, // Closes after 3 seconds
                                              hideProgressBar: false,
                                              closeOnClick: true,
                                              pauseOnHover: true,
                                              draggable: true,
                                              progress: undefined,
                                              theme: "light",
                                            });
                                            fetchCounterId()
                       
                    } else {
                        throw new Error("Failed to update availability");
                    }
                } catch (error) {
                    toast.error("Error: " + (error.response?.data?.message || "API call failed"));
                    
                }
  
            }
          }, {
            label: "Cancel",
            onClick: () => {
  
            }
          }
        ]
      })
  
  
};

const handleDownload = async () => {
    try {

      const counterId = counterDetails.ID;

      const response = await fetch(`http://localhost:9090/order/download-history/${counterId}`, {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to download file");

      // Create a Blob from the response
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a link element and trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = `OrderHistory_Counter_${counterId}.xlsx`; // Set file name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <>
 
 {/* <button onClick={handleDownload}>Download History</button> */}


<>
<div className='mb-2 ms-1'>
    <div className='row mt-3'> 
        <div className='ms-2 me-2 col-sm-12 col-xs-6 col-md-6 d-flex'> <Typography variant="h5" className='text-center text-primary fw-bold fs-4'>Counter Profile Information    </Typography><div onClick={()=>{editCounter(counterDetails)}}> <Edit sx={{cursor:'pointer'}}  /></div> </div>
      </div>


</div>


<div className="border card rounded m-4 ">

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
                        <div onClick={()=>{handleChange(counterDetails)}} style={{borderRadius:"5px"}} className='border bg-white p-2  border 2px solid black'><Edit sx={{cursor:"pointer"}}/></div>
                        
                    </div>
                </div>
            </div>
            {/* <div className="col-12 col-md-6">
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
            </div> */}
            {/* <div className="col-12 col-md-6">
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
            </div> */}
        </div>
    </div>
</div>


</>


                {showUpdateCounter ? (<>
                    {/* Modal for Adding Counter */}
                    <Modal show={showUpdateCounter} onHide={handleClose1} style={{ marginTop: '100px' }} backdrop="static" keyboard={false}>

                        <Modal.Body>
                            <Typography variant="body2" sx={{ mt: 1, textAlign: 'center', fontWeight: "bold", fontSize: '20px' }}>
                                UPDATE COUNTER DETAILS
                            </Typography>
                            <form onSubmit={handleSubmit1} id='add_counter1'>
                                <TextField
                                    fullWidth label="Owner Name" name="ownerName"
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
                                <small>
                                    {formDataError1.ownerName && <span className="text-danger">{formDataError1.ownerName}</span>}</small>
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
                                    value={formData1.mobileNo} onChange={handleChange1}
                                    margin="normal" required
                                />
                                <small> {formDataError1.mobileNo && <span className="text-danger">{formDataError1.mobileNo}</span>}</small>
                                <TextField
                                    fullWidth label="Email" name="email" type="email"
                                    value={formData1.email} onChange={handleChange1}
                                    margin="normal" required
                                    inputProps={{
                                        maxLength: 60, // Restrict input length
                                    }}

                                />
                                <small> {formDataError1.email && <span className="text-danger">{formDataError1.email}</span>}</small>
                                <TextField
                                    fullWidth label="Counter Name" name="counterName"
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
                                <small> {formDataError1.counterName && <span className="text-danger">{formDataError1.counterName}</span>}</small>



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
                
    </>
    // <div className='text-primary text-center fw-bold fs-3'>Settings pannel Information</div>
    
  )
}

export default Settings