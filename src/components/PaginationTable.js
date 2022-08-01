// @/src/components/Table/index.jsx
import React, { useState } from "react";

import useTable from "./useTable";
import styles from "../styles/Table.module.css";
import TableFooter from "./TableFooter";

const Table = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr>
            <th className={styles.tableHeader}>Movie</th>
            <th className={styles.tableHeader}>Imdb rating</th>
            <th className={styles.tableHeader}>Year</th>
            <th className={styles.tableHeader}>Genres</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((el) => (
            <tr className={styles.tableRowItems} key={el._id}>
              <td className={styles.tableCell}>{el.title}</td>
              <td className={styles.tableCell}>{el.imdb.rating}</td>
              <td className={styles.tableCell}>{el.year}</td>
              <td className={styles.tableCell}>{el.genres}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} rowsPerPage={rowsPerPage} setPage={setPage} page={page} data={data} />
    </>
  );
};

export default Table;
