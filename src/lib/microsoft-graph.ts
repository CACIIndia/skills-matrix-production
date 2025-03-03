import { ERROR_CODES } from "./utils/errorCodes";

const GRAPH_API_BASE_URL = "https://graph.microsoft.com/v1.0";
async function makeGraphRequest(
  accessToken: string,
  endpoint: string,
  method: string = "GET",
  body?: any
): Promise<Response> {
  const response = await fetch(`${GRAPH_API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return response;
}

async function handleGraphResponse(response: Response): Promise<any> {
  const apiResponse = await response.json();

  if (!response.ok) {
    const errorDetails = apiResponse.error || {};

    const errorInfo = {
      code: errorDetails.code || `HTTP ${response.status}`,
      message: errorDetails.message || "An error occurred",
      innererror: errorDetails.innererror || null,
      details: errorDetails.details || [],
    };

    switch (response.status) {
      case 400:
        return {
          error: ERROR_CODES.BAD_REQUEST,
          details: errorInfo,
        };
      case 401:
        return {
          error: ERROR_CODES.UNAUTHORIZED,
          details: errorInfo,
        };
      case 402:
        return {
          error: ERROR_CODES.PAYMENT_REQUIRED,
          details: errorInfo,
        };
      case 403:
        return {
          error: ERROR_CODES.FORBIDDEN,
          details: errorInfo,
        };
      case 404:
        return {
          error: ERROR_CODES.NOT_FOUND,
          details: errorInfo,
        };
      case 405:
        return {
          error: ERROR_CODES.METHOD_NOT_ALLOWED,
          details: errorInfo,
        };
      case 406:
        return {
          error: ERROR_CODES.NOT_ACCEPTABLE,
          details: errorInfo,
        };
      case 409:
        return {
          error: ERROR_CODES.CONFLICT,
          details: errorInfo,
        };
      case 410:
        return {
          error: ERROR_CODES.GONE,
          details: errorInfo,
        };
      case 411:
        return {
          error: ERROR_CODES.LENGTH_REQUIRED,
          details: errorInfo,
        };
      case 412:
        return {
          error: ERROR_CODES.PRECONDITION_FAILED,
          details: errorInfo,
        };
      case 413:
        return {
          error: ERROR_CODES.REQUEST_ENTITY_TOO_LARGE,
          details: errorInfo,
        };
      case 415:
        return {
          error: ERROR_CODES.UNSUPPORTED_MEDIA_TYPE,
          details: errorInfo,
        };
      case 416:
        return {
          error: ERROR_CODES.REQUESTED_RANGE_NOT_SATISFIABLE,
          details: errorInfo,
        };
      case 422:
        return {
          error: ERROR_CODES.UNPROCESSABLE_ENTITY,
          details: errorInfo,
        };
      case 423:
        return {
          error: ERROR_CODES.LOCKED,
          details: errorInfo,
        };
      case 429:
        return {
          error: ERROR_CODES.TOO_MANY_REQUESTS,
          details: errorInfo,
        };
      case 500:
        return {
          error: ERROR_CODES.INTERNAL_SERVER_ERROR,
          details: errorInfo,
        };
      case 501:
        return {
          error: ERROR_CODES.NOT_IMPLEMENTED,
          details: errorInfo,
        };
      case 503:
        return {
          error: ERROR_CODES.SERVICE_UNAVAILABLE,
          details: errorInfo,
        };
      case 504:
        return {
          error: ERROR_CODES.GATEWAY_TIMEOUT,
          details: errorInfo,
        };
      case 507:
        return {
          error: ERROR_CODES.INSUFFICIENT_STORAGE,
          details: errorInfo,
        };
      case 509:
        return {
          error: ERROR_CODES.BANDWIDTH_LIMIT_EXCEEDED,
          details: errorInfo,
        };
      default:
        return {
          error: `Unexpected Error: ${response.status}`,
          details: errorInfo,
        };
    }
  }

  return apiResponse;
}

export async function fetchUserProfile(accessToken: string, select: string = ''): Promise<any> {
  const url = select ? `/me?$select=${select}` : '/me';
  const response = await makeGraphRequest(accessToken, url);
  return handleGraphResponse(response);
}


export async function fetchUserManager(accessToken: string): Promise<any> {
  const response = await makeGraphRequest(accessToken, "/me/manager");
  return handleGraphResponse(response);
}

export async function fetchUserProfilePicture(
  accessToken: string
): Promise<Buffer | any> {
  const response = await makeGraphRequest(accessToken, "/me/photo/$value");

  if (!response.ok) {
    return handleGraphResponse(response);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}