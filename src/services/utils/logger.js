import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

function init() {
  return Sentry.init({
    dsn: "https://4043c9673b98433b9111ca444a92199c@o689086.ingest.sentry.io/6442223",
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

function log(error) {
  Sentry.captureException(error);
}

const logger = {
  init,
  log,
};

export default logger;
