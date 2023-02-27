// Imports
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from '../images/icon-location.svg';

import { validateIp, addTileLayer, getData, addOffset } from './helpers';

// Global variables
const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');

const mapArea = document.querySelector('.map');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

// Map
let map;
let marker;
const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
});

function createNewMap(lat = 51.34, lng = 12.36, zoom = 13) {
  map = L.map(mapArea).setView([lat, lng], zoom);
  addTileLayer(map);
}

// Attach events
btn.addEventListener('click', () => {
  const ip = ipInput.value;
  handleData(ip);
});

ipInput.addEventListener('keydown', handleKey);

function handleData(ip) {
  if (validateIp(ip)) {
    getData(ip).then((data) => setInfo(data));
  }
  ipInput.value = '';
  ipInput.focus();
}

function handleKey(event) {
  const ip = ipInput.value;
  if (event.key === 'Enter') {
    handleData(ip);
  }
}

// App

function setInfo(mapData) {
  const { ip, isp } = mapData;
  const { country, region, city, timezone, lat, lng } = mapData.location;
  ipInfo.innerText = ip;
  locationInfo.innerText = `${country} - ${region} - ${city}`;
  timezoneInfo.innerText = timezone;
  ispInfo.innerText = isp;

  if (!map) {
    createNewMap(lat, lng);
  } else {
    map.setView([lat, lng]);
  }

  if (marker) {
    map.removeLayer(marker);
  }

  marker = L.marker([lat, lng], { icon: markerIcon }).addTo(map);

  if (matchMedia('(max-width: 1023px)').matches) {
    addOffset(map);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getData('217.69.240.36').then((data) => setInfo(data));
});
