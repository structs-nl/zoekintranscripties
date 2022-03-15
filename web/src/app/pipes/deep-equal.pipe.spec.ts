import { DeepEqualPipe } from './deep-equal.pipe';

describe('DeepEqualPipe', () => {
  it('create an instance', () => {
    const pipe = new DeepEqualPipe();
    expect(pipe).toBeTruthy();
  });
});
