import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import moment from 'moment/moment';
import Snackbar from '@mui/material/Snackbar';

export default function TrainingList() {
    const [trainings, setTrainings] = useState([]);
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(err => console.error(err));
    };

    const deleteTraining = (params) => {
        if (window.confirm('Are you sure you want to delete this workout?')) {
            fetch(`https://customerrest.herokuapp.com/api/trainings/${params}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        setMessage('Training session deleted');
                        openSnackbar();
                        fetchData();
                    }
                    else
                        alert('Something went wrong');
                })
                .catch(err => console.error(err))
        }
    }

    const openSnackbar = () => {
        setOpen(true);
    }

    const closeSnackbar = () => {
        setOpen(false);
    }

    const columns = [
        { headerName: 'Activity', field: 'activity', sortable: true, filter: true },
        {
            headerName: 'Date', field: 'date', sortable: true, filter: true,
            cellRenderer: params =>
                moment(params.data.date).format('DD.MM.YYYY HH:mm')
        },
        { headerName: 'Duration', field: 'duration', sortable: true, filter: true },
        {
            headerName: 'Customer',
            field: 'customer',
            sortable: true,
            filter: true,
            cellRenderer: params =>
                `${params.data.customer.firstname} ${params.data.customer.lastname}`
        },
        {
            width: 150, sortable: false, filter: false,
            cellRenderer: params =>
                <Button size="small" variant="outlined" color="error"
                    onClick={() => deleteTraining(params.data.id)}>Delete</Button>
        }
    ];

    return (
        <div>
            <div className="ag-theme-material"
                style={{
                    height: 650,
                    width: '90%',
                    margin: 'auto',
                }}
            >
                <AgGridReact
                    animateRows={true}
                    columnDefs={columns}
                    rowData={trainings}
                    pagination={true}
                    paginationPageSize={10}
                >
                </AgGridReact>
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
