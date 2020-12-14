import axios from "axios";
import { Formulary } from "./formulary";
import { BASE_URL1 } from "../../../../api/http-helper";
import {
  DesignOptions,
  GeneralOptions,
  MedicareOptions,
  SupplementalOptions,
} from "./setupOptionsSlice";

const headers = {
  Authorization: "Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21",
  Accept: "application/json",
  "Content-Type": "application/json;charset=UTF-8",
};

export async function getGeneralOptions(): Promise<GeneralOptions | any> {
  //console.log("- - - - - - - - - - - - -  - - CALL");
  let url1 = `${BASE_URL1}api/1/formulary-types`;
  let url2 = `${BASE_URL1}api/1/formulary-contract-years`;
  //let url3 = `${BASE_URL1}api/1/formulary-submission-months/${new Date().getFullYear()}`;
  let url3 = `${BASE_URL1}api/1/classification-systems/1`;
//  let url4 = `${BASE_URL1}api//1/client-states/1`;

  let url4 = `https://api-dev-config.futurerx.com/api//1/client-states/1`

  const request1 = axios.get(url1, {
    headers: headers,
  });
  const request2 = axios.get(url2, {
    headers: headers,
  });
  const request3 = axios.get(url3, {
    headers: headers,
  });
  const request4 = axios.get(url4, {
    headers: headers,
  });
  return await axios
    .all([request1, request2, request3, request4])
    .then(
      axios.spread((...responses) => {
        const response1 = responses[0];
        const response2 = responses[1];
        const response3 = responses[2];
        const response4 = responses[3]; 
        // console.log(response1, response2, response3);
        let list1 = [];
        if (response1?.data?.code === "200") {
          list1 = response1?.data?.data;
        }
        let list2 = [];
        if (response2?.data?.code === "200") {
          list2 = response2?.data?.data;
        }
        let list3 = [];
        if (response3?.data?.code === "200") {
          list3 = response3?.data?.data;
        }
        let list4 = [];
        if (response4?.data?.code === "200") {
          list4 = response4?.data?.result;
        }

        // console.log("- - - - - - - - - - - - -  - - RESP");
        // console.log(list1, list2, list3);
        return {
          formularyType: list1,
          contractYear: list2,
          classification_systems: list3,
          states: list4,
        };
      })
    )
    .catch((errors) => {
      console.error(errors);
    });
}

//getMedicareOptions
export async function getMedicareOptions(
  formulary_id: any
): Promise<MedicareOptions | any> {
  //let url = `${this.apiBaseUrl}/1/medicare-contract-types/${id_formulary_type}`;
  let url = `${BASE_URL1}api/1/medicare-contract-types/${formulary_id}`;
  try {
    const response = await axios.get(url, {
      headers: headers,
    });
    //console.log("***** SETUP getMedicareOptions  - Success");
    //console.log(response);
    if (response?.data?.code === "200") {
      return response?.data?.data;
    }
    return null;
  } catch (error) {
    // console.log("***** getformularies - Error");
    // console.log(error);
    throw error;
  }
}

export async function getDesignOptions(
  formulary_id: any
): Promise<DesignOptions | any> {
  let url = `${BASE_URL1}api/1/edits/${formulary_id}`;
  try {
    const response = await axios.get(url, {
      headers: headers,
    });
    //console.log("***** SETUP getDesignOptions  - API");
    //console.log(response);
    if (response?.data?.code === "200") {
      return response?.data?.data;
    }
    return null;
  } catch (error) {
    // console.log("***** getformularies - Error");
    // console.log(error);
    throw error;
  }
}

export async function getSupplementalOptions(
  formulary_id: any
): Promise<SupplementalOptions | any> {
  //let url = `${this.apiBaseUrl}/1/supplemental-benefits/${id_formulary_type}`;
  let url = `${BASE_URL1}api/1/supplemental-benefits/${formulary_id}`;
  try {
    const response = await axios.get(url, {
      headers: headers,
    });
    //console.log("***** SETUP getDesignOptions  - API");
    //console.log(response);
    if (response?.data?.code === "200") {
      return response?.data?.data;
    }
    return null;
  } catch (error) {
    // console.log("***** getformularies - Error");
    // console.log(error);
    throw error;
  }
}

//getTierOptions

export async function getTierOptions(
  formulary_tpye_id: number,
  tier_level: number
): Promise<SupplementalOptions | any> {
  //let url = `${this.apiBaseUrl}/1/tier-labels/1/0/${id_formulary_type}`;
  let url = `${BASE_URL1}api/1/tier-labels/${formulary_tpye_id}/${tier_level}`;
  try {
    const response = await axios.get(url, {
      headers: headers,
    });
    //console.log("***** SETUP getDesignOptions  - API");
    //console.log(response);
    if (response?.data?.code === "200") {
      return response?.data?.data;
    }
    return null;
  } catch (error) {
    // console.log("***** getformularies - Error");
    // console.log(error);
    throw error;
  }
}
