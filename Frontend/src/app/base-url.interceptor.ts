import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  // Modify the request URL or perform other operations
  const baseUrl = environment.apiBaseUrl;
  const modifiedReq = req.clone({
    url: `${baseUrl}${req.url}`
  });

  // Pass the modified request to the next handler
  return next(modifiedReq);
};