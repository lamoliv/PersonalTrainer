import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function CalendarPage() {
    const [trainings, setTrainings] = useState([]);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    };

    useEffect(() => {
        fetchData();
    }, [])

    const events = trainings.map(tr => {
        let date = new Date(tr.date)
        const details = {
            start: date,
            end: new Date(moment(date).add(tr.duration, 'minutes')),
            title: tr.activity + ' / ' + tr.customer.firstname + ' ' + tr.customer.lastname
        }
        return details
    });

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 800 }}
            />
        </div>
    );
}

