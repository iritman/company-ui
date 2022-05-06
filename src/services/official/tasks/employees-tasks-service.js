import http from "../../http-service";
import { apiUrl } from "../../../config.json";

const apiEndpoint = apiUrl + "/official/tasks/user-employees-tasks";

async function getParams() {
  const { data } = await http.get(`${apiEndpoint}/params`);

  return data;
}

async function getTaskFiles(taskID) {
  const { data } = await http.get(`${apiEndpoint}/files/${taskID}`);

  return data;
}

async function getAllData() {
  const { data } = await http.get(`${apiEndpoint}`);

  return data;
}

// async function searchData(searchText) {
//   const { data } = await http.post(`${apiEndpoint}/search`, { searchText });

//   return data;
// }

export async function saveData(record) {
  const { data } = await http.post(`${apiEndpoint}`, record);

  return data;
}

export async function deleteData(recordID) {
  const { data } = await http.delete(`${apiEndpoint}/${recordID}`);

  return data;
}

export async function saveReport(record) {
  const { data } = await http.post(`${apiEndpoint}/report`, record);

  return data;
}

export async function deleteReport(recordID) {
  const { data } = await http.delete(`${apiEndpoint}/report/${recordID}`);

  return data;
}

export async function makeReportsSeen(taskID) {
  const { data } = await http.post(`${apiEndpoint}/report/seen/${taskID}`, {});

  return data;
}

const service = {
  getParams,
  getTaskFiles,
  getAllData,
  //   searchData,
  saveData,
  deleteData,
  saveReport,
  deleteReport,
  makeReportsSeen,
};

export default service;
