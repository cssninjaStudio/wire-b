import { env } from "../utils/constants";
import { switchDemoImages } from "../utils/utils";
const feather = require("feather-icons");

export function initChat() {
  return {
    dark: false,
    toggleTheme() {
      this.dark = !this.dark;
    },

    chatBodyOpened: true,
    closeChatPanel() {
      this.chatBodyOpened = !this.chatBodyOpened;
      this.sidebarMobileOpen = false;
    },

    layoutMobileActive: false,
    toggleMobileLayout() {
      this.layoutMobileActive = !this.layoutMobileActive;
    },

    sidebarMobileOpen: false,
    toggleMobileSidebar() {
      this.sidebarMobileOpen = !this.sidebarMobileOpen;
    },

    activePanelTab: "participants-tab",
    switchPanelTabs(e) {
      const target = e.target.getAttribute("data-panel");
      console.log(target);
      this.activePanelTab = target;
    },

    detailsUsername: "Helen Miller",
    detailsPosition: "Sales Manager",
    detailsPhoto: "/img/avatars/helen.jpg",

    openUserDetails(e) {
      const username = e.target.getAttribute("data-username");
      const position = e.target.getAttribute("data-position");
      const photo = e.target.getAttribute("data-photo");

      this.detailsUsername = username;
      this.detailsPosition = position;
      this.detailsPhoto = photo;
      this.activePanelTab = "details-tab";
    },

    closeUserDetails() {
      this.activePanelTab = "participants-tab";
    },

    activeConversation: "conversation-1",

    switchConversation(e) {
      const _this = this;
      const conversation = e.target.getAttribute("data-conversation");

      this.activePanelTab = "participants-tab";
      this.isConversationLoading = true;
      this.activeConversation = "conversation-" + conversation;
      this.loadConversationParticipants(this.activeConversation);
      this.chatBodyOpened = true;

      setTimeout(() => {
        //Remove placeholders
        _this.isConversationLoading = false;
      }, 1800);
    },

    isParticipantsLoading: false,
    isConversationLoading: true,

    initialConversation() {
      //Simulate loading
      const _this = this;

      setTimeout(() => {
        //Remove placeholders
        _this.isConversationLoading = false;
      }, 1800);
    },

    loadConversationParticipants(param) {
      const _this = this;
      const eyeIcon = feather.icons.eye.toSvg();
      const phoneIcon = feather.icons.phone.toSvg();
      const fileIcon = feather.icons.file.toSvg();
      const profileIcon = feather.icons["more-horizontal"].toSvg();

      const ownerParticipant = document.getElementById("owner-participant");
      const allParticipants = document.getElementById("regular-participants");
      const navbarParticipants = document.getElementById("navbar-participants");
      const navbarParticipantName = document.getElementById(
        "navbar-participant-name"
      );
      const navbarParticipantCount = document.getElementById(
        "navbar-participants-count"
      );

      ownerParticipant.innerHTML = "";
      allParticipants.innerHTML = "";
      navbarParticipants.innerHTML = "";

      this.isParticipantsLoading = true;

      fetch(`/data/${param}.json`)
        .then((resp) => resp.json())
        .then(function (data) {
          for (let i = 0; i < data.participants.length; i++) {
            if (i === 0) {
              let template = `
                    <div class="participant-item is-owner">
                        <div class="avatar-container">
                            <img src="${data.participants[i].photoUrl}" alt="">
                            <div class="user-status is-${data.participants[i].status}"></div>
                        </div>
                        <div class="meta">
                            <span>${data.participants[i].name}</span>
                            <span>${data.participants[i].position}</span>
                        </div>
                        <div class="actions">
                            <div class="loader-wrap">
                                <div class="loader"></div>
                            </div>
                            <button @click="openUserDetails($event)" class="action is-view" data-photo="${data.participants[i].photoUrl}" data-username="${data.participants[i].name}" data-position="${data.participants[i].position}">
                                ${eyeIcon}
                            </button>
                            <button class="action is-call">
                                ${phoneIcon}
                            </button>
                            <button class="action is-note">
                                ${fileIcon}
                            </button>
                        </div>
                    </div>                    
                `;

              ownerParticipant.innerHTML += template;

              navbarParticipants.innerHTML += `
                    <div class="avatar-container">
                        <img class="user-avatar" src="${data.participants[i].photoUrl}" alt="">
                    </div>
                `;
              navbarParticipantName.innerHTML = data.participants[i].name;
            } else {
              let template = `
                        <div class="participant-item is-participant">
                            <div class="avatar-container">
                                <img src="${data.participants[i].photoUrl}" alt="">
                                <div class="user-status is-${data.participants[i].status}"></div>
                            </div>
                            <div class="meta">
                                <span>${data.participants[i].name}</span>
                                <span>${data.participants[i].position}</span>
                            </div>
                            <div class="actions">
                                <div class="loader-wrap">
                                    <div class="loader"></div>
                                </div>
                                <button @click="openUserDetails($event)" class="action is-view" data-photo="${data.participants[i].photoUrl}" data-username="${data.participants[i].name}" data-position="${data.participants[i].position}">
                                    ${eyeIcon}
                                </button>
                                <button class="action is-call">
                                    ${phoneIcon}
                                </button>
                                <button class="action is-note">
                                    ${fileIcon}
                                </button>
                            </div>
                        </div>
                    `;

              allParticipants.innerHTML += template;
              if (i < 6) {
                navbarParticipants.innerHTML += `
                    <div class="avatar-container">
                        <img class="user-avatar" src="${data.participants[i].photoUrl}" alt="">
                    </div>
                `;
              }
            }

            if (i === data.participants.length - 1) {
              //Set navbar count
              navbarParticipantCount.innerHTML = data.participants.length - 1;

              //Simulate loading
              setTimeout(() => {
                //Remove placeholders
                _this.isParticipantsLoading = false;
                const list = document.getElementById(_this.activeConversation);
                list.scrollTo(0, list.scrollHeight);
              }, 1800);
            }
          }
        })
        .catch(function (error) {});
    },

    newConversationModalOpened: false,
    toggleNewConversationModal() {
      this.newConversationModalOpened = !this.newConversationModalOpened;
    },
  };
}
