// @/src/hooks/useTable.js
import { useState, useEffect } from "react";

const calculateRange = (data, rowsPerPage, page, clicked) => {
    const numOfPages = Math.ceil(data.length / rowsPerPage);
    var range = []
    var upperBound = page+4;
    var lowerBound = page-4;
    if(numOfPages<=upperBound) {
      upperBound = numOfPages;
    }
    if(clicked==="next") {
      for (let i = page; i <= upperBound; i++) {
        range.push(i);
      }
    }
    else if(clicked==="prev") {
      for (let i = lowerBound; i <= page; i++) {
        range.push(i);
      }
    }
    else {
      for (let i = 1; i <= upperBound; i++) {
        range.push(i);
      }
    }
    return range;
  };

const sliceData = (data, page, rowsPerPage) => {
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  };

const useTable = (data, page, rowsPerPage) => {
  const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState([]);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    if(page>tableRange[tableRange.length-1]) {
      var range = calculateRange(data, rowsPerPage, page, "next");
    }
    else if(page<tableRange[0]) {
      range = calculateRange(data, rowsPerPage, page, "prev");
    }
    else if(pageLoaded===false) {
      range = calculateRange(data, rowsPerPage, page, "loadData");
      if(range.length>0) {
        setPageLoaded(true);
      }
    }
    if(range) {
      setTableRange([...range]);
    }
    
    const slice = sliceData(data, page, rowsPerPage);
    setSlice([...slice]);
  }, [data, setTableRange, page, setSlice]);

  return { slice, range: tableRange };
};

export default useTable;