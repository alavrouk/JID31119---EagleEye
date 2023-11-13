import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FormControl, Select, MenuItem } from '@mui/material';
import data from './businessData.json'
import "./styles/trafficPlot.css"

function TrafficPlot() {

    const [selectedModel, setSelectedModel] = useState({ id: "LSTM", name: "LSTM" })

    const models = [
        { id: "LSTM", name: "LSTM" },
        { id: "Neural Prophet", name: "Neural Prophet" },
        { id: "SARIMA", name: "SARIMA" },
    ]

    const handleDropdownChange = (e) => {
        const selectedId = e.target.value;
        const selected = models.find(model => model.id === selectedId);
        setSelectedModel(selected || {});
    }

    return (
        <>
            <div className='model-drop-down-menu'>
                <FormControl variant="outlined">
                    <Select value={selectedModel.id} onChange={handleDropdownChange}>
                        <MenuItem value="" disabled>
                            Select Model
                        </MenuItem>
                        {models.map((model, index) => (
                            <MenuItem key={index} value={model.id}>
                                {model.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <ResponsiveContainer width='100%' height={400}>
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