/* eslint-disable import/no-cycle */
import PopUp from './modules/popUp/PopUp.js';
import PopUpGps from './modules/popUp/PopUpGPS.js';
import PopUpAddFile from './modules/popUp/PopUpAddFile.js';
import LazyLoadingMessages from './modules/lazyLoading/LazyLoadingMessages.js';
import InputForm from './modules/inputForm/InputForm.js';
import Messenger from './modules/messenger/Messenger.js';
import Ws from './modules/ws/Ws.js';
import Gps from './modules/gps/Gps.js';
import Message from './modules/message/Message.js';
import Timer from './modules/timer/Timer.js';
import MessageManagement from './modules/message/MessageManagement.js';

const messagesEl = document.querySelector('.messages');
const popUpAddFile = new PopUpAddFile();
const timer = new Timer();
const popUpGps = new PopUpGps();
const messageManagement = new MessageManagement();
const popUp = new PopUp('container', messageManagement);
const ws = new Ws(popUp);
const lazyLoadingMessages = new LazyLoadingMessages(ws);
const gps = new Gps(popUpGps);
const messenger = new Messenger(popUp, ws);
const message = new Message(messagesEl, gps, popUpAddFile);
const argsInputForm = {
  message, gps, popUpGps, timer, ws, popUpAddFile, lazyLoadingMessages,
};
const inputForm = new InputForm(argsInputForm);

export {
  popUp, messenger, ws, inputForm, message, lazyLoadingMessages, gps,
};
