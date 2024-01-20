import { baseUrl } from "../helpers/baseUrl.helper";
import { formDataRequest, jsonRequest } from "../helpers/request.helper";

export const uploadImage = (body: any) =>
  formDataRequest(`${baseUrl}/file`, true, body, "POST");

export const deleteImage = (fileId: string) =>
  jsonRequest(`${baseUrl}/file/${fileId}`, true, null, "DELETE");
