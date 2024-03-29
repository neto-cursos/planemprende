import React, { useState, useRef, useEffect, useMemo, } from "react";
//viewmode que contiene una variable con dia, semana, mes
import { ViewMode } from "../../types/public-types";
//TaskGantt
import { TaskGantt } from "./task-gantt";
//gridprops
import { ganttDateRange, seedDates } from "../../helpers/date-helper";
import { convertToBarTasks } from "../../helpers/bar-helper";
import { removeHiddenTasks, sortTasks } from "../../helpers/other-helper";
//ToolTip
import { StandardTooltipContent, Tooltip } from "../other/tooltip";
//Tasklist
import { TaskList } from "../task-list/task-list";
import { TaskListHeaderDefault } from "../task-list/task-list-header";
import { TaskListTableDefault } from "../task-list/task-list-table";
//verticalScroll
import { VerticalScroll } from "../other/vertical-scroll";
//HorizontlScroll
import { HorizontalScroll } from "../other/horizontal-scroll";
//styles
import styles from "./gantt.module.css";

export const Gantt = ({ tasks,//tareas
    headerHeight = 50, columnWidth = 60, rowHeight = 50, ganttHeight = 0,
    listCellWidth = "155px",
    viewMode = ViewMode.Day,
    preStepsCount = 1, locale = "spa", barFill = 60,
    barCornerRadius = 3,
    barProgressColor = "#a3a3ff",
    barProgressSelectedColor = "#8282f5",
    barBackgroundColor = "#b8c2cc",
    barBackgroundSelectedColor = "#aeb8c2",
    projectProgressColor = "#7db59a",
    projectProgressSelectedColor = "#59a985",
    projectBackgroundColor = "#fac465",
    projectBackgroundSelectedColor = "#f7bb53",
    milestoneBackgroundColor = "#f1c453",
    milestoneBackgroundSelectedColor = "#f29e4c",
    rtl = false,//from rightToleft
    handleWidth = 8,
    timeStep = 300000,
    arrowColor = "grey",
    fontFamily = "Arial, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue",
    fontSize = "14px",
    arrowIndent = 20,
    todayColor = "rgba(227, 252, 234, 0.5)",
    viewDate,//not sent
    TooltipContent = StandardTooltipContent,
    TaskListHeader = TaskListHeaderDefault,
    TaskListTable = TaskListTableDefault,
    onDateChange,//handleTaskChange, when task changes dates get updated on PY
    onProgressChange,//does not work
    onDoubleClick,//not use rightnow
    onClick,//not use right now
    onDelete,//handleTaskDelete
    onSelect,
    onExpanderClick,
    handleEdit,
    handleDelete,
    isChecked,
}) => {
    const wrapperRef = useRef(null);
    const taskListRef = useRef(null);

    const [dateSetup, setDateSetup] = useState(() => {
        const [startDate, endDate] = ganttDateRange(tasks, viewMode, preStepsCount);
        return { viewMode, dates: seedDates(startDate, endDate, viewMode) };
    });//GanttDateRange prepare gantt to show either on year mode, month mode, day mode
    //dateSetup contains ViewMode="year" or "month"... and dates
    const [currentViewDate, setCurrentViewDate] = useState(undefined);
    const [taskListWidth, setTaskListWidth] = useState(0);//taskListWidth start with 0
    const [svgContainerWidth, setSvgContainerWidth] = useState(0); //svg container width 0
    const [svgContainerHeight, setSvgContainerHeight] = useState(ganttHeight);
    //svg container height start default ganttHeight (Rx) 0
    const [barTasks, setBarTasks] = useState([]);
    //array bartasks empty
    const [ganttEvent, setGanttEvent] = useState({ action: "", });
    //ganttEvent object attrib action:""
    const [selectedTask, setSelectedTask] = useState();
    //selectedTask empty
    const [failedTask, setFailedTask] = useState(null);
    //failedTask start null
    const [ignoreScrollEvent, setIgnoreScrollEvent] = useState(false);
    //state to ignoreScrollEvent
    const [scrollY, setScrollY] = useState(0);//state scrollY starts on 0
    const [scrollX, setScrollX] = useState(-1);//state scrollX starts on 0
    const svgWidth = dateSetup.dates.length * columnWidth;
    //svgWidth = size of datesetup.dates * (Rx) 60 default;
    const ganttFullHeight = barTasks.length * rowHeight;
    //ganttFullHeight = size of barTasks(default 0) * 50 default;

    const taskHeight = useMemo(//barfill default value 60
        () => (rowHeight * barFill) / 100,
        [rowHeight, barFill]
    );


    //useEffect to filterTasks if onExpanderClick is active
    //setsDateSetup, setBarTasks(convertToBarTasks()) 
    useEffect(() => {
        let filteredTasks = null;
        if (onExpanderClick) {
            filteredTasks = removeHiddenTasks(tasks);
        } else {
            filteredTasks = tasks;
        }
        filteredTasks = filteredTasks.sort(sortTasks);
        const [startDate, endDate] = ganttDateRange(
            filteredTasks, viewMode, preStepsCount
        );
        let newDates = seedDates(startDate, endDate, viewMode);
        if (rtl) {
            newDates = newDates.reverse();
            if (scrollX === -1) {
                setScrollX(newDates.length * columnWidth);
            }
        }
        setDateSetup({ dates: newDates, viewMode });
        setBarTasks(convertToBarTasks(filteredTasks, newDates, columnWidth,
            rowHeight, taskHeight, barCornerRadius, handleWidth, rtl,
            barProgressColor, barProgressSelectedColor, barBackgroundColor,
            barBackgroundSelectedColor, projectProgressColor,
            projectProgressSelectedColor, projectBackgroundColor,
            projectBackgroundSelectedColor, milestoneBackgroundColor,
            milestoneBackgroundSelectedColor)
        );
    }, [tasks, viewMode, preStepsCount, rowHeight, barCornerRadius, columnWidth,
        taskHeight, handleWidth, barProgressColor, barProgressSelectedColor,
        barBackgroundColor, barBackgroundSelectedColor, projectProgressColor,
        projectProgressSelectedColor, projectBackgroundColor, projectBackgroundSelectedColor,
        milestoneBackgroundColor, milestoneBackgroundSelectedColor,
        rtl, scrollX, onExpanderClick,]);

    //UseEffect to control ViewDate, ColumnWidth, dateSetup.dates..viewMode,currentViewDate
    useEffect(() => {
        if (
            viewMode === dateSetup.viewMode &&
            ((viewDate && !currentViewDate) ||
                (viewDate && currentViewDate?.valueOf() !== viewDate.valueOf()))
        ) {
            const dates = dateSetup.dates;
            const index = dates.findIndex(
                (d, i) =>
                    viewDate.valueOf() >= d.valueOf() &&
                    i + 1 !== dates.length &&
                    viewDate.valueOf() < dates[i + 1].valueOf()
            );
            if (index === -1) {
                return;
            }
            setCurrentViewDate(viewDate);
            setScrollX(columnWidth * index);
        }
    }, [viewDate, columnWidth, dateSetup.dates, dateSetup.viewMode, viewMode, currentViewDate,
        setCurrentViewDate,]);

    //useEffect to ctrl gantEvent or barTasks
    useEffect(() => {
        const { changedTask, action } = ganttEvent;
        if (changedTask) {
            if (action === "delete") {
                setGanttEvent({ action: "" });
                setBarTasks(barTasks.filter(t => t.id !== changedTask.id));
            } else if (
                action === "move" ||
                action === "end" ||
                action === "start" ||
                action === "progress"
            ) {
                const prevStateTask = barTasks.find(t => t.id === changedTask.id);
                if (
                    prevStateTask &&
                    (prevStateTask.start.getTime() !== changedTask.start.getTime() ||
                        prevStateTask.end.getTime() !== changedTask.end.getTime() ||
                        prevStateTask.progress !== changedTask.progress)
                ) {
                    // actions for change
                    const newTaskList = barTasks.map(t =>
                        t.id === changedTask.id ? changedTask : t
                    );
                    setBarTasks(newTaskList);
                }
            }
        }
    }, [ganttEvent, barTasks]);

    //UseEffect ctrls changes on failedTask and barTasks
    useEffect(() => {
        if (failedTask) {
            setBarTasks(barTasks.map(t => (t.id !== failedTask.id ? t : failedTask)));
            setFailedTask(null);
        }
    }, [failedTask, barTasks]);

    //UseEffect ctrls changes on taskListRef and listCellWidth
    useEffect(() => {
        if (!listCellWidth) {
            setTaskListWidth(0);
        }
        if (taskListRef.current) {
            setTaskListWidth(taskListRef.current.offsetWidth);
        }
    }, [taskListRef, listCellWidth]);

    //UseEffect ctrl changes on WrapperRef and taskListWidth
    useEffect(() => {
        if (wrapperRef.current) {
            setSvgContainerWidth(wrapperRef.current.offsetWidth - taskListWidth);
        }
    }, [wrapperRef, taskListWidth]);

    //UseEffect ctrl chngs on ganttHeight, tasks, headerHeight, rowHeight
    useEffect(() => {
        if (ganttHeight) {
            setSvgContainerHeight(ganttHeight + headerHeight);
        } else {
            setSvgContainerHeight(tasks.length * rowHeight + headerHeight);
        }
    }, [ganttHeight, tasks, headerHeight, rowHeight]);

    // scroll events
    useEffect(() => {
        const handleWheel = (event) => {
            if (event.shiftKey || event.deltaX) {
                const scrollMove = event.deltaX ? event.deltaX : event.deltaY;
                let newScrollX = scrollX + scrollMove;
                if (newScrollX < 0) {
                    newScrollX = 0;
                } else if (newScrollX > svgWidth) {
                    newScrollX = svgWidth;
                }
                setScrollX(newScrollX);
                event.preventDefault();
            } else if (ganttHeight) {
                let newScrollY = scrollY + event.deltaY;
                if (newScrollY < 0) {
                    newScrollY = 0;
                } else if (newScrollY > ganttFullHeight - ganttHeight) {
                    newScrollY = ganttFullHeight - ganttHeight;
                }
                if (newScrollY !== scrollY) {
                    setScrollY(newScrollY);
                    event.preventDefault();
                }
            }

            setIgnoreScrollEvent(true);
        };

        // subscribe if scroll is necessary
        wrapperRef.current?.addEventListener("wheel", handleWheel, {
            passive: false,
        });
        return () => {
            wrapperRef.current?.removeEventListener("wheel", handleWheel);
        };
    }, [wrapperRef, scrollY, scrollX, ganttHeight, svgWidth, rtl, ganttFullHeight,]);

    const handleScrollY = (event) => {
        if (scrollY !== event.currentTarget.scrollTop && !ignoreScrollEvent) {
            setScrollY(event.currentTarget.scrollTop);
            setIgnoreScrollEvent(true);
        } else {
            setIgnoreScrollEvent(false);
        }
    };

    const handleScrollX = (event) => {
        if (scrollX !== event.currentTarget.scrollLeft && !ignoreScrollEvent) {
            setScrollX(event.currentTarget.scrollLeft);
            setIgnoreScrollEvent(true);
        } else {
            setIgnoreScrollEvent(false);
        }
    };

    /**
     * Handles arrow keys events and transform it to new scroll
     */
    const handleKeyDown = (event) => {
        event.preventDefault();
        let newScrollY = scrollY;
        let newScrollX = scrollX;
        let isX = true;
        switch (event.key) {
            case "Down": // IE/Edge specific value
            case "ArrowDown":
                newScrollY += rowHeight;
                isX = false;
                break;
            case "Up": // IE/Edge specific value
            case "ArrowUp":
                newScrollY -= rowHeight;
                isX = false;
                break;
            case "Left":
            case "ArrowLeft":
                newScrollX -= columnWidth;
                break;
            case "Right": // IE/Edge specific value
            case "ArrowRight":
                newScrollX += columnWidth;
                break;
        }
        if (isX) {
            if (newScrollX < 0) {
                newScrollX = 0;
            } else if (newScrollX > svgWidth) {
                newScrollX = svgWidth;
            }
            setScrollX(newScrollX);
        } else {
            if (newScrollY < 0) {
                newScrollY = 0;
            } else if (newScrollY > ganttFullHeight - ganttHeight) {
                newScrollY = ganttFullHeight - ganttHeight;
            }
            setScrollY(newScrollY);
        }
        setIgnoreScrollEvent(true);
    };
    //function to handle selected task Rx taskId
    const handleSelectedTask = (taskId) => {
        const newSelectedTask = barTasks.find(t => t.id === taskId);
        const oldSelectedTask = barTasks.find(
            t => !!selectedTask && t.id === selectedTask.id
        );
        if (onSelect) {
            if (oldSelectedTask) {
                onSelect(oldSelectedTask, false);
            }
            if (newSelectedTask) {
                onSelect(newSelectedTask, true);
            }
        }
        setSelectedTask(newSelectedTask);
    };
    //Function control handleExpanderClick
    const handleExpanderClick = (task) => {
        if (onExpanderClick && task.hideChildren !== undefined) {
            onExpanderClick({ ...task, hideChildren: !task.hideChildren });
        }
    };

    //Constants
    const gridProps = {
        columnWidth, svgWidth, tasks: tasks, rowHeight, dates: dateSetup.dates,
        todayColor, rtl,
    };
    const calendarProps = {
        dateSetup,
        locale, viewMode,
        headerHeight, columnWidth,
        fontFamily, fontSize, rtl,
    };
    const barProps = {
        tasks: barTasks,
        dates: dateSetup.dates,
        ganttEvent, selectedTask, rowHeight, taskHeight,
        columnWidth, arrowColor, timeStep,
        fontFamily, fontSize, arrowIndent,
        svgWidth, rtl,
        setGanttEvent, setFailedTask,
        setSelectedTask: handleSelectedTask,
        onDateChange, onProgressChange,
        onDoubleClick, onClick, onDelete,
    };

    const tableProps = {
        rowHeight,
        rowWidth: listCellWidth,
        fontFamily, fontSize,
        tasks: barTasks,
        locale, headerHeight,
        scrollY, ganttHeight,
        horizontalContainerClass: styles.horizontalContainer,
        selectedTask, taskListRef,
        setSelectedTask: handleSelectedTask,
        onExpanderClick: handleExpanderClick,
        TaskListHeader, TaskListTable,
    };

    return (
        <div>
            <div
                className={styles.wrapper}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                ref={wrapperRef}
            >
                {listCellWidth && <TaskList {...tableProps} handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />}
                <TaskGantt
                    gridProps={gridProps}
                    calendarProps={calendarProps}
                    barProps={barProps}
                    ganttHeight={ganttHeight}
                    scrollY={scrollY}
                    scrollX={scrollX}
                    isChecked={isChecked}
                />
                {ganttEvent.changedTask && (
                    <Tooltip
                        arrowIndent={arrowIndent}
                        rowHeight={rowHeight}
                        svgContainerHeight={svgContainerHeight}
                        svgContainerWidth={svgContainerWidth}
                        fontFamily={fontFamily}
                        fontSize={fontSize}
                        scrollX={scrollX}
                        scrollY={scrollY}
                        task={ganttEvent.changedTask}
                        headerHeight={headerHeight}
                        taskListWidth={taskListWidth}
                        TooltipContent={TooltipContent}
                        rtl={rtl}
                        svgWidth={svgWidth}
                    />
                )}
                <VerticalScroll
                    ganttFullHeight={ganttFullHeight}
                    ganttHeight={ganttHeight}
                    headerHeight={headerHeight}
                    scroll={scrollY}
                    onScroll={handleScrollY}
                    rtl={rtl}
                />
            </div>
            {!isChecked && <HorizontalScroll
                svgWidth={svgWidth}
                taskListWidth={taskListWidth}
                scroll={scrollX}
                rtl={rtl}
                onScroll={handleScrollX}
            />}
        </div>
    );
}