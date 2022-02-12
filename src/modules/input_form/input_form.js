/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */

/* eslint-disable no-alert */
export default class InputForm {
  constructor(message, gps, popUpGps, timer, ws, popUpAddFile) {
    this.messageApi = message;
    this.gps = gps;
    this.popUpGps = popUpGps;
    this.timer = timer;
    this.ws = ws;
    this.popUpAddFile = popUpAddFile;
  }

  eventHandler(e) { // обрабатывает клики по полю ввода сообщения. или текст или аудио
    // this.addFileButton = document.querySelector('.input__file-button');
    // this.addFileInput = document.querySelector('.input__file');
    this.soundRecordingButton = document.querySelector('.postAudioRecording');
    this.textarea = document.querySelector('.messageInput');
    const { target, key } = e;
    if (target === this.textarea && key === 'Enter') {
      // e.preventDefault();
      this.createTextMessage(this.textarea.value);
      return;
    }
    if (target === this.soundRecordingButton) {
      this.soundRecord();
    }
  }

  static getData() {
    const dateMessage = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString().slice(0, -3)}`;
    return dateMessage;
  }

  async soundRecord() { // записывает аудиосообщение
    if (!navigator.mediaDevices) {
      alert('Ваше устройство не поддерживаетс запись звука. Зайдите в приложение с другого устройства');
      return;
    }
    const dataMes = InputForm.getData();
    this.modificationForm('record'); // изменяет вид формы при записи аудио
    const constraints = {
      audio: true,
      video: false,
    };
    try {
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.recorder = new MediaRecorder(this.stream);
      const chunks = [];
      this.recorder.addEventListener('start', () => {
        this.timer.startTimer();
      });
      this.recorder.addEventListener('dataavailable', (e) => {
        chunks.push(e.data);
      });
      this.recorder.addEventListener('stop', async () => {
        this.modificationForm('text');
        if (this.recordingResult === 'message') {
          this.stream.getTracks().forEach((track) => track.stop());
          const blob = new Blob(chunks, { type: 'audio/webm' });

          const dataURLBase64 = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(reader.error);
          });
          this.coordString = await this.gps.getСoordinates();
          this.messageApi.createAudioMessage(dataURLBase64, this.coordString, this.ws.login, dataMes);
          this.message = JSON.stringify({
            action: 'postMessage',
            login: this.ws.login,
            message: dataURLBase64,
            dateMessage: dataMes,
            coordinates: this.coordString,
            typeMes: 'audioRecord',
          });
          this.ws.sendMessage(this.message);
        } else {
          chunks.length = 0;
          this.stream.getTracks().forEach((track) => track.stop());
        }
      });
      this.recorder.start();
    } catch (e) {
      this.modificationForm('text');
      alert('Вы не дали разрешения для записи аудио. Оставьте текстовое сообщение');
    }
  }

  async createTextMessage(text) {
    const dataMes = InputForm.getData();
    const modifyTextMessage = this.checkMessageForLink(text);
    this.popUpGps.text = modifyTextMessage;
    this.coordString = await this.gps.getСoordinates();
    this.messageApi.createTextMessage(modifyTextMessage, this.coordString, this.ws.login, dataMes);
    this.textarea.value = '';
    this.message = JSON.stringify({
      action: 'postMessage',
      login: this.ws.login,
      message: modifyTextMessage,
      dateMessage: dataMes,
      coordinates: this.coordString,
      typeMes: 'text',
    });
    this.ws.sendMessage(this.message);
  }

  // eslint-disable-next-line class-methods-use-this
  async createMessageFile(files) {
    // const addFileInput = document.querySelector('.input__file');
    // const { files } = addFileInput;
    const resultPopUpAddFile = await this.popUpAddFile.renderingPopUp(files); // Ждем результата действия пользователя по отправке файла. кликнет "отправить" вернется файл
    if (resultPopUpAddFile === 'canсell') { // пользователь отменил отправку файла
      document.querySelector('.popup').remove();
    } else { // пользователь согласился отправить файл
      const dataMes = InputForm.getData();
      document.querySelector('.popup').remove();
      // добавить отправку на сервер
      const arrURLBase64 = [];
      let typeFile = null;
      for (const file of resultPopUpAddFile) {
        typeFile = file.type;
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(reader.error);
        });
        arrURLBase64.push(base64);
      }
      const typeFileName = typeFile.match(/\w*(?=\/)/i)[0]; // получим image, audio или video
      this.coordString = await this.gps.getСoordinates();
      this.messageApi.createFileMessage(arrURLBase64, this.coordString, this.ws.login, dataMes, typeFileName, this.popUpAddFile.filesName);
      this.message = JSON.stringify({
        action: 'postMessage',
        login: this.ws.login,
        message: arrURLBase64, // закодированные в строку двоичные данные
        dateMessage: dataMes,
        coordinates: this.coordString,
        typeMes: typeFileName, // image, audio или video
        filesName: this.popUpAddFile.filesName,
      });
      this.ws.sendMessage(this.message);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  checkMessageForLink(messageText) { // проверяет сообщение на наличие ссылки
    // eslint-disable-next-line no-useless-escape
    const regexp = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?/igm;
    const result = messageText.replace(regexp, (str) => `<a href = "${str}">${str}</a>`);
    if (result !== null) {
      return result;
    }
    return result;
  }

  modificationForm(state) { // меняет вид формы под запись аудио и обратно для ввода текста
    if (state === 'record') {
      this.soundRecordingButton.remove();
      const htmlAudioRecord = `
      <input class="okAudioRecording buttonForm" type="button" />
      <div class="timer">00:00</div>
      <input class="cansellAudioRecording buttonForm" type="button" />
      `;
      this.footerForm = document.querySelector('.form_footer');
      this.footerForm.innerHTML += htmlAudioRecord;
      // this.timer.startTimer();
      this.buttonOk = this.footerForm.querySelector('.okAudioRecording');
      this.buttonCansell = this.footerForm.querySelector('.cansellAudioRecording');

      this.buttonOk.addEventListener('click', () => {
        this.recordingResult = 'message';
        this.recorder.stop();
      });
      this.buttonCansell.addEventListener('click', () => {
        this.recordingResult = 'cansellMessage';
        this.recorder.stop();
      });
    }
    if (state === 'text') {
      this.timer.stopTimer();

      this.buttonOk.remove();
      this.buttonCansell.remove();
      this.footerForm.querySelector('.timer').remove();
      const buttonRecordHTML = '<input class="postAudioRecording buttonForm" type="button" />';
      this.footerForm.innerHTML += buttonRecordHTML;
      this.soundRecordingButton = document.querySelector('.postAudioRecording');
      this.soundRecordingButton.addEventListener('click', (e) => this.eventHandler(e));
    }
  }
}
