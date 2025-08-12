import { useEffect, useState } from "react";

function MyEvents() {
  const [myEvents, setMyEvents] = useState([]);

  const fetchMyEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch("http://localhost:5000/api/events/mine", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMyEvents(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user?._id?.toString(); // FIXED

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Events</h2>
      <div className="space-y-4">
        {myEvents.map((event) => {
          const createdById =
            event.createdBy && (event.createdBy._id || event.createdBy)?.toString();
          const isHost = userId && createdById && userId === createdById;

          const myAttendance = event.attendees?.find(
            (a) => a.user && (a.user._id || a.user).toString() === userId
          );
          const status = isHost
            ? "Host"
            : myAttendance
            ? myAttendance.status
            : "—";

          const formatted = new Date(event.date).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          });

          return (
            <div
              key={event._id}
              className="p-4 border rounded shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-600">
                  {formatted} | {event.location}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  Role: {isHost ? "Host" : "Guest"}
                </p>
              </div>
              <div>
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-white text-sm 
                  ${
                    isHost
                      ? "bg-indigo-500"
                      : status === "confirmed"
                      ? "bg-green-500"
                      : status === "pending"
                      ? "bg-yellow-500"
                      : status === "declined"
                      ? "bg-red-500"
                      : "bg-gray-400"
                  }`}
                >
                  {isHost ? "Host" : status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyEvents;
