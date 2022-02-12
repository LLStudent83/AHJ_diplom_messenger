// eslint-disable-next-line import/no-cycle
import { inputForm } from '../../app';

export default class Message {
  constructor(messages, gps, popUpAddFile) { // messagesEl, popUpGps, gps, popUpAddFile
    this.messages = messages;
    this.gps = gps;
    this.popUpAddFile = popUpAddFile;
  }

  assignHandler() { // обработка клика по кнопке "глаз"
    const lastMessage = this.messagesContaner.lastElementChild;
    const elementHandl = lastMessage.querySelector('.message__showPosition');
    elementHandl.addEventListener('click', (e) => {
      e.preventDefault();
      this.gps.showPosition();
    });
  }

  createAudioMessage(dataURLBase64, coordinates, login, date) {
    let userName = null;
    // eslint-disable-next-line no-unused-expressions
    login === this.login ? userName = 'You' : userName = login;
    const html = `
    <div class="message">
    <div class="messageData">${userName}, ${date}</div>
        <div class="messagCont">
          <audio controls class="message_audio" src="${dataURLBase64}"></audio>
          <div class="message_geoposition">${coordinates}
          <button class="message__showPosition"></button>
          </div>
        </div>
    </div>`;
    // this.messages.innerHTML += html;
    this.messagesContaner = document.querySelector('.messages');
    this.messagesContaner.innerHTML += html;
    if (login === this.login) this.messagesContaner.lastChild.classList.add('myMessage');
    this.assignHandler();
    inputForm.stream = null;
  }

  createTextMessage(text, coordinates, login, date) {
    let userName = null;
    // eslint-disable-next-line no-unused-expressions
    login === this.login ? userName = 'You' : userName = login;
    const html = `
        <div class="message">
        <div class="messageData">${userName}, ${date}</div>
          <div class="messagCont">
            <p class="message_text">${text}</p>
            <div class="message_geoposition">${coordinates}
            <button class="message__showPosition"></button>
            </div>
          </div>
        </div>`;
    this.messagesContaner = document.querySelector('.messages');
    this.messagesContaner.innerHTML += html;
    document.querySelector('.messageInput').value = '';
    if (login === this.login) this.messagesContaner.lastChild.classList.add('myMessage');
    this.assignHandler();
  }

  // (response.message, response.coordinates, response.dateMessage, response.login);
  createFileMessage(arrURLBase64, coordinates, login, date, typeFileName, filesName) {
    let tag;
    tag = typeFileName === 'image' ? tag = 'img' : tag = typeFileName;
    let userName = null;
    // eslint-disable-next-line no-unused-expressions
    login === this.login ? userName = 'You' : userName = login;
    const html = `
    <div class="message">
    <div class="messageData">${userName}, ${date}</div>
        <div class="messagCont">
        <a download="${filesName}" href='${arrURLBase64[0]}' id="link">Скачать ${filesName}</a>
          <${tag} controls class="message_${tag}" src="${arrURLBase64[0]}"></${tag}>
        
          <div class="message_geoposition">${coordinates}
          <button class="message__showPosition"></button>
          </div>
        </div>
    </div>`;
    // this.messages.innerHTML += html;
    this.messagesContaner = document.querySelector('.messages');
    this.messagesContaner.innerHTML += html;
    if (login === this.login) this.messagesContaner.lastChild.classList.add('myMessage');
    this.assignHandler();
  }
}
