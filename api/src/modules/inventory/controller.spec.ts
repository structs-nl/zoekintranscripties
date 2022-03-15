import 'jasmine';
import request from 'supertest';
import { app } from '../../app';

const encodedId = encodeURIComponent(
  'https://archief.nl/doc/transcriptie/1.04.02/7527'
);

describe('Document Controller', () => {
  it('returns 200 status', (done) => {
    request(app)
      .post(`/document?id=${encodedId}`)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('returns 404 status', (done) => {
    request(app)
      .post(`/document?id=does-not-exist`)
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});
