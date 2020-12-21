import axios from "axios";
import { DashboardResult } from "./dashboardSlice";
import { BASE_URL1 } from "../../../../api/http-helper";

const headers = {
  Authorization: "Bearer 5d123376-9888-4a4f-a167-9494485fe10d",
  Accept: "application/json",
  "Content-Type": "application/json;charset=UTF-8",
};

export async function getformularies(payload: any): Promise<DashboardResult> {
  let url = `${BASE_URL1}api/1/formularies/1?index=${payload.index}&limit=${payload.limit}`
  try {
    const response = await axios.post(url, payload, {
      headers: headers,
    });
    // console.log("***** getformularies - Success");
    // console.log(response);
    return {
      list: response.data.data,
      count: response.data.count,
    };
  } catch (error) {
    // console.log("***** getformularies - Error");
    // console.log(error);
    throw error;
  }
}
