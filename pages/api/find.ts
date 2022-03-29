// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import citiesUntyped from '../../data/formatted.json';
import City from '../../types/city';

type CitiesStructured = {
  [key: string]: City[];
};

const cities: CitiesStructured = citiesUntyped as CitiesStructured;

const filterCities = (query: string): City[] => {
  const initial = query.charAt(0).toLowerCase();

  return cities[initial]
    .filter((city) =>
      city.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    )
    .slice(0, 10);
};

const find = (req: NextApiRequest, res: NextApiResponse<City[]>) => {
  const filtered = filterCities('' + req.query.city);
  return res.status(200).json(filtered);
};

export default find;
