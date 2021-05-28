import Axios from 'axios';

const url =
  'https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,hourly&units=metric';
const imageUrl = 'http://openweathermap.org/img/wn/';
const appId = '011a6782e5ea3378626b21eb4fb7ee75';

// Convert day number to readable text
const convertIntToDay = (num) => {
  switch (num) {
    case 0:
      return 'Sunday';
      break;
    case 1:
      return 'Monday';
      break;
    case 2:
      return 'Tuesday';
      break;
    case 3:
      return 'Wednesday';
      break;
    case 4:
      return 'Thursday';
      break;
    case 5:
      return 'Friday';
      break;
    case 6:
      return 'Saturday';
      break;
    default:
      return 'ErrorDay';
      break;
  }
};

export const getWeather = async (req) => {
  if (!req.headers.lat || !req.headers.lon) {
    return {
      statusCode: 400,
      body: {
        message: 'Missing lat/lon',
      },
    };
  }
  try {
    const lat = req.headers.lat;
    const lon = req.headers.lon;
    const requestUrl = url + '&lat=' + lat + '&lon=' + lon + '&appid=' + appId;
    const weatherInfo = await Axios.get(requestUrl);
    if (weatherInfo.status === 200 && weatherInfo.data) {
      // Construct desire data, if we get valid response
      const returnData = {
        imageUrl:
          imageUrl + weatherInfo.data.current.weather[0].icon + '@2x.png',
        temp: parseInt(weatherInfo.data.current.temp),
        desc: weatherInfo.data.current.weather[0].main,
        forecasts: weatherInfo.data.daily.map((item, index) => ({
          day: convertIntToDay(new Date(item.dt * 1000).getDay()),
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
