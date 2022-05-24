import http from "../../http-service";
import { apiUrl } from "../../../config.json";

const apiEndpoint = apiUrl + "/official/processes/user-my-violations";

async function searchData(filter) {
  const { data } = await http.post(`${apiEndpoint}/search`, filter);

  return data;
}

async function makeSeenViolationResponse(violationID) {
  const { data } = await http.post(
    `${apiEndpoint}/response/seen/${violationID}`,
    {}
  );

  return data;
}

const service = {
  searchData,
  makeSeenViolationResponse,
};

export default service;
