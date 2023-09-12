// To add subtasks, we can modify the Task component to include a subtask list and a form to add new subtasks:


// The Subtask component is similar to the Task component, with some minor differences. Here's the updated code for the Subtask component:

// The TaskList component takes in an array of tasks and the onUpdate function as props. It then maps over each task in the array and renders a Task component for each one. If a task has subtasks, it also maps over each subtask and renders a Subtask component for each one.

// The onUpdate function passed down to the Task and Subtask components is used to update the state of the tasks array in the parent component.

// With all the components implemented, we can now render the TaskList component in our main App component and pass in some dummy data to test it out:
import TaskList from "./CronComponents3/TaskList";
import { useState } from 'react';
const CronogramaData = ({ }) => {
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
            <h1 className="text-2xl font-bold mb-4">Task List</h1>
            <TaskList tasks={tasks} onUpdate={handleUpdateTask} />
        </div>
    );
}
export default CronogramaData;
// Here we're using the useState hook to store the tasks array, and passing in a handleUpdateTask function to the TaskList component as a prop. The handleUpdateTask function updates the state of the tasks array with the updated task data.

// With all the code in place, we can now test the app and see if it works as expected. Here's what the app looks like with some sample data:
// And that's it! We've successfully implemented a CRUD task management app with subtasks using React and Tailwind CSS. The app is responsive and works on both big screens and phone screens.

// Of course, this is just a starting point, and you can customize and extend the app to suit your needs. Some possible enhancements include:

// Adding a search bar to filter tasks by name or date
// Adding the ability to sort tasks by name, date, or completion status
// Adding the ability to delete tasks and subtasks
// Adding the ability to mark subtasks as completed
// Adding authentication and authorization to restrict access to certain tasks or subtasks
// Storing the task and subtask data in a database to persist it between sessions
// There are many other features and improvements you can make, depending on your requirements. The key is to start with a simple, functional app and build on it incrementally as needed.

// I hope this tutorial has been helpful in showing you how to build a task management app with subtasks using React and Tailwind CSS. Happy coding!