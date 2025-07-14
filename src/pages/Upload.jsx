import { useState } from "react";

function Upload() {
    const [file, setFile] = useState(null);

    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);

        try {
            const token = localStorage.getItem("accessToken");
            await fetch("http://localhost:8000/upload-inventory", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            alert("Upload successful!");
        } catch (err) {
            console.error(err);
            alert("Upload failed.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Upload Inventory CSV</h1>
            <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Upload</button>
        </div>
    );
}

export default Upload;
