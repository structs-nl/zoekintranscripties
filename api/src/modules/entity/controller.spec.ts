import 'jasmine';
import request from 'supertest';
import { app } from '../../app';

const encodedId = encodeURIComponent(
  'https://archief.nl/doc/transcriptie/1.04.02/7527/0001'
);

describe('Entity Controller', () => {
  it('returns 200 status', (done) => {
    request(app)
      .get(`/entity?id=${encodedId}`)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('returns 200 status', (done) => {
    request(app)
      .post(`/entity?id=${encodedId}`)
      .send({
        query: 'batavia',
      })
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('returns 404 status', (done) => {
    request(app)
      .get('/entity?id=id-does-not-exist')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });

  it('return 422 status', (done) => {
    request(app)
      .get('/entity?param=not-according-to-schema')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });
});
