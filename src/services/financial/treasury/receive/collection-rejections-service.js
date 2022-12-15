import http from "../../../http-service";
import { apiUrl } from "../../../../config.json";

const apiEndpoint =
  apiUrl + "/financial/treasury/receive/collection-rejections";

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

export async function reject(collection_rejection_id) {
  const { data } = await http.post(
    `${apiEndpoint}/reject/${collection_rejection_id}`,
    {}
  );

  return data;
}

export async function approve(collection_rejection_id) {
  const { data } = await http.post(
    `${apiEndpoint}/approve/${collection_rejection_id}`,
    {}
  );

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

export async function getCheques(companyBankAccountID) {
  const { data } = await http.get(
    `${apiEndpoint}/cheques/${companyBankAccountID}`
  );

  return data;
}

export async function getDemands(companyBankAccountID) {
  const { data } = await http.get(
    `${apiEndpoint}/demands/${companyBankAccountID}`
  );

  return data;
}

const service = {
  getParams,
  getItemsParams,
  searchData,
  saveData,
  saveItem,
  reject,
  approve,
  deleteData,
  deleteItem,
  getCheques,
  getDemands,
};

export default service;
