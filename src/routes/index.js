import Express from 'express';

const router = Express.Router();
import mockData from '../static/mockData';

import { getWeather } from '../api/cityDetail';

router.get('/city', async (req, res, next) => {
  const response = await getWeather(req);
  res.status(response.statusCode);
  res.send(response.body);
});

router.get('/cities', async (req, res, next) => {
  res.status(200);
  res.send({
    data: mockData.cities,
  });
});

module.exports = router;
