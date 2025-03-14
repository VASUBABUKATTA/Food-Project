
import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import IconButton from '@mui/material/IconButton';
import { Menu as Vasu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Badge, Modal, ModalBody } from 'react-bootstrap';
import Service from '../Api_Services/CategoryService';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Delete, Block, ArrowBackIosTwoTone } from "@mui/icons-material"; // Import MUI icons
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';

function NewMenuItems({ counterId, counterName }) {

    console.log(counterId, counterName);


    const [categoryList, setCategoryList] = useState([])
    const [filteredMenuItems, setFilteredMenuItems] = useState([]);

    const [open, setOpen] = useState(true);
    const [CategoriesTable, setCategoriesTable] = useState(false);
    const [menuItems, setMenuItems] = useState([])

    const getCategories = async () => {
        try {
            const response = await Service.get(`/menuItem/getCategory/ByCounterId/${counterId}`);
            if (response.status == 200) {

                //  toast.success("Categories Fetched Successfully!", {
                //       position: "top-right",
                //       autoClose: 5000, // Closes after 3 seconds
                //       hideProgressBar: false,
                //       closeOnClick: true,
                //       pauseOnHover: true,
                //       draggable: true,
                //       progress: undefined,
                //       theme: "light",
                //     });

                setCategoriesTable(false)
                setOpen(true);
                setCategoryList(response.data)
                // setFilteredMenuItems(response.data)
                return response.data;
            }
        } catch (error) {

            setCategoryList([])
            // toast.error("Categories were Not There!", {
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
    }

    useEffect(() => {
        getCategories();
        // console.log(typeof (categoryList));
        setCategoriesTable(false)
    }, [counterId])




    // console.log(counterName);





    const columns = [
        { name: "ID", selector: (row, index) => index + 1, sortable: true, width: "70px" },
        { name: "Item Name", selector: (row) => row.name, sortable: true },
        {
            name: "Available", selector: (row) => <Badge bg={row.available === 1 ? "success" : "danger"} className="p-2">
                {row.available === 1 ? "Yes" : "No"}
            </Badge>, sortable: true
        },
        { name: "Price", selector: (row) => row.price, sortable: true, width: "120px" },
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

    const handleClick = async (categoryId) => {
        try {
            const response = await Service.get(`/menuItem/getCategory/ByCateGoryId/${categoryId}`);
            if (response.status == 200) {

                setOpen(false);

                setCategoriesTable(true);
                setMenuItems(response.data)
                setFilteredMenuItems(response.data)
                // console.log(response.data)
                return response.data;
            }
        } catch (error) {
            // console.log(error);
            setMenuItems([])
            setFilteredMenuItems([]);
        }

    }
    const [searchText, setSearchText] = useState(""); // Search text

    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setSearchText(searchValue);

        const filteredData = menuItems.filter((category) =>
            category.name.toLowerCase().includes(searchValue)
        );
        setFilteredMenuItems(filteredData);
    };

    const handleClickGoBack = () => {
        setSearchText('');
        setCategoriesTable(false);
        setOpen(true);
    }

    const cardStyle = {
        position: "relative",
        // width: "250px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
        border: "2px solid black",
        backgroundColor: "aliceblue",
        overflow: "hidden",
        textAlign: "center",
        margin: "20px auto",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
    };

    const verticalRibbonContainer = {
        position: "absolute",
        top: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        zIndex: 0
    };

    const ribbonStyle = (color) => ({
        width: "20px",
        height: "100%",
        margin: "0 3px",
        background: color,
        clipPath: "polygon(50% 0%, 100% 0, 100% 85%, 50% 100%, 0 85%, 0 0)"
    });

    const horizontalRibbon = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        padding: "10px 25px",
        fontWeight: "bold",
        fontFamily: "Arial, sans-serif",
        fontSize: "18px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        borderRadius: "4px",
        zIndex: 1,
        color: "darkblue",
        border: "2px solid darkblue"
    };

    const cardFooter = {
        backgroundColor: "darkblue",
        color: "white",
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        padding: "10px",
        textAlign: "center",
        zIndex: 2,
        position: "relative"
    };

    return (
        <div>
            <h3 className="text-start m-1   fw-bold fs-3"><span >Counter Name :</span><span className='text-primary ms-2'>{counterName}</span> </h3>
            {open && categoryList.length > 0 ? (
                <div>

                    <h3 className="text-start ms-2   text-primary fw-bold fs-3">Categories</h3>
                    <div className="row p-2">
                        {categoryList.map((item, index) => (
                            <div key={index} className="col-12 col-md-6 col-lg-6 col-xl-4">
                                <div className='card '
                                    style={cardStyle}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1.0)"}
                                    onClick={() => handleClick(item.id)}
                                >
                                    <div style={verticalRibbonContainer}>
                                        <div style={ribbonStyle("#2a4d7f")}></div>
                                        <div style={ribbonStyle("#4f7cbf")}></div>
                                        <div style={ribbonStyle("#d9e4f5")}></div>
                                    </div>
                                    <div style={horizontalRibbon}>Food</div>
                                    <div className="card-body mb-4" style={{ padding: "40px" }}></div>
                                    <div style={cardFooter}>
                                        <h5 style={{ fontWeight: "bold", fontSize: "20px" }}>{item.name.toUpperCase()}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (<>{!CategoriesTable && (<>
                {/* <h3 className="text-start m-3   fw-bold fs-3"><span >Counter Name :</span><span className='text-primary ms-2'>{counterName}</span> </h3> */}

                <div className='text-center text-primary mt-3 fw-bold fs-3'> Categories Are Not Available in this Counter </div></>)}
            </>)}

            {CategoriesTable && (
                <div className="m-3 ">
                    <div className='d-flex'>
                        <ArrowBackIosTwoTone
                            onClick={handleClickGoBack}
                            style={{ fontSize: 35, color: "dark", cursor: "pointer", fontWeight: "bold", }}
                        />
                        <h3 className="mb-3 text-primary fw-bold fs-3">Menu Items</h3>
                    </div>
                    <TextField
                        type="text"
                        placeholder="🔍 Search Item Name..."
                        value={searchText}
                        onChange={handleSearch}
                        className="search-input mb-3"
                    />

                    <DataTable
                        columns={columns}
                        data={filteredMenuItems}
                        defaultSortField="name"
                        pagination
                        highlightOnHover
                        striped
                        responsive
                        customStyles={customStyles}
                    />
                </div>
            )}

        </div>
    )
}

export default NewMenuItems
