import { useState, ChangeEvent } from 'react';
import { uploadPsychiatristProfilePic } from '../../firebase/firebase';


interface TestResult {
 message: string;
 success?: boolean;
}


const TestPage: React.FC = () => {
 const [selectedFile, setSelectedFile] = useState<File | null>(null);
 const [testResult, setTestResult] = useState<TestResult | null>(null);


 const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
   const file = event.target.files?.[0] || null;
   setSelectedFile(file);
   setTestResult(null);  // Reset results when new file is selected
 };


 const runTest = async (): Promise<void> => {
   if (!selectedFile) {
     setTestResult({ message: "Please select a file first", success: false });
     return;
   }


   try {
     // Replace this with your actual test function
     const result = await uploadPsychiatristProfilePic(selectedFile, "zCrQQIeSpdbNHBZdktxkJPApzoA3");
     setTestResult({
       message: "Test completed successfully!",
       success: true
     });
     // You can modify this to show the actual test results
   } catch (error) {
     setTestResult({
       message: `Error during test: ${error instanceof Error ? error.message : 'Unknown error'}`,
       success: false
     });
   }
 };


 return (
   <div className="p-4 max-w-xl mx-auto">
     <div className="bg-white rounded-lg shadow p-6">
       <h2 className="text-xl font-semibold mb-4">File Test Page</h2>
      
       <div className="flex flex-col items-center p-6 border-2 border-dashed rounded-lg border-gray-300 hover:border-gray-400">
         <p className="mb-4 text-gray-500">Upload File</p>
         <input
           type="file"
           onChange={handleFileChange}
           className="block w-full text-sm text-gray-500
             file:mr-4 file:py-2 file:px-4
             file:rounded-full file:border-0
             file:text-sm file:font-semibold
             file:bg-blue-50 file:text-blue-700
             hover:file:bg-blue-100"
         />
         {selectedFile && (
           <p className="mt-2 text-sm text-gray-500">
             Selected: {selectedFile.name}
           </p>
         )}
       </div>


       <button
         onClick={runTest}
         disabled={!selectedFile}
         className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg
           hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
       >
         Run Test
       </button>


       {testResult && (
         <div className={`mt-4 p-4 rounded ${
           testResult.success ? 'bg-green-50' : 'bg-red-50'
         }`}>
           <p className={`text-sm ${
             testResult.success ? 'text-green-700' : 'text-red-700'
           }`}>
             {testResult.message}
           </p>
         </div>
       )}
     </div>
   </div>
 );
};


export default TestPage;