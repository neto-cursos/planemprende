// import React, { useState } from 'react';

// export default function Task(props) {
//   const [editingName, setEditingName] = useState(false);
//   const [editingStartDate, setEditingStartDate] = useState(false);
//   const [editingEndDate, setEditingEndDate] = useState(false);
//   const [editingQuantity, setEditingQuantity] = useState(false);
//   const [editingResponsible, setEditingResponsible] = useState(false);
//   const [editingAmount, setEditingAmount] = useState(false);

//   const [name, setName] = useState(props.task.name);
//   const [startDate, setStartDate] = useState(props.task.startDate);
//   const [endDate, setEndDate] = useState(props.task.endDate);
//   const [quantity, setQuantity] = useState(props.task.quantity);
//   const [responsible, setResponsible] = useState(props.task.responsible);
//   const [amount, setAmount] = useState(props.task.amount);

//   const handleSave = () => {
//     props.onSave(props.task.id, {
//       name,
//       startDate,
//       endDate,
//       quantity,
//       responsible,
//       amount,
//     });
//     setEditingName(false);
//     setEditingStartDate(false);
//     setEditingEndDate(false);
//     setEditingQuantity(false);
//     setEditingResponsible(false);
//     setEditingAmount(false);
//   };

//   const handleCancel = () => {
//     setName(props.task.name);
//     setStartDate(props.task.startDate);
//     setEndDate(props.task.endDate);
//     setQuantity(props.task.quantity);
//     setResponsible(props.task.responsible);
//     setAmount(props.task.amount);
//     setEditingName(false);
//     setEditingStartDate(false);
//     setEditingEndDate(false);
//     setEditingQuantity(false);
//     setEditingResponsible(false);
//     setEditingAmount(false);
//   };

//   return (<div className="flex flex-col bg-white p-4 rounded-md shadow-md">
//       {editingName ? (<div className="flex flex-row items-center justify-between">
//           <input className="border-b border-gray-400 w-full mr-2"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <div className="flex items-center">
//             <button className="px-4 py-2 bg-green-400 text-white rounded mr-2"
//               onClick={handleSave}
//             >
//               Save
//             </button>
//             <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
//               onClick={handleCancel}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       ):(<>
//           <div className="flex items-center justify-between w-full">
//             <div className="flex items-center">
//               <input type="checkbox"
//                 className="mr-2"
//                 checked={props.task.completed}
//                 onChange={() => props.onToggle(props.task.id)}
//               />
//               <p className={props.task.completed ? 'line-through' : ''} onClick={() => setEditingName(true)}>
//                 {name}
//               </p>
//             </div>
//             <div className="flex items-center">
//               <span className="mr-2">{amount}</span>
//               <button
//                 className="text-sm text-gray-500 hover:text-gray-700 mr-2"
//                 onClick={() => setEditingAmount(true)}
//               >
//                 ✏️
//               </button>
//               <button
//                 className="text-sm text-red-500 hover:text-red-700"
//                 onClick={() => props.onDelete(props.task.id)}
//               >
//                 ❌
//               </button>
//             </div>
//           </div></>)}
          
//           <div className="flex flex-row mt-2">
//             <div className="flex flex-1   flex-col mr-2">
//           <p className="text-gray-500 text-sm mb-1">Start Date</p>
//           {editingStartDate ? (
//             <div className="flex flex-row items-center justify-between">
//               <input
//                 type="date"
//                 className="border-b border-gray-400 w-full mr-2"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//               />
//               <div className="flex items-center">
//                 <button
//                   className="px-4 py-2 bg-green-400 text-white rounded mr-2"
//                   onClick={handleSave}
//                 >
//                   Save
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
//                   onClick={handleCancel}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <p className="text-gray-800" onClick={() => setEditingStartDate(true)}>
//               {startDate}
//             </p>
//           )}
//         </div>
//         <div className="flex flex-1 flex-col">
//           <p className="text-gray-500 text-sm mb-1">End Date</p>
//           {editingEndDate ? (
//             <div className="flex flex-row items-center justify-between">
//               <input
//                 type="date"
//                 className="border-b border-gray-400 w-full mr-2"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//               />
//               <div className="flex items-center">
//                 <button
//                   className="px-4 py-2 bg-green-400 text-white rounded mr-2"
//                   onClick={handleSave}
//                 >
//                   Save
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
//                   onClick={handleCancel}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <p className="text-gray-800" onClick={() => setEditingEndDate(true)}>
//               {endDate}
//             </p>
//           )}
        
//         </div>
//         </div>
// )}    

// Finally, we need to update the `Task` component to render the list of subtasks. We can do this by mapping over the `subtasks` array and rendering a `Subtask` component for each subtask. We pass the subtask to the `Subtask` component as a prop, along with the `onUpdate` callback function. Here's the updated code for the `Task` component:
import { useState } from 'react';
import Subtask from './Subtask';
function Task({ task, onUpdate }) {
    
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
  const onDelete=()=>{

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
  <input           type="checkbox"
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
            <Subtask
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
  );
  }
  
  export default Task;
  
  

// import { useState } from 'react';
// import Subtask from './Subtask';

