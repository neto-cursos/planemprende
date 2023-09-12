import React, { useState } from 'react';
import SubTask from './SubTask';

const Task = ({ task, subtasks, updateTask, deleteTask, updateSubTask, deleteSubTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleUpdate = () => {
    updateTask({ ...task, title });
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <div className="flex justify-between">
        <div>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => updateTask({ ...task, completed: e.target.checked })}
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
              {task.title}
            </span>
          )}
        </div>
        <button onClick={() => deleteTask(task.id)} className="text-red-600">
          Delete
        </button>
      </div>
      <div>
        {subtasks.map((subtask) => (
          <SubTask
            key={subtask.id}
            subtask={subtask}
            updateSubTask={updateSubTask}
            deleteSubTask={deleteSubTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Task;
