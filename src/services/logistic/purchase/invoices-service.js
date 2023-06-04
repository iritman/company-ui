import http from "../../http-service";
import { apiUrl } from "../../../config.json";

const apiEndpoint = apiUrl + "/logistic/purchase/invoices";

export async function getParams() {
  const { data } = await http.get(`${apiEndpoint}/params`);

  return data;
}

export async function getSearchParams() {
  const { data } = await http.get(`${apiEndpoint}/search/params`);

  return data;
}

// export async function getItemParams() {
//   const { data } = await http.get(`${apiEndpoint}/item/params`);

//   return data;
// }

export async function getRegedInquiryRequestItems(supplierID) {
  const { data } = await http.get(
    `${apiEndpoint}/search/inquiry/items/${supplierID}`
  );

  return data;
}

export async function getRegedInquiryRequestItemByID(itemID) {
  const { data } = await http.get(
    `${apiEndpoint}/search/inquiry/item/${itemID}`
  );

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

export async function rejectInvoice(requestID) {
  const { data } = await http.post(`${apiEndpoint}/reject/${requestID}`, {});

  return data;
}

export async function approveInvoice(requestID) {
  const { data } = await http.post(`${apiEndpoint}/approve/${requestID}`, {});

  return data;
}

export async function undoApproveInvoice(requestID) {
  const { data } = await http.post(
    `${apiEndpoint}/undo-approve/${requestID}`,
    {}
  );

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
  getSearchParams,
  //   getItemParams,
  getRegedInquiryRequestItems,
  getRegedInquiryRequestItemByID,
  searchData,
  saveData,
  saveItem,
  rejectInvoice,
  approveInvoice,
  undoApproveInvoice,
  deleteData,
  deleteItem,
};

export default service;
