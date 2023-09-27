import React, { useState } from 'react'
import { useDropzone } from "react-dropzone"
import fileIcon from '../../assets/icons/fileIcon.svg'
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
            </div>
            <button className='file-upload-button'>Upload</button>
        </>
    )
}

export default FileDrop
