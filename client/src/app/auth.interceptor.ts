import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { ApiService } from "./api.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private apiService: ApiService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const accessToken = this.apiService.getAccessToken();
        req = req.clone({
            setHeaders: {
                'auth_token': `${accessToken}`
            }
        });
        return next.handle(req);
    }
}
