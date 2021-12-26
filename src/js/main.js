"use strict";

//Alpine JS and plugins import
import Alpine from "alpinejs";
import intersect from "@alpinejs/intersect";
import Fern from "@ryangjchandler/fern";

window.Alpine = Alpine;
//Init intersect plugin
Alpine.plugin(intersect);
//Init Fern plugin
Alpine.plugin(Fern);
//Init Fern persisted store
Alpine.persistedStore("app", {
  isLoggedIn: false,
});
//Start Alpine JS
Alpine.start();

import { env } from "./libs/utils/constants";
import { switchDemoImages, insertBgImages } from "./libs/utils/utils";
import "./libs/chat";
const feather = require("feather-icons");



document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    //Switch demo images
    const changeImages = switchDemoImages(env);

    //Switch backgrounds
    const changeBackgrounds = insertBgImages();

    //Feather Icons
    const featherIcons = feather.replace();
  }
};
