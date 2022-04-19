import axios from "axios";
import { API_URL } from "../configs/constant";

const getClient = (baseUrl = API_URL) => {
  const options = {
    baseURL: baseUrl,
  };

  const client = axios.create(options);

  client.interceptors.request.use(
    async (requestConfig) => {
      let interceptedConfig: any = { ...requestConfig };

      // Add header ....

      return interceptedConfig;
    },
    (requestError) => {
      return Promise.reject(requestError);
    }
  );

  client.interceptors.response.use(
    (response) => {
      const { status, data: rawData } = response;
      let data, meta;
      if (!rawData) {
        data = {};
      } else {
        data = rawData.data;
      }

      return { status, data, meta } as any;
    },
    (error) => {
      const { status, data: rawData } = error.response;

      let data;

      if (!rawData) {
        data = {};
      } else {
        data = rawData.data;
      }

      return Promise.reject({ status, data, message: error.message });
    }
  );

  return client;
};

class ApiClient {
  client: any = {};

  constructor(baseUrl = API_URL) {
    this.client = getClient(baseUrl);
  }

  get(url, conf = {}) {
    return this.client
      .get(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  delete(url, conf = {}) {
    return this.client
      .delete(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  head(url, conf = {}) {
    return this.client
      .head(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  options(url, conf = {}) {
    return this.client
      .options(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  post(url, data = {}, conf = {}) {
    return this.client
      .post(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  put(url, data = {}, conf = {}) {
    return this.client
      .put(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  patch(url, data = {}, conf = {}) {
    return this.client
      .patch(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }
}

export default new ApiClient();
