// interceptors/spinner.interceptor.ts
import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerLordService } from '../services/spinner-lord.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  private spinnerService = inject(SpinnerLordService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Mostrar spinner al iniciar la petición
    this.spinnerService.show();

    return next.handle(req).pipe(
      finalize(() => {
        // Ocultar spinner al finalizar la petición
        this.spinnerService.hide();
      })
    );
  }
}
