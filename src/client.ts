import axios, { AxiosInstance } from 'axios';
import { Configuration } from './configuration/configuration';
import { BASE_PATH } from './configuration/constants';
import { JobService } from './services/job.service';
import { QueueService } from './services/queue.service';

export class Client {
  private config: Configuration;

  readonly queueService: QueueService;

  readonly jobService: JobService;

  private http: AxiosInstance;

  constructor(apiKey: string, basePath?: string) {
    if (!apiKey) {
      throw Error('API key is not valid');
    }

    this.config = { apiKey: apiKey, basePath: basePath || BASE_PATH };

    this.http = axios.create({
      baseURL: this.config.basePath,
      timeout: 20000,
      headers: { 'x-api-key': this.config.apiKey },
    });

    this.queueService = new QueueService(this.http);
    this.jobService = new JobService(this.http);
  }
}
