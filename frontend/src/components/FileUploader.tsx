import React, { useRef } from "react";

// Modify the FileUploader to receive setSelectedFile as a prop
interface FileUploaderProps {
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const FileUploader: React.FC<FileUploaderProps> = ({ setSelectedFile }) => {
  // Reference to the hidden file input element
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Function to handle when a file is selected
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]); // Update the global state
    }
  };

  // Function to trigger the file input click
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={handleButtonClick}>Select a file</button>

      {/* Hidden file input element */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

// CSS styles for centering and button styling
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full page height
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: '2px solid #007BFF', // Visible blue outline
    borderRadius: '5px',
    backgroundColor: 'white',
    color: '#007BFF',
    outline: 'none',
    transition: 'background-color 0.3s, color 0.3s',
  },
  fileInfo: {
    marginTop: '20px',
    fontSize: '16px',
  },
};

export default FileUploader;
