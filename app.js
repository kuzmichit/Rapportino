// 'use strict';

import { MainHandler } from "./modules/handler.js";
import { CreateCalendar } from "./modules/calendar.js";

import { calendarsElements } from "./modules/support.js";
const date = new Date();

let app = new MainHandler(date, calendarsElements);

//auto apertura del calendario
/*let elem = document.querySelector('.calendar-header__text');

let calendar = new CreateCalendar(calendarsElements.placeToInsert);
let log = () => {
  calendarsElements.month.classList.toggle('visually-hidden');
  calendarsElements.buttonLeft.classList.toggle('hidden');
  calendarsElements.buttonRight.classList.toggle('hidden');
  calendar(new Date() );;
};*/

// elem.addEventListener('click', log);
// let evt = new Event('click');
// elem.dispatchEvent(evt);
// fine snippet apertura

// localStorage.user = JSON.stringify( {
//   name:"Borys",
//   age: 42,
// } );
//
// console.log(JSON.parse(localStorage.user) );

