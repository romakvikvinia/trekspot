import { getFullToken } from "./secure.storage";

const handleResponse = (response: any) => {
  if (response.status === 401) {
    // unauthorized
  }

  return new Promise((resolve, reject) => {
    if (response.ok) {
      if (response.status === 200 || response.status === 201) {
        var contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          response.json().then((json: any) => {
            resolve(json);
          });
        } else {
          resolve(response);
        }
      } else if (response.status === 204) {
        resolve(null);
      }
    } else {
      response.text().then((error: any) => {
        try {
          error = JSON.parse(error);
        } catch (err) {
          if (response.status === 403)
            error = {
              code: "UNAUTHORIZED_ERROR",
              errors: ["Common.UnauthorizedError"],
            };
          else error = { code: "UNHANDLED_ERROR", errors: ["Unhandled Error"] };
        }
        reject(error);
      });
    }
  });
};

const handleError = (error: any, url: string) => {
  let err = error;

  try {
    err = JSON.parse(err);
  } catch (e) {
    err = { code: "UNHANDLED_ERROR", errors: ["Unhandled Error"] };
  }

  return Promise.reject(err);
};

export const formDataRequest = async (
  url: string,
  isPrivate = true,
  body: any,
  method = "GET"
  // isFile = false
) => {
  const headers = new Headers();

  headers.append("Content-Type", "multipart/form-data");
  headers.append("Accept", "application/json");
  /**
   * set lang param
   */
  //   headers.append('Accept-Language', i18n.language);

  if (isPrivate === true) {
    let token = await getFullToken();

    if (token && new Date().getTime() < token.expire) {
      // set Token
      headers.set("Authorization", `Bearer ${token.token}`);
    } else {
      // refetch
    }
  }
  var options: any = { headers, mode: "cors", method: method };

  if (body) {
    options.method = method;
    // options.body = JSON.stringify(body);
    options.body = body;
  }

  return fetch(url, options).then(
    (response: Response) => {
      return handleResponse(response);
    },
    (error: Response) => {
      return handleError(error, url);
    }
  );
};

export const jsonRequest = async (
  url: string,
  isPrivate = true,
  body: any,
  method = "GET"
  // isFile = false
) => {
  const headers = new Headers();

  headers.append("Accept", "application/json");
  /**
   * set lang param
   */
  //   headers.append('Accept-Language', i18n.language);

  if (isPrivate === true) {
    let token = await getFullToken();

    if (token && new Date().getTime() < token.expire) {
      // set Token
      headers.set("Authorization", `Bearer ${token.token}`);
    } else {
      // refetch
    }
  }
  var options: any = { headers, mode: "cors", method: method };

  if (body) {
    options.method = method;
    options.body = JSON.stringify(body);
    options.body = body;
  }

  return fetch(url, options).then(
    (response: Response) => {
      return handleResponse(response);
    },
    (error: Response) => {
      return handleError(error, url);
    }
  );
};
