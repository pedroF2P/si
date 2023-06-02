// Import our custom CSS
import './src/scss/styles.scss';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

// document.addEventListener('DOMContentLoaded', () => {
//   fetchData();
// });

const fetchData = async (city) => {

  if (!city) return;

  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '834eeebe63msh28803bdb79271a1p1d9430jsn88a7b7c3fac0',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    const { location, current } = result;
    showCard({ location, current });
  } catch (error) {
    console.error(error);
  }
};

const containerCards = document.querySelector('#container-cards');

const showCard = ({ location, current }) => {
  const template = document.querySelector('template').content;
  template.querySelector('#condition-text').textContent = current.condition.text;
  template.querySelector('#location-name').textContent = location.name;
  template.querySelector('#location-region').textContent = location.region;
  template.querySelector('#location-country').textContent = location.country;
  template.querySelector('#current-temp').textContent = current.temp_c + '°';
  template.querySelector('#condition-icon').setAttribute('src', current.condition.icon)
  template.querySelector('#wind').textContent = `${current.wind_dir} ${current.wind_kph} kph`;
  template.querySelector('#humidity').textContent = `${current.humidity}%`
  template.querySelector('#pressure').textContent = `${current.pressure_in}in`;
  const clone = template.cloneNode(true);
  containerCards.appendChild(clone);
};

const btn = document.querySelector('button');
btn.addEventListener('click', (e) => {
  e.preventDefault();
  const data = document.querySelector('input');
  fetchData(data.value);
});