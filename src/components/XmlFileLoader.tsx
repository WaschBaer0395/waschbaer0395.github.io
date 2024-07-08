// src/components/XmlFileLoader.tsx
import React, {useState} from 'react'
import {Mapping} from './Mapping.ts'
import {convertToXML, parseXML} from './parseXML';
import {Devices} from "./Devices.ts";


const XmlFileLoader: React.FC = () => {
    const [data, setData] = useState<Mapping | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [devices, setDevices] = useState<Devices[]>([])


    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const fileText = await file.text();
                const parsedData =  await parseXML(fileText)
                setData(parsedData);

            } catch (err) {
                setError('Failed to parse XML');
            }
        }
    };

    const handleDownload = () => {
        if (data) {
            const xml = convertToXML(data);
            const blob = new Blob([xml], { type: 'application/xml' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'converted_file.xml';
            a.click();
            URL.revokeObjectURL(url);
        }
    };



    return (
        <div>
            <h1>Upload XML File</h1>
            <input type="file" onChange={handleFileUpload} accept=".xml" />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button onClick={handleDownload}>Download XML</button>
        </div>
    )
}

export default XmlFileLoader