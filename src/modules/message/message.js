// eslint-disable-next-line import/no-cycle
import { inputForm } from '../../app';

export default class Message {
  constructor(messages, gps, popUpAddFile) {
    this.messages = messages;
    this.gps = gps;
    this.popUpAddFile = popUpAddFile;
  }

  printMessage(objMessageData, place) {
    this.messagesContaner = document.querySelector('.messages');
    const {
      login, coordinates, dateMessage, typeMes, filesName, message, traceable,
    } = objMessageData;

    if (typeMes === 'text') {
      this.HTML = this.createHTMLTextMessage(message, coordinates, login, dateMessage);
    }
    if (typeMes === 'audioRecord') {
      this.HTML = this.createHTMLAudioMessage(message, coordinates, login, dateMessage);
    }
    if (typeMes === 'image'
    || typeMes === 'audio'
    || typeMes === 'video') {
      this.HTML = this.createHTMLFileMessage(message, coordinates,
        login, dateMessage, typeMes, filesName);
    }
    const messageEl = document.createElement('div');
    messageEl.classList.add('message');
    if (login === this.login) messageEl.classList.add('myMessage');
    if (traceable) messageEl.classList.add('traceable');
    messageEl.innerHTML = this.HTML;
    if (place === 'toTheEnd') this.messagesContaner.append(messageEl);
    if (place === 'toTheBegining') this.messagesContaner.prepend(messageEl);
    this.messagesContaner.scrollTop = 9999999999;
    this.assignHandler();
  }

  createHTMLAudioMessage(dataURLBase64, coordinates, login, date) {
    let userName = null;
    // eslint-disable-next-line no-unused-expressions
    login === this.login ? userName = 'You' : userName = login;
    inputForm.stream = null;
    return `
    <div class="messageData">${userName}, ${date}</div>
        <div class="messagCont">
          <audio controls class="message_audio" src="${dataURLBase64}"></audio>
          <div class="message_geoposition">${coordinates}
          <button class="message__showPosition"></button>
          </div>
    </div>`;
  }

  createHTMLTextMessage(text, coordinates, login, date) {
    let userName = null;
    // eslint-disable-next-line no-unused-expressions
    login === this.login ? userName = 'You' : userName = login;
    document.querySelector('.messageInput').value = '';

    return `<div class="messageData">${userName}, ${date}</div>
          <div class="messagCont">
            <p class="message_text">${text}</p>
            <div class="message_geoposition">${coordinates}
            <button class="message__showPosition"></button>
          </div>
        </div>`;
  }

  createHTMLFileMessage(arrURLBase64, coordinates, login, date, typeFileName, filesName) {
    let tag;
    tag = typeFileName === 'image' ? tag = 'img' : tag = typeFileName;
    let userName = null;
    // eslint-disable-next-line no-unused-expressions
    login === this.login ? userName = 'You' : userName = login;
    return `
    <div class="messageData">${userName}, ${date}</div>
        <div class="messagCont">
        <a download="${filesName}" href='${arrURLBase64[0]}' id="link">Скачать ${filesName}</a>
          <${tag} controls class="message_${tag}" src="${arrURLBase64[0]}"></${tag}>
          <div class="message_geoposition">${coordinates}
          <button class="message__showPosition"></button>
          </div>
    </div>`;
  }

  assignHandler() { // обработка клика по кнопке "глаз"
    const lastMessage = this.messagesContaner.lastElementChild;
    const elementHandl = lastMessage.querySelector('.message__showPosition');
    elementHandl.addEventListener('click', (e) => {
      e.preventDefault();
      this.gps.showPosition();
    });
  }
}
