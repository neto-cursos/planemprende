import { Checkbox } from "@mui/material";
import React, { useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCron_done } from "./../../../../redux/reducers/cronogramaSlice";
import EraseEntry from "./../../../../assets/icons/eraseEntry";
import styles from "./task-list-table.module.css";
import { nanoid } from "@reduxjs/toolkit";
import EditCard from './../../../../assets/icons/editCard';
import RemoveCard from './../../../../assets/icons/removeCard';
import EditIcon from '@mui/icons-material/Edit';

const padTo2Digits = (num) => {
  return num.toString().padStart(2, '0');
}


const formatDate = (date) => {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/');
}

const localeDateStringCache = {};
const toLocaleDateStringFactory =
  (locale) =>
    (date, dateTimeOptions) => {
      const key = date.toString();
      // console.log("key: ");
      // console.log(key);
      let lds = localeDateStringCache[key];
      // console.log("lds: ");
      // console.log(lds);
      if (!lds) {
        // console.log("ENTRÓ");
        lds = date.toLocaleDateString(locale, dateTimeOptions);
        localeDateStringCache[key] = lds;

      }
      return lds;
    };
const dateTimeOptions = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
};


function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
export const TaskListTableDefault = ({
  rowHeight,
  rowWidth,
  tasks,
  fontFamily,
  fontSize,
  locale,
  onExpanderClick,
  handleEdit,
  handleDelete,
  horizontalContainerRef,
}) => {

  //useState for managin window size
  const [windowSize, setWindowSize] = React.useState(getWindowSize());
  //useEffect for managing resizing window
  React.useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);


  const monto = useRef(null);
  monto.current = 0;
  // const monto=0
  let monto2 = [];
  monto2 = tasks.map(t => {
    if (t.id !== '1') {
      monto.current = Number(monto.current) + (Number(t.costounitario) * Number(t.cantidad));
    }
  })
  // let monto2=[];
  // monto2=tasks.map(t=>(Number(t.monto)))
  // console.log(monto2);
  // console.log(monto2.reduce((acc,current)=>acc+current,0));
  const crons = useSelector(state => state.cronogramas);
  const dispatch = useDispatch();

  const toLocaleDateString = useMemo(
    () => toLocaleDateStringFactory(locale),
    [locale]
  );

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    // console.log(event.target);
    dispatch(changeCron_done({ id: event.target.id, value: event.target.checked, }))
    setChecked(event.target.checked);
  };
  // t.cron_done == true ? ()=>{setChecked(true);return } : setChecked(false)
  if (windowSize.innerWidth > 900) {
    return (<>
      {/*<div
      className={styles.taskListWrapper}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
    >*/}

      {tasks.map(t => {
        let expanderSymbol = "";
        if (t.hideChildren === false) {
          expanderSymbol = "▼";
        } else if (t.hideChildren === true) {
          expanderSymbol = "▶";
        }

        return (/*<div
      className={styles.taskListTableRow}
      // style={{ height: rowHeight }}
      key={`${t.id}row`}
    >*/
          <div key={t.id} className={t.id !== '1' ?styles.rowTable:styles.rowTableTitle} ref={horizontalContainerRef}>
            <div
              className={`${styles.taskListCell}`}
              // style={{
              //   minWidth: rowWidth,
              //   maxWidth: rowWidth,
              // }}
              title={t.name}
            >
              <div className={styles.taskListNameWrapper}>
                <div
                  className={
                    expanderSymbol
                      ? styles.taskListExpander
                      : styles.taskListEmptyExpander
                  }
                  onClick={() => onExpanderClick(t)}
                >
                  {expanderSymbol}
                </div>
                {t.id!=='1'&&<span className="hover:text-redish  cursor-pointer focus:ring-green-500 text-bluenavish" onClick={t.id !== '1' ? () => handleEdit(t.id) : null}>
                  <EditIcon></EditIcon>
                </span>}
                

                <div
                  className={styles.taskListCell}
                  style={{

                    //minWidth: rowWidth,
                    //maxWidth: rowWidth,
                    // minWidth: '30px',
                    // maxWidth: '30px',
                  }}
                >
                  {t.id !== '1' &&<span>&nbsp;{t.displayorder -1}&nbsp;</span>}
                  
                  {/* &nbsp;{toLocaleDateString(t.start, dateTimeOptions)} */}
                </div>

                <h3 className={t.id !== '1' ? `pl-2 hover:text-redish  cursor-pointer focus:ring-green-500 text-bluenavish` : ` text-whitish invert text-md`} onClick={t.id !== '1' ? () => handleEdit(t.id) : null}>{t.name}
                </h3>
              </div>
            </div>
            <div
              className={styles.taskListCell}
              style={{

                //minWidth: rowWidth,
                //maxWidth: rowWidth,
                // minWidth: '90px',
                // maxWidth: '90px',
              }}
            >
              <span className={t.id !== '1' ? `pl-2 hover:text-redish  cursor-pointer focus:ring-green-500 text-bluenavish` : `text-whitish invert text-md`}>
                {formatDate(t.start)}
              </span>
              {/* &nbsp;{toLocaleDateString(t.start, dateTimeOptions)} */}
            </div>
            <div
              className={styles.taskListCell}
              style={{
                // minWidth: '90px',
                // maxWidth: '90px',
              }}
            >
              {/* &nbsp;{toLocaleDateString(t.end, dateTimeOptions)} */}
              <span className={t.id !== '1' ? `pl-2 hover:text-redish  cursor-pointer focus:ring-green-500 text-bluenavish` : `text-whitish invert text-md`}>
                {formatDate(t.end)}
              </span>

              {/* {            
              console.log(t.end.getDate()+"/"+(t.end.getMonth() + 1)+"/"+t.end.getFullYear())} */}
              {/* {console.log(formatDate(t.end))} */}
            </div>
            <div
              className={styles.taskListCell}
              style={{
                // minWidth: rowWidth,
                // maxWidth: rowWidth,
              }}

              title={t.responsable}
            >
              <span className={t.id !== '1' ? `pl-2 hover:text-redish  cursor-pointer focus:ring-green-500 text-bluenavish` : `text-whitish invert text-md`}>
                {t.responsable}
              </span>
            </div>
            {/* <div
              className={`text-center ${styles.taskListCell}`}
              style={{
                minWidth: '70px',
                maxWidth: '70px',
              }}
              title={t.dependencies}
            >
              &nbsp;{t.dependencies}
            </div> */}
            {/* cantidad */}
            <div
              className={`text-center ${styles.taskListCell}`}
              style={{
                // minWidth: '70px',
                // maxWidth: '70px',
              }}
              title={t.cantidad}
            >
              <span className={t.id !== '1' ? `pl-2 hover:text-redish  cursor-pointer focus:ring-green-500 text-bluenavish` : `text-whitish invert text-md`}>
                {t.cantidad}
              </span>

            </div>
            {/* unidad */}
            <div
              className={`text-center ${styles.taskListCell}`}
              style={{
                // minWidth: '100px',
                // maxWidth: '100px',
              }}
              title={t.unidad}
            >
              <span className={t.id !== '1' ? `pl-2 hover:text-redish  cursor-pointer focus:ring-green-500 text-bluenavish` : `text-whitish invert text-md`}>
              {t.unidad}
              </span>
              
            </div>
            {/* monto */}
            <div
              className={`text-center ${styles.taskListCell}`}
              style={{
                // minWidth: '100px',
                // maxWidth: '100px',
              }}
              title={t.id == '1' ? monto.current : t.monto}
            >
              <span className={t.id !== '1' ? `pl-2 hover:text-redish  cursor-pointer focus:ring-green-500 text-bluenavish` : `text-whitish invert text-md`}>
              {t.id == '1' ? monto.current : t.monto}&nbsp;Bs.
              </span>
              
            </div>
            <div
              className={styles.taskListCell}
              style={{
                // minWidth: '250px',
                // maxWidth: '250px',
              }}
              title={t.notas}
            >
              <span className={t.id !== '1' ? `pl-2 hover:text-redish  cursor-pointer focus:ring-green-500 text-bluenavish` : `text-whitish invert text-md`}>
              {t.notas}
              </span>
            </div>
            <div
              className={styles.taskListCell}
              style={{
                // minWidth: '50px',
                // maxWidth: '50px',
              }}
              title={t.cron_done ? 'completado' : 'no completado'}
            >
              {t.id !== '1' &&
                <Checkbox id={t.id} sx={{
                  color: '#b33c50',
                  '&.Mui-checked': {
                    color: '#e397a4',
                  },
                }}
                  checked={t.cron_done == true ? true : false}
                  onChange={handleChange}
                ></Checkbox>}

            </div>
            <div
              className={styles.taskListCell}
              style={{
                // minWidth: '30px',
                // maxWidth: '30px',
                paddingTop: '1rem',
                textAlign: 'center',
              }}
              title={'Eliminar'}
            >
              {t.id !== '1' ?
                t.resp_id == null ?
                  <button className='' onClick={() => {
                    return handleDelete(t.id)
                  }}><EraseEntry color="redish"></EraseEntry>&nbsp;
                  </button> : '' : ''
              }


            </div>
          </div>


        );
      })
      }
      {/* </div> */}
    </>
    );
  } else {
    return (<>
      {tasks.map(t => {
        return t.id != 1 && <div className="w-full flex items-center bg-gray-100 mb-4 shadow text-base"
          key={t.id}>
          <div className="flex-auto text-left px-4 py-2 m-1 w-3/4">
            <p className="text-gray-900 leading-none font-bold">{t.name}</p>
            <p className="text-gray-600">Inicio: {formatDate(t.start)} - Fin: {formatDate(t.end)}</p>
            <p className="text-gray-600">Responsable: {t.responsable}</p>
            <p className="text-gray-600 text-xs">cantidad: {t.cantidad} - unidad: {t.unidad} - monto: {t.monto}</p>
            <span className="inline-block text-sm font-semibold mt-1">{t.notas}</span>

          </div>

          <div className="flex-auto text-left sm:text-right px-2 py-2 m-1 w-1/4">
            <button title="Editar" onClick={t.id !== '1' ? () => handleEdit(t.id) : null} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold mr-3 py-2 px-2 rounded-full inline-flex items-center">
              <EditCard></EditCard>
            </button>
            <button title="Eliminar" onClick={() => {
              return handleDelete(t.id)
            }} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-2 rounded-full inline-flex items-center">
              <RemoveCard></RemoveCard>
            </button>
          </div>
        </div>
      })}
    </>
    )
  }
};