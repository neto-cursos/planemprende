import React, { useState, useEffect } from 'react';
import CronogramaData from '../components/CronogramaData/CronogramaData';
import { useDispatch } from 'react-redux';
import { changeMenu } from '../redux/reducers/menuSlice';
import { useParams } from 'react-router-dom';

const Cronogramas = () => {
    const { empr_id } = useParams();
    const dispatch = useDispatch();
    console.log(empr_id);
    useEffect(() => {
        console.log("Empr_id"+empr_id)
        dispatch(changeMenu({ title: 'MENU_CRONOS', empr_id: empr_id }))
    }, [empr_id])



    const [tasks, setTasks] = useState([
        { name: 'Task 1', start: 0, end: 3 },
        { name: 'Task 2', start: 2, end: 6 },
        { name: 'Task 3', start: 4, end: 7 },
        { name: 'Task 4', start: 6, end: 10 },
    ]);

    const renderTasks = () => {
        const chartHeight = 30;
        const barHeight = 20;
        const barMargin = 5;
        const chartWidth = 500;
        const taskBars = [];

        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            const barWidth = (task.end - task.start) / chartWidth;
            const x = task.start / chartWidth;
            const y = i * (barHeight + barMargin);

            taskBars.push(
                <rect
                    key={i}
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    className="task-bar"
                    style={{ fill: 'rgb(0,0,255)', strokeWidth: 3, stroke: 'rgb(0,0,0)' }}
                />
            );
        }

        return taskBars;
    };
    // <CronogramaData />

    // <svg className="chart" viewBox="0 0 500 120">
    //     {r - enderTasks()}
    // </svg>
    return (
        <CronogramaData />

    );



};




export default Cronogramas;
