// src/App.js
import React from 'react';
// import './App.css';
import AddTaskForm from './CronComponents2/AddTaskForm';
import TaskList from './CronComponents2/TaskList';
import useTaskManager from './CronComponents2/useTaskManager';

function CronogramaData() {
  const { tasks, addTask, updateTask, deleteTask, addSubtask, updateSubtask, deleteSubtask } = useTaskManager();

  const handleAddTask = (description) => {
    const newTask = {
      id: Date.now(),
      description,
      subtasks: [],
    };
    addTask(newTask);
  };

  const handleAddSubtask = (taskId) => {
    const newSubtask = {
      id: Date.now(),
      description: '',
    };
    addSubtask(taskId, newSubtask);
  };

  return (
    <div className="App">
      <h1 className="text-2xl mb-4">Task Management</h1>
      <AddTaskForm onSubmit={handleAddTask} />
      <TaskList
        tasks={tasks}
        onAddSubtask={handleAddSubtask}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
        onUpdateSubtask={updateSubtask}
        onDeleteSubtask={deleteSubtask}
      />
    </div>
  );
}

export default CronogramaData;
