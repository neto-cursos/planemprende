// src/components/AddTaskForm.js
import React, { useState } from 'react';

const AddTaskForm = ({ onSubmit }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(description);
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-300 px-2 py-1 mr-2"
        placeholder="Add a new task..."
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
