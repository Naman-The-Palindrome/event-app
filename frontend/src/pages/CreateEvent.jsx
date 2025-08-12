// src/pages/CreateEvent.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    capacity: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const makeISOFromDateTime = (dateStr, timeStr) => {
    // Build using local parts so you don't accidentally get "00:00:00.000Z" shifts
    const [y, m, d] = dateStr.split('-').map(Number);
    const [hh, mm] = timeStr.split(':').map(Number);
    const dt = new Date(y, m - 1, d, hh || 0, mm || 0); // local time
    return dt.toISOString(); // send ISO
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert('Please login first');
        navigate('/login');
        return;
      }

      const dateISO = makeISOFromDateTime(formData.date, formData.time);

      const payload = {
        title: formData.title,
        description: formData.description,
        date: dateISO,
        location: formData.location,
        category: formData.category,
        capacity: formData.capacity,
      };

      const res = await fetch(" https://event-app-backend-server.onrender.com/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to create event");
        return;
      }
      alert("Event created successfully!");
      navigate("/my-events");
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Create New Event</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Event Title" required className="w-full p-2 border rounded" onChange={handleChange} />
        <textarea name="description" placeholder="Description" className="w-full p-2 border rounded" onChange={handleChange}></textarea>
        <input type="date" name="date" required className="w-full p-2 border rounded" onChange={handleChange} />
        <input type="time" name="time" className="w-full p-2 border rounded" onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" className="w-full p-2 border rounded" onChange={handleChange} />
        <input type="text" name="category" placeholder="Category" className="w-full p-2 border rounded" onChange={handleChange} />
        <input type="number" name="capacity" placeholder="Capacity" className="w-full p-2 border rounded" onChange={handleChange} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create Event</button>
      </form>
    </div>
  );
}

export default CreateEvent;
