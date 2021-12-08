import http from "../http-service";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "/global/modules";

async function accessibleModuleCategories() {
  const { data } = await http.get(`${apiEndpoint}/accessibleModuleCategories`);

  return data;
}

async function accessibleModules(categoryID) {
  const { data } = await http.get(
    `${apiEndpoint}/accessibleModules/${categoryID}`
  );

  return data;
}

// export async function getAllData() {
//   const { data } = await http.get(`${apiEndpoint}/all`);

//   return data;
// }

// export async function saveData(record) {
//   const { data } = await http.post(`${apiEndpoint}`, record);

//   return data;
// }

// export async function deleteData(recordID) {
//   const { data } = await http.delete(`${apiEndpoint}/${recordID}`);

//   return data;
// }

const service = { accessibleModuleCategories, accessibleModules };

export default service;
