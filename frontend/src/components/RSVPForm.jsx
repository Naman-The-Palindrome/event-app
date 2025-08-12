// src/components/RSVPForm.jsx
function RSVPForm({ onSubmit }) {
  return (
    <div className="space-x-4">
      <button
        onClick={() => onSubmit("confirmed")}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Confirm
      </button>
      <button
        onClick={() => onSubmit("pending")}
        className="bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Maybe
      </button>
      <button
        onClick={() => onSubmit("declined")}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Decline
      </button>
    </div>
  );
}

export default RSVPForm;
