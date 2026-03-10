export const parseJsonBody = <T>(request: { body?: T | string | undefined }) => {
  if (!request.body) {
    return {} as T;
  }

  if (typeof request.body === "string") {
    return JSON.parse(request.body) as T;
  }

  return request.body as T;
};

export const getClientIp = (request: {
  headers?: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
}) => {
  const forwardedFor = request.headers?.["x-forwarded-for"];

  if (Array.isArray(forwardedFor)) {
    return forwardedFor[0]?.split(",")[0]?.trim() || "unknown";
  }

  if (typeof forwardedFor === "string") {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.socket?.remoteAddress || "unknown";
};

export const sendMethodNotAllowed = (response: {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => { json: (body: unknown) => void };
}, allowedMethods: string[]) => {
  response.setHeader("Allow", allowedMethods.join(", "));
  response.status(405).json({ error: `Method not allowed. Use ${allowedMethods.join(" or ")}.` });
};

export const flattenZodErrors = (fieldErrors: Record<string, string[] | undefined>) => {
  return Object.fromEntries(
    Object.entries(fieldErrors).map(([key, value]) => [key, value?.[0] || "Invalid value"]),
  );
};