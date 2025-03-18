
import React, { use, useEffect, useState } from 'react'
import { Card, Typography, Button, Switch, FormControlLabel, Container, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

import CounterRegistrationApis from '../Api_Services/CounterRegistrationApis';
import DataTable from 'react-data-table-component'

import { Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { confirmAlert } from "react-confirm-alert";
import socket from '../Api_Services/socket';

function Availability() {
    const [counters, setCounters] = useState([]);
    const [switchStates, setSwitchStates] = useState({});
    const [searchText, setSearchText] = useState(""); // Search text
    const [filteredCounters, setFilteredCounters] = useState([]); // Filtered data

    const fetchData = async () => {
        try {
            const response = await CounterRegistrationApis.fetchAllRegisteredCounterDetails();
            if (response.status === 200) {
                setCounters(response.data);
                setFilteredCounters(response.data)
            }
        } catch (error) {
            // console.error("API call failed:", error);
            alert("API was not called");
        }
    };

    useEffect(() => {
        fetchData();
        socket.on("counterStatus", fetchData);
    }, []);


    // const handleChange = async (counter) => {

    //     const id = counter.ID;
    //     const availability = counter.AVAILABLE == 1 ? 0 : 1; 

    //     console.log(counter,id,availability);


    //     try {
    //         const response = await CounterRegistrationApis.registerCounterUpdateForAvailability(id, availability);
    //         console.log(response);

    //         if (response.status === 201) {
    //             // alert(response.data.message);
    //              toast.success("Counter Details Updated Successfully", {
    //                                   position: "top-right",
    //                                   autoClose: 5000, // Closes after 3 seconds
    //                                   hideProgressBar: false,
    //                                   closeOnClick: true,
    //                                   pauseOnHover: true,
    //                                   draggable: true,
    //                                   progress: undefined,
    //                                   theme: "light",
    //                                 });
    //             fetchData();
    //         } else {
    //             throw new Error("Failed to update availability");
    //         }
    //     } catch (error) {
    //         alert("Error: " + (error.response?.data?.message || "API call failed"));

    //     }
    // };

    const handleChange = async (counter) => {
        confirmAlert({
            title: "Confirm Update",
            message: `Do you want to update the counter availability Status -- ${counter.AVAILABLE == 1 ? "Open" : "Close"} to -- ${counter.AVAILABLE == 1 ? "Close" : "Open"} `,
            buttons: [
                {
                    label: "Ok",
                    onClick: async () => {
                        try {
                            const id = counter.ID;
                            const availability = counter.AVAILABLE == 1 ? 0 : 1;
                            const response = await CounterRegistrationApis.registerCounterUpdateForAvailability(id, availability);

                            if (response.status === 201) {
                                toast.success("Counter Details Updated Successfully", { position: "top-right", autoClose: 5000 });
                                fetchData();
                            } else {
                                throw new Error("Failed to update availability");
                            }
                        } catch (error) {
                            toast.error("Error: " + (error.response?.data?.message || "API call failed"));
                        }
                    }
                },
                {
                    label: "Cancel",
                    onClick: () => { }
                }
            ]
        });
    };

    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setSearchText(searchValue);

        const filteredData = counters.filter((counter) =>
            counter.COUNTERNAME.toLowerCase().includes(searchValue)
        );
        setFilteredCounters(filteredData);
    };

    const columns = [
        {
            name: "Counter Name",
            selector: (row) => row.COUNTERNAME,
            sortable: true,
            wrap: true,
            cell: (row) => <b>{row.COUNTERNAME}</b>,

        },
        // {
        //     name: "Owner Name",
        //     selector: (row) => row.OWNERNAME,
        //     sortable: true,
        //     center: true,
        //     cell: (row) => <b>{row.OWNERNAME}</b>,
        // },
        // {
        //     name: "Mobile Number",
        //     selector: (row) => row.MOBILENO,
        //     sortable: true,
        //     center: true,
        //     cell: (row) => <b>{row.MOBILENO}</b>,
        // },
        {
            name: "Status",
            selector: (row) => row.AVAILABLE,
            sortable: true,
            center: true,
            cell: (row) => (
                <Badge bg={row.AVAILABLE === 1 ? "success" : "danger"} className="p-2">
                    {row.AVAILABLE === 1 ? "Open" : "Closed"}
                </Badge>
            ),
        },

        {
            name: "Actions",
            center: true,
            cell: (row) => (
                <Button
                    variant="contained"
                    className=" fw-bold rounded-pill"
                    sx={{ width: { xs: "100%", sm: '75%', md: "75%", lg: '50%' } }}
                    onClick={() => handleChange(row)}
                >
                    Change
                </Button>
            ),
        },
    ];


    const tableStyles = {
        tableHead: {
            backgroundColor: "darkblue",
            color: "white",
            fontSize: "16px",
            padding: "12px",
            Margin: '10px',
        },
        tableRow: {
            borderBottom: "1px solid #ccc",
        },
        tableRowHover: {
            backgroundColor: "#f8f9fa",
        },
        searchInput: {
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            border: "2px solid #007bff",
            fontSize: "16px",
            marginBottom: "10px",
        },
    };




    return (
        <Container className="mt-4">
            <h4 className="text-primary mb-3">Counters Availability</h4>

            <TextField
                type="text"
                placeholder="🔍 Search Counter Name..."
                value={searchText}
                onChange={handleSearch}
                className="search-input mb-3"
            />

            <DataTable
                columns={columns}
                data={filteredCounters}
                pagination
                highlightOnHover
                striped
                responsive
                defaultSortField="COUNTERNAME"
                customStyles={{
                    headCells: {
                        style: tableStyles.tableHead,
                    },
                    rows: {
                        style: tableStyles.tableRow,
                        hoverStyle: tableStyles.tableRowHover,
                    },
                }}
                className="custom-table"
            />
        </Container>
    );
}

export default Availability;

