import http from "../http-service";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "/dashboard/user";

async function getTimexStatistics() {
  const { data } = await http.get(`${apiEndpoint}/timex`);

  return data;
}

async function getTaskStatistics(departmentID, calculateSubDepartments) {
  let result = null;

  if (departmentID === 0) {
    const { data } = await http.get(`${apiEndpoint}/task`);
    result = data;
  } else {
    const { data } = await http.get(
      `${apiEndpoint}/task/${departmentID}/${calculateSubDepartments}`
    );
    result = data;
  }

  return result;
}

async function getMemberDepartmentInfo() {
  const { data } = await http.get(`${apiEndpoint}/task/departments`);

  return data;
}

const service = {
  getTimexStatistics,
  getTaskStatistics,
  getMemberDepartmentInfo,
};

export default service;
