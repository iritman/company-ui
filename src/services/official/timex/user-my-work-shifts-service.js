import http from "../../http-service";
import { apiUrl } from "../../../config.json";

const apiEndpoint = apiUrl + "/official/timex/user-my-work-shifts";

// async function getParams() {
//   const { data } = await http.get(`${apiEndpoint}/params`);

//   return data;
// }

// async function getAllData() {
//   const { data } = await http.get(`${apiEndpoint}`);

//   return data;
// }

async function searchData(year) {
  const { data } = await http.get(`${apiEndpoint}/${year}`);

  return data;
}

const service = {
  // getParams,
  // getAllData,
  searchData,
};

export default service;
