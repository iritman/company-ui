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

export async function searchFrontSideAccounts(searchText) {
  const { data } = await http.post(`${apiEndpoint}/accounts`, { searchText });

  return data;
}

export async function searchFrontSideAccountByID(accountID) {
  const { data } = await http.get(`${apiEndpoint}/account/${accountID}`);

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

export async function saveItem(itemType, record) {
  const { data } = await http.post(`${apiEndpoint}/item/${itemType}`, record);

  return data;
}

export async function rejectReceiveReceipt(receiveID) {
  const { data } = await http.post(`${apiEndpoint}/reject/${receiveID}`, {});

  return data;
}

export async function approveReceiveReceipt(receiveID) {
  const { data } = await http.post(`${apiEndpoint}/approve/${receiveID}`, {});

  return data;
}

export async function undoApprove(receiveID) {
  const { data } = await http.post(
    `${apiEndpoint}/undo-approve/${receiveID}`,
    {}
  );

  return data;
}

export async function submitVoucher(receiveID) {
  const { data } = await http.post(
    `${apiEndpoint}/submit-voucher/${receiveID}`,
    {}
  );

  return data;
}

export async function deleteVoucher(receiveID) {
  const { data } = await http.post(
    `${apiEndpoint}/delete-voucher/${receiveID}`,
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

const service = {
  getParams,
  getItemsParams,
  searchFrontSideAccounts,
  searchFrontSideAccountByID,
  searchDeliveryMembers,
  searchData,
  saveData,
  saveItem,
  rejectReceiveReceipt,
  approveReceiveReceipt,
  undoApprove,
  submitVoucher,
  deleteVoucher,
  deleteData,
  deleteItem,
};

export default service;
