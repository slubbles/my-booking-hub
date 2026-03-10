import * as Sentry from "@sentry/react";

let monitoringInitialized = false;

export const initMonitoring = () => {
  const dsn = import.meta.env.VITE_SENTRY_DSN;

  if (!dsn || monitoringInitialized) {
    return;
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    enabled: Boolean(dsn),
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: import.meta.env.PROD ? 0.2 : 1,
  });

  monitoringInitialized = true;
};

export const captureMonitoringException = (error: unknown, context?: Record<string, string>) => {
  if (!monitoringInitialized) {
    return;
  }

  Sentry.withScope((scope) => {
    if (context) {
      Object.entries(context).forEach(([key, value]) => scope.setTag(key, value));
    }

    Sentry.captureException(error);
  });
};