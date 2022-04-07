import http from "../../http-service";
import { apiUrl } from "../../../config.json";

const apiEndpoint = apiUrl + "/settings/timex/vacation-cardex-settings";

async function getAllData() {
  const { data } = await http.get(`${apiEndpoint}`);

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
  getAllData,
  saveData,
  deleteData,
};

export default service;
