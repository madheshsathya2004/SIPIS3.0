// src/utils/loadData.js

import districtsData2001 from '../data/districts_data.json';
import districtsData1991 from '../data/district_taluk_1991.json';
import districtsData2011 from '../data/district_taluk_2011.json';

const dataSources = {
  1991: districtsData1991,
  2001: districtsData2001,
  2011: districtsData2011,
};

export const getSubdistricts = (year, district) => {
  const yearData = dataSources[year];
  if (!yearData || !yearData[district]) {
    return [];
  }
  return Object.keys(yearData[district]);
};

export const getVillages = (year, district, subdistrict) => {
  const yearData = dataSources[year];
  if (!yearData || !yearData[district] || !yearData[district][subdistrict]) {
    return [];
  }
  return yearData[district][subdistrict];
};

export const getDistricts = (year) => {
  const yearData = dataSources[year];
  if (!yearData) {
    return [];
  }
  return Object.keys(yearData);
};
