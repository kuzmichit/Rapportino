import { camellizeClass, isObject, deleteNode, isUserDataInLocalStorage} from './support.js';
import { CreateCalendar } from './calendar.js';
import { renderDay, renderModalSignIn } from './renders.js';
import {btnRegisterFormHandler} from './registers_form.js';
export class MainHandler {
  
  constructor(date, elems) {
    this.elems = elems;
    this.calendar = new CreateCalendar(this.elems.placeToInsert);
    this.currentDate = date;
    this.elems.targetCurrent.addEventListener('pointerdown', this.clickOnHandler.bind(this) );
    renderDay(date);
  }

  clickOnHandler(evt) {
    let action = camellizeClass(evt.target.className).split(' ');
    if (!action) return;
    if(!isObject(this[action[0]] ) ) return;
    this[action[0]](evt);
    console.log(action);
  }

  calendarHeaderText() {
    deleteNode(this.elems.placeToInsert);
    this.elems.month.classList.toggle('visually-hidden');
    this.elems.buttonLeft.classList.toggle('hidden');
    this.elems.buttonRight.classList.toggle('hidden');

    if (this.elems.month.classList.contains('visually-hidden') ) {
      this.currentDate = new Date();
      renderDay(this.currentDate);
    }
    else renderDay(null, this.currentDate);
    this.calendar(new Date() );
  }

  buttonRight() {
    deleteNode(this.elems.placeToInsert);
    this.calendar(this.currentDate.setMonth(this.currentDate.getMonth() + 1) );
    renderDay(null, this.currentDate);
  }
  buttonLeft() {
    deleteNode(this.elems.placeToInsert);
    this.calendar(this.currentDate.setMonth(this.currentDate.getMonth() - 1) );
    renderDay(null, this.currentDate);
  }
  //accerchiamento giorno
  dayItem(evt) {
    evt.preventDefault();
    for (let day of this.elems.placeToInsert.children) {
      if(day.classList.contains('item_checked') ) day.classList.remove('item_checked');
    }
    evt.target.classList.add('item_checked');
    
    let tmpDate = new Date(+this.currentDate);
    tmpDate.setDate(evt.target.textContent);
    this.currentDate = tmpDate; 
    console.log(this.currentDate);
  }
  //accerchiamento ora
  hour(evt) {
   evt.preventDefault();
    if(evt.target.classList.contains('item_checked')) {
      evt.target.classList.toggle('item_checked');
      return;
    }
    //let hourChecked = evt.target;
    for (let hour of this.elems.listHour.children) {
         if(hour.classList.contains('item_checked') ) hour.classList.remove('item_checked');
    }
    evt.target.classList.add('item_checked');

  }

  editHour() {
    this.elems.listHour.classList.toggle('visually-hidden');
    this.elems.inputHour.classList.toggle('visually-hidden');
  }

  //la registrazione della scheda o apertura la finestra Login
  submitButton(evt) {
      
    if(isUserDataInLocalStorage() ) {
      btnRegisterFormHandler(this.currentDate, evt);
    }
    else {
      evt.target.style.display = 'none';
      renderModalSignIn();
    } 
  }

  get(evt) {
    console.log();
  }
}
