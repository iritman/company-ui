import http from "../../http-service";
import { apiUrl } from "../../../config.json";

const apiEndpoint = apiUrl + "/settings/accesses/page-accesses";

async function getMemberPageAccesses(employee_memberID) {
  const { data } = await http.get(`${apiEndpoint}/pages/${employee_memberID}`);

  return data;
}

// async function searchData(searchText) {
//   const { data } = await http.post(`${apiEndpoint}/search`, { searchText });

//   return data;
// }

export async function saveChangedAccesses(employee_memberID, records) {
  const { data } = await http.post(`${apiEndpoint}`, {
    employee_memberID,
    records,
  });

  return data;
}

// export async function deleteData(recordID) {
//   const { data } = await http.delete(`${apiEndpoint}/${recordID}`);

//   return data;
// }

const service = {
  getMemberPageAccesses,
  saveChangedAccesses,
  //   getAllData,
  //   searchData,
  //   saveData,
  //   deleteData,
};

export default service;
