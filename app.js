// 'use strict';

import { MainHandler } from './modules/handler.js';
import { CreateCalendar } from './modules/calendar.js';

import { calendarsElements } from './modules/support.js';
const date = new Date();

let app = new MainHandler(date, calendarsElements);

