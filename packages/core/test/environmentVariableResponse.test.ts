import { EnvironmentVariableResponseBody } from "../src/v3/schemas/api.js";

describe("EnvironmentVariableResponseBody schema", () => {
  it("should accept success response", () => {
    const successResponse = { success: true };
    const result = EnvironmentVariableResponseBody.safeParse(successResponse);
    
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({ success: true });
    }
  });

  it("should accept error response with error field", () => {
    const errorResponse = { error: "Something went wrong" };
    const result = EnvironmentVariableResponseBody.safeParse(errorResponse);
    
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({ error: "Something went wrong" });
    }
  });

  it("should accept error response with error and variableErrors fields", () => {
    const errorResponse = { 
      error: "Variable validation failed", 
      variableErrors: ["Invalid variable name", "Value too long"] 
    };
    const result = EnvironmentVariableResponseBody.safeParse(errorResponse);
    
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({ 
        error: "Variable validation failed", 
        variableErrors: ["Invalid variable name", "Value too long"] 
      });
    }
  });

  it("should reject response without success or error field", () => {
    const invalidResponse = { something: "else" };
    const result = EnvironmentVariableResponseBody.safeParse(invalidResponse);
    
    expect(result.success).toBe(false);
  });

  it("should reject response with success: false", () => {
    const invalidResponse = { success: false };
    const result = EnvironmentVariableResponseBody.safeParse(invalidResponse);
    
    expect(result.success).toBe(false);
  });
});