import React, { useState }from 'react';
import Dropzone from "react-dropzone";
import './dropzonestyle.css';


export default function DropZone() {
    const [fileNames, setFileNames] = useState([]);
    const handleDrop = acceptedFiles =>
    setFileNames(acceptedFiles.map(file => file.name));
    return (
        <div className="App">
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()}/>
                <p>Coloque o arquivo aqui</p>
              </div>
            )}
          </Dropzone>
          <div>
            <strong>Arquivo ^ </strong>
            <ul>
              {fileNames.map(fileName => (
                <li key={fileName}>{fileName}</li>
              ))}
            </ul>
          </div>
        </div>
      );
}