// function Task({ task, onUpdate }) {
//     const [isEditing, setIsEditing] = useState(false);
//     const [name, setName] = useState(task.name);
//     const [startDate, setStartDate] = useState(task.startDate);
//     const [endDate, setEndDate] = useState(task.endDate);
//     const [quantity, setQuantity] = useState(task.quantity);
//     const [responsible, setResponsible] = useState(task.responsible);
//     const [amount, setAmount] = useState(task.amount);
//     const [completed, setCompleted] = useState(task.completed);
//     const [subtasks, setSubtasks] = useState(task.subtasks || []);

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
//         setQuantity(parseInt(event.target.value, 10));
//     };

//     const handleResponsibleChange = (event) => {
//         setResponsible(event.target.value);
//     };

//     const handleAmountChange = (event) => {
//         setAmount(parseInt(event.target.value, 10));
//     };

//     const handleCompletedChange = (event) => {
//         setCompleted(event.target.checked);
//     };

//     const handleAddSubtask = () => {
//         setSubtasks([...subtasks, { name: '', startDate: '', endDate: '', quantity: 0, responsible: '', amount: 0, completed: false }]);
//     };

//     const handleSubtaskUpdate = (updatedSubtask, subtaskIndex) => {
//         const updatedSubtasks = [...subtasks];
//         updatedSubtasks[subtaskIndex] = updatedSubtask;
//         setSubtasks(updatedSubtasks);
//     };

//     const handleCancel = () => {
//         setIsEditing(false);
//         setName(task.name);
//         setStartDate(task.startDate);
//         setEndDate(task.endDate);
//         setQuantity(task.quantity);
//         setResponsible(task.responsible);
//         setAmount(task.amount);
//         setCompleted(task.completed);
//         setSubtasks(task.subtasks || []);
//     };

//     const handleUpdate = () => {
//         const updatedTask = {
//             ...task,
//             name,
//             startDate,
//             endDate,
//             quantity,
//             responsible,
//             amount,
//             completed,
//             subtasks,
//         };
//         onUpdate(updatedTask);
//         setIsEditing(false);
//     };

//     return (
//         <div className="bg-white rounded-md p-4 mb-4 shadow">
//             <div className="flex items-center justify-between">
//                 {isEditing ? (
//                     <input className="text-2xl font-semibold text-gray-800 w-full rounded-md" type="text" value={name} onChange={handleNameChange} />
//                 ) : (
//                     <h2 className="text-2xl font-semibold text-gray-800">{task.name}</h2>
//                 )}
//                 <div className="flex items-center">
//                     {isEditing ? (
//                         <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md mr-2" onClick={handleCancel}>
//                             Cancel
//                         </button>
//                     ) : (
//                         <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md mr-2" onClick={() => setIsEditing(true)}>
//                             Edit
//                         </button>
//                     )}
//                     {isEditing ? (
//                         <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md" onClick={handleUpdate}>
//                             Save
//                         </button>
//                     ) : (
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
//                         <input className="w-full rounded-md border-gray-400 border py-2 px-3 text-gray-800" type="date" id="startDate" value={startDate} onChange={handleStartDateChange} />
//                     </div>
//                     <div className="col-span-1">
//                         <label className="block font-medium text-gray-700 mb-1" htmlFor="endDate">
//                             End Date
//                         </label>
//                         <input className="w-full rounded-md border-gray-400 border py-2 px-3 text-gray-800" type="date" id="endDate" value={endDate} onChange={handleEndDateChange} />
//                     </div>
//                     <div className="col-span-1">
//                         <label className="block font-medium text-gray-700 mb-1" htmlFor="quantity">
//                             Quantity
//                         </label>
//                         <input className="w-full rounded-md border-gray-400 border py-2 px-3 text-gray-800" type="number" id="quantity" value={quantity} onChange={handleQuantityChange} />
//                     </div>
//                     <div className="col-span-1">
//                         <label className="block font-medium text-gray-700 mb-1" htmlFor="responsible">
//                             Responsible
//                         </label>
//                         <input className="w-full rounded-md border-gray-400 border py-2 px-3 text-gray-800" type="text" id="responsible" value={responsible} onChange={handleResponsibleChange} />
//                     </div>
//                     <div className="col-span-1">
//                         <label className="block font-medium text-gray-700 mb-1" htmlFor="amount">
//                             Amount
//                         </label>
//                         <input className="w-full rounded-md border-gray-400 border py-2 px-3 text-gray-800" type="number" id="amount" value={amount} onChange={handleAmountChange} />
//                     </div>
//                 </div>
//             )}
//             <div className="mt-4">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">Subtasks</h3>
//                 <div className="space-y-4">
//                     {subtasks.map((subtask, index) => (
//                         <Subtask key={index} subtask={subtask} onUpdate={(updatedSubtask) => handleSubtaskUpdate(updatedSubtask, index)} />
//                     ))}
//                 </div>
//                 {isEditing && (
//                     <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4" onClick={handleAddSubtask}>
//                         Add Subtask
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Task;
// The `Task` component now keeps track of an array of `subtasks`. We can add new subtasks to this array using the `handleAddSubtask` function. This function simply adds a new empty subtask to the `subtasks` array.

// To render the subtasks, we map over the `subtasks
// array and render a Subtask component for each subtask. We pass each subtask to the Subtask component as a prop, along with an onUpdate callback function. The onUpdate function is called by the Subtask component when the user makes changes to a subtask.
