import http from "../../http-service";
import { apiUrl } from "../../../config.json";

const apiEndpoint = apiUrl + "/settings/timex/group-shifts";

async function getParams() {
  const { data } = await http.get(`${apiEndpoint}/params`);

  return data;
}

async function getAllData(departmentID, startDate, finishDate) {
  const { data } = await http.post(`${apiEndpoint}`, {
    departmentID,
    startDate,
    finishDate,
  });

  return data;
}

async function searchData(filter) {
  const { data } = await http.post(`${apiEndpoint}/search`, filter);

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
  getParams,
  getAllData,
  searchData,
  saveData,
  deleteData,
};

export default service;
