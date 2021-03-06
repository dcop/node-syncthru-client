import axios, { AxiosResponse, AxiosError } from "axios";
import { parse } from "dirty-json";

import { SynchtruModel, SynchtruResponse } from "../model/SyncThruModel";

const SYNCHTRU_PATH = "/sws/app/information/home/home.json";

export class SyncThruClient {
  private readonly host: string
  private readonly url: string

  constructor(host: string) {
    this.host = host;
    this.url = `${this.host}${SYNCHTRU_PATH}`;

    this.getWithTransform = this.getWithTransform.bind(this);
    this.toSynchtruModel = this.toSynchtruModel.bind(this);
    this.toRaw = this.toRaw.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
  }

  rawGet(): Promise<SynchtruResponse> {
    return new Promise<SynchtruResponse>((resolve, reject) => {
      this.getWithTransform()
        .then((response: AxiosResponse<SynchtruResponse>) => resolve(this.toRaw(response)))
        .catch((err: AxiosError<SynchtruResponse>) => reject(this.errorHandler(err)))
    });
  }

  get(): Promise<SynchtruModel> {
    return new Promise<SynchtruModel>((resolve, reject) => {
      return this.getWithTransform()
        .then((response: AxiosResponse<SynchtruResponse>) => resolve(this.toSynchtruModel(response)))
        .catch((err: AxiosError<SynchtruResponse>) => reject(this.errorHandler(err)))
    });
  }

  private getWithTransform(): Promise<AxiosResponse<SynchtruResponse>> {
    return axios.get<SynchtruResponse>(this.url, { transformResponse: this.transformResponse });
  }

  private toRaw(response: AxiosResponse<SynchtruResponse>): SynchtruResponse {
    return response.data;
  }

  private toSynchtruModel(response: AxiosResponse<SynchtruResponse>): SynchtruModel {
    return SynchtruModel.from(response.data);
  }

  private errorHandler(error: AxiosError<SynchtruResponse>): Error {
    return new Error(error.message);
  }

  private transformResponse(data: SynchtruResponse): string {
    return parse(data);
  }
}