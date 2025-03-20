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
import { Modal, ModalBody } from 'react-bootstrap';
import Service from '../../components/Api_Services/CategoryService';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Delete, Block, ArrowBackIosTwoTone, Settings } from "@mui/icons-material"; // Import MUI icons
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import CounterRegistrationApis from '../Api_Services/CounterRegistrationApis';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Badge } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import socket from '../Api_Services/socket';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



function PaperComponent(props) {
    const nodeRef = React.useRef(null);
    return (
        <Draggable
            nodeRef={nodeRef}
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} ref={nodeRef} />
        </Draggable>
    );
}

function CounterMenuItems() {

    const [menuitems, setMenuItems] = useState();

    const [showMenuItems, setShowMenuItems] = useState(false);
    const [categoryName, setCategoryName] = useState();
    const [editedCategoryName, setEditCategoryName] = useState();
    const [categoryList, setCategoryList] = useState([])
    const [category, setCategory] = useState()
    const [showCategoryEdit, setShowCategoryEdit] = useState(false);
    const [itemName, seItemName] = useState();
    const [price, setPrice] = useState()
    const [item, setItem] = useState();
    const [editedItemName, setEditedItemName] = useState();
    const [editedPrice, setEditedPrice] = useState()

    const [showItemEdit, setShowItemEdit] = useState(false)
    const [counter_id, setCounterId] = useState('')

    //  console.log(sessionStorage.getItem('mobieNo'));
    const mobdata = sessionStorage.getItem('mobieNo');


    const [filteredMenuItems, setFilteredMenuItems] = useState([]);


    const [searchText, setSearchText] = useState(""); // Search text

    const regexUsername = new RegExp(/^[a-zA-Z]{3,60}(?:\s[a-zA-Z]{1,60})*$/);
    const [ItemDataErr, seItemdataErr] = useState('')
    const [ItemPriceErr, seItemPriceErr] = useState('')

    async function fetchCounterId() {
        try {
            const response = await CounterRegistrationApis.counterIdByMobNo(mobdata);
            if (response.status === 200) {
                setCounterId(response.data.message.ID);
                console.log(response.data.message.ID);

            }
        } catch (error) {
            // console.error("Error fetching counter ID:", error);
        }
    }




    useEffect(() => {
        if (mobdata) fetchCounterId();
    }, []);



    const getCategories = async (counter_id) => {
        console.log(counter_id);

        try {
            console.log("response");
            const response = await Service.fetchAllCategoryDetailsByCounterId(counter_id);
            console.log(response);
            console.log("response");

            console.log(response.data);
            if (response.status == 200) {
                // console.log(response)
                setCategoryList(response.data)
                console.log(response.data);
                return response.data;


            }
        } catch (error) {
            // console.log(error);
        }
    }

    // Handle new orders from WebSocketkke
    const handleNewCategory = (newCategory) => {
        console.log("New order received:", newCategory);
        setCategoryList(prevOrders => [newCategory, ...prevOrders]); // Add new order at the top
    };

    useEffect(() => {
        getCategories(counter_id);


    }, [counter_id])

    useEffect(() => {
        socket.on("newCategory", handleNewCategory);
        return () => {
            socket.off("newCategory", handleNewCategory)
        }
    }, [])

    const handleCardClick = async (item) => {
        const data = item.menu;
        // console.log(item.menu,data);

        // console.log(item);
        setFilteredMenuItems(data);
        setMenuItems(item)
        setShowMenuItems(!showMenuItems)
    }

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open)
    }

    const handleClose = () => setOpen(!open);

    const handleAddCategory = async () => {

        const available = 1;
        await Service.post("/menuItem/addCategory", { categoryName, counter_id, available }).then((res) => {
            getCategories(counter_id);

            setOpen(!open)
            setCategoryName()
            toast.success(res.data.message)
        }).catch((err) => {
            toast.error(err.response.data.message)
        })

    }



    const handleEditCategory = async () => {
        const categoryId = category.categoryId;
        const categoryName = editedCategoryName;
        // const counter_id = counter_id;
        await Service.put("/menuItem/updateCategory", { categoryName, categoryId, counter_id }).then((res) => {
            // console.log(res);
            getCategories(counter_id);
            setShowCategoryEdit(!showCategoryEdit);
            if (res === 201) {
                alert(res.data.message);
            }
            toast.success(res.data.message)

        }).catch((err) => {
            toast.error(err.response.data.message)
            // console.log(err);

        })
    }

    const deleteCategory = async (categoryId) => {
        // console.log(categoryId);

        confirmAlert({
            title: 'Conform Update',
            message: "Are you Sure You Want to delete this category?",
            buttons: [
                {
                    label: 'Ok',
                    onClick: async () => {
                        await Service.delete(`/menuItem/deleteCategory/${categoryId}`).then((res) => {
                            // console.log(res);
                            // getCategories(counter_id);
                            getCategories();
                            toast.success("Category Details Deleted SuccessFully");
                        }).catch((err) => {
                            toast.error(err.response.data.message)

                        })
                    }
                },
                {
                    label: 'Cancel',
                    onClick: () => {

                    }
                }
            ]
        })

    }

    useEffect(() => {
        if (menuitems?.menu) {
            setFilteredMenuItems(menuitems.menu);
        }
    }, [menuitems]);


    const [showAddItem, setShowAddItem] = useState(false);

    const handleAddItem = async (e) => {

        e.preventDefault();

        const category_id = menuitems.categoryId;
        const available = 1;
        // console.log(itemName, category_id, available, price);
        if (regexUsername.test(itemName) && /^\d+$/.test(price) && err1.addCategoryErr == "" && err2.addCategoryErr == "") {



            try {
                const res = await Service.post("/menuItem/addItems", { itemName, category_id, available, price });
                if (res.status == 201) {
                    const updatedCategories = await getCategories(counter_id);
                    toast.success(res.data.message)
                    seItemName('')
                    setPrice('')
                    // Find the updated category and set menu items
                    const updatedCategory = updatedCategories.find(item => item.categoryId === menuitems.categoryId);
                    if (updatedCategory) {
                        setMenuItems(updatedCategory);
                        setFilteredMenuItems(updatedCategory.menu); // Refresh table data
                        setShowAddItem(false)
                    }

                    // console.log(menuitems.name);
                    // console.log(data);
                    data.map((item, index) => (
                        item.categoryId === menuitems.categoryId ? setMenuItems(item) : ''
                    ))
                }
                setShowAddItem(false);
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }

    }

    const handleEditItem = async (e) => {

        e.preventDefault();

        // await Service.put("/menuItem/updateItem",)
        // console.log(item);

        const itemId = item.itemId;
        const itemName = editedItemName;
        const price = editedPrice;
        const category_id = menuitems.categoryId;
        if (regexUsername.test(editedItemName) && /^\d+$/.test(editedPrice) && editerr1.addCategoryErr == "" && editerr2.addCategoryErr == "") {

            try {
                const res = await Service.put("/menuItem/updateItem", { itemName, itemId, price, category_id })
                // console.log(res)
                if (res.status == 201) {
                    toast.success(res.data.message)
                    const updatedCategories = await getCategories(counter_id);
                    setShowItemEdit(false);
                    // Find the updated category and set menu items
                    const updatedCategory = updatedCategories.find(item => item.categoryId === menuitems.categoryId);
                    if (updatedCategory) {
                        setMenuItems(updatedCategory);
                        setFilteredMenuItems(updatedCategory.menu); // Refresh table data
                    }
                    // console.log(menuitems.name);
                    // console.log(data);
                    // setFilteredMenuItems(data.menu)
                    handleCardClick(data)
                    data.map((item, index) => (
                        item.categoryId === menuitems.categoryId ? setMenuItems(item) : ''
                    ))

                }
                setShowItemEdit(false);
            } catch (error) {
                toast.error(error.response.data.message)
                // alert(error.response.data.message);
                // console.log(error);
            }

        }
    };



    const deleteItem = async (itemId) => {

        confirmAlert({
            title: "Conform Update",
            message: "Are you sure want to delete Item",
            buttons: [
                {
                    label: 'Ok',
                    onClick: async () => {
                        try {
                            const res = await Service.delete(`/menuItem/deleteItem/${itemId}`);

                            if (res.status === 204) {
                                const updatedCategories = await getCategories(counter_id);

                                // Find the updated category and set menu items
                                const updatedCategory = updatedCategories.find(item => item.categoryId === menuitems.categoryId);
                                if (updatedCategory) {
                                    setMenuItems(updatedCategory);
                                    setFilteredMenuItems(updatedCategory.menu); // Refresh table data
                                }
                            }
                            toast.success('Item Was deleted successfully')
                        } catch (error) {
                            // console.log(error);
                            toast.error(err.response.data.message)
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


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const [disabledRows, setDisabledRows] = useState({});
    const handleDisable = (itemId) => {
        setDisabledRows((prev) => ({
            ...prev,
            [itemId]: !prev[itemId],
        }));
    };

    const [err, setErr] = useState({
        addCategoryErr: ''
    })

    const [err1, setErr1] = useState({
        addCategoryErr: ''
    })
    const [err2, setErr2] = useState({
        addCategoryErr: ''
    })

    const [editerr1, setEditErr1] = useState({
        addCategoryErr: ''
    })
    const [editerr2, setEditErr2] = useState({
        addCategoryErr: ''
    })


    const addCategoryonChangeHandler = (e) => {
        setCategoryName(e.target.value)
        const value = e.target.value;

        // setCategoryName(value);
        setErr({
            ...err,
            addCategoryErr: /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(value) && value.length >= 3 && value.length <= 50 ? "" : "3-50 characters"

        })

    }
    const addCategoryonChangeHandler1 = (e) => {
        seItemName(e.target.value)
        const value = e.target.value;

        // setCategoryName(value);
        setErr1({
            ...err1,
            addCategoryErr: /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(value) && value.length >= 3 && value.length <= 50 ? "" : "3-50 characters"

        })

    }

    const editaddCategoryonChangeHandler1 = (e) => {
        setEditedItemName(e.target.value)
        const value = e.target.value;

        // setCategoryName(value);
        setEditErr1({
            ...editerr1,
            addCategoryErr: /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(value) && value.length >= 3 && value.length <= 20 ? "" : "3-20 characters"

        })

    }


    const addCategoryonChangeHandler2 = (e) => {
        const value = e.target.value;

        setPrice(value);
        setErr2({
            ...err2,
            addCategoryErr:
                /^\d+$/.test(value) && parseInt(value, 10) >= 1 && parseInt(value, 10) <= 9999
                    ? ""
                    : "Enter a valid Price "
        });

    }

    const editaddCategoryonChangeHandler2 = (e) => {
        const value = e.target.value;

        setEditedPrice(value);
        setEditErr2({
            ...editerr2,
            addCategoryErr:
                /^\d+$/.test(value) && parseInt(value, 10) >= 1 && parseInt(value, 10) <= 9999
                    ? ""
                    : "Enter a valid Price "
        });

    }

    const goBack = () => {
        setSearchText('');
        setShowMenuItems(true);
        setMenuItems('')
    }




    //   useEffect(() => {
    //     setFilteredMenuItems(item || []);
    //   }, [item]);

    //   const handleSearch = (event) => {
    //     const searchValue = event.target.value.toLowerCase();
    //     setSearchText(searchValue);

    //     const filteredData = item?.menu.filter((category) =>
    //       category.name.toLowerCase().includes(searchValue)
    //     );
    //     setFilteredMenuItems(filteredData);
    //   };

    const handleSearch = (e) => {

        const searchValue = event.target.value.toLowerCase();
        setSearchText(searchValue);

        if (searchValue.trim() === "") {
            setFilteredMenuItems(menuitems?.menu || []);
        } else {
            const filtered = menuitems?.menu?.filter((category) =>
                category.name.toLowerCase().includes(searchValue)
            );
            setFilteredMenuItems(filtered);
        }
    };


    const columns = [
        { name: "ID", selector: (row, index) => index + 1, sortable: true, },
        { name: "Item Name", selector: (row) => row.name, sortable: true },
        // {
        //     name: "Available", selector: (row) => <Badge bg={row.itemAvailability === 1 ? "success" : "danger"} className="p-2">
        //         {row.itemAvailability === 1 ? "Yes" : "No"}
        //     </Badge>, sortable: true
        // },
        { name: "Price", selector: (row) => row.price, sortable: true, },
        {
            name: "Actions",
            selector: (row) => (
                <>
                    <IconButton sx={{ color: 'blue' }} onClick={() => { setShowItemEdit(!showItemEdit), setItem(row), setEditedPrice(row.price), setEditedItemName(row.name) }}>
                        <Edit />
                    </IconButton>
                    <IconButton sx={{ color: 'red' }} onClick={() => deleteItem(row.itemId)}>
                        <Delete />
                    </IconButton>
                </>
            ),
            width: "120px",
        },
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

    // const handleItemNameChage=(e)=>{
    //     // e.preventDefault();
    //     const inputValue = e.target.value;
    //             if (!regexUsername.test(inputValue)) {
    //                 seItemdataErr("Enter Valid Item Name (min 3 characters)");
    //             } else {
    //                 seItemName(inputValue);
    //                 seItemdataErr(""); 
    //             }

    // }

    const cardStyle = {
        position: "relative",
        // width: "300px",
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
        zIndex: 1,
        position: "relative"
    };

    return (
        <div>
            <>



                <div className='row '>


                    {!menuitems ? (<>

                        <div className='d-flex justify-content-between align-items-center'>
                            <h3 className='text-start m-3'>Categories</h3>
                            <Button variant="contained" sx={{
                                width: { xs: '100%', sm: '100%', md: '50%', lg: '25%', xl: '25%' }
                            }} onClick={handleClick}>ADD</Button>
                        </div>
                        {categoryList.map((item, index) => (
                            <div className='col-12 col-md-6 col-lg-6 col-xl-4 p-3 text-center align-items-center justify-content-center' key={index}>
                                <div className='card text-center card_data'
                                //  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                                //  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1.0)"}

                                 style={cardStyle}
                                //  style={{ cursor: 'pointer', border: "2px solid black", backgroundColor: "aliceblue", position: "relative", overflow: "hidden", }} 
                                 key={index}>

                                    {/* Dropdown Menu */}
                                    <div className="dropdown text-end text-primary" style={{ position: "absolute", right: "10px", top: "10px", zIndex: 2 }}>
                                        <span className="dropdown-toggle" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                            {/* <MoreVertIcon  className='fw-bold fs-4'/> */}
                                            <Settings/>
                                        </span>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                            <li>
                                                <button className="dropdown-item" type="button" onClick={() => {
                                                    setCategory(item);
                                                    setShowCategoryEdit(!showCategoryEdit);
                                                    setEditCategoryName(item.name);
                                                }}>Edit</button>
                                            </li>
                                            <li>
                                                <button className="dropdown-item" type="button" onClick={() => deleteCategory(item.categoryId)}>Delete</button>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Vertical Ribbon Effect
                                    <div style={{ position: "absolute", top: 0, width: "100%", height: "100%", display: "flex", justifyContent: "center", zIndex: 0 }}>
                                        <div style={{ width: "20px", height: "100%", margin: "0 3px", background: "#3B5998" }}></div> {/* Dark Blue */}
                                        {/* <div style={{ width: "20px", height: "100%", margin: "0 3px", background: "#6A89CC" }}></div> {/* Light Blue */}
                                        {/* <div style={{ width: "20px", height: "100%", margin: "0 3px", background: "#D9E4FC" }}></div> {/* Very Light Blue */}
                                    {/* </div>   */}

                                    {/* Horizontal Ribbon */}
                                    {/* <div style={horizontalRibbon}>Food</div>  */}

                                    {/* Card Body */}

                                    {/* <div className='card-body p-2 mb-5' onClick={() => handleCardClick(item)}></div> */}
                                    <div className="card-body">
                                            <img src='https://img.freepik.com/premium-photo/top-view-colorful-assortment-indian-food-beautifully-arranged-table_198067-743124.jpg' alt="Counter Images" style={{ height: "200px", width: "100%", objectFit: "cover" }} />
                                        </div>


                                    <div style={cardFooter} className='' onClick={() => handleCardClick(item)}>
                                        <h5 style={{ fontWeight: "bold", fontSize: "20px" }}>{item.name.toUpperCase()}</h5>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </>)

                        : (
                            <>

                                <div className=''>

                                    <div className='row'>
                                        <div className='col-12 col-xs-12 col-sm-12 col-md-8 col-lg-9 col-xl-9'>
                                            <h3 className='text-start mt-2 text-primary'>
                                                <ArrowBackIosTwoTone
                                                    onClick={goBack}
                                                    style={{ fontSize: 30, color: "dark", cursor: "pointer", fontWeight: "bold", }}
                                                />
                                                Items for {menuitems.name}</h3>
                                        </div>
                                        <div className='text-end  mt-2 col-12 col-xs-12 col-sm-12 col-md-4 col-lg-3 col-lg-3'>
                                            <Button variant="contained" sx={{
                                                width: { xs: '100%', sm: '100%', md: '50%', lg: '25%', xl: '25%' }
                                            }} onClick={() => setShowAddItem(!showAddItem)}>ADD</Button>
                                        </div>

                                    </div>


                                </div>
                                <div className='row'>

                                    <div className=''>


                                        {/* <TableContainer >
                                            <Table sx={{ minWidth: 200 }} aria-label="customized table">
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell align="center">ID</StyledTableCell>
                                                        <StyledTableCell align="center">Item Name</StyledTableCell>
                                                        <StyledTableCell align="center">Price</StyledTableCell>
                                                        <StyledTableCell align="center">Actions</StyledTableCell>

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {menuitems.menu
                                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        .map((item, index) => {
                                                            const isDisabled = disabledRows[item.itemId];

                                                            return (
                                                                <StyledTableRow key={item.itemId} disabled={isDisabled} sx={{ cursor: isDisabled ? "not-allowed" : "pointer" }}>
                                                                    <StyledTableCell align="center">
                                                                        <Typography
                                                                            sx={{ color: isDisabled ? "gray" : "black" }}
                                                                        >
                                                                            {index + 1}
                                                                        </Typography>
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="center">
                                                                        <Typography
                                                                            sx={{ color: isDisabled ? "gray" : "black" }}
                                                                        >
                                                                            {item.name}
                                                                        </Typography>
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="center">
                                                                        <Typography
                                                                            sx={{ color: isDisabled ? "gray" : "black" }}
                                                                        >
                                                                            {item.price}
                                                                        </Typography>
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="center">
                                                                        <IconButton sx={{ color: 'blue' }} disabled={isDisabled} onClick={() => { setShowItemEdit(!showItemEdit), setItem(item), setEditedPrice(item.price), setEditedItemName(item.name) }}>
                                                                            <Edit />
                                                                        </IconButton>
                                                                        <IconButton sx={{ color: 'red' }} disabled={isDisabled} onClick={() => deleteItem(item.itemId)}>
                                                                            <Delete />
                                                                        </IconButton>

                                                                    </StyledTableCell>
                                                                </StyledTableRow>
                                                            );
                                                        })}
                                                </TableBody>
                                            </Table>
                                            <TablePagination
                                                rowsPerPageOptions={[5, 10, 15]}
                                                component="div"
                                                count={menuitems.menu.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                            />
                                        </TableContainer> */}
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


                                        <React.Fragment>
                                            <Dialog
                                                open={showItemEdit}
                                                onClose={handleClose}
                                                PaperComponent={PaperComponent}
                                                aria-labelledby="draggable-dialog-title"
                                            >
                                                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                                                    Edit Item
                                                </DialogTitle>
                                                <form onSubmit={handleEditItem}>
                                                    <DialogContent className='px-5'>
                                                        <TextField
                                                            fullWidth
                                                            label="Item Name"
                                                            name="editedItemName"
                                                            value={editedItemName}
                                                            onChange={editaddCategoryonChangeHandler1}
                                                            onKeyPress={(e) => {
                                                                const isValidInput = /^[a-zA-Z\s]*$/; // Allows letters and spaces
                                                                if (!isValidInput.test(e.key)) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                            inputProps={{
                                                                maxLength: 50 
                                                            }}
                                                            error={editerr1.addCategoryErr}
                                                            helperText={editerr1.addCategoryErr}
                                                            margin="normal"
                                                            required
                                                        />
                                                        <TextField
                                                            fullWidth
                                                            label="Price"
                                                            name="editedPrice"
                                                            value={editedPrice}
                                                            onChange={editaddCategoryonChangeHandler2}
                                                            margin="normal"
                                                            onKeyPress={(e) => {
                                                                const isValidInput = /[0-9]/;
                                                                if (!isValidInput.test(e.key)) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                            inputProps={{
                                                                maxLength: 4 
                                                            }}
                                                            error={editerr2.addCategoryErr}
                                                            helperText={editerr2.addCategoryErr}
                                                            required
                                                        />
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button autoFocus onClick={() => { setShowItemEdit(!showItemEdit), setEditedItemName(''), setEditedPrice(''), editerr2.addCategoryErr = "", editerr1.addCategoryErr = "" }}>
                                                            Cancel
                                                        </Button>
                                                        <Button type='submit'>Submit</Button>
                                                    </DialogActions>
                                                </form>
                                            </Dialog>
                                        </React.Fragment>

                                        <React.Fragment>
                                            <Dialog
                                                open={showAddItem}
                                                onClose={handleClose}
                                                PaperComponent={PaperComponent}
                                                aria-labelledby="draggable-dialog-title"
                                            >
                                                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                                                    Add Item
                                                </DialogTitle>
                                                <form onSubmit={handleAddItem}>
                                                    <DialogContent className='px-5'>
                                                        <TextField
                                                            fullWidth
                                                            label="Item Name"
                                                            name="itemName"
                                                            value={itemName}

                                                            onChange={addCategoryonChangeHandler1}

                                                            margin="normal"
                                                            onKeyPress={(e) => {
                                                                const isValidInput = /^[a-zA-Z\s]*$/; // Allows letters and spaces
                                                                if (!isValidInput.test(e.key)) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                            inputProps={{
                                                                maxLength: 50 
                                                            }}
                                                            error={err1.addCategoryErr}
                                                            helperText={err1.addCategoryErr}

                                                            required
                                                        />
                                                        <TextField
                                                            fullWidth
                                                            label="Price"
                                                            name="price"
                                                            value={price}

                                                            onChange={addCategoryonChangeHandler2}

                                                            margin="normal"
                                                            onKeyPress={(e) => {
                                                                const isValidInput = /[0-9]/;
                                                                if (!isValidInput.test(e.key)) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                            error={err2.addCategoryErr}
                                                            helperText={err2.addCategoryErr}
                                                            inputProps={{
                                                                maxLength: 4 
                                                            }}
                                                            required
                                                        />
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button autoFocus onClick={() => { setShowAddItem(!showAddItem), seItemName(''), setPrice(''), err1.addCategoryErr = "", err2.addCategoryErr = "" }}>
                                                            Cancel
                                                        </Button>
                                                        <Button type='submit'>Submit</Button>
                                                    </DialogActions>
                                                </form>
                                            </Dialog>
                                        </React.Fragment>


                                    </div>
                                </div>

                            </>)
                    }













                    <React.Fragment>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            PaperComponent={PaperComponent}
                            aria-labelledby="draggable-dialog-title"
                        >
                            <DialogTitle style={{ cursor: 'move', }} id="draggable-dialog-title">
                                Add Category
                            </DialogTitle>
                            <DialogContent className='px-5'>
                                <TextField
                                    fullWidth
                                    label="Category"
                                    name="categoryName"
                                    value={categoryName}
                                    // onChange={(e) => setCategoryName(e.target.value)}
                                    onChange={addCategoryonChangeHandler}
                                    // onChange={(e) => {
                                    //     const value = e.target.value;
                                    //     if (/^[a-zA-Z\s]*$/.test(value) && value.length >= 3 && value.length <= 20) {
                                    //         setCategoryName(value);
                                    //     }
                                    // }}
                                    onKeyPress={(e) => {
                                        // const charCode = e.which || e.keyCode;
                                        if (!/^[a-zA-Z\s]+$/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    inputProps={{
                                        minLength: 3,
                                        maxLength: 20,
                                    }}
                                    error={err.addCategoryErr}
                                    helperText={err.addCategoryErr}
                                    margin="normal"
                                    required
                                />
                                {/* {err.addCategoryErr && <span className='text-danger'>{err.addCategoryErr}</span>} */}
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={() => setOpen(!open)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleAddCategory}>Submit</Button>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment>
                    <React.Fragment>
                        <Dialog
                            open={showCategoryEdit}
                            onClose={handleClose}
                            PaperComponent={PaperComponent}
                            aria-labelledby="draggable-dialog-title"
                        >
                            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                                Update Category
                            </DialogTitle>
                            <DialogContent className='px-5'>
                                <TextField
                                    fullWidth
                                    label="Category"
                                    name="editedCategoryName"
                                    value={editedCategoryName}
                                    onChange={(e) => setEditCategoryName(e.target.value)}
                                    margin="normal"
                                    required
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={() => setShowCategoryEdit(!showCategoryEdit)} >
                                    Cancel
                                </Button>
                                <Button onClick={handleEditCategory}>Submit</Button>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment>
                </div >
            </>
        </div>
    )
}

export default CounterMenuItems
