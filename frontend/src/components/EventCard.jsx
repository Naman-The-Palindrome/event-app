// src/components/EventCard.jsx
import { useNavigate } from 'react-router-dom';

export default function EventCard({ event }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const userId = user?.id;

  // createdBy might be populated object or id string
  const createdById = event.createdBy && (event.createdBy._id || event.createdBy);

  const isHost = userId && createdById && userId === createdById;
  const dateObj = new Date(event.date);
  const formatted = dateObj.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

  return (
    <div className="p-4 border rounded shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{event.title}</h3>
          {isHost && <span className="text-xs bg-indigo-600 px-2 py-1 rounded text-white">Host</span>}
        </div>
        <p className="text-sm text-gray-600">{formatted}</p>
        <p className="text-sm text-gray-700 mt-2">{event.location}</p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded"
          onClick={() => navigate(`/events/${event._id}`)}
        >
          {isHost ? 'Manage / View' : 'Join'}
        </button>
        <div className="text-sm text-gray-500">{event.category || ''}</div>
      </div>
    </div>
  );
}
