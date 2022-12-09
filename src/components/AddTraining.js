import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';


export default function AddTraining(props) {
    const [open, setOpen] = React.useState(false);

    const [training, setTraining] = React.useState({
        activity: '',
        date: '',
        duration: '',
        customer: props.customerId
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value })
    }

    const handleSave = () => {
        props.addTraining(training);
        setOpen(false);
    }

    const [selectedDate, handleChange] = useState(moment());

    const changeDate = (date) => {
        handleChange(date);
        const formatDate = date.toISOString();
        setTraining({ ...training, date: formatDate });
    }

    return (
        <div>
            <Button
                style={{
                    margin: 'auto',
                    borderRadius: 20,
                    backgroundColor: '#ffcb8d',
                    color: '#000000',
                }}
                size="small"
                variant="outlined"
                onClick={handleClickOpen}>
                Add training
            </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>New training</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        label="Activity"
                        name="activity"
                        value={training.activity}
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DateTimePicker
                            margin="dense"
                            label="Date"
                            name="date"
                            value={selectedDate}
                            onChange={date => changeDate(date)}
                            inputFormat="DD.MM.YYYY HH:mm"
                            variant="standard"
                            renderInput={(params) => <TextField fullWidth variant="standard" {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        margin="dense"
                        label="Duration"
                        name="duration"
                        placeholder="Duration (min)"
                        value={training.duration}
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
