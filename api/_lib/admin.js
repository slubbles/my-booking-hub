import { getEnv } from "./env.js";

export const assertAdminToken = (request) => {
  const expectedToken = getEnv("ADMIN_AVAILABILITY_TOKEN");
  const headerValue = request.headers?.["x-admin-token"];
  const providedToken = Array.isArray(headerValue) ? headerValue[0] : headerValue;

  if (!providedToken || providedToken !== expectedToken) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }
};