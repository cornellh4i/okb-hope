// test_page.tsx

import React from 'react';
import { FileUploader } from '../../firebase/firebase'; // Import your function

const TestPage: React.FC = () => {
    const handleUpload = () => {
        // Call the imageUpload function or any other logic
        console.log('Image upload function called');
        // You might want to implement the upload logic here
    };

    return (
        <div>
            <h1>Test Page</h1>
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default TestPage; // Make sure to export your component
