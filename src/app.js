/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import PopUp from './modules/popUp/PopUp';
import PopUpGps from './modules/popUp/PopUpGPS';
import PopUpAddFile from './modules/popUp/PopUpAddFile';
import LazyLoadingMessages from './modules/lazyLoading/LazyLoadingMessages';
import InputForm from './modules/inputForm/InputForm';
import Messenger from './modules/messenger/Messenger';
import Ws from './modules/ws/Ws';
import Gps from './modules/gps/Gps';
import Message from './modules/message/Message';
import Timer from './modules/timer/Timer';

const messagesEl = document.querySelector('.messages');
const popUpAddFile = new PopUpAddFile();
const timer = new Timer();
const popUpGps = new PopUpGps();
const popUp = new PopUp('container');
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
// регистрирую serviceWorker
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js');
//   });
// }
