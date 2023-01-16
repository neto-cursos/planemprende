import React, { useEffect, useRef } from "react";
import styles from "./task-list.module.css";
import { nanoid } from "@reduxjs/toolkit";
export const TaskList = ({
  headerHeight,
  fontFamily,
  fontSize,
  rowWidth,
  rowHeight,
  scrollY,
  tasks,
  selectedTask,
  setSelectedTask,
  onExpanderClick,
  locale,
  ganttHeight,
  taskListRef,
  horizontalContainerClass,
  TaskListHeader,
  TaskListTable,
  handleEdit,
  handleDelete,
}) => {
  //useRef horizontalContainerRef
  const horizontalContainerRef = useRef(null);
  //cuando cambie el valor ScrollY  cambia el valor de scrollTop = scrollY
  useEffect(() => {
    if (horizontalContainerRef.current) {
      horizontalContainerRef.current.scrollTop = scrollY;
    }
  }, [scrollY]);
  
/** 
 * Constante objeto headerProps con valores de 
 * headerHeight fontFamily, fontSize, rowWidth (props)
 * */ 
  const headerProps = {
    headerHeight,
    fontFamily,
    fontSize,
    rowWidth,
  };
  /**
   * selectedTaskId si selectedTask esta definido
   * le asigna el valor de id del selectedTask o le asigna
   * valor vacío ""
   */
  const selectedTaskId = selectedTask ? selectedTask.id : "";
  /**
   * tableProps una constante para el manejo de tableProps
   */
  const tableProps = {
    rowHeight,
    rowWidth,
    fontFamily,
    fontSize,
    tasks,
    locale,
    selectedTaskId: selectedTaskId,
    setSelectedTask,
    onExpanderClick,
  };

  return (
    <div className={styles.ganttWrapper} ref={taskListRef}>
      <div className={styles.ganttTable}>
      <TaskListHeader {...headerProps} />
      </div>
      {/* <div
        ref={horizontalContainerRef}
        className={horizontalContainerClass}
        style={ganttHeight ? { height: ganttHeight } : {}}
      > */}
      {/* <div key={nanoid()} className={styles.ganttTable} ref={horizontalContainerRef}> */}
        <TaskListTable {...tableProps} handleEdit={handleEdit }
        handleDelete={handleDelete} horizontalContainerRef={horizontalContainerRef}/>
      {/* </div> */}
      {/* </div> */}
      
    </div>
  );
};