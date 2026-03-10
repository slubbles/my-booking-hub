import { sendMethodNotAllowed } from "./_lib/http";

export default async function handler(request: any, response: any) {
  if (request.method !== "GET") {
    sendMethodNotAllowed(response, ["GET"]);
    return;
  }

  response.status(200).json({
    ok: true,
    service: "my-booking-hub",
    timestamp: new Date().toISOString(),
  });
}