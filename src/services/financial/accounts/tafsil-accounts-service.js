import http from "../../http-service";
import { apiUrl } from "../../../config.json";

const apiEndpoint = apiUrl + "/financial/accounts/tafsil-accounts";

export async function getParams() {
  const { data } = await http.get(`${apiEndpoint}/params`);

  return data;
}

export async function getTafsilAccountAccesses(pageID) {
  const { data } = await http.get(`${apiEndpoint}/accesses/${pageID}`);

  return data;
}

export async function getAllData() {
  const { data } = await http.get(`${apiEndpoint}`);

  return data;
}

export async function getNewTafsilCode(tafsilTypeID) {
  const { data } = await http.get(`${apiEndpoint}/tafsil-code/${tafsilTypeID}`);

  return data;
}

export async function getModuleItems(tableID) {
  const { data } = await http.get(`${apiEndpoint}/module-items/${tableID}`);

  return data;
}

export async function searchData(searchText) {
  const { data } = await http.post(`${apiEndpoint}/search`, { searchText });

  return data;
}

export async function createTafsilAccount(pageID, tableName, itemID) {
  const { data } = await http.post(`${apiEndpoint}/create`, {
    pageID,
    tableName,
    itemID,
  });

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
  getTafsilAccountAccesses,
  getAllData,
  getNewTafsilCode,
  getModuleItems,
  searchData,
  createTafsilAccount,
  saveData,
  deleteData,
};

export default service;
