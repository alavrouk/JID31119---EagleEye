import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FormControl, Select, MenuItem, CircularProgress } from '@mui/material';
import "./styles/trafficPlot.css"

function TrafficPlot() {
    const [selectedModel, setSelectedModel] = useState({ id: "neuralprophet", name: "Neural Prophet" });
    const [modelData, setModelData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let url = `http://localhost:8000/api/${selectedModel.id}`;
            setIsLoading(true);

            try {
                const response = await fetch(url);
                const data = await response.json();
                setModelData(data);
            } catch (error) {
                alert(`Error fetching data: ${error}`);
            } finally {
                setIsLoading(false);
            }
        };

        if (selectedModel.id) {
            fetchData();
        }
    }, [selectedModel]);

    useEffect(() => {
        const formattedData = Object.keys(modelData).map(key => ({
            time: key,
            value: modelData[key]
        }));

        setChartData(formattedData);
    }, [modelData]);

    const models = [
        { id: "LSTM", name: "LSTM" },
        { id: "neuralprophet", name: "Neural Prophet" },
        { id: "SARIMAX", name: "SARIMA" },
    ];

    const handleDropdownChange = (e) => {
        const selectedId = e.target.value;
        const selected = models.find(model => model.id === selectedId);
        setSelectedModel(selected || {});
    };

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
            {isLoading ? (
                <div className="loading-indicator" style={{ height: "25rem", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", margin: "auto" }}>
                    <CircularProgress />
                </div>
            ) : (
                <ResponsiveContainer width='100%' height={400}>
                    <BarChart
                        width={800}
                        height={400}
                        data={chartData}
                        margin={{
                            top: 20, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </>
    );
}

export default TrafficPlot;
