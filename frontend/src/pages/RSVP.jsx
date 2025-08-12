// src/pages/RSVP.jsx
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import RSVPForm from '../components/RSVPForm';

function RSVP() {
  const { eventId } = useParams();
  const [status, setStatus] = useState(null);

  const handleRSVP = (response) => {
    setStatus(response);
    alert(`You have ${response} the RSVP for event ID: ${eventId}`);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">RSVP for Event #{eventId}</h2>
      <RSVPForm onSubmit={handleRSVP} />
      {status && (
        <p className="mt-4">
          You selected: <strong>{status}</strong>
        </p>
      )}
    </div>
  );
}

export default RSVP;
