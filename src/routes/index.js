import Express from 'express';
import { rateLimiterUsingThirdParty } from '../middlewares/rateLimiter';

import mockData from '../static/mockData';
import { getWeather } from '../api/cityDetail';

const router = Express.Router();
router.use(rateLimiterUsingThirdParty);

router.get('/cityDetail', async (req, res, next) => {
  const response = await getWeather(req);
  res.status(response.statusCode);
  res.send(response.body);
});

router.get('/cityList', async (req, res, next) => {
  res.status(200);
  res.send({
    data: mockData.cities,
  });
});

module.exports = router;
