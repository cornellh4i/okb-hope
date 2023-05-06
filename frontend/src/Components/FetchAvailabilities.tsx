import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '../../../frontend/firebase/firebase';
import { useState, useEffect } from 'react';

const functions = getFunctions(app);

interface AvailabilitiesPayload {
  accessToken: string;
  calendarUuid: string;
}

interface TimeSlot {
  start_time: string;
  end_time: string;
}

interface AvailabilitiesResponse {
  date: string;
  timeslots: TimeSlot[];
}

const getAvailabilities = httpsCallable<AvailabilitiesPayload, AvailabilitiesResponse>(functions, 'getAvailabilities');
const fetchAccessToken = httpsCallable<{ authorizationCode: string, clientId: string, clientSecret: string, redirectUri: string }, { access_token: string }>(functions, 'fetchAccessToken');

const CLIENT_ID = "21GhUOzi7KHTsg2dmSCheBBaqNQUYg_KZyMqARo-n6o";
const CLIENT_SECRET = "qfnBvrqATUs9PFPo6eBXYEMLygcxJSPXl0oV3km-2WQ";
const REDIRECT_URI = "http://localhost:3000/calendlyCallback";

const Availabilities = () => {
  const [availabilities, setAvailabilities] = useState<AvailabilitiesResponse[]>([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');

    if (authorizationCode && !availabilities) {
      fetchAvailabilities(authorizationCode, 'psychiatrist-meeting');
    }
  }, []);

  async function fetchAvailabilities(authorizationCode: string, calendarUuid: string) {
    try {
      // Fetch the access token using the fetchAccessToken Cloud Function
      const { data: { access_token } } = await fetchAccessToken({
        authorizationCode,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        redirectUri: REDIRECT_URI
      });

      // Pass the fetched access token and calendarUuid to getAvailabilities
      const result = await getAvailabilities({
        accessToken: access_token,
        calendarUuid: calendarUuid
      });
      console.log("getAvailabilities result:", result.data);

      // Set the state of availabilities with the received data
      setAvailabilities((prevAvailabilities) => [...prevAvailabilities, result.data]);

    } catch (error) {
      console.error("Error fetching availabilities:", error);
    }
  }

  return (
    <div>
      <h1>Availabilities</h1>
      {availabilities.length > 0 ? (
        availabilities.map((availability, index) => (
          <div key={index}>
            <h2>Date: {availability.date}</h2>
            {availability.timeslots.map((slot, i) => (
              <p key={i}>
                {slot.start_time} - {slot.end_time}
              </p>
            ))}
          </div>
        ))
      ) : (
        <p>No availabilities found.</p>
      )}

    </div>
  );
};

export default Availabilities;