import Glue from 'glue';
import manifest from '../../../manifest';

let server;
/* eslint-disable no-undef */
beforeAll((done) => {
  Glue.compose(manifest, { relativeTo: process.cwd() }, (err, serv) => {
    if (err) {
      console.error('☹️ Registration error:', err); // eslint-disable-line no-console
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
