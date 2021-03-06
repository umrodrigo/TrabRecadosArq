import { HttpRequest, HttpResponse } from "../models";

export interface MvcController {
    store(request: HttpRequest): Promise<HttpResponse>;
    update(request: HttpRequest): Promise<HttpResponse>;
    delete(request: HttpRequest): Promise<HttpResponse>;
    index(request: HttpRequest): Promise<HttpResponse>;
    show(request: HttpRequest): Promise<HttpResponse>; 
    login(request: HttpRequest): Promise<HttpResponse>; 
};