
import React, { useState } from 'react';

const SubTask = ({ subtask, updateSubTask, deleteSubTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(subtask.title);

  const handleUpdate = () => {
    updateSubTask({ ...subtask, title });
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-100 p-2 rounded shadow mb-2">
      <div className="flex justify-between">
        <div>
          <input
            type="checkbox"
            checked={subtask.completed}
            onChange={(e) => updateSubTask({ ...subtask, completed: e.target.checked })}
          />
          {isEditing ? (
            <>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-1 rounded ml-2"
              />
              <button onClick={handleUpdate} className="text-green-600 ml-2">
                Save
              </button>
            </>
          ) : (
            <span onClick={() => setIsEditing(true)} className="ml-2 cursor-pointer">
              {subtask.title}
            </span>
          )}
        </div>
        <button onClick={() => deleteSubTask(subtask.id)} className="text-red-600">
          Delete
          </button>
      </div>
    </div>
  );
};

export default SubTask;
