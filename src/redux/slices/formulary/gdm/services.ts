import { GDMSaveResponse } from "./gdmSlice";
import { BASE_URL1 } from "../../../../api/http-helper";
import axios from "axios";

const headers = {
  Authorization: "Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21",
  Accept: "application/json",
  "Content-Type": "application/json;charset=UTF-8",
};

export async function saveStGroup(payload: any): Promise<GDMSaveResponse> {
  if(payload.latestId===0){
    let url = `${BASE_URL1}api/1/mcr-st-group-description/1/${payload.formularyId}?entity_id=0`;
    try {
      const response = await axios.post(url, payload, {
        headers: headers,
      });
      return {
        success: response
      };
    } catch (error) {
      console.error(error.response)
      throw error.response;
    }
  }else{
    let url = `${BASE_URL1}api/1/mcr-st-group-description/${payload.latestId}/${payload.formularyId}?entity_id=0`;
    try {
      const response = await axios.put(url, payload, {
        headers: headers,
      });
      return {
        success: response
      };
    } catch (error) {
      console.error(error.response)
      throw error.response;
    }
  }
};

export async function deleteStGroup(payload: any): Promise<GDMSaveResponse> {
  let url = `${BASE_URL1}api/1/mcr-st-group-description/${payload.current_group_des_id}/CV?entity_id=0`;
  try {
    const response = await axios.delete(url,{
      headers: headers
    });
    return {
      success: response
    };
  } catch (error) {
    console.error(error.response)
    throw error.response;
  }
};

export async function cloneStGroup(payload: any): Promise<GDMSaveResponse> {
  let url = `${BASE_URL1}api/1/clone-mcr-st-group-description/1/${payload.current_group_des_id}?entity_id=0`;
  try {
    const response = await axios.post(url,payload,{
      headers: headers
    });
    return {
      success: response
    };
  } catch (error) {
    console.error(error.response)
    throw error.response;
  }
};


export async function archiveStGroup(payload: any): Promise<GDMSaveResponse> {
  let url = `${BASE_URL1}api/1/archive-mcr-st-group-description/${payload.current_group_des_id}/CV?entity_id=0`;
  try {
    const response = await axios.post(url,{},{
      headers: headers
    });
    return {
      success: response
    };
  } catch (error) {
    console.error(error.response)
    throw error.response;
  }
};

export async function newVersionStGroup(payload: any): Promise<GDMSaveResponse> {
  let url = `${BASE_URL1}api/1/mcr-st-group-description-version/${payload.current_group_des_id}`;
  try {
    const response = await axios.post(url,{},{
      headers: headers
    });
    return {
      success: response
    };
  } catch (error) {
    console.error(error.response)
    throw error.response;
  }
};