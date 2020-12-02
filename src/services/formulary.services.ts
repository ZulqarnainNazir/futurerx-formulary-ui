import { AxiosResponse } from "axios";
import http from "../api/http-helper";

class FormularyServices {
  /**
   * @function getSummary
   * to get all summary belongs to formulary
   * id : qset id
   */
  getSummary(id: number) {
    return http.get(`/api/1/formulary-summary/${id}`);
  }
}

export default new FormularyServices();
