import React, { useState } from 'react'
import { useDropzone } from "react-dropzone"
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import fileIcon from '../../assets/icons/fileIcon.svg'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './styles/fileDrop.css'

function FileDrop() {

    const [uploadedFiles, setUploadedFiles] = useState([])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            "text/csv": [".csv"],
            "application/vnd.ms-excel": [".xls"],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"]
        },
        maxSize: 10485760, // 1MB file size limit
        onDrop: (acceptedFiles) => {
            const newFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                    id: Math.random(),
                })
            );

            setUploadedFiles(prevFiles => [...prevFiles, ...newFiles]);
        },
    })

    const notify = (message, type, options) => {
        switch (type) {
            case "success":
                toast.success(message, options);
                break;
            case "error":
                toast.error(message, options);
                break;
            case "warning":
                toast.warning(message, options);
                break;
            default:
                toast(message, options);
                break;
        }
    };

    const handleFileUpload = async () => {
        const formData = new FormData();
        uploadedFiles.forEach((file) => {
            formData.append('files', file);
        });

        try {
            const response = await fetch('http://localhost:8000/api/upload_files', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (response.ok) {
                notify("Files uploaded successfully!", "success", {
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                clearUploadedFiles();  // clear the uploaded files from the state if the upload is successful
            } else {
                alert("Error uploading files:" + JSON.stringify(data));
            }
        } catch (error) {
            alert("There was an error uploading the files:" + error);
        }
    };


    const removeFile = (id, event) => {
        event.stopPropagation()
        setUploadedFiles((prev) => {
            const fileToRemove = prev.find((file) => file.id === id)
            if (fileToRemove) {
                URL.revokeObjectURL(fileToRemove.preview)
            }
            return prev.filter((file) => file.id !== id)
        })
    }

    const clearUploadedFiles = () => {
        uploadedFiles.forEach((file) => {
            URL.revokeObjectURL(file.preview);
        });
        setUploadedFiles([]);
    };

    return (
        <>
            <div className='dropzone-container'>
                <div
                    {...getRootProps()}
                    className={`dropzone ${uploadedFiles.length > 0 ? "has-files" : ""
                        }`}
                >
                    <input {...getInputProps()} />
                    <div className="dropzone-text">
                        {uploadedFiles.length > 0 ? null : isDragActive ? (
                            <p>Drop the files here ...</p>
                        ) : (
                            <div>
                                <p style={{ fontWeight: 600, fontSize: "17px" }}>
                                    Add files
                                </p>
                                <p>Or drag and drop</p>
                            </div>
                        )}
                    </div>
                    <div className="dropzone-files">
                        {uploadedFiles.map((file) => (
                            <div
                                key={file.id}
                                className="dropzone-file-container"
                            >
                                <div className="dropzone-preview-container" key={file.id}>
                                    <img src={fileIcon} alt="file" />
                                    <button
                                        className="file-remove-button"
                                        onClick={(event) => removeFile(file.id, event)}
                                    >
                                        <div>X</div>
                                    </button>
                                </div>
                                <div className="dropzone-file-info">
                                    <div>{file.name}</div>
                                    <div>{(file.size / 1024).toFixed(2)} KB</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div >
                <div className='file-upload-button-container'>
                    <Button
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        onClick={handleFileUpload}
                    > Upload files</Button>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default FileDrop
