"use strict";

import './store/store';
import 'alpinejs';
import { env } from './libs/utils/constants';
import { switchDemoImages, insertBgImages } from './libs/utils/utils';
import { initChat } from './libs/chat/chat';
const feather = require('feather-icons');

window.initChat = initChat;

document.onreadystatechange = function () {
    if (document.readyState == 'complete') {

        //Switch demo images
        const changeImages = switchDemoImages(env);

        //Switch backgrounds
        const changeBackgrounds = insertBgImages();

        //Feather Icons
        const featherIcons = feather.replace();
        
    }
}

