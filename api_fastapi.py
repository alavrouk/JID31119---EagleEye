from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
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


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8000, log_level="info")

