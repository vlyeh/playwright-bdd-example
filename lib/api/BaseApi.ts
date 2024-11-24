import { APIRequestContext, APIResponse } from "@playwright/test";
import { Entity, Method, WithId } from "../helpers/types";

export abstract class BaseApi {
  private request: APIRequestContext;
  protected url!: string;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async get<T>(id: number): Promise<{
    body: T & WithId;
    status: boolean;
    statusCode: number;
  }> {
    const response = await this.request.get(this.url + `/${id}`);
    return this.parseResponse(response);
  }

  async getAll<T>(): Promise<{
    body: T & WithId[];
    status: boolean;
    statusCode: number;
  }> {
    const response = await this.request.get(this.url);
    return this.parseResponse(response);
  }

  async getRelated<T>(
    id: number,
    entity: Entity
  ): Promise<{
    body: T & WithId;
    status: boolean;
    statusCode: number;
  }> {
    const response = await this.request.get(this.url + `/${id}/${entity}`);
    return this.parseResponse(response);
  }

  async create<T>(data: T): Promise<{
    body: T & WithId;
    status: boolean;
    statusCode: number;
  }> {
    const response = await this.request.post(this.url, {
      data
    });
    return this.parseResponse(response);
  }

  async createRelated<T>(
    id: number,
    entity: Entity,
    data: T
  ): Promise<{
    body: T & WithId;
    status: boolean;
    statusCode: number;
  }> {
    const response = await this.request.post(this.url + `/${id}/${entity}`, {
      data
    });
    return this.parseResponse(response);
  }

  async update<T>(
    id: number,
    method: Method,
    data: T
  ): Promise<{
    body: T & WithId;
    status: boolean;
    statusCode: number;
  }> {
    const response = await this.request[method](this.url + `/${id}`, {
      data
    });
    return this.parseResponse(response);
  }

  async updateRelated<T>(
    id: number,
    entity: Entity,
    data: T
  ): Promise<{
    body: T & WithId;
    status: boolean;
    statusCode: number;
  }> {
    const response = await this.request.put(this.url + `/${id}/${entity}`, {
      data
    });
    return this.parseResponse(response);
  }

  async remove(id: number): Promise<{
    status: boolean;
    statusCode: number;
  }> {
    const response = await this.request.delete(this.url + `/${id}`);
    return this.parseResponse(response);
  }

  async removeRelated(
    id: number,
    entity: Entity
  ): Promise<{
    status: boolean;
    statusCode: number;
  }> {
    const response = await this.request.delete(this.url + `/${id}/${entity}`);
    return this.parseResponse(response);
  }

  async parseResponse(response: APIResponse) {
    let body;
    if (response.status() != 204) {
      body = await response.json();
    }
    const status = response.ok();
    const statusCode = response.status();
    return { body: body, status, statusCode };
  }
}
