import { useState, ChangeEvent } from 'react';
import React from 'react';
import { uploadPsychiatristFile } from "../../firebase/firebase";

interface TestResults {
  message: string;
  success: boolean;
}

const TestPage: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const [testResults, setTestResults] = useState<TestResults | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files ? Array.from(event.target.files) : null;
    setSelectedFiles(files);
    setTestResults(null); // Reset results when new files are selected
  };

  const runTest = async (): Promise<void> => {
    if (!selectedFiles || selectedFiles.length === 0) {
      const pleaseSelect: TestResults = { message: 'Please select files first', success: false };
      setTestResults(pleaseSelect);
      return;
    }

    try {
      const result = await uploadPsychiatristFile(selectedFiles, 'jg8cvuLmvtNMZKNn15M3PyzR6Ih1');
      const testCompleted: TestResults = {
        message: 'Test completed successfully!',
        success: true
      };
      setTestResults(testCompleted);
      console.log(result);
    } catch (error) {
      const testCompleted: TestResults = {
        message: `Error during test: ${error instanceof Error ? error.message : 'Unknown error'}`,
        success: false
      };
      setTestResults(testCompleted);
    }
  };

  return (
    <div>
      <div className="p-4 max-w-xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">File Test Page</h2>
          <div className="flex flex-col items-center p-6 border-2 border-dashed rounded-lg border-gray-300 hover:border-gray-400">
            <p className="mb-4 text-gray-500">Upload Files</p>
            <input
              type="file"
              multiple // Allow multiple file selection
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {selectedFiles && (
              <p className="mt-2 text-sm text-gray-500">
                Selected: {selectedFiles.map(file => file.name).join(', ')}
              </p>
            )}
          </div>
          <button
            onClick={runTest}
            disabled={!selectedFiles}
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg
              hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Run Test
          </button>
          {testResults && (
            <div className={`mt-4 p-4 rounded ${testResults.success ? 'bg-green-50' : 'bg-red-50'}`}>
              <p className={`text-sm ${testResults.success ? 'text-green-700' : 'text-red-700'}`}>
                {testResults.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPage;