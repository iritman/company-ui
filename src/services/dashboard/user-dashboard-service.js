import http from "../http-service";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "/dashboard/user";

async function getTimexStatistics() {
  const { data } = await http.get(`${apiEndpoint}/timex`);

  return data;
}

async function getTaskStatistics() {
  const { data } = await http.get(`${apiEndpoint}/task`);

  return data;
}

const service = {
  getTimexStatistics,
  getTaskStatistics,
};

export default service;
