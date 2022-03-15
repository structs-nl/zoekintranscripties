import { TestBed } from '@angular/core/testing';

import { UriCachingInterceptor } from './uri-caching.interceptor';

describe('UriCachingInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [UriCachingInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: UriCachingInterceptor = TestBed.inject(
      UriCachingInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
