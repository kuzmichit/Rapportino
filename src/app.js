'use strict';

import './css/style.css';
import './css/calendar.css';
import './css/reset.css';
import './css/form.css';
import './css/modal.css';

import { MainHandler } from './modules/handler.js';
import { CreateCalendar } from './modules/calendar.js';

import { calendarsElements } from './modules/support.js';
const date = new Date();

let app = new MainHandler(date, calendarsElements);
