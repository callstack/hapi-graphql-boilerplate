import Glue from 'glue';
import manifest from '../../../manifest';

let server;
/* eslint-disable no-undef */
jest.disableAutomock();
beforeAll((done) => {
  Glue.compose(manifest, { relativeTo: process.cwd() }, (err, serv) => {
    if (err) {
      done();
    }
    serv.initialize((error) => {
      if (error) {
        throw error;
      }
      server = serv;
      done();
    });
  });
});

describe('status test', () => {
  it('it should respond with status code 200 and status ok', (done) => {
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
/* eslint-enable */
