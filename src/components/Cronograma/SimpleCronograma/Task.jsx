import React,{useState} from 'react'
import SubTask from './SubTask';
const Task = ({ task, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(task.name);
    const [startDate, setStartDate] = useState(task.startDate);
    const [endDate, setEndDate] = useState(task.endDate);
    const [quantity, setQuantity] = useState(task.quantity);
    const [responsible, setResponsible] = useState(task.responsible);
    const [amount, setAmount] = useState(task.amount);
    const [completed, setCompleted] = useState(task.completed);
    const [subtasks, setSubtasks] = useState(task.subtasks);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleResponsibleChange = (event) => {
        setResponsible(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleCompletedChange = (event) => {
        setCompleted(event.target.checked);
        onUpdate({
            ...task,
            completed: event.target.checked,
        });
    };

    const handleAddSubtask = () => {
        setSubtasks([...subtasks, { name: "", startDate: "", endDate: "", quantity: "", responsible: "", amount: "", completed: false }]);
    };
    const onDelete = () => {

    }
    const handleSubtaskUpdate = (index, updatedSubtask) => {
        const updatedSubtasks = [...subtasks];
        updatedSubtasks[index] = updatedSubtask;
        setSubtasks(updatedSubtasks);
        onUpdate({
            ...task,
            subtasks: updatedSubtasks,
        });
    };
    return (
        <div className="border-gray-400 border rounded-md p-4 mb-4">
            {isEditing ? (
                <>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="col-span-2">
                            <label className="block font-medium text-gray-700 mb-1" htmlFor="name">
                                Task Name
                            </label>
                            <input className="w-full rounded-md border-gray-400 border py-2 px-3 text-gray-800" type="text" id="name" name="name" value={name} onChange={handleNameChange} />
                        </div>
                    </div>
                    <div className="grid grid-cols-6 gap-4 mb-4">
                        <div className="col-span-1">
                            <label className="block font-medium text-gray-700 mb-1" htmlFor="startDate">
                                Start Date
                            </label>
                            <input className="w-full rounded-md border-gray-400 border py-2 px-3 text-gray-800" type="date" id="startDate" name="startDate" value={startDate} onChange={handleStartDateChange} />
                        </div>
                        <div className="col-span-1">
                            <label className="block font-medium text-gray-700 mb-1" htmlFor="endDate">
                                End Date
                            </label>
                            <input className="w-full rounded-md border-gray-400 border py-2 px-3 text-gray-800" type="date" id="endDate" name="endDate" value={endDate} onChange={handleEndDateChange} />
                        </div>
                        <div className="col-span-1">
                            <label className="block font-medium text-gray-700 mb-1" htmlFor="quantity">
                                Quantity
                            </label>
                            <input className="w-full rounded-md border-gray-400 border py-2 px-3 text-gray-800" type="number" id="quantity" name="quantity" value={quantity} onChange={handleQuantityChange} />
                        </div>
                        <div className="col-span-1">
                            <label className="block font-medium text-gray-700 mb-1" htmlFor="responsible">
                                Responsible
                            </label>
                            <input className="w-full rounded-md border-gray-400 border py-2 px-3 text-gray-800" type="text" id="responsible" name="responsible" value={responsible} onChange={handleResponsibleChange} />
                        </div>
                        <div className="col-span-1">
                            <label className="block font-medium text-gray-700 mb-1" htmlFor="amount">
                                Amount
                            </label>
                            <input className="w-full rounded-md border-gray-400 border py-2 px-3 text-gray-800" type="number" id="amount" name="amount" value={amount} onChange={handleAmountChange} />
                        </div>
                        <div className="col-span-1">
                            <label className="block font-medium text-gray-700 mb-1" htmlFor="completed">
                                Completed
                            </label>
                            <input type="checkbox"
                                id="completed"
                                name="completed"
                                checked={completed}
                                onChange={handleCompletedChange}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded" onClick={() => setIsEditing(false)}>
                            Save
                        </button>
                        <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded ml-2" onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-4 mb-4">
                        <div className="col-span-1">
                            <h2 className="font-bold text-xl mb-2">{name}</h2>
                            <p className="text-gray-700">
                                {startDate && <span className="font-medium">Start Date:</span>} {startDate}
                                {endDate && (
                                    <>
                                        {" "}
                                        - <span className="font-medium">End Date:</span> {endDate}
                                    </>
                                )}
                            </p>
                            <p className="text-gray-700">
                                {quantity && <span className="font-medium">Quantity:</span>} {quantity}
                                {responsible && (
                                    <>
                                        {" "}
                                        - <span className="font-medium">Responsible:</span> {responsible}
                                    </>
                                )}
                            </p>
                            <p className="text-gray-700">
                                {amount && <span className="font-medium">Amount:</span>} {amount}
                            </p>
                        </div>
                        <div className="col-span-1">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`completed_${task.id}`}
                                    name={`completed_${task.id}`}
                                    checked={completed}
                                    onChange={handleCompletedChange}
                                    className="mr-2"
                                />
                                <label htmlFor={`completed_${task.id}`} className="font-medium">
                                    Completed
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded" onClick={() => setIsEditing(true)}>
                            Edit
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded ml-2" onClick={onDelete}>
                            Delete
                        </button>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Subtasks</h3>
                        {subtasks.map((subtask, index) => (
                            <SubTask
                                key={index}
                                index={index}
                                subtask={subtask}
                                onUpdate={(updatedSubtask) => handleSubtaskUpdate(index, updatedSubtask)}
                            />
                        ))}
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-2" onClick={handleAddSubtask}>
                            Add Subtask
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Task