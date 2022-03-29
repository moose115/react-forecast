import { NextApiRequest, NextApiResponse } from 'next';
import Forecast from '../../types/forecast';

const forecast = async (
  req: NextApiRequest,
  res: NextApiResponse<Forecast>
) => {
  try {
    const { lon, lat, units } = req.query;
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${
        process.env.FORECAST_API_KEY
      }&units=${units || 'metric'}&exclude=minutely,hourly`
    );
    const forecast = await data.json();
    res.status(200).json(forecast);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

export default forecast;
