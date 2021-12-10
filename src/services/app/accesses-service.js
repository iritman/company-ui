import http from "../http-service";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "/global/accesses";

async function getPageAccess(pageName) {
  const { data } = await http.post(`${apiEndpoint}`, { pageName });

  return data;
}

const service = {
  getPageAccess,
};

export default service;
