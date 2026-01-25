import api from '@/lib/axios'
import { AxiosRequestConfig } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'

export default class BaseService {
    protected endpoint: string

    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

    protected transformKeyToSnakeCase<T extends Record<string, unknown>>(obj: T){
        return snakecaseKeys(obj, { deep: true })
    }

    protected transformKeyToCamelCase<T>(obj: object): T {
        return camelcaseKeys(obj, { deep: true }) as T
    }

    get<Resp>(params?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<Resp> {
        return api.get<Resp>(this.endpoint, {
            params,
            ...config,
        }).then(response => this.transformKeyToCamelCase<Resp>(response.data as object)).catch(error => {
            throw error
        })
    }

    getById<Resp>(id: string | number, config?: AxiosRequestConfig): Promise<Resp> {
        return api.get<Resp>(`${this.endpoint}/${id}`, config).then(response => this.transformKeyToCamelCase<Resp>(response.data as object)).catch(error => {
            throw error
        })
    }

    post<Req extends Record<string, unknown>,Resp extends Record<string, unknown>>(payload: Req, config?: AxiosRequestConfig): Promise<Resp>  {
        return api.post<Resp>(this.endpoint, this.transformKeyToSnakeCase(payload), config).then(response => this.transformKeyToCamelCase<Resp>(response.data)).catch(error => {
            throw error
        })
    }

    put<Req extends Record<string, unknown>,Resp extends Record<string, unknown>>(id: string | number, payload: Req, config?: AxiosRequestConfig): Promise<Resp>  {
        return api.put<Resp>(`${this.endpoint}/${id}`, this.transformKeyToSnakeCase(payload), config).then(response => this.transformKeyToCamelCase<Resp>(response.data)).catch(error => {
            throw error
        })
    }

    patch<Req extends Record<string, unknown>,Resp extends Record<string, unknown>>(id: string | number, payload: Req, config?: AxiosRequestConfig): Promise<Resp>  {
        return api.patch<Resp>(`${this.endpoint}/${id}`, this.transformKeyToSnakeCase(payload), config).then(response => this.transformKeyToCamelCase<Resp>(response.data)).catch(error => {
            throw error
        })  
    }

    delete<Resp extends Record<string, unknown>>(id: string | number, config?: AxiosRequestConfig) {
        return api.delete<Resp>(`${this.endpoint}/${id}`, config).then(response => this.transformKeyToCamelCase<Resp>(response.data)).catch(error => {
            throw error
        })
    }
}
