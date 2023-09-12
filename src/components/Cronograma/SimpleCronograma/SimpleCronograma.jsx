import React, { useState } from 'react';
import TaskList from './TaskList';
import { dummyData } from '../../../constants/CronActivid';
const SimpleCronograma = ({ }) => {
  const [tasks, setTasks] = useState(dummyData);
  const handleUpdateTask = (updatedTask) => {
    setTasks([
      ...tasks.slice(0, updatedTask.index),
      updatedTask,
      ...tasks.slice(updatedTask.index + 1),
    ]);
  };
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">PROYECTO:</h1>
      <TaskList tasks={tasks} onUpdate={handleUpdateTask} />
    </div>
  )
}

export default SimpleCronograma

