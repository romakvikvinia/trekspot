import { baseUrl } from "../helpers/baseUrl.helper";
import { formDataRequest } from "../helpers/request.helper";

export const uploadImage = (body: any) =>
  formDataRequest(`${baseUrl}/file`, true, body, "POST");
