import { AxiosInstance, AxiosResponse } from 'axios';
import { createError } from '../client.response.error';

export interface Queue {
  name: string;
}

export class QueueService {
  constructor(private http: AxiosInstance) {}

  async createQueue(name: string): Promise<Queue> {
    try {
      const response: AxiosResponse<Queue> = await this.http.post(
        `/queues/${name}`,
      );
      return response.data;
    } catch (e: any) {
      throw createError(e);
    }
  }

  async getAllQueues(): Promise<Queue[]> {
    try {
      const response: AxiosResponse<Queue[]> = await this.http.get(`/queues/`);
      return response.data;
    } catch (e: any) {
      throw createError(e);
    }
  }

  async deleteQueue(name: string): Promise<Queue> {
    try {
      const response: AxiosResponse<Queue> = await this.http.get(
        `/queues/${name}`,
      );
      return response.data;
    } catch (e: any) {
      throw createError(e);
    }
  }
}
