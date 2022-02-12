/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import PopUp from './modules/pop_up/pop_up';
import PopUpGps from './modules/pop_up/pop_up_gps';
import PopUpAddFile from './modules/pop_up/pop_up_addFile';

import InputForm from './modules/input_form/input_form';
import Messenger from './modules/messenger/messenger';
import Ws from './modules/ws/ws';
import Gps from './modules/gps/gps';
import Message from './modules/message/message';
import Timer from './modules/timer/timer';


const messagesEl = document.querySelector('.messages');
const popUpAddFile = new PopUpAddFile();
const timer = new Timer();
const popUpGps = new PopUpGps();
const popUp = new PopUp('container');
const ws = new Ws(popUp);
const gps = new Gps(popUpGps);
const messenger = new Messenger(popUp, ws);
const message = new Message(messagesEl, gps, popUpAddFile);
const inputForm = new InputForm(message, gps, popUpGps, timer, ws, popUpAddFile);

export {
  popUp, messenger, ws, inputForm, message,
};
