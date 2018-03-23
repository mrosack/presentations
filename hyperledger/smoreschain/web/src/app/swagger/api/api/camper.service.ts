/**
 * LoopBack Application
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs/Observable';

import { Camper } from '../model/camper';
import { InlineResponse200 } from '../model/inlineResponse200';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class CamperService {

    protected basePath = 'https://localhost/api';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (let consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Create a new instance of the model and persist it into the data source.
     * 
     * @param data Model instance data
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public camperCreate(data?: Camper, observe?: 'body', reportProgress?: boolean): Observable<Camper>;
    public camperCreate(data?: Camper, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Camper>>;
    public camperCreate(data?: Camper, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Camper>>;
    public camperCreate(data?: Camper, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json',
            'application/x-www-form-urlencoded',
            'application/xml',
            'text/xml'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.post<Camper>(`${this.basePath}/Camper`,
            data,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete a model instance by {{id}} from the data source.
     * 
     * @param id Model id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public camperDeleteById(id: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public camperDeleteById(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public camperDeleteById(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public camperDeleteById(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling camperDeleteById.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json',
            'application/x-www-form-urlencoded',
            'application/xml',
            'text/xml'
        ];

        return this.httpClient.delete<any>(`${this.basePath}/Camper/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Check whether a model instance exists in the data source.
     * 
     * @param id Model id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public camperExists(id: string, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse200>;
    public camperExists(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse200>>;
    public camperExists(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse200>>;
    public camperExists(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling camperExists.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json',
            'application/x-www-form-urlencoded',
            'application/xml',
            'text/xml'
        ];

        return this.httpClient.head<InlineResponse200>(`${this.basePath}/Camper/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Find all instances of the model matched by filter from the data source.
     * 
     * @param filter Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({\&quot;something\&quot;:\&quot;value\&quot;})
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public camperFind(filter?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<Camper>>;
    public camperFind(filter?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Camper>>>;
    public camperFind(filter?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Camper>>>;
    public camperFind(filter?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (filter !== undefined) {
            queryParameters = queryParameters.set('filter', <any>filter);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json',
            'application/x-www-form-urlencoded',
            'application/xml',
            'text/xml'
        ];

        return this.httpClient.get<Array<Camper>>(`${this.basePath}/Camper`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Find a model instance by {{id}} from the data source.
     * 
     * @param id Model id
     * @param filter Filter defining fields and include - must be a JSON-encoded string ({\&quot;something\&quot;:\&quot;value\&quot;})
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public camperFindById(id: string, filter?: string, observe?: 'body', reportProgress?: boolean): Observable<Camper>;
    public camperFindById(id: string, filter?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Camper>>;
    public camperFindById(id: string, filter?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Camper>>;
    public camperFindById(id: string, filter?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling camperFindById.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (filter !== undefined) {
            queryParameters = queryParameters.set('filter', <any>filter);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json',
            'application/x-www-form-urlencoded',
            'application/xml',
            'text/xml'
        ];

        return this.httpClient.get<Camper>(`${this.basePath}/Camper/${encodeURIComponent(String(id))}`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Replace attributes for a model instance and persist it into the data source.
     * 
     * @param id Model id
     * @param data Model instance data
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public camperReplaceById(id: string, data?: Camper, observe?: 'body', reportProgress?: boolean): Observable<Camper>;
    public camperReplaceById(id: string, data?: Camper, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Camper>>;
    public camperReplaceById(id: string, data?: Camper, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Camper>>;
    public camperReplaceById(id: string, data?: Camper, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling camperReplaceById.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json',
            'application/x-www-form-urlencoded',
            'application/xml',
            'text/xml'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.put<Camper>(`${this.basePath}/Camper/${encodeURIComponent(String(id))}`,
            data,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
