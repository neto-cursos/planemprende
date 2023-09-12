import React,{useState} from 'react'

const SubTasK = ({ index, subtask, onUpdate }) => {
    const { id, name, startDate, endDate, quantity, responsible, amount, completed } = subtask;
    const [isEditing, setIsEditing] = useState(false);
    const [subtaskData, setSubtaskData] = useState(subtask);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSubtaskData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleCompletedChange = (event) => {
        const { checked } = event.target;
        setSubtaskData((prevData) => ({ ...prevData, completed: checked }));
    };

    const handleSave = () => {
        onUpdate(subtaskData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setSubtaskData(subtask);
        setIsEditing(false);
    };
    return (
        <div className="border border-gray-400 rounded-lg p-4 mb-4">
            {isEditing ? (
                <>
                    <div className="grid grid-cols-1 gap-4 mb-4">
                        <div className="col-span-1">
                            <input
                                type="text"
                                name="name"
                                placeholder="Subtask name"
                                className="border border-gray-400 rounded px-4 py-2 w-full mb-2"
                                value={subtaskData.name}
                                onChange={handleInputChange}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-1">
                                    <input
                                        type="date"
                                        name="startDate"
                                        placeholder="Start Date"
                                        className="border border-gray-400 rounded px-4 py-2 w-full mb-2"
                                        value={subtaskData.startDate}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <input
                                        type="date"
                                        name="endDate"
                                        placeholder="End Date"
                                        className="border border-gray-400 rounded px-4 py-2 w-full mb-2"
                                        value={subtaskData.endDate}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-1">
                                    <input
                                        type="text"
                                        name="quantity"
                                        placeholder="Quantity"
                                        className="border border-gray-400 rounded px-4 py-2 w-full mb-2"
                                        value={subtaskData.quantity}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <input
                                        type="text"
                                        name="responsible"
                                        placeholder="Responsible"
                                        className="border border-gray-400 rounded px-4 py-2 w-full mb-2"
                                        value={subtaskData.responsible}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <input
                                type="text"
                                name="amount"
                                placeholder="Amount"
                                className="border border-gray-400 rounded px-4 py-2 w-full mb-2"
                                value={subtaskData.amount}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-span-1">
                            <div className="flex items-center">
                                <label htmlFor="completed">
                                </label>
                                <input
                                    type="checkbox"
                                    name="completed"
                                    className="ml-2 form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                    checked={subtaskData.completed}
                                    onChange={handleCompletedChange}
                                />
                                <span className="ml-2">Completed</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-4 mb-4">
                        <div className="col-span-1">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="completed"
                                        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                        checked={completed}
                                        onChange={() => onUpdate({ ...subtask, completed: !completed })}
                                    />
                                    <span className={`ml-2 ${completed ? "line-through text-gray-500" : ""}`}>{name}</span>
                                </div>
                                <div>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="col-span-1">
                                    <p className="font-bold">Start Date</p>
                                    <p>{startDate}</p>
                                </div>
                                <div className="col-span-1">
                                    <p className="font-bold">End Date</p>
                                    <p>{endDate}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="col-span-1">
                                    <p className="font-bold">Quantity</p>
                                    <p>{quantity}</p>
                                </div>
                                <div className="col-span-1">
                                    <p className="font-bold">Responsible</p>
                                    <p>{responsible}</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="font-bold">Amount</p>
                                <p>{amount}</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default SubTasK