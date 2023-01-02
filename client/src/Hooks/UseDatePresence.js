import React, { useState } from "react";
import moment from "moment-timezone";
import { useSelector } from "react-redux";
import { getEtablissementCreatedDate } from "state/AuthSlice.js";
const getYear = (date) => {
  return parseInt(moment(date).format("YYYY-MM-DD").split("-")[0]);
};
export default function useDatePresnce() {
  const date = useSelector(getEtablissementCreatedDate);

  const onYear = moment().add(1, "month").format("YYYY-MM-DD");
  const createdDate = moment(date).add(0, "year");
  const monthCreatedDate = moment(date).format("YYYY-MM-DD").split("-")[1];
  const list = [];
  const years = getYear(onYear) - getYear(date) + 1;
  const addYearCreatedDate = (i) => {
    return moment(createdDate)
      .add(i, "year")
      .endOf("year")
      .format("YYYY-MM-DD");
  };

  const getMonth = (date) => {
    return parseInt(date[0].split("-")[1]);
  };

  const incrimentMonth = (date, k) => {
    return moment(date[0])
      .add(-k, "month")
      .startOf("month")
      .format("YYYY-MM-DD");
  };
  const crimentMonth = (date, k) => {
    return moment(date[0])
      .startOf("year")
      .add(k, "month")
      .startOf("month")
      .format("YYYY-MM-DD");
  };

  for (let i = 0; i < years; i++) {
    list.push([addYearCreatedDate(i)]);
  }

  list.map((d, i) => {
    const m = getMonth(d);

    if (i + 1 === list.length) {
      const m2 = parseInt(onYear.split("-")[1]);
      const length = m2;
      for (let k = 0; k < length; k++) {
        d.push(crimentMonth(d, k));
      }
    } else if (i === 0) {
      const m2 = parseInt(monthCreatedDate);
      const length = m - m2 + 1;
      for (let k = 0; k < length; k++) {
        d.push(incrimentMonth(d, k));
      }
    } else {
      for (let k = 0; k < 12; k++) {
        d.push(crimentMonth(d, k));
      }
    }
  });

  const nameOfManth = (d) => {
    return moment("2000-12-01").add(d, "month").format("MMMM");
  };
  return { list, nameOfManth };
}
