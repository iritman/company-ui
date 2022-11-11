import http from "../../../http-service";
import { apiUrl } from "../../../../config.json";

const apiEndpoint = apiUrl + "/financial/treasury/receive/receive-requests";

export async function getParams() {
  const { data } = await http.get(`${apiEndpoint}/params`);

  return data;
}

export async function searchFronSideAccounts(searchText) {
  const { data } = await http.post(`${apiEndpoint}/accounts`, { searchText });

  return data;
}

export async function searchData(filter) {
  const { data } = await http.post(`${apiEndpoint}/search`, filter);

  return data;
}

export async function saveData(record) {
  const { data } = await http.post(`${apiEndpoint}`, record);

  return data;
}

export async function saveItem(record) {
  const { data } = await http.post(`${apiEndpoint}/item`, record);

  return data;
}

export async function rejectReciveRequest(requestID) {
  const { data } = await http.post(`${apiEndpoint}/reject/${requestID}`, {});

  return data;
}

export async function approveReciveRequest(requestID) {
  const { data } = await http.post(`${apiEndpoint}/approve/${requestID}`, {});

  return data;
}

export async function deleteData(recordID) {
  const { data } = await http.delete(`${apiEndpoint}/${recordID}`);

  return data;
}

export async function deleteItem(recordID) {
  const { data } = await http.delete(`${apiEndpoint}/item/${recordID}`);

  return data;
}

const service = {
  getParams,
  searchFronSideAccounts,
  searchData,
  saveData,
  saveItem,
  rejectReciveRequest,
  approveReciveRequest,
  deleteData,
  deleteItem,
};

export default service;
