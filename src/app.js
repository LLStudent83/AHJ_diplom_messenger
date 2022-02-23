/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import PopUp from './modules/pop_up/pop_up';
import PopUpGps from './modules/pop_up/pop_up_gps';
import PopUpAddFile from './modules/pop_up/pop_up_addFile';
import LazyLoadingMessages from './modules/lazyLoading/lazyLoadingMessages';

import InputForm from './modules/inputForm/InputForm';
import Messenger from './modules/messenger/messenger';
import Ws from './modules/ws/ws';
import Gps from './modules/gps/Gps';
import Message from './modules/message/message';
import Timer from './modules/timer/timer';

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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}
