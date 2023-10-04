import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import data from './businessData.json'

function TrafficPlot() {

    return (
        <><ResponsiveContainer width ='100%' height = {400}>
            <BarChart
                width={800}
                height={400}
                data={data}
                margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="yhat1" fill="#8884d8" />
                <Bar dataKey="Actual" fill="#82ca9d" />
            </BarChart>
            </ResponsiveContainer>
        </>
    )
}

export default TrafficPlot