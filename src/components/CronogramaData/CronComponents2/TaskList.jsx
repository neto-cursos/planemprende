// src/components/TaskList.js
import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onAddSubtask, onUpdateTask, onDeleteTask, onUpdateSubtask, onDeleteSubtask }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onAddSubtask={onAddSubtask}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
          onUpdateSubtask={onUpdateSubtask}
          onDeleteSubtask={onDeleteSubtask}
        />
      ))}
    </div>
  );
};

export default TaskList;
