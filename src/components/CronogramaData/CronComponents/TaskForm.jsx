import React, { useState } from 'react';

const TaskForm = ({ addTask, addSubTask }) => {
  const [title, setTitle] = useState('');
  const [parentId, setParentId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [responsable, setResponsable] = useState('');
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState('');
  const [completed, setCompleted] = useState(false);
  const [comments, setComments] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      title,
      startDate,
      endDate,
      responsable,
      quantity,
      amount,
      completed,
      comments,
    };
    if (parentId) {
      addSubTask({ ...newTask, parentId });
    } else {
      addTask(newTask);
    }
    setTitle('');
    setParentId('');
    setStartDate('');
    setEndDate('');
    setResponsable('');
    setQuantity('');
    setAmount('');
    setCompleted(false);
    setComments('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Task or subtask title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <input
        type="text"
        placeholder="Parent task ID (optional)"
        value={parentId}
        onChange={(e) => setParentId(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <input
        type="text"
        placeholder="Responsable"
        value={responsable}
        onChange={(e) => setResponsable(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => setCompleted(e.target.checked)}
        className="mr-2"
      />
      <input
        type="text"
        placeholder="Comments"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        Add
      </button>
    </form>
  );
};

export default TaskForm;
