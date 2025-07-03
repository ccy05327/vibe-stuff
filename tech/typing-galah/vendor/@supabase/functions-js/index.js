// Stub for @supabase/functions-js to prevent build errors
exports.FunctionsHttpError = class FunctionsHttpError extends Error {
  constructor(message, functionName, status) {
    super(message);
    this.name = "FunctionsHttpError";
    this.functionName = functionName;
    this.status = status;
  }
};
exports.FunctionsFetchError = class FunctionsFetchError extends Error {
  constructor(message) {
    super(message);
    this.name = "FunctionsFetchError";
  }
};
exports.FunctionsRelayError = class FunctionsRelayError extends Error {
  constructor(message) {
    super(message);
    this.name = "FunctionsRelayError";
  }
};
exports.FunctionRegionError = class FunctionRegionError extends Error {
  constructor(message) {
    super(message);
    this.name = "FunctionRegionError";
  }
};
exports.FunctionsClient = class FunctionsClient {
  constructor() {}
  invoke() {
    return Promise.resolve({ data: null, error: null });
  }
};
