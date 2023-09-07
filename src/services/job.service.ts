import { AxiosInstance, AxiosResponse } from 'axios';
import { createError } from '../client.response.error';

export interface Job {
  id: string;
  queue: string;
  payload: string;
  count: number;
  runAt: string;
  retry: number[];
  repeat?: {
    every?: number;
    times?: number;
    count: number;
    cron?: string;
    cronTimezone?: string;
  };
}

export interface CreateJobRequest {
  request: RequestOptionsDto;
  options?: JobOptionsDto;
  queue: string;
}

export interface RequestOptionsDto {
  body: string;
  method: string;
  headers?: { [key: string]: any };
  url: string;
}

export interface JobOptionsDto {
  delay?: number;
  runAt?: number;
  repeat?: RepeatOptionsDto;
  retry?: number;
}

export interface RepeatOptionsDto {
  cron?: string;
  cronTimezone?: string;
  times?: number;
  every?: number | string;
}

export class JobService {
  constructor(private http: AxiosInstance) {}

  async getByIdAndQueue(id: string, queue: string): Promise<Job | null> {
    try {
      const response: AxiosResponse<Job> = await this.http.get(
        `/jobs/${id}/queue/${queue}`,
      );
      return response.data;
    } catch (e: any) {
      if (e.response.status === 404) {
        return null;
      }
      throw createError(e);
    }
  }

  async search(): Promise<Job[]> {
    try {
      const response: AxiosResponse<Job[]> =
        await this.http.get(`/jobs/search`);
      return response.data;
    } catch (e: any) {
      throw createError(e);
    }
  }

  async createJob(request: CreateJobRequest): Promise<Job | null> {
    try {
      const response: AxiosResponse<Job> = await this.http.post(
        `/jobs`,
        request,
      );
      return response.data;
    } catch (e: any) {
      throw createError(e);
    }
  }

  async deleteByIdAndQueue(id: string, queue: string): Promise<Job | null> {
    try {
      const response: AxiosResponse<Job> = await this.http.delete(
        `/jobs/${id}/queue/${queue}`,
      );
      return response.data;
    } catch (e: any) {
      throw createError(e);
    }
  }

  async invokeByIdAndQueue(id: string, queue: string): Promise<Job | null> {
    try {
      const response: AxiosResponse<Job> = await this.http.post(
        `/jobs/${id}/queue/${queue}/invoke`,
      );
      return response.data;
    } catch (e: any) {
      throw createError(e);
    }
  }
}
