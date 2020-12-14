import axios from "axios";
import { Formulary } from "./../setup/formulary";
import { BASE_URL1 } from "../../../../api/http-helper";

const headers = {
  Authorization: "Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21",
  Accept: "application/json",
  "Content-Type": "application/json;charset=UTF-8",
};

export async function getformulary(
  formulary_id: any
): Promise<Formulary | any> {
  let url = `${BASE_URL1}api/1/formulary-setup/${formulary_id}?entity_id=${formulary_id}`;
  try {
    const response = await axios.get(url, {
      headers: headers,
    });
    //console.log("***** SETUP getformulary  - Success");
    //console.log(response);
    if (response?.data?.code === "200") {
      return response?.data?.result;
    }
    return null;
  } catch (error) {
    // console.log("***** getformularies - Error");
    // console.log(error);
    throw error;
  }
}
