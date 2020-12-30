import axios from "axios";
import { FormularyVersionHistoryResult } from "./version-history.slice";
import { BASE_URL1 } from "../../../../api/http-helper";

const headers = {
  Authorization: "Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21",
  Accept: "application/json",
  "Content-Type": "application/json;charset=UTF-8"
};

// to get version histories of formulary with base formulary id
export async function getformularyVersionHistory({
  formularyBaseId,
  index,
  limit
}: {
  formularyBaseId: number;
  index: number;
  limit: number;
}): Promise<FormularyVersionHistoryResult> {
  let url = `${BASE_URL1}api/1/formulary-versions/${formularyBaseId}?index=${index}&limit=${limit}`;

  try {
    const response = await axios.get(url, {
      headers: headers
    });
    // console.log("***** getformulary Versions - Success");
    // console.log(response);
    return {
      formulary_version_history: response.data.data
    };
  } catch (error) {
    console.log("***** getformulary Versions - Error");
    console.log(error);
    throw error;
  }
}
