import { expect, server } from './setup';

describe('City List test', () => {
  it('gets cities url', (done) => {
    server.get(`/cities`).end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.data).to.eql([
        {
          id: '5128581',
          name: 'New York',
          lat: '40.7143',
          lon: '-74.006',
        },
        {
          id: '6167865',
          name: 'Toronto',
          lat: '43.7001',
          lon: '-79.4163',
        },
        {
          id: '4671654',
          name: 'Austin',
          lat: '30.2672',
          lon: '-97.7431',
        },
      ]);
      done();
    });
  });
});
