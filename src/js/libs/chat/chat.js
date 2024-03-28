const eyeIcon = ` <svg width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M2 12s3-7 10-7s10 7 10 7s-3 7-10 7s-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></g></svg>`

const phoneIcon = `<svg width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 16.92v3a2 2 0 0 1-2.18 2a19.79 19.79 0 0 1-8.63-3.07a19.5 19.5 0 0 1-6-6a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72a12.84 12.84 0 0 0 .7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45a12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`

const fileIcon = `<svg width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><path d="M14 2v6h6m-4 5H8m8 4H8m2-8H8"/></g></svg>`

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
