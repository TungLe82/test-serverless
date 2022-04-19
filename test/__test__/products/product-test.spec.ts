import apiClient from "../../utils/api-client";

jest.setTimeout(10000);

describe("Test Product Function", () => {
  let productId = "";
  it("Should Pass Get List Product", async () => {
    const endpoint = `/v1/products`;
    let response;
    try {
      response = await apiClient.get(endpoint);
    } catch (e) {
      response = e;
    }

    expect(response.status).toBe(200);
  });

  it("Should Pass Add New Product", async () => {
    const endpoint = `/v1/products`;
    const body = {
      name: "Valid Name",
      description: "Valid Description",
    };
    let response;
    try {
      response = await apiClient.post(endpoint, body);
      productId = response.data.productId;
    } catch (e) {
      response = e;
    }

    expect(response.status).toBe(200);
    expect(response.data.productId).toBeDefined();
    expect(response.data).toHaveProperty("productId");
  });

  it("Should Fail Add New Product", async () => {
    const endpoint = `/v1/products`;
    const body = {
      name: null,
      description: "Valid Description",
    };
    let response;
    try {
      response = await apiClient.post(endpoint, body);
    } catch (e) {
      response = e;
    }

    expect(response.status).toBe(500);
    expect(response.data).toBeNull();
  });

  it("Should Pass View Product Detail", async () => {
    const endpoint = `/v1/products/${productId}`;
    let response;
    try {
      response = await apiClient.get(endpoint);
    } catch (e) {
      response = e;
    }

    expect(response.status).toBe(200);
    expect(response.data.productId).toBeDefined();
    expect(response.data.productId).toMatch(productId);
  });

  it("Should Pass Update Product", async () => {
    const endpoint = `/v1/products/${productId}`;
    const body = {
      name: "Valid Name",
      description: "Valid Description",
    };
    let response;
    try {
      response = await apiClient.put(endpoint, body);
    } catch (e) {
      response = e;
    }

    expect(response.status).toBe(200);
    expect(response.data.productId).toBeDefined();
    expect(response.data.name).toMatch(body.name);
  });

  it("Should Pass Delete Product", async () => {
    const endpoint = `/v1/products/${productId}`;
    let response;
    try {
      response = await apiClient.delete(endpoint);
    } catch (e) {
      response = e;
    }

    expect(response.status).toBe(200);
    expect(response.data.isDeleted).toBeTruthy();
  });

  it("Should Pass View Product Detail After Delete Product Success", async () => {
    const endpoint = `/v1/products/${productId}`;
    let response;
    try {
      response = await apiClient.get(endpoint);
    } catch (e) {
      response = e;
    }

    expect(response.status).toBe(200);
    expect(response.data).toBeNull();
  });
});
