import React from "react";
import styles from "./task-list-header.module.css";

export const TaskListHeaderDefault = ({ headerHeight, fontFamily, fontSize, rowWidth }) => {
  return (<>
    {/*<div
      className={styles.ganttTable}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
    >
      <div
        className={styles.ganttTable_Header}
      // style={{
      //   height: headerHeight - 2,
      // }}
    >*/}
        
        <div
          className={`pl-8 ${styles.ganttTable_HeaderItem}`}
        >
          Actividad
        </div>
        {/* <div
          className={styles.ganttTable_HeaderSeparator}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.2,
          }}
        /> */}
        <div
          className={`text-center ${styles.ganttTable_HeaderItem}`}

        >
          Inicio
        </div>
        {/* <div
          className={styles.ganttTable_HeaderSeparator}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.25,
          }}
        /> */}
        <div
          className={`text-center ${styles.ganttTable_HeaderItem}`}

        >
          Fin
        </div>
        {/* <div
          className={styles.ganttTable_HeaderSeparator}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.25,
          }}
        /> */}
        <div
          className={`text-center ${styles.ganttTable_HeaderItem}`}

        >
          Responsable
        </div>
        {/* <div
          className={styles.ganttTable_HeaderSeparator}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.25,
          }}
        /> */}
        {/* <div
          className={`text-center ${styles.ganttTable_HeaderItem}`}
          style={{
            minWidth: '70px',
          }}
        >
          &nbsp;Act. Req
        </div> */}
        
        <div
          className={`text-center ${styles.ganttTable_HeaderItem}`}

        >
          Cantidad
        </div>

        <div
          className={`text-center ${styles.ganttTable_HeaderItem}`}

        >
          Unidad
        </div>

        <div
          className={`text-center ${styles.ganttTable_HeaderItem}`}

        >
          Monto
        </div>

        <div
          className={`text-center ${styles.ganttTable_HeaderItem}`}
        >
          Observación
        </div>

        <div
          className={`text-center ${styles.ganttTable_HeaderItem}`}
        >
          C
        </div>

        <div
          className={`text-center ${styles.ganttTable_HeaderItem}`}
        >
          B
        </div>
      {/*</div>
    </div>*/}
    </>
  );
};