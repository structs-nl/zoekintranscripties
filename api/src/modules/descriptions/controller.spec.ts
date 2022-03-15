import 'jasmine';
import request from 'supertest';
import { app } from '../../app';

describe('Descriptions Controller', () => {
  it('returns 200 status', (done) => {
    request(app)
      .get('/descriptions?query=na')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
