import http from "../http-service";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "/account";

async function getMemberProfile() {
  const { data } = await http.get(`${apiEndpoint}/profile`);

  return data;
}

async function changePassword(current_password, new_password) {
  const { data } = await http.post(`${apiEndpoint}/change-password`, {
    CurrentPassword: current_password,
    NewPassword: new_password,
  });

  return data;
}

const service = {
  getMemberProfile,
  changePassword,
};

export default service;
