//Custom Confirm Class
/**
 * @param Object {title,Message,yes,no,yesCallback,noCallback}
 */
class ConfirmBox {
  constructor({ ...option }) {
      this.title = option.title || "Confirm";
      this.messageDate = option.messageDate || "Are you sure?";
      this.messageWorkedHour = option.messageWorkedHour || "Are you sure?";
      this.yes = option.yes || "Yes";
      this.no = option.no || 'No';
      this.yesCallback = option.yesCallback || function () { };
      this.noCallback = option.noCallback || function () { };
      this.confirm();
  }

  confirm() {
      this.Ui();
      this.eventHandler();
  }

  Ui() {
      //Create Element
      let modal = document.createElement("div");
      modal.classList.add("confirm-modal");

      let modalBody = document.createElement("div");
      modalBody.classList.add("confirm-modal-body");

      let modalHeader = document.createElement("div");
      modalHeader.classList.add("confirm-modal-header");

      let modalTitle = document.createElement("h4");
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

      let modalClose = document.createElement("div");
      modalClose.classList.add("confirm-modal-close");
      modalClose.innerHTML = "&times;";
      //Append Element to Modal
      modal.appendChild(modalBody);
      modalBody.appendChild(modalHeader);
      modalHeader.appendChild(modalTitle);
      modalHeader.appendChild(modalClose);

      modalBody.appendChild(modalMessageDate);
      modalBody.appendChild(modalMessageWorkedHour);
      modalBody.appendChild(modalFooter);
      modalFooter.appendChild(modalYes);
      modalFooter.appendChild(modalNo);
      //Append Modal to Body
      document.body.appendChild(modal);
      //Append Event Listener to Close Button
      this.modalClose = modalClose;
      this.modalYes = modalYes;
      this.modalNo = modalNo;
      this.modal = modal;
  }

  //Event And Callback Handler
  eventHandler() {
      this.modalClose.addEventListener("click", () => {
          this.modal.remove();
      });
      //Append Event Listener to Yes Button
      this.modalYes.addEventListener("click", () => {
          this.yesCallback(this.param);
          this.modal.remove();
      });
      //Append Event Listener to No Button
      this.modalNo.addEventListener("click", () => {
          this.noCallback(this.param);
          this.modal.remove();
      });
  }
}

export default function renderConfirm(option){

new ConfirmBox(option)
  };
  

  // title:"Test Confirm Window",
  // message:"Some Details message of Confirmation",
  // yes:"Yes",
  // no:"NO",
  // yesCallback:()=>{
  //   alert('You Chose Yes');
  // },
  // noCallback:()=>{
    
  // }