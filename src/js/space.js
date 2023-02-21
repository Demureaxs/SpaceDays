'use strict';
const title = document.querySelector('#title');
const image = document.querySelector('img');
const info = document.querySelector('#info');
const dateTaken = document.querySelector('#date');

const btnSearch = document.querySelector('#search');
const btnPrev = document.querySelector('#prev');
const btnNext = document.querySelector('#next');
const input = document.querySelector('#input');

let birthDay;
let date;
let selectPlanet;
let url;

// Search Button //////////////////////////////////////////////////////////////////////////

btnSearch.addEventListener('click', getFirstBirthdayPic);

function getFirstBirthdayPic(e) {
  e.preventDefault();

  birthDay = input.value;
  selectPlanet = document.querySelector('input[name="planet"]:checked').value;

  //2012-8-18 - first dates for mars
  if (selectPlanet === 'space' && +birthDay.split('-').join('') < 19950620) {
    birthDay = birthDay.split('-');
    birthDay[0] = 1996;
    birthDay = birthDay.join('-');
  } else if (
    selectPlanet === 'mars' &&
    +birthDay.split('-').join('') < 20120818
  ) {
    birthDay = birthDay.split('-');
    birthDay[0] = 2013;
    birthDay = birthDay.join('-');
  }

  date = new Date(birthDay);

  if (selectPlanet === 'space') {
    url = `https://api.nasa.gov/planetary/apod?api_key=TJWZinLK37XHbWaEjAH2rsi2NlpXcCH4t0WEHY2k&date=${birthDay}`;
  } else if (selectPlanet === 'mars') {
    url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${birthDay}&api_key=TJWZinLK37XHbWaEjAH2rsi2NlpXcCH4t0WEHY2k`;
  }

  if (selectPlanet === 'space') {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.title) title.innerText = data.title;
        if (data.date) dateTaken.innerText = data.date;
        if (data.hdurl) image.src = data.hdurl;
        if (data.explanation) info.innerText = data.explanation;
      })
      .catch(error => {
        image.src = '';
        info.innerText = '';
        title.innerText = 'We are sorry, no images found on this date';
      });
  } else if (selectPlanet === 'mars') {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const img = data.photos[Math.trunc(Math.random() * data.photos.length)];

        title.innerText = img.rover.name;
        dateTaken.innerText = `Sol: ${img.sol}`;
        image.src = img.img_src;
        info.innerText = `Name: ${img.camera.full_name}
                Landing Date: ${img.rover.landing_date}
                Launch Date: ${img.rover.launch_date}
                Status: ${img.rover.status}
                
                Earth Date: ${img.earth_date}`;
        imagePromt = true;
      });
  }
}

// NEXT/PREVIOUS buttons //////////////////////////////////////////////////////////////////////////

btnNext.addEventListener('click', nextPrev);
btnPrev.addEventListener('click', nextPrev);

function nextPrev(e) {
  e.preventDefault();

  const selectDate = +document.querySelector('input[name="timespan"]:checked')
    .value;
  console.log(selectDate);
  selectPlanet = document.querySelector('input[name="planet"]:checked').value;

  if (e.target.innerText === 'Previous') {
    if (selectDate === 0) {
      date.setFullYear(date.getFullYear() - 1);
    } else if (selectDate === 1) {
      date.setMonth(date.getMonth() - 1);
    } else if (selectDate === 2) {
      date.setDate(date.getDate() - 1);
    }
  } else if (e.target.innerText === 'Next') {
    if (selectDate === 0) {
      date.setFullYear(date.getFullYear() + 1);
    } else if (selectDate === 1) {
      date.setMonth(date.getMonth() + 1);
    } else if (selectDate === 2) {
      date.setDate(date.getDate() + 1);
    }
  }

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  // assigns the output data of selectFormat to the formatted data variable
  let formattedDate = `${year}-${String(month).padStart(2, 0)}-${String(
    day
  ).padStart(2, 0)}`;

  input.value = formattedDate;

  // set the url based on the planet selection
  if (selectPlanet === 'space') {
    url = `https://api.nasa.gov/planetary/apod?api_key=TJWZinLK37XHbWaEjAH2rsi2NlpXcCH4t0WEHY2k&date=${formattedDate}`;
  } else if (selectPlanet === 'mars') {
    url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${formattedDate}&api_key=TJWZinLK37XHbWaEjAH2rsi2NlpXcCH4t0WEHY2k`;
  }

  if (selectPlanet === 'space') {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.title) title.innerText = data.title;
        if (data.date) dateTaken.innerText = data.date;
        if (data.hdurl) image.src = data.hdurl;
        if (data.explanation) info.innerText = data.explanation;
      });
  } else if (selectPlanet === 'mars') {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        // sets image to the object containing the images (randomly selected)
        const img = data.photos[Math.trunc(Math.random() * data.photos.length)];

        title.innerText = img.rover.name;
        dateTaken.innerText = `Sol: ${img.sol}`;
        image.src = img.img_src;
        info.innerText = `Name: ${img.camera.full_name}
        Landing Date: ${img.rover.landing_date}
        Launch Date: ${img.rover.launch_date}
        Status: ${img.rover.status}
        
        Earth Date: ${img.earth_date}`;
      });
  }
}
