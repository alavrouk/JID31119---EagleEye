from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import logging
import os
from typing import List

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





if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8000, log_level="info")