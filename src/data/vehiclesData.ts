import { Vehicle } from '@/types';

export const vehiclesDatabase: Vehicle[] = [
  { id: 'v1', year: '1996', make: 'Ford', model: 'F-250', engine: '7.3L Powerstroke Diesel' },
  { id: 'v2', year: '1997', make: 'Ford', model: 'F-350', engine: '7.3L Powerstroke Diesel' },
  { id: 'v3', year: '1995', make: 'Ford', model: 'E-350 Econoline', engine: '7.3L Powerstroke Diesel' },
  { id: 'v4', year: '1994', make: 'Ford', model: 'F-Super Duty', engine: '7.3L Powerstroke Diesel' },
  { id: 'v5', year: '2005', make: 'Ford', model: 'F-250 Super Duty', engine: '6.0L Powerstroke Diesel' },
  { id: 'v6', year: '2008', make: 'Chevrolet', model: 'Silverado 2500HD', engine: '6.6L Duramax LMM' },
  { id: 'v7', year: '2015', make: 'Dodge / Ram', model: '2500', engine: '6.7L Cummins Diesel' }
];

export const matchingVehicleIds = ['v1', 'v2', 'v3', 'v4'];
