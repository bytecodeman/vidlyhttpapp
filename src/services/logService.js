import * as Sentry from "@sentry/react";

function init() {
  // Raven.config("ADD YOUR OWN API KEY", {
  //   release: "1-0-0",
  //   environment: "development-test"
  // }).install();
  Sentry.init({
    dsn:
      "https://d4a3a3fc86bc48f78c393fb37f9d1b51@o579583.ingest.sentry.io/5735403",

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

function log(error) {
  // Raven.captureException(error);
  Sentry.captureException(error);
}

function mess(mess) {
  Sentry.captureMessage(mess);
}

export default {
  init,
  log,
  mess,
};
