import http from "../http-service";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "/dashboard/user";

async function getTimexStatistics() {
  const { data } = await http.get(`${apiEndpoint}/timex`);

  return data;
}

const service = {
  getTimexStatistics,
};

export default service;
