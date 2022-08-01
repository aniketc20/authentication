// @/src/components/Table/TableFooter/index.jsx
import React, { useEffect, useState } from "react";

import styles from "../styles/TableFooter.module.css";

const TableFooter = ({ range, rowsPerPage, setPage, page, data }) => {

  const [disabled, setDisabled] = useState(true);
  const [disabledPrev, setDisabledPrev] = useState(true);
  
  useEffect(() => {
    
    const numOfPages = Math.ceil(data.length / rowsPerPage);
    if(data.length>0) {
      setDisabled(false)
      setDisabledPrev(false)
    }
    if(range.includes(numOfPages)) {
      setDisabled(true)
    }
    if(range.includes(1)) {
      setDisabledPrev(true)
    }
   },[data, range])

  const nextPage = () => {
    setPage(range[range.length-1] + 1)
    setDisabledPrev(false)
  }

  const prevPage = () => {
    setPage(range[0] - 1)
    setDisabled(false)
  }

  return (
    <div className={styles.tableFooter}>
      <button disabled={disabledPrev} onClick={prevPage}>left arrow</button>
      {range.map((el, index) => (
        <button
          key={index}
          className={`${styles.button} ${
            page === el ? styles.activeButton : styles.inactiveButton
          }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))}
      <button disabled={disabled} onClick={nextPage}>right arrow</button>
    </div>
  );
};

export default TableFooter;
