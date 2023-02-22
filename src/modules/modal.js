//Custom Confirm Class
/**
 * @param Object {title,Message,yes,no,yesCallback,noCallback}
 */
class ConfirmBox {
  constructor({ ...option }, resolve) {
      this.title = option.title || "Confirm";
      this.messageDate = option.messageDate || "Are you sure?";
      this.messageWorkedHour = option.messageWorkedHour || "Are you sure?";
      this.yes = option.yes || "Yes";
      this.no = option.no || 'No';
      this.yesCallback = resolve(true) || function() {};
      this.noCallback = resolve(false) || function() {};
      this.confirm();
  }

  confirm() {
      this.Ui();
      // this.eventHandler();
  }

  Ui() {
      //Create Element
      let modal = document.createElement("div");
      modal.classList.add("confirm-modal");

      let modalBody = document.createElement("div");
      modalBody.classList.add("confirm-modal-body");

      let modalHeader = document.createElement("div");
      modalHeader.classList.add("confirm-modal-header");

      let modalTitle = document.createElement("div");
      modalTitle.classList.add("confirm-modal-title");
      modalTitle.innerHTML = this.title;

      let modalMessageDate = document.createElement("p");
      modalMessageDate.classList.add("confirm-modal-message");
      modalMessageDate.textContent = this.messageDate;
      
      let modalMessageWorkedHour = document.createElement("p");
      modalMessageWorkedHour.classList.add("confirm-modal-message");
      modalMessageWorkedHour.textContent = this.messageWorkedHour;

      let modalFooter = document.createElement("div");
      modalFooter.classList.add("confirm-modal-footer");

      let modalYes = document.createElement("div");
      modalYes.classList.add("confirm-modal-yes");
      modalYes.innerHTML = this.yes;

      let modalNo = document.createElement("div");
      modalNo.classList.add("confirm-modal-no");
      modalNo.innerHTML = this.no;

    //   let modalClose = document.createElement("div");
    //   modalClose.classList.add("confirm-modal-close");
    //   modalClose.innerHTML = "&times;";
      //Append Element to Modal
      modal.appendChild(modalBody);
      modalBody.appendChild(modalHeader);
      modalHeader.appendChild(modalTitle);
   
      modalBody.appendChild(modalMessageDate);
      modalBody.appendChild(modalMessageWorkedHour);
      modalBody.appendChild(modalFooter);
      modalFooter.appendChild(modalYes);
      modalFooter.appendChild(modalNo);
      //Append Modal to Body
      document.body.appendChild(modal);

      //Append Event Listener to Close Button like BIND
      this.modalYes = modalYes;
      this.modalNo = modalNo;
      this.modal = modal;
  }

  //Event And Callback Handler
  eventHandler(resolve) {
         //Append Event Listener to Yes Button
      this.modalYes.addEventListener("click", () => {
          this.modal.remove();
          resolve(true);
          // this.yesCallback();
      });
      //Append Event Listener to No Button
      this.modalNo.addEventListener("click", () => {
          // this.noCallback();
          this.modal.remove();
          resolve(false);
      });
  }
}
export function renderConfirm(option){
  let modal = new ConfirmBox(option);

  return new Promise( resolve => {
    modal.eventHandler(resolve);
  }  )
//  return new Promise(resolve => { new ConfirmBox(option, resolve) } )
  };

export async function confirmDialog (option) {

    // return new Promise((resolve, reject) => {
      debugger;
      renderConfirm(option)
     if(await renderConfirm() ) console.log('fired');
        // confirmed ? resolve(true) : reject(false) 
      // } )
    }

  // title:"Test Confirm Window",
  // message:"Some Details message of Confirmation",
  // yes:"Yes",
  // no:"NO",
  // yesCallback:()=>{
  //   alert('You Chose Yes');
  // },
  // noCallback:()=>{
    
  // }