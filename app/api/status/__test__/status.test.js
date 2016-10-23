import labbable from '../../../../internals/server';

let server;
/* eslint-disable no-undef */
beforeAll((done) => {
  labbable.ready((error, glueServer) => {
    server = glueServer;
    done();
  });
});
describe('status test', () => {
  it('responds with status code 200 and status ok', (done) => {
    const options = {
      method: 'GET',
      url: '/v1/api/status',
    };
    server.inject(options, (response) => {
      const { statusCode, result: { status } } = response;
      expect(statusCode).toBe(200);
      expect(status).toBe('ok');
      done();
    });
  });
});
