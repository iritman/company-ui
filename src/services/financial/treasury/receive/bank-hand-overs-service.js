import http from "../../../http-service";
import { apiUrl } from "../../../../config.json";

const apiEndpoint = apiUrl + "/financial/treasury/receive/bank-hand-overs";

export async function getParams() {
  const { data } = await http.get(`${apiEndpoint}/params`);

  return data;
}

export async function getItemsParams() {
  const { data } = await http.get(`${apiEndpoint}/items/params`);

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

export async function saveItem(itemType, record) {
  const { data } = await http.post(`${apiEndpoint}/item/${itemType}`, record);

  return data;
}

export async function rejectHandOver(handOverID) {
  const { data } = await http.post(`${apiEndpoint}/reject/${handOverID}`, {});

  return data;
}

export async function approveHandOver(handOverID) {
  const { data } = await http.post(`${apiEndpoint}/approve/${handOverID}`, {});

  return data;
}

export async function deleteData(recordID) {
  const { data } = await http.delete(`${apiEndpoint}/${recordID}`);

  return data;
}

export async function deleteItem(itemType, recordID) {
  const { data } = await http.delete(`${apiEndpoint}/${itemType}/${recordID}`);

  return data;
}

export async function getCheques() {
  const { data } = await http.get(`${apiEndpoint}/cheques`);

  return data;
}

export async function getDemands() {
  const { data } = await http.get(`${apiEndpoint}/demands`);

  return data;
}

const service = {
  getParams,
  getItemsParams,
  searchData,
  saveData,
  saveItem,
  rejectReciveReceipt,
  approveReciveReceipt,
  deleteData,
  deleteItem,
  getCheques,
  getDemands,
};

export default service;
