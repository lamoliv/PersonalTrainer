import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import Snackbar from '@mui/material/Snackbar';

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [message, setMessage] = useState('');
    const [gridApi, setGridApi] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err));
    };

    const deleteCustomer = (params) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            fetch(params, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setMessage('Customer deleted');
                        openSnackbar();
                        fetchData();
                    }
                    else
                        alert('Something went wrong');
                })
                .catch(err => console.error(err))
        }
    }

    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok) {
                    setMessage('New customer added')
                    openSnackbar();
                    fetchData();
                }
                else
                    alert('Something went wrong');
            })
            .catch(err => console.log(err));
    }

    const editCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok) {
                    setMessage('Customer data edited')
                    openSnackbar();
                    fetchData();
                }
                else
                    alert('Something went wrong');
            })
            .catch(err => console.log(err));
    }

    const addTraining = (newWorkout) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            body: JSON.stringify(newWorkout),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                if (response.ok) {
                    setMessage('Customer training session added')
                    openSnackbar();
                    fetchData();
                }
                else
                    alert('Something went wrong');
            })
            .catch(err => console.error(err));
    }

    const openSnackbar = () => {
        setOpen(true);
    }

    const closeSnackbar = () => {
        setOpen(false);
    }

    const columns = [
        {
            width: 150, sortable: false, filter: false,
            cellRenderer: params =>
                <AddTraining
                    addTraining={addTraining}
                    customerId={params.data.links[0].href}
                />
        },
        { headerName: 'First name', field: 'firstname', sortable: true, filter: true },
        { headerName: 'Last name', field: 'lastname', sortable: true, filter: true },
        { headerName: 'Email', field: 'email', sortable: true, filter: true },
        { headerName: 'Phone', field: 'phone', sortable: true, filter: true },
        { headerName: 'Address', field: 'streetaddress', sortable: true, filter: true },
        { headerName: 'City', field: 'city', sortable: true, filter: true },
        { headerName: 'Postcode', field: 'postcode', sortable: true, filter: true },
        {
            width: 150, sortable: false, filter: false,
            cellRenderer: params =>
                <EditCustomer editCustomer={editCustomer} customer={params.data} />
        },
        {
            width: 150, sortable: false, filter: false,
            cellRenderer: params =>
                <Button size="small" variant="outlined" color="error"
                    onClick={() => deleteCustomer(params.data.links[0].href)}>Delete</Button>
        }
    ];

    function getParams() {
        return {
            columnKeys: [
                'firstName',
                'lastname',
                'email',
                'phone',
                'streetaddress',
                'city',
                'postcode'
            ],
            fileName: 'CustomerData.csv',
        };
    }

    function onGridReady(params) {
        setGridApi(params.api);
    }

    const exportCSV = () => {
        let params = getParams();
        gridApi.exportDataAsCsv(params);
    };

    return (
        <div>
            <div className="ag-theme-material"
                style={{
                    height: 650,
                    width: '95%',
                    margin: 'auto',
                }}
            >
                <AddCustomer addCustomer={addCustomer} />
                <AgGridReact
                    onGridReady={onGridReady}
                    animateRows={true}
                    columnDefs={columns}
                    rowData={customers}
                    pagination={true}
                    paginationPageSize={10}
                >
                </AgGridReact>
                <Button
                    style={{
                        margin: 20,
                        marginBottom: 100,
                        float: 'right',
                        color: '#ffffff',
                        backgroundColor: '#969b98',
                        fontSize: '14px'
                    }} variant="contained"
                    className="float-right"
                    onClick={exportCSV}>
                    CSV Export
                </Button>

                <Snackbar
                    open={open}
                    message={message}
                    autoHideDuration={3000}
                    onClose={closeSnackbar}
                />
            </div>
        </div>
    );
};