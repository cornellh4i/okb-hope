// pages/test.js

import React from "react";
import SimilarPsychiatristsDisplay from "@/components/profProfile/SimilarPsychiatrists";

const TestPage = () => {
  return (
    <div>
      <h1>Test Page for Similar Psychiatrists Display</h1>
      <p>This is a test page to display the SimilarPsychiatristsDisplay component.</p>
      
      {/* Render the SimilarPsychiatristsDisplay component */}
      <SimilarPsychiatristsDisplay />
    </div>
  );
};

export default TestPage;
