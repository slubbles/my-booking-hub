export class ApiError extends Error {
  status: number;
  details?: Record<string, string>;

  constructor(message: string, status: number, details?: Record<string, string>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

const parseErrorResponse = async (response: Response) => {
  return response.json().catch(() => null);
};

export const postJson = async <TResponse>(url: string, payload: unknown, init?: RequestInit): Promise<TResponse> => {
  const response = await fetch(url, {
    ...init,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    body: JSON.stringify(payload),
  });

  const data = await parseErrorResponse(response);

  if (!response.ok) {
    throw new ApiError(
      data?.error || "Request failed.",
      response.status,
      data?.details,
    );
  }

  return data as TResponse;
};

export const getJson = async <TResponse>(url: string, init?: RequestInit): Promise<TResponse> => {
  const response = await fetch(url, init);
  const data = await parseErrorResponse(response);

  if (!response.ok) {
    throw new ApiError(
      data?.error || "Request failed.",
      response.status,
      data?.details,
    );
  }

  return data as TResponse;
};

export const putJson = async <TResponse>(url: string, payload: unknown, init?: RequestInit): Promise<TResponse> => {
  const response = await fetch(url, {
    ...init,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    body: JSON.stringify(payload),
  });
  const data = await parseErrorResponse(response);

  if (!response.ok) {
    throw new ApiError(
      data?.error || "Request failed.",
      response.status,
      data?.details,
    );
  }

  return data as TResponse;
};