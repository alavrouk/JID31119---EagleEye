from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from scipy.optimize import linprog

import logging
import os
from typing import List
import pandas as pd
from src.algorithms.airfield_utilization import SARIMA
from src.algorithms.airfield_utilization import LSTM
from src.algorithms.airfield_utilization import neural_prophet
import torch
import numpy as np

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()
allowed_origins = [
    "http://localhost:3000",  # React app default port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



#################################################
#                                               #
#               API ENDPOINTS                   #
#                                               #
#################################################

"""
Test endpoint for checking if the API is running.
"""
@app.get("/api/")
async def root():
    return {"message": "Hello World"}


"""
Endpoint for retreiving a multipart form data file
contianing .csv and .xslx files. Stores the file to local storage.
"""
@app.post("/api/upload_files")
async def upload_files(files: List[UploadFile] = File(...)):
    for file in files:
        file_destination = f"{os.getcwd()}/uploaded_files/{file.filename}"
        with open(file_destination, "wb+") as file_object:
            file_object.write(file.file.read())
        
    return {"Result": "OK", "filenames": [file.filename for file in files]}

@app.get("/api/SARIMAX")
async def SARIMAX():
    df = pd.read_csv('sample_data/sample.csv')
    x, y = SARIMA.fit_sarimax(data=df)
    return y

@app.get("/api/neuralprophet")
async def neuralprophet():
    df = pd.read_csv('sample_data/sample.csv')
    preds = neural_prophet.predict_next_24(df)
    return preds

@app.get("/api/LSTM")
async def lstm():
    df = pd.read_csv('sample_data/sample.csv')
    raw_data = np.array(df['y'].tolist())
    # x, y = LSTM.format_data(raw_data, look_back=168)
    # print(x.shape)
    # print(y.shape)
    # X_train_np, X_test_np = LSTM.split_data(x)
    # y_train_np, y_test_np = LSTM.split_data(y)
    # print(X_train_np.shape)
    # print(y_train_np.shape)
    # X_train = torch.FloatTensor(X_train_np)
    # y_train = torch.FloatTensor(y_train_np)
    # X_test = torch.FloatTensor(X_test_np)
    # y_test = torch.FloatTensor(y_test_np)
    # LSTM.train(X_train, y_train, X_test, y_test)
    model = torch.load('model.pth')
    model.eval()  # Set the model to evaluation mode
    raw_data = torch.FloatTensor(np.array(raw_data[-168:])).unsqueeze(0)

    with torch.no_grad():  # No need to track gradients during evaluation
        outputs = model(raw_data)
    outputs=outputs.view(-1).numpy()[-24:].tolist()
    outputs = pd.Series(outputs)
    return outputs

@app.get("/api/linearprogramming")
async def linearprogramming():
    # Number of origins and destinations
    n = 100
    m = 100

    # Generate random data for the example
    np.random.seed(42)  # for reproducibility

    # Time matrix (time taken in hours) - random values between 1 and 10
    time_matrix = np.random.randint(1, 11, size=(n, m))

    # Supply (number of planes at origins) - random values between 1 and 5
    supply = np.random.randint(1, 6, size=n)

    # Adjust the total demand to match the total supply
    total_planes = np.sum(supply)
    average_demand = total_planes // m
    remaining_planes = total_planes - average_demand * m

    # Set the demand for most destinations to the average value
    demand = np.full(m, average_demand)

    # Distribute the remaining planes among some of the destinations
    demand[:remaining_planes] += 1

    # Objective function coefficients (minimize total time)
    c = time_matrix.flatten()

    # Supply constraints (planes leaving each origin)
    A_eq_supply = np.zeros((n, n*m))
    for i in range(n):
        A_eq_supply[i, i*m:i*m+m] = 1

    # Demand constraints (planes arriving at each destination)
    A_eq_demand = np.zeros((m, n*m))
    for i in range(m):
        A_eq_demand[i, i::m] = 1

    # Combine supply and demand constraints
    A_eq = np.vstack([A_eq_supply, A_eq_demand])
    b_eq = np.hstack([supply, demand])

    # Solve the linear programming problem
    res = linprog(c, A_eq=A_eq, b_eq=b_eq, method='highs')

    response = {
        "Optimization Message": res.message,
        "Optimal Total Time": res.fun,
        "Solution Vector (First 10 Elements)": res.x[:10].tolist(),  # Converting numpy array to list for JSON serialization
        "Status Code": res.status,
        "Number of Iterations": res.nit
    }

    return response


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8000, log_level="info")

