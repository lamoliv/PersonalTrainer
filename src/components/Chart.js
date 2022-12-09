import React, { useState, useEffect } from 'react';
import lodash from 'lodash';
import {
    BarChart, Bar, XAxis, YAxis, ResponsiveContainer
} from 'recharts';

export default function TrainingChart() {
    const [list, setList] = useState([]);

    function fetchData() {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(Data => {
                setList(lodash(Data)
                    .groupBy(list => list.activity)
                    .map((value, key) => (
                        { activity: key, totalamount: lodash.sumBy(value, 'duration') }
                    ))
                    .value());
            })
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="App">
            <ResponsiveContainer width='100%' height={500}>
                <BarChart data={list} margin={{
                    top: 5, right: 30, left: 30, bottom: 5,
                }}>
                    <XAxis dataKey="activity" />
                    <YAxis label={{ value: "Duration (min)", angle: 270, position: "insideLeft" }} />
                    <Bar dataKey="totalamount" fill="#ffcb8d" />
                </BarChart>
            </ ResponsiveContainer>

        </div>
    )
}
