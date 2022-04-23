import http from "../../../http-service";
import { apiUrl } from "../../../../config.json";

const apiEndpoint = apiUrl + "/official/timex/reports/user-my-reports";

async function getMyInOutCards(filter) {
  const { data } = await http.post(`${apiEndpoint}/my/in-out-cards`, filter);

  return data;
}

const service = {
  getMyInOutCards,
};

export default service;
