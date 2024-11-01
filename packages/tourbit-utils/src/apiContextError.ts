export class ApiContextError extends Error {
  constructor(message: string) {
    super(`API Context Error: ${message}`);
    this.name = "ApiContextError";
  }
}
