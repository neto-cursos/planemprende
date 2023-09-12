// src/components/Task.js
import React, { useState } from 'react';
import EditTaskForm from './EditTaskForm';

const Task = ({ task, onAddSubtask, onUpdateTask, onDeleteTask, onUpdateSubtask, onDeleteSubtask }) => {
  const [editMode, setEditMode] = useState(false);

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const renderSubtasks = () => {
    return task.subtasks.map((subtask) => (
      <div key={subtask.id} className="pl-4 border-l-2 border-gray-300">
        {editMode ? (
          <EditTaskForm task={subtask} onSave={onUpdateSubtask} onCancel={handleToggleEditMode} />
        ) : (
          <>
            <span>{subtask.description}</span>
            <button className="ml-2 text-blue-500" onClick={handleToggleEditMode}>
              Edit
            </button>
            <button className="ml-2 text-red-500" onClick={() => onDeleteSubtask(task.id, subtask.id)}>
              Delete
            </button>
          </>
        )}
      </div>
    ));
  };

  return (
    <div className="mb-4">
      {editMode ? (
        <EditTaskForm task={task} onSave={onUpdateTask} onCancel={handleToggleEditMode} />
      ) : (
        <>
          <span>{task.description}</span>
          <button className="ml-2 text-blue-500" onClick={handleToggleEditMode}>
            Edit
          </button>
          <button className="ml-2 text-red-500" onClick={() => onDeleteTask(task.id)}>
            Delete
          </button>
          <button className="ml-2 text-green-500" onClick={() => onAddSubtask(task.id)}>
            Add Subtask
          </button>
        </>
      )}
      {renderSubtasks()}
    </div>
  );
};

export default Task;

