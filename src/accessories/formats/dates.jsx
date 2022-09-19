import moment from "moment";

const tableDateFormat = (date) => moment(date).format("D MMM YYYY");
const formDateFormat = (date) => moment(date).format("YYYY-MM-DD");
const summaryDateFormat = (date) => moment(date).format("D.M.YYYY");

const dateFormats = {
  tableDateFormat,
  formDateFormat,
  summaryDateFormat,
};

export default dateFormats;
