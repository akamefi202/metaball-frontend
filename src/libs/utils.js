import moment from "moment";

export const getFormatString = (str_date) => {
  return moment(new Date(str_date)).format("YYYY-MM-DD HH:mm");
};
