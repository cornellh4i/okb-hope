import { useAuth } from '../../../../contexts/AuthContext';
import Dashboard from '@/components/dashboard/Dashboard';
import { useState, ChangeEvent } from 'react';
import { uploadProfilePic, fetchProfilePic } from '../../../../firebase/firebase';

interface TestResult {
  message: string;
  success?: boolean;
}

const App = () => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setTestResult(null);
  };

  const handleUploadProfilePic = async (): Promise<void> => {
    if (!selectedFile) {
      setTestResult({ message: 'Please select a file first', success: false });
      return;
    }

    if (!user) {
      setTestResult({ message: 'No authenticated user found', success: false });
      return;
    }

    try {
      const result = await uploadProfilePic(selectedFile, user.uid, false);
      setTestResult({
        message: 'Profile picture uploaded successfully!',
        success: true,
      });
    } catch (error) {
      setTestResult({
        message: `Error uploading profile picture: ${error instanceof Error ? error.message : 'Unknown error'}`,
        success: false,
      });
    }
  };

  const fetchProfilePicture = async (): Promise<void> => {
    if (!user) {
      setTestResult({ message: 'No authenticated user found', success: false });
      return;
    }

    try {
      const url = await fetchProfilePic(user.uid);
      if (url) {
        setProfilePicUrl(url);
        setTestResult({ message: 'Profile picture fetched successfully!', success: true });
      } else {
        setTestResult({ message: 'No profile picture found for this user.', success: false });
        setProfilePicUrl(null);
      }
    } catch (error) {
      setTestResult({
        message: `Error fetching profile picture: ${error instanceof Error ? error.message : 'Unknown error'}`,
        success: false,
      });
      setProfilePicUrl(null);
    }
  };

  return (
    <>
      {user && (
        <div className="p-4 max-w-xl mx-auto">
          <Dashboard />
          <div className="mt-6">
            <div className="flex flex-col items-center p-6 border-2 border-dashed rounded-lg border-gray-300 hover:border-gray-400">
              <p className="mb-4 text-gray-500">Upload Profile Picture</p>
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
              onClick={handleUploadProfilePic}
              disabled={!selectedFile}
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Upload Profile Picture
            </button>
          </div>

          <div className="mt-6">
            <button
              onClick={fetchProfilePicture}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
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
          </div>

          {testResult && (
            <div className={`mt-4 p-4 rounded ${testResult.success ? 'bg-green-50' : 'bg-red-50'}`}>
              <p className={`text-sm ${testResult.success ? 'text-green-700' : 'text-red-700'}`}>
                {testResult.message}
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default App;