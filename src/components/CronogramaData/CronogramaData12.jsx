//import './App.css';
import React, { useState, useEffect } from 'react';
import Task from './CronComponents/Task';
import SubTask from './CronComponents/SubTask';
import TaskForm from './CronComponents/TaskForm';

const CronogramaData = () => {
    const [tasks, setTasks] = useState([]);
    const [subtasks, setSubtasks] = useState([]);

    const addTask = (task) => {
        const newTask = { ...task, id: Date.now(), completed: false };
        setTasks([...tasks, newTask]);
    };

    const addSubTask = (subtask) => {
        const newSubTask = { ...subtask, id: Date.now(), completed: false };
        setSubtasks([...subtasks, newSubTask]);
    };
    
      const updateTask = (taskId, updatedTask) => {
        setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
      };
    
      const deleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
        setSubtasks(subtasks.filter((subtask) => subtask.parentId !== taskId));
      };
    
      const updateSubTask = (subtaskId, updatedSubTask) => {
        setSubtasks(subtasks.map((subtask) => (subtask.id === subtaskId ? updatedSubTask : subtask)));
      };
    
      const deleteSubTask = (subtaskId) => {
        setSubtasks(subtasks.filter((subtask) => subtask.id !== subtaskId));
      };

      useEffect(() => {
        updateParentTaskDates();
    }, [subtasks]);
    
      const moveTaskUp = (taskId) => {
        const index = tasks.findIndex((task) => task.id === taskId);
        if (index > 0) {
          const newTasks = [...tasks];
          [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
          setTasks(newTasks);
        }
      };
    
      const moveTaskDown = (taskId) => {
        const index = tasks.findIndex((task) => task.id === taskId);
        if (index < tasks.length - 1) {
          const newTasks = [...tasks];
          [newTasks[index + 1], newTasks[index]] = [newTasks[index], newTasks[index + 1]];
          setTasks(newTasks);
        }
      };
    
      const moveSubTaskUp = (subtaskId) => {
        const index = subtasks.findIndex((subtask) => subtask.id === subtaskId);
        if (index > 0) {
          const newSubtasks = [...subtasks];
          [newSubtasks[index - 1], newSubtasks[index]] = [newSubtasks[index], newSubtasks[index - 1]];
          setSubtasks(newSubtasks);
        }
      };
    
      const moveSubTaskDown = (subtaskId) => {
        const index = subtasks.findIndex((subtask) => subtask.id === subtaskId);
        if (index < subtasks.length - 1) {
          const newSubtasks = [...subtasks];
          [newSubtasks[index + 1], newSubtasks[index]] = [newSubtasks[index], newSubtasks[index + 1]];
          setSubtasks(newSubtasks);
        }
      };

      const updateParentTaskDates = () => {
        tasks.forEach((task) => {
            const relevantSubtasks = subtasks.filter((subtask) => subtask.parentId === task.id);
            if (relevantSubtasks.length) {
                const minStartDate = Math.min(...relevantSubtasks.map((subtask) => new Date(subtask.startDate).getTime()));
                const maxEndDate = Math.max(...relevantSubtasks.map((subtask) => new Date(subtask.endDate).getTime()));
                updateTask({ ...task, startDate: new Date(minStartDate), endDate: new Date(maxEndDate) });
            }
        });
    };

      return (
        <div className="App p-4 max-w-screen-lg mx-auto">
            <h1 className="text-2xl mb-4">Task Manager</h1>
            <TaskForm addTask={addTask} addSubTask={addSubTask} />
            <div className="task-container">
                {tasks.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        subtasks={subtasks.filter((subtask) => subtask.parentId === task.id)}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                        updateSubTask={updateSubTask}
                        deleteSubTask={deleteSubTask}
                    />
                ))}
            </div>
        </div>
    );

    //   return (
    //     <div className="App bg-gray-100 min-h-screen">
    //       <div className="container mx-auto p-4">
    //         <h1 className="text-3xl mb-4 text-center">Task Manager</h1>
    //         <TaskForm addTask={addTask} />
    //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    //           {tasks.map((task) => (
    //             <Task
    //               key={task.id}
    //               task={task}
    //               subtasks={subtasks.filter((subtask) => subtask.parentId === task.id)}
    //               updateTask={updateTask}
    //               deleteTask={deleteTask}
    //               updateSubTask={updateSubTask}
    //               deleteSubTask={deleteSubTask}
    //               moveTaskUp={moveTaskUp}
    //               moveTaskDown={moveTaskDown}
    //               moveSubTaskUp={moveSubTaskUp}
    //               moveSubTaskDown={moveSubTaskDown}
    //             />
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   );
    return (
        <div>CronogramaData</div>
    )
}

export default CronogramaData