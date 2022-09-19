import http from "../../http-service";
import { apiUrl } from "../../../config.json";

const apiEndpoint = apiUrl + "/official/announces/user-my-announces";

export async function getParams() {
  const { data } = await http.get(`${apiEndpoint}/params`);

  return data;
}

export async function getAnnounceFiles(announceID) {
  const { data } = await http.get(`${apiEndpoint}/files/${announceID}`);

  return data;
}

export async function getAllData() {
  const { data } = await http.get(`${apiEndpoint}`);

  return data;
}

export async function getNewData() {
  const { data } = await http.get(`${apiEndpoint}/new`);

  return data;
}

export async function getArchivedData() {
  const { data } = await http.get(`${apiEndpoint}/archive`);

  return data;
}

export async function searchData(searchText) {
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
  getParams,
  getAnnounceFiles,
  getAllData,
  getNewData,
  getArchivedData,
  searchData,
  saveData,
  deleteData,
};

export default service;
