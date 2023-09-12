import React from 'react'
import Task from './Task';
import SubTask from './SubTask';
const TaskList = ({tasks,onUpdate}) => {
    return (
        <div className="grid grid-cols-1 gap-4">
            {tasks.map((task, index) => (
                <div key={index} className="col-span-1">
                    <Task index={index} task={task} onUpdate={onUpdate} />
                </div>
            ))}
        </div>
    );
}

export default TaskList