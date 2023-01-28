import {calendarsElements} from './support.js';
const listHours = document.querySelector('.list__hour');
const container = document.querySelector('.hour__container')


let startLeft = listHours.getBoundingClientRect().left;
let startClientX;
let newLeft;

function onSliderDown(event) {
  event.preventDefault(); // prevent selection start (browser action)
  listHours.ondragstart = () => false;
   
  startClientX = event.touches[0].clientX ;
  
  //listHours.setPointerCapture(event.pointerId);
  
  listHours.ontouchmove = onSliderMove;
  
  listHours.ontouchend = event => {
    
    listHours.ontouchmove = null;
    listHours.ontouchend = null;
    
    startLeft = newLeft;
  }

};

function onSliderMove(event) {
  const minLeft = container.getBoundingClientRect().width - listHours.getBoundingClientRect().width ;
  const maxLeft = 0;

  
  newLeft = (event.touches[0].clientX - startClientX) + startLeft; 
  
  //====if the pointer is out of slider => adjust left to be within the boundaries
  if (newLeft > maxLeft) {
    newLeft = 0;
  }
  
  if (Math.abs(newLeft) > Math.abs(minLeft)) {
      newLeft = minLeft;
  }
  console.log(startLeft,'---stL', startClientX, '----stCX', newLeft, '-----nL', minLeft, '---minL');
  
  listHours.style.left = newLeft + 'px';
};


export default onSliderDown;