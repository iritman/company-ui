import http from "../http-service";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "/global/form";

export const forms = {
  FINANCIAL_STORE_PRODUCT_REQUEST: 1,
};

export async function getFormUI(form_id) {
  const { data } = await http.get(`${apiEndpoint}/ui/${form_id}`);

  return data;
}

const service = {
  forms,
  getFormUI,
};

export default service;
