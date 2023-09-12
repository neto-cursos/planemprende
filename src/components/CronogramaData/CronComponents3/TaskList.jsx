// With both the Task and Subtask components implemented, we can now use them in a TaskList component 
//to display a list of tasks and subtasks.
// Here's the updated TaskList component:
import Task from "./Task";
import Subtask from "./Subtask";
import { useState } from 'react';
function TaskList({ tasks, onUpdate }) {
    return (
        <div className="grid grid-cols-1 gap-4">
            {tasks.map((task, index) => (
                <div key={index} className="col-span-1">
                    <Task index={index} task={task} onUpdate={onUpdate} />
                    {task.subtasks && (
                        <div className="mt-4">
                            {task.subtasks.map((subtask, subIndex) => (
                                <Subtask
                                    key={subIndex}
                                    index={subIndex}
                                    subtask={subtask}
                                    onUpdate={(updatedSubtask) =>
                                        onUpdate({
                                            ...task,
                                            subtasks: [
                                                ...task.subtasks.slice(0, subIndex),
                                                updatedSubtask,
                                                ...task.subtasks.slice(subIndex + 1),
                                            ],
                                        })
                                    }
                                />
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default TaskList;