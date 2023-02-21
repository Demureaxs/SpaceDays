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

fetch(
  'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2022-1-1&api_key=TJWZinLK37XHbWaEjAH2rsi2NlpXcCH4t0WEHY2k'
)
  .then(res => res.json())
  .then(data => console.log(data));

// Search Button //////////////////////////////////////////////////////////////////////////

btnSearch.addEventListener('click', getFirstBirthdayPic);

function getFirstBirthdayPic(e) {
  e.preventDefault();

  birthDay = input.value;
  date = new Date(birthDay);
  selectPlanet = document.querySelector('input[name="planet"]:checked').value;

  if (+birthDay.split('-').join('') < 19950620) {
    birthDay = birthDay.split('-');
    birthDay[0] = 1996;
    birthDay = birthDay.join('-');
  }

  //   if (selectPlanet === 'space') {
  url = `https://api.nasa.gov/planetary/apod?api_key=TJWZinLK37XHbWaEjAH2rsi2NlpXcCH4t0WEHY2k&date=${birthDay}`;
  //   } else if (selectPlanet === 'mars') {
  // url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${birthDay}&api_key=api_key=TJWZinLK37XHbWaEjAH2rsi2NlpXcCH4t0WEHY2k`;
  //   }

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
}

// NEXT/PREVIOUS buttons //////////////////////////////////////////////////////////////////////////

btnNext.addEventListener('click', nextPrev);
btnPrev.addEventListener('click', nextPrev);

function nextPrev(e) {
  e.preventDefault();

  const selectDate = +document.querySelector('input[name="timespan"]:checked')
    .value;
  console.log(selectDate);

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

  selectPlanet = document.querySelector('input[name="planet"]:checked').value;

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  // need to change for mars
  let formattedDate = selectFormat();

  // selects date format based on planet selection
  function selectFormat() {
    if (selectPlanet === 'space') {
      return `${year}-${String(month).padStart(2, 0)}-${String(day).padStart(
        2,
        0
      )}`;
    } else if (selectPlanet === 'mars') {
      return `${year}-${String(month)}-${String(day)}`;
    }
  }

  console.log(formattedDate);

  const url = `https://api.nasa.gov/planetary/apod?api_key=TJWZinLK37XHbWaEjAH2rsi2NlpXcCH4t0WEHY2k&date=${formattedDate}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.title) title.innerText = data.title;
      if (data.date) dateTaken.innerText = data.date;
      if (data.hdurl) image.src = data.hdurl;
      if (data.explanation) info.innerText = data.explanation;
    });
}
