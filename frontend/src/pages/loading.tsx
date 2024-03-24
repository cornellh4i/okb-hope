import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Loading() {
  const [isFirstLoad, setIsFirstLoad] = useState(true); // New state to manage the loading display
  const router = useRouter();

  useEffect(() => {
    if (window.location.search.includes("init=true")) {
      // On initial load, the page will be blank. Perform actions then reload.
      window.history.replaceState(null, '', '/loading'); // Clean the URL to remove query parameters
      window.location.reload(); // Force reload
    } else {
      // After reloading, setIsFirstLoad to false to show the "Loading..." text
      setIsFirstLoad(false); // This changes the state to render the "Loading..." message
      setTimeout(() => router.replace('/'), 1000);
    }
  }, [router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {!isFirstLoad && <p>Loading...</p>} {/* Conditionally render the "Loading..." message */}
    </div>
  );
}
