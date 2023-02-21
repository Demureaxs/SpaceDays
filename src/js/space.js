'use strict';
const title = document.querySelector('#title');
const image = document.querySelector('img');
const info = document.querySelector('#info');
const dateTaken = document.querySelector('#date');

const btnSearch = document.querySelector('#search');
const btnPrev = document.querySelector('#prev');
const btnNext = document.querySelector('#next');

let birthDay;

btnSearch.addEventListener('click', getFirstBirthdayPic);

function getFirstBirthdayPic(e) {
  e.preventDefault();

  const input = document.querySelector('#input');

  birthDay = input.value;

  if (+birthDay.split('-').join('') < 19950620) {
    birthDay = birthDay.split('-');
    birthDay[0] = 1996;
    birthDay = birthDay.join('-');
  }

  const url = `https://api.nasa.gov/planetary/apod?api_key=TJWZinLK37XHbWaEjAH2rsi2NlpXcCH4t0WEHY2k&date=${birthDay}`;
  console.log(birthDay);

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
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

btnNext.addEventListener('click', nextPrev);
btnPrev.addEventListener('click', nextPrev);

function nextPrev(e) {
  e.preventDefault();

  const selection = +document.querySelector('input[name="timespan"]:checked')
    .value;
  console.log(selection);

  birthDay = birthDay.split('-');
  if (e.target.innerText === 'Previous') {
    if (birthDay[selection] > 1) {
      birthDay[selection]--;
    } else {
      birdDay[selection - 1]--;
    }
  } else {
    birthDay[selection]++;
  }
  birthDay = birthDay.join('-');

  const url = `https://api.nasa.gov/planetary/apod?api_key=TJWZinLK37XHbWaEjAH2rsi2NlpXcCH4t0WEHY2k&date=${birthDay}`;

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
