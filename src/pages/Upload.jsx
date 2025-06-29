import { useState } from "react";

function Upload(){
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);

            // simulating processing delay 
            setTimeout(() => {
                setResult({
                    status:'processed',
                    alerts: [
                        'Empty spot detected in Shelf Row B',
                        'Product XYZ missing in Section A2',
                    ],
                });
            }, 2000);
        }
    };

    return(
        <div>
            <h1 className="text-2xl font-bold mb-6">ShelfCam Image Upload</h1>

            <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-6"/>

            {preview && (
                <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">Uploaded Image:</p>
                    <img 
                    src = {preview}
                    alt="uploaded"
                    className="w-full max-w-lg rounded shadow"/>
                </div>
            )}

            {result && (
                <div className="bg-white p-4 rounded shadow-md">
                    <h2 className="font-semibold mb-2"> AI Detected Alerts:</h2>
                    <ul className="list-disc pl-6 text-sm text-red-600 space-y-1">
                        {result.alerts.map((alert, idx)=>{
                            <li key={idx}>{alert}</li>
                        })}
                    </ul>
                    </div>
            )}
        </div>
    );
}

export default Upload;