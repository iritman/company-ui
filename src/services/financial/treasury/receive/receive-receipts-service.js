import http from "../../../http-service";
import { apiUrl } from "../../../../config.json";

const apiEndpoint = apiUrl + "/financial/treasury/receive/receive-receipts";

export async function getParams() {
  const { data } = await http.get(`${apiEndpoint}/params`);

  return data;
}

export async function getItemsParams() {
  const { data } = await http.get(`${apiEndpoint}/items/params`);

  return data;
}

export async function searchFronSideAccounts(searchText) {
  const { data } = await http.post(`${apiEndpoint}/accounts`, { searchText });

  return data;
}

export async function searchDeliveryMembers(searchText) {
  const { data } = await http.post(`${apiEndpoint}/delivery-members`, {
    searchText,
  });

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

export async function saveCheque(record) {
  const { data } = await http.post(`${apiEndpoint}/cheque`, record);

  return data;
}

export async function rejectReciveReceipt(receiveID) {
  const { data } = await http.post(`${apiEndpoint}/reject/${receiveID}`, {});

  return data;
}

export async function approveReciveReceipt(receiveID) {
  const { data } = await http.post(`${apiEndpoint}/approve/${receiveID}`, {});

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

const service = {
  getParams,
  getItemsParams,
  searchFronSideAccounts,
  searchDeliveryMembers,
  searchData,
  saveData,
  saveCheque,
  rejectReciveReceipt,
  approveReciveReceipt,
  deleteData,
  deleteItem,
};

export default service;
