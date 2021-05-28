import { expect, server } from './setup';

describe('City Detail test', () => {
  it('gets city url', (done) => {
    server
      .get(`/city`)
      .set({ lat: '40.7143', lon: '-74.006' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.have.property('imageUrl').to.be.a('string');
        expect(res.body.data).to.have.property('temp').to.be.within(-100, 100);
        expect(res.body.data).to.have.property('desc').to.be.a('string');
        expect(res.body.data)
          .to.have.property('forecasts')
          .to.be.a('array')
          .with.lengthOf(8);
        expect(res.body.data.forecasts[0])
          .to.have.property('day')
          .to.be.a('string')
          .to.match(
            /^Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday/
          );
        expect(res.body.data.forecasts[0])
          .to.have.property('high')
          .to.be.within(-100, 100);
        expect(res.body.data.forecasts[0])
          .to.have.property('low')
          .to.be.within(-100, 100);
        expect(res.body.data.forecasts[0])
          .to.have.property('desc')
          .to.be.a('string');
        done();
      });
  });
});

describe('City Detail test', () => {
  it('gets city url withou lat and lon', (done) => {
    server.get(`/city`).end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('Missing lat and lon');
      done();
    });
  });
});

describe('City Detail test', () => {
  it('gets city url withou lat', (done) => {
    server
      .get(`/city`)
      .set({ lon: '-74.006' })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Missing lat');
        done();
      });
  });
});

describe('City Detail test', () => {
  it('gets city url withou lon', (done) => {
    server
      .get(`/city`)
      .set({ lat: '40.7143' })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Missing lon');
        done();
      });
  });
});

describe('City Detail test', () => {
  it('gets city url with invalid lat and long', (done) => {
    server
      .get(`/city`)
      .set({ lon: '100', lat: '100' })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Invalid lat or lon');
        done();
      });
  });
});
