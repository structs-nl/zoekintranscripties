import {
  ActivatedRouteSnapshot,
  convertToParamMap,
  ParamMap,
  Params,
} from '@angular/router';
import { ReplaySubject } from 'rxjs';

export class ActivatedRouteStub {
  private paramMapSubject = new ReplaySubject<ParamMap>();
  private queryParamMapSubject = new ReplaySubject<ParamMap>();
  public snapshot: Partial<ActivatedRouteSnapshot>;
  readonly queryParamMap = this.queryParamMapSubject.asObservable();
  readonly paramMap = this.paramMapSubject.asObservable();

  constructor(initialParams: Params) {
    this.setParamMap(initialParams.params);
    this.setQueryParamMap(initialParams.queryParams);

    this.snapshot = {
      queryParams: initialParams.queryParams,
    };
  }

  setQueryParamMap(params?: Params): void {
    if (params) {
      this.queryParamMapSubject.next(convertToParamMap(params));
    }
  }

  setParamMap(params?: Params): void {
    if (params) {
      this.paramMapSubject.next(convertToParamMap(params));
    }
  }
}
