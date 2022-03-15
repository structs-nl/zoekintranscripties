import { IncludesManyPipe } from './includes.pipe';

describe('IncludesManyPipe', () => {
  it('create an instance', () => {
    const pipe = new IncludesManyPipe();
    expect(pipe).toBeTruthy();
  });
});
