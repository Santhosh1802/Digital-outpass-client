import React, { useEffect, useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

function ScannerQR() {
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    async function checkCameraPermission() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setPermissionGranted(true);
        stream.getTracks().forEach(track => track.stop());
      } catch (error) {
        console.error('Camera permission denied:', error);
        setPermissionGranted(false);
      }
    }
    checkCameraPermission();
  }, []);

  return (
    <div className='scanqr'>
      <h1>ScannerQR</h1>
      {permissionGranted ? (
        <Scanner
          onScan={(result) => {
            console.log(result);
          }}
        />
      ) : (
        <p>Please allow camera access to use the QR scanner.</p>
      )}
    </div>
  );
}

export default ScannerQR;
