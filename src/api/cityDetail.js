import Axios from 'axios';
import moment from 'moment';

const url =
  'https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,hourly&units=metric';
const imageUrl = 'http://openweathermap.org/img/wn/';
const appId = '011a6782e5ea3378626b21eb4fb7ee75';

export const getWeather = async (req) => {
  if (!req.headers.lat && !req.headers.lon) {
    return {
      statusCode: 400,
      body: {
        message: 'Missing lat and lon',
      },
    };
  } else if (!req.headers.lat) {
    return {
      statusCode: 400,
      body: {
        message: 'Missing lat',
      },
    };
  } else if (!req.headers.lon) {
    return {
      statusCode: 400,
      body: {
        message: 'Missing lon',
      },
    };
  }
  try {
    const lat = parseInt(req.headers.lat);
    const lon = parseInt(req.headers.lon);
    if (lat > 90 || lon > 180 || lat < -90 || lon < -180) {
      return {
        statusCode: 400,
        body: {
          message: 'Invalid lat or lon',
        },
      };
    }
    const requestUrl = `${url}&lat=${lat}&lon=${lon}&appid=${appId}`;
    const weatherInfo = await Axios.get(requestUrl);
    if (weatherInfo.status === 200 && weatherInfo.data) {
      // Construct desire data, if we get valid response
      const returnData = {
        imageUrl: `${
          imageUrl + weatherInfo.data.current.weather[0].icon
        }@2x.png`,
        temp: parseInt(weatherInfo.data.current.temp),
        desc: weatherInfo.data.current.weather[0].main,
        forecasts: weatherInfo.data.daily.map((item, index) => ({
          day: moment.unix(item.dt).format('dddd'),
          high: parseInt(item.temp.max),
          low: parseInt(item.temp.min),
          desc: item.weather[0].main,
        })),
      };
      return {
        statusCode: 200,
        body: {
          data: returnData,
        },
      };
    }
    // Reach here, if open weather failed
    return {
      statusCode: 500,
      body: {
        message: 'Request Error',
      },
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: {
        message: 'System Error',
      },
    };
  }
};
