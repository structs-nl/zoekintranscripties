import 'jasmine';
import request from 'supertest';
import { app } from '../../app';

describe('Search Controller', () => {
  it('returns 200 status', (done) => {
    request(app)
      .post('/search?query=')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
