import moment from "moment-timezone";

export const getDays = (date) => {
  return parseInt(date.split("-")[2]);
};

export const getDateDayFormat = (date,daye) => {
  return moment(date)
    .startOf("months")
    .add(daye, "days")
    .format(" yyyy-MM-DDTHH:mm");
};
export const getDateSatrtDayFormat = (date,daye) => {
  return moment(date)
    .startOf("months")
    .add(daye, "days")
    .startOf("days")
    .format("yyyy-MM-DDTHH:mm");
};
export const getDateDayAddHourFormat = (date,daye, h) => {
  return moment(date)
    .startOf("months")
    .add(daye, "days")
    .add(h, "hours")
    .format("yyyy-MM-DDTHH:mm");
};
export const getDateFormat = (date) => {
  return moment(date).format("YYYY-MM-DD");
};

export const same = (dateFirst, days, dateSecande) => {
  return moment(dateFirst).isSame(
    moment(dateSecande).add(days, "days").startOf("day").format()
  );
};

export const numberDayofMonth = (date) => {
  const dateEndMonth = moment(date).endOf("month").format("YYYY-MM-DD");
  return getDays(dateEndMonth);
};
