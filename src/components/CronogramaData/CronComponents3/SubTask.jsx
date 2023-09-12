// The next step is to create the Subtask component. It will have the same attributes as the Task component, and will also be able to edit and save changes in real time.

import React, { useState } from "react";

function Subtask({ index, subtask, onUpdate }) {
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
    );
}

export default Subtask;

// Similar to the `Task` component, the `Subtask` component takes in an `index`, `subtask` object, and an `onUpdate` function as props. It also uses the `useState` hook to keep track of whether it's in editing mode, and to store the current state of the subtask data.

// The `handleInputChange` function is used to update the subtask data whenever any of the input fields are changed. Similarly, the `handleCompletedChange` function updates the `completed` field when the checkbox is toggled.

// The `handleSave` function is called when the user clicks the "Save" button. It calls the `

// onUpdate` function passed down as a prop, and passes in the updated subtask data.

// The handleCancel function is called when the user clicks the "Cancel" button. It sets the isEditing state to false, which reverts the subtask to its original state.

// Finally, the Subtask component renders either the editing form or the display view based on the isEditing state. When in editing mode, it displays the form with input fields and a "Save" and "Cancel" button. When not in editing mode, it displays the subtask data in a read-only view with an "Edit" button.

// function Subtask({ subtask, onUpdate }) {
//     const [isEditing, setIsEditing] = useState(false);
//     const [name, setName] = useState(subtask.name);
//     const [startDate, setStartDate] = useState(subtask.startDate);
//     const [endDate, setEndDate] = useState(subtask.endDate);
//     const [quantity, setQuantity] = useState(subtask.quantity);
//     const [responsible, setResponsible] = useState(subtask.responsible);
//     const [amount, setAmount] = useState(subtask.amount);
//     const [completed, setCompleted] = useState(subtask.completed);

//     const handleNameChange = (event) => {
//         setName(event.target.value);
//     };

//     const handleStartDateChange = (event) => {
//         setStartDate(event.target.value);
//     };

//     const handleEndDateChange = (event) => {
//         setEndDate(event.target.value);
//     };

//     const handleQuantityChange = (event) => {
//         setQuantity(event.target.value);
//     };

//     const handleResponsibleChange = (event) => {
//         setResponsible(event.target.value);
//     };

//     const handleAmountChange = (event) => {
//         setAmount(event.target.value);
//     };

//     const handleCompletedChange = (event) => {
//         setCompleted(event.target.checked);
//         onUpdate({
//             ...subtask,
//             completed: event.target.checked,
//         });
//     };

//     const handleUpdate = () => {
//         setIsEditing(false);
//         onUpdate({
//             ...subtask,
//             name,
//             startDate,
//             endDate,
//             quantity,
//             responsible,
//             amount,
//         });
//     };

//     return (
//         <div className="border border-gray-300 rounded-md p-4">
//             <div className="flex items-center justify-between">
//                 <div>
//                     {!isEditing ? (
//                         <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
//                     ) : (
//                         <input className="w-full rounded-md border-gray-400 border py-2 px-3 text-gray-800" type="text" value={name} onChange={handleNameChange} />
//                     )}
//                 </div>
//                 <div className="flex items-center">
//                     {!isEditing ? (
//                         <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2" onClick={() => setIsEditing(true)}>
//                             Edit
//                         </button>
//                     ) : (
//                         <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md mr-2" onClick={handleUpdate}>
//                             Save
//                         </button>
//                     )}
//                     {!isEditing && (
//                         <input type="checkbox" checked={completed} onChange={handleCompletedChange} />
//                     )}
//                 </div>
//             </div>
//             {isEditing && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                     <div className="col-span-1">
//                         <label className="block font-medium text-gray-700 mb-1" htmlFor="startDate">
//                             Start Date
//                         </label>
//                         <input className="w-full rounded-md border-gray-400 border py-2 px-3 text-gray-800"
//                             type="date" id="startDate" name="startDate" value={startDate} onChange={handleStartDateChange} />
//                     </div>
//                     <div className="col-span-1">
//                         <label className="block font-medium text-gray-700 mb-1" htmlFor="endDate">
//                             End Date
//                         </label>
//                         <input className="w-full rounded-md border-gray-400 border py-2 px-3 text-gray-800" type="date" id="endDate" name="endDate" value={endDate} onChange={handleEndDateChange} />
//                     </div>
//                     <div className="col-span-1">
//                         <label className="block font-medium text-gray-700 mb-1" htmlFor="quantity">
//                             Quantity
//                         </label>
//                         <input className="w-full rounded-md border-gray-400 border py-2 px-3 text-gray-800" type="number" id="quantity" name="quantity" value={quantity} onChange={handleQuantityChange} />
//                     </div>
//                     <div className="col-span-1">
//                         <label className="block font-medium text-gray-700 mb-1" htmlFor="responsible">
//                             Responsible
//                         </label>
//                         <input className="w-full rounded-md border-gray-400 border py-2 px-3 text-gray-800" type="text" id="responsible" name="responsible" value={responsible} onChange={handleResponsibleChange} />
//                     </div>
//                     <div className="col-span-1">
//                         <label className="block font-medium text-gray-700 mb-1" htmlFor="amount">
//                             Amount
//                         </label>
//                         <input className="w-full rounded-md border-gray-400 border py-2 px-3 text-gray-800" type="number" id="amount" name="amount" value={amount} onChange={handleAmountChange} />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
