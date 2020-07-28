import {InjectionToken} from '@angular/core';

export let TOASTR_TOKEN = new InjectionToken<Toastr>('toastr');

export interface Toastr {
  success(message: string, title?: string): void;
  warning(message: string, title?: string): void;
  info(message: string, title?: string): void;
  error(message: string, title?: string): void;
}
/*declare let toastr: any;
@Injectable()
export class ToastrService{
  success(message: string, title?: string): any{
    toastr.success(message, title);
  }
  warning(message: string, title?: string): any{
    toastr.warning(message, title);
  }
  info(message: string, title?: string): any{
    toastr.info(message, title);
  }
  error(message: string, title?: string): any{
    toastr.error(message, title);
  }
}*/
