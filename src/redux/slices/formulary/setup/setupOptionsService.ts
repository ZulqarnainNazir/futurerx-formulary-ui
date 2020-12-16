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

export async function getGeneralOptions(
  type: number
): Promise<GeneralOptions | any> {
  //console.log("- - - - - - - - - - - - -  - - Genetal Option Service");
  let url0 = `${BASE_URL1}api/1/formulary-types`;
  let url1 = `${BASE_URL1}api/1/formulary-contract-years`;
  let url2 = `${BASE_URL1}api/1/classification-systems/${type}`;

  const request0 = axios.get(url0, {
    headers: headers,
  });
  const request1 = axios.get(url1, {
    headers: headers,
  });
  const request2 = axios.get(url2, {
    headers: headers,
  });

  return await axios
    .all([request0, request1, request2])
    .then(
      axios.spread((...responses) => {
        const response0 = responses[0];
        const response1 = responses[1];
        const response2 = responses[2];
        console.log(response0, response1, response2);
        let list0 = [];
        if (response0?.data?.code === "200") {
          list0 = response0?.data?.data;
        }
        let list1 = [];
        if (response1?.data?.code === "200") {
          list1 = response1?.data?.data;
        }
        let list2 = [];
        if (response2?.data?.code === "200") {
          list2 = response2?.data?.data;
        }

        console.log(list0, list1, list2);
        return {
          formularyType: list0,
          contractYear: list1,
          classification_systems: list2,
        };
      })
    )
    .catch((errors) => {
      console.error(errors);
    });
}

export async function getSubMthsOptions(
  year: number
): Promise<GeneralOptions | any> {
  let url = `${BASE_URL1}api/1/formulary-submission-months/${year}`;
  try {
    const response = await axios.get(url, {
      headers: headers,
    });
    // console.log("***** getSubMthsOptions  - Success");
    // console.log(response);
    if (response?.data?.code === "200") {
      return { submission_months: response?.data?.data };
    }
    return null;
  } catch (error) {
    // console.log("***** getSubMthsOptions - Error");
    // console.log(error);
    throw error;
  }
}

export async function getStatesOptions(
  type: number
): Promise<GeneralOptions | any> {
  let url = `${BASE_URL1}api/1/formulary-states`;
  if (type === 2) {
    url += `/MMP`;
  }
  try {
    const response = await axios.get(url, {
      headers: headers,
    });
    //  console.log("***** getStatesOptions  - Success");
    //  console.log(response);
    if (response?.data?.code === "200") {
      return {
        states: response?.data?.data
          ? response?.data?.data
          : response?.data?.result,
      };
    }
    return null;
  } catch (error) {
    // console.log("***** getStatesOptions - Error");
    // console.log(error);
    throw error;
  }
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
  type: any
): Promise<DesignOptions | any> {
  let url = `${BASE_URL1}api/1/edits/${type}`;
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
  type: any
): Promise<SupplementalOptions | any> {
  //let url = `${this.apiBaseUrl}/1/supplemental-benefits/${id_formulary_type}`;
  let url = `${BASE_URL1}api/1/supplemental-benefits/${type}`;
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
  type: number,
  tier_level: number
): Promise<SupplementalOptions | any> {
  //let url = `${this.apiBaseUrl}/1/tier-labels/1/0/${id_formulary_type}`;
  let url = `${BASE_URL1}api/1/tier-labels/${type}/${tier_level}`;
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
