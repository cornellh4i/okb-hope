import { useState, ChangeEvent } from 'react';
import { uploadProfilePic, fetchProfilePic} from '../../firebase/firebase';

interface TestResult {
  message: string;
  success?: boolean;
}

const TestPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [uid, setUid] = useState<string>(''); // Store UID input
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null); // Store fetched profile picture URL

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
      const result = await uploadProfilePic(selectedFile, "jg8cvuLmvtNMZKNn15M3PyzR6Ih1", false);
      setTestResult({
        message: "Test completed successfully!",
        success: true
      });
    } catch (error) {
      setTestResult({
        message: `Error during test: ${error instanceof Error ? error.message : 'Unknown error'}`,
        success: false
      });
    }
  };

  const fetchProfilePicture = async (): Promise<void> => {
    if (!uid) {
      setTestResult({ message: "Please enter a UID", success: false });
      return;
    }

    try {
      const url = await fetchProfilePic(uid, true);
      setProfilePicUrl(url); // Set profile picture URL
      setTestResult({
        message: "Profile picture fetched successfully!",
        success: true
      });
      console.log(url)
    } catch (error) {
      setTestResult({
        message: `Error fetching profile picture: ${error instanceof Error ? error.message : 'Unknown error'}`,
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

        {/* Input field for UID */}
        <div className="mt-6">
          <input
            type="text"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            placeholder="Enter UID to fetch profile picture"
            className="block w-full text-sm p-2 border rounded"
          />
        </div>

        {/* Button to fetch profile picture */}
        <button
          onClick={fetchProfilePicture}
          className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-lg
            hover:bg-green-600"
        >
          Fetch Profile Picture
        </button>

        {profilePicUrl && (
          <div className="mt-4">
            <p className="text-sm text-gray-500">Fetched Profile Picture:</p>
            <img
              src={profilePicUrl}
              alt="Profile"
              className="mt-2 w-32 h-32 rounded-full object-cover"
            />
          </div>
        )}

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
