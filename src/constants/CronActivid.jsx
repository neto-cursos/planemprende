export const dummyData = [{
    id: 1,
    name: "Task 1",
    startDate: "2023-05-01",
    endDate: "2023-05-15",
    quantity: 10,
    responsible: "John Doe",
    amount: 1000,
    completed: false,
    subtasks: [
        {
            id: 1,
            name: "Subtask 1",
            startDate: "2023-05-01",
            endDate: "2023-05-05",
            quantity: 3,
            responsible: "Jane Doe",
            amount: 300,
            completed: true
        },
        {
            id: 2,
            name: "Subtask 2",
            startDate: "2023-05-06",
            endDate: "2023-05-10",
            quantity: 7,
            responsible: "Bob Smith",
            amount: 700,
            completed: false
        }
    ]
}];
