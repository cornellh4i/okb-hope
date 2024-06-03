import React, { useEffect, useState } from "react";
// Allows for dynamic importing of components
import dynamic from "next/dynamic";

/* 
We want the popup button to be dynamically imported to avoid 
SSR (Server-side rendering) errors related to the usage of document or window 
objects and to ensure that the PopupButton component is loaded only on the 
client-side.
*/
const PopupButton = dynamic(() => import("react-calendly").then(mod => mod.PopupButton), { ssr: false });
const InlineWidget = dynamic(() => import("react-calendly").then(mod => mod.InlineWidget), { ssr: false });

export default function Booking({ url }) {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRootElement(document.getElementById("root"));
    }
  }, []);

  return (
    <div id="root">
      {rootElement && (
        <PopupButton
          className={`bg-okb-blue text-okb-white active:bg-gray-500 font-bold px-12 py-4 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
          url={url} // Pass the URL as a prop
          rootElement={rootElement}
          text="Book Appointment"
        />
      )}
    </div>
  );
}

export const BookingPopupWindow: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="popup-container">
      <div className="popup-content">
        <InlineWidget url="https://calendly.com/bl583/30min" />
      </div>
    </div>
  );
};


