import { privateAxiosInstance } from "@/lib/axios";

class Token {
  private baseEndpoint = "/token";
  async createToken() {
    return await privateAxiosInstance.post(`${this.baseEndpoint}`);
  }
  async getToken() {
    return await privateAxiosInstance.get(`${this.baseEndpoint}`);
  }
}

export const tokenService = new Token();
