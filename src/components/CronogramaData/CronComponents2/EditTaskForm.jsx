// src/components/EditTaskForm.js
import React, { useState } from 'react';

const EditTaskForm = ({ task, onSave, onCancel }) => {
  const [description, setDescription] = useState(task.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...task, description });
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-300 px-2 py-1 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded mr-2">
        Save
      </button>
      <button type="button" onClick={onCancel} className="bg-gray-300 text-white px-4 py-1 rounded">
        Cancel
      </button>
    </form>
  );
};

export default EditTaskForm;
