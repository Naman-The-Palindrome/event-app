// src/pages/EventDetails.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const token = localStorage.getItem('token');
  const userId = user?._id || user?.id || null; // safer extraction

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(` https://event-app-backend-server.onrender.com/api/events/${id}`);
        if (!res.ok) throw new Error('Failed to fetch event');
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error('Error fetching event:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!event) return <div className="p-6">Event not found</div>;

  const dateObj = new Date(event.date);
  const formatted = dateObj.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

  const createdById = event.createdBy?._id || event.createdBy;
  const isHost = userId && createdById && userId.toString() === createdById.toString();

  const myAttendance = event.attendees?.find(
    a => (a.user?._id || a.user)?.toString() === userId
  );

  const handleRSVP = async (status) => {
    try {
      if (!token) {
        alert('Please login first');
        navigate('/login');
        return;
      }
      const res = await fetch(` https://event-app-backend-server.onrender.com/api/events/rsvp/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'RSVP failed');
        return;
      }

      setEvent(data); // refresh with updated attendees
      alert('Your response was recorded');
    } catch (err) {
      console.error('RSVP error:', err);
      alert('Server error');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
      <p className="text-gray-600 mb-2">{formatted} | {event.location}</p>
      <p className="mb-4">{event.description}</p>

      <div className="mb-4">
        <strong>Host:</strong> {event.createdBy?.name || 'Unknown'}
      </div>

      {!isHost && (
        <div className="mb-4">
          <p className="mb-2">Choose your response:</p>
          <div className="flex gap-2">
            <button
              onClick={() => handleRSVP('confirmed')}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Attend
            </button>
            <button
              onClick={() => handleRSVP('pending')}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Interested
            </button>
            <button
              onClick={() => handleRSVP('declined')}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Decline
            </button>
          </div>
          {myAttendance && (
            <p className="mt-2 text-sm">
              Your current status: <strong>{myAttendance.status}</strong>
            </p>
          )}
        </div>
      )}

      <h3 className="text-lg font-semibold mb-2">Attendees</h3>
      <ul className="space-y-1">
        {event.attendees?.map((att, idx) => (
          <li key={idx} className="flex justify-between border-b py-1">
            <span>
              {att.name || att.user?.name}
              {att.role === 'host' ? ' (Host)' : ''}
            </span>
            <span
              className={`px-2 py-1 text-sm rounded-full text-white 
                ${att.status === 'confirmed' ? 'bg-green-500' :
                  att.status === 'pending' ? 'bg-yellow-500' :
                    'bg-red-500'}`}
            >
              {att.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventDetails;
