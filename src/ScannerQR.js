import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import axios from 'axios';

function ScannerQR() {
  const [scanEnabled, setScanEnabled] = useState(true);
  const [message,setMessage]=useState("");
  const [data,setData]=useState("");
  const handleScan = (result) => {
    if (result) {
      console.log("Scanned data:",result[0].rawValue);
      setScanEnabled(false);
      fetchMessageFromServer(result[0].rawValue);
      setTimeout(() => {
        setScanEnabled(true);
      }, 1000);
    }
  };

  const fetchMessageFromServer = async (scannedData) => {
    //console.log(typeof(scannedData[0].rawValue));
    setData(scannedData)
    
    try {
      const response = await axios.post(process.env.REACT_APP_POST_QR_API, {token:scannedData},
      );
      console.log('Server response:', response.data.success);
      setMessage(response.data.success);

    } catch (error) {
      console.error('Error fetching message from server:', error);
      setMessage("error");
    }
  };

  return (
    <div>
      {scanEnabled && (
        <Scanner
          onScan={handleScan}
          onError={(error) => console.error('Scanner error:', error)}
        />
      )}
      {<h1>{message}</h1>}
    </div>
  );
}

export default ScannerQR;
