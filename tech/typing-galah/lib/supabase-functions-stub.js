// Stub for @supabase/functions-js to prevent build errors
// This provides empty implementations for functions that aren't used in our app

export class FunctionsHttpError extends Error {
  constructor(message, functionName, status) {
    super(message);
    this.name = "FunctionsHttpError";
    this.functionName = functionName;
    this.status = status;
  }
}

export class FunctionsFetchError extends Error {
  constructor(message) {
    super(message);
    this.name = "FunctionsFetchError";
  }
}

export class FunctionsRelayError extends Error {
  constructor(message) {
    super(message);
    this.name = "FunctionsRelayError";
  }
}

export class FunctionRegionError extends Error {
  constructor(message) {
    super(message);
    this.name = "FunctionRegionError";
  }
}

// Empty functions client that does nothing
export class FunctionsClient {
  constructor() {}

  invoke() {
    return Promise.resolve({ data: null, error: null });
  }
}

// Default export that matches the expected structure
export default {
  FunctionsHttpError,
  FunctionsFetchError,
  FunctionsRelayError,
  FunctionRegionError,
  FunctionsClient,
};
