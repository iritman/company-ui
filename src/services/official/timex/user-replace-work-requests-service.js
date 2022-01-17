import http from "../../http-service";
import { apiUrl } from "../../../config.json";

const apiEndpoint = apiUrl + "/official/timex/user-replace-work-requests";

async function getParams() {
  const { data } = await http.get(`${apiEndpoint}/params`);

  return data;
}

async function searchData(filter) {
  const { data } = await http.post(`${apiEndpoint}/search`, filter);

  return data;
}

async function saveResponse(response) {
  const { data } = await http.post(`${apiEndpoint}/response`, response);

  return data;
}

async function saveData(record) {
  const { data } = await http.post(`${apiEndpoint}`, record);

  return data;
}

const service = {
  getParams,
  searchData,
  saveResponse,
  saveData,
};

export default service;
