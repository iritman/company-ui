import http from "../../http-service";
import { apiUrl } from "../../../config.json";

const apiEndpoint =
  apiUrl + "/official/timex/user-official-check-no-alternative-employees";

async function getAllData() {
  const { data } = await http.get(`${apiEndpoint}`);

  return data;
}

async function getParams() {
  const { data } = await http.get(`${apiEndpoint}/params`);

  return data;
}

async function searchData(searchText) {
  const { data } = await http.post(`${apiEndpoint}/search`, { searchText });

  return data;
}
export async function saveData(record) {
  const { data } = await http.post(`${apiEndpoint}`, record);

  return data;
}

export async function deleteData(recordID) {
  const { data } = await http.delete(`${apiEndpoint}/${recordID}`);

  return data;
}

const service = {
  getAllData,
  getParams,
  searchData,
  saveData,
  deleteData,
};

export default service;
