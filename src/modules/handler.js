import { camelizeClass as camelizeClass, isObject, deleteNode, isUserDataInLocalStorage} from './support.js';
import { CreateCalendar } from './calendar.js';
import { renderDay, renderModalSignIn } from './renders.js';
import {btnRegisterFormHandler} from './registers_form.js';
import onSliderDown from './carouselHours.js';
export class MainHandler {
  
  constructor(date, elements) {
    ( { month: this.month,
        elemButtonLeft: this.elemButtonLeft,
        elemButtonRight: this.elemButtonRight,
        placeToInsert: this.placeToInsert,
        targetCurrent: this.targetCurrent,
        listHour: this.elemListHour,
        hourContainer: this.elemHourContainer,
           } = elements)
    this.calendar = new CreateCalendar(this.placeToInsert);
    this.currentDate = date;
    document.addEventListener('pointerdown', this.clickOnHandler.bind(this) );
    //this.elemHourContainer.addEventListener('pointerdown', () => alert(2222))
    renderDay(date);
  }

  clickOnHandler(evt) {
    let action = camelizeClass(evt.target.className).split(' ');
    if (!action) return;
    if(!isObject(this[action[0]] ) ) return;
    this[action[0]](evt);
    console.log(evt.target);
  }

  calendarHeaderText() {
    deleteNode(this.placeToInsert);
    this.month.classList.toggle('visually-hidden');
    this.elemButtonLeft.classList.toggle('hidden');
    this.elemButtonRight.classList.toggle('hidden');

    if (this.month.classList.contains('visually-hidden') ) {
      this.currentDate = new Date();
      renderDay(this.currentDate);
    }
    else renderDay(null, this.currentDate);
    this.calendar(new Date() );
  }

  buttonRight() {
    deleteNode(this.placeToInsert);
    this.calendar(this.currentDate.setMonth(this.currentDate.getMonth() + 1) );
    renderDay(null, this.currentDate);
  }
  buttonLeft() {
    deleteNode(this.placeToInsert);
    this.calendar(this.currentDate.setMonth(this.currentDate.getMonth() - 1) );
    renderDay(null, this.currentDate);
  }
  //accerchiamento giorno
  dayItem(evt) {
    evt.preventDefault();
    for (let day of this.placeToInsert.children) {
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
  // this.elemListHour.addEventListener('pointerdown', onSliderDown)


    if(evt.target.classList.contains('item_checked')) {
      evt.target.classList.toggle('item_checked');
      return;
    }
    //let hourChecked = evt.target;
    for (let hour of this.elemListHour.children) {
         if(hour.classList.contains('item_checked') ) hour.classList.remove('item_checked');
    }
    evt.target.classList.add('item_checked');

  }
  editHour() {
    this.elemListHour.classList.toggle('visually-hidden');
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

  listHour(e) {
    onSliderDown(e);
  }

  hourContainer(e) {
    console.log(11111);
  }
}
