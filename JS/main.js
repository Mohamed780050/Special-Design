///////////////////////////////// Toggle Menu /////////////////////////////////
let TheToggle = document.querySelector(".landing header button.toggle-menu");
let LinksHolder = document.querySelector(".landing header .links-holder");
TheToggle.onclick = function (e) {
  LinksHolder.classList.toggle("open");
  TheToggle.classList.toggle("show");
  e.stopPropagation();
};
document.addEventListener("click", (e) => {
  if (e.target !== TheToggle && e.target !== LinksHolder) {
    if (LinksHolder.classList.contains("open")) {
      LinksHolder.classList.toggle("open");
      TheToggle.classList.toggle("show");
    }
  }
});
////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Random Background /////////////////////////////////
let landing = document.querySelector("body .landing");
let btns = document.querySelectorAll(".setting-box .random-background button");
let i = 2;
let tries = 3;
let start = true;
let TheImages;
if (window.localStorage.getItem("The active button")) {
  let TheChoosen = document.querySelector(
    `.setting-box .option-box [data-type="${window.localStorage.getItem(
      "The active button"
    )}"]`
  );
  btns.forEach((el) => {
    el.classList.remove("active");
    if (TheChoosen.dataset.type == "Yes") {
      start = true;
    } else {
      start = false;
    }
  });
  TheChoosen.classList.add("active");
}
if (window.localStorage.getItem("Image Link")) {
  landing.style.backgroundImage = `url(${window.localStorage.getItem(
    "Image Link"
  )})`;
}
function RandomImages() {
  if (start) {
    TheImages = setInterval(() => {
      while (i < tries) {
        landing.style.backgroundImage = `url(Images/Gallery/0${i}.jpg)`;
        window.localStorage.setItem("Image Link", `Images/Gallery/0${i}.jpg`);
        i++;
      }
      if (i == 8) {
        i = 1;
        tries = 2;
      } else {
        tries++;
      }
    }, 5000);
  } else {
    clearInterval(TheImages);
  }
}
RandomImages();
btns.forEach((button) => {
  button.onclick = function () {
    RemoveTheClasses(btns);
    this.classList.add("active");
    if (button.dataset.type == "Yes") {
      start = true;
      RandomImages();
    } else {
      start = false;
      RandomImages();
    }
    window.localStorage.setItem("The active button", this.dataset.type);
  };
});
////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// Box Setting ///////////////////////////////////
let SettingIcon = document.querySelector(".setting-box .toggle");
if (window.localStorage.getItem("status") == "Opened") {
  SettingIcon.parentElement.classList.add("open");
  SettingIcon.firstElementChild.classList.add("fa-spin");
} else {
  SettingIcon.parentElement.classList.remove("open");
}
SettingIcon.onclick = function () {
  SettingIcon.parentElement.classList.toggle("open");
  SettingIcon.firstElementChild.classList.toggle("fa-spin");
  if (SettingIcon.parentElement.classList.contains("open")) {
    window.localStorage.setItem("status", "Opened");
  } else {
    window.localStorage.setItem("status", "Not Opened");
  }
};
////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// Color Setting //////////////////////////////////
let colors = document.querySelectorAll(
  ".setting-container .option-box .color-list li"
);
if (window.localStorage.getItem("color")) {
  document.documentElement.style.setProperty(
    `--main-color`,
    `${window.localStorage.getItem("color")}`
  );
  RemoveTheClasses(colors);
  // chooseing the element that has the color and adding the active class
  let theChoosenElement = document.querySelector(
    `.setting-container .option-box .color-list [data-color="${window.localStorage.getItem(
      "color"
    )}"]`
  );
  theChoosenElement.classList.add("active");
}

colors.forEach((el) => {
  el.onclick = function () {
    colors.forEach((el) => {
      el.classList.remove("active");
      this.classList.add("active");
    });
    // Setting local storge titme
    window.localStorage.setItem("color", `${this.dataset.color}`);
    // Selecte the root element
    document.documentElement.style.setProperty(
      `--main-color`,
      // Make the main color choose the localStorage item
      `${window.localStorage.getItem("color")}`
    );
  };
});
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// Skills /////////////////////////////////////
let SkillSection = document.querySelector(".skill");
let SkillsProg = document.querySelectorAll(".skill .skill-progress .the-line");
let SkillsNum = document.querySelectorAll(".skill .skill-progress .number");
let startSkillsShow = false;
window.onscroll = function () {
  if (window.scrollY >= SkillSection.offsetTop) {
    if (!startSkillsShow) {
      SkillsProg.forEach((skill) => {
        let goal = skill.dataset.prog;
        let i = 0;
        let counter = setInterval(() => {
          skill.style.width = `${i++}%`;
          if (skill.style.width == goal) {
            clearInterval(counter);
          }
        }, 60);
      });
      SkillsNum.forEach((num) => {
        let numGoal = num.dataset.prog;
        let i = 0;
        let counter = setInterval(() => {
          num.textContent = `${i++}%`;
          if (num.textContent == numGoal) {
            clearInterval(counter);
          }
        }, 60);
      });
    }
    startSkillsShow = true;
  }
};
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// Gallery /////////////////////////////////////
let GalleryImages = document.querySelectorAll(".gallery .img-box div img");
GalleryImages.forEach((img) => {
  img.addEventListener("click", (el) => {
    // Creat the overlay
    let Overlay = document.createElement("div");
    Overlay.className = "popup-overlay";
    // popup box
    let PopupBox = document.createElement("div");
    PopupBox.className = "popup-box";
    Overlay.appendChild(PopupBox);
    if (img.alt !== null) {
      // the Heading
      let ImageHeading = document.createElement("h3");
      ImageHeading.textContent = img.alt;
      ImageHeading.className = "img-heading";
      PopupBox.appendChild(ImageHeading);
    }
    // the Image
    let PopupPhoto = document.createElement("img");
    PopupPhoto.src = img.src;
    PopupBox.appendChild(PopupPhoto);
    // Closing button
    let ClosingButton = document.createElement("button");
    ClosingButton.textContent = "X";
    ClosingButton.className = "closing-btn";
    Overlay.appendChild(ClosingButton);
    ClosingButton.onclick = function () {
      Overlay.remove();
    };
    document.body.appendChild(Overlay);
  });
});
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// Footer /////////////////////////////////////
let TheCopyrightTime = document.querySelector("footer span");
TheCopyrightTime.append(
  Math.floor(Date.now() / 1000 / 60 / 60 / 24 / 356.4 + 1970 - 1),
  " Made By En:Osama Elzero"
);
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// Bullets ////////////////////////////////////
let BulBtn = document.querySelectorAll(".setting-box .bullets button");
let TheBul = document.querySelector(".nav-bul");
if (window.localStorage.getItem("The Bullet Apperance")) {
  RemoveTheClasses(BulBtn);
  let TheChoosenBullet = document.querySelector(
    `.setting-box .bullets [data-type="${window.localStorage.getItem(
      "The Bullet Apperance"
    )}"]`
  );
  TheChoosenBullet.classList.add("active");
  if (window.localStorage.getItem("The Bullet Apperance") == "Yes") {
    TheBul.classList.remove("disapper");
  } else {
    TheBul.classList.add("disapper");
  }
}
BulBtn.forEach((el) => {
  el.onclick = function () {
    RemoveTheClasses(BulBtn);
    this.classList.add("active");
    if (this.dataset.type == "Yes") {
      TheBul.classList.remove("disapper");
      window.localStorage.setItem("The Bullet Apperance", this.dataset.type);
    } else {
      TheBul.classList.add("disapper");
      window.localStorage.setItem("The Bullet Apperance", this.dataset.type);
    }
  };
});
////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// Rest button //////////////////////////////////
let RestBtn = document.querySelector(".rest");
RestBtn.onclick = function () {
  window.localStorage.clear();
  window.location.reload();
};
////////////////////////////////////////////////////////////////////////////////////
// Funcations to deal with the classes
function RemoveTheClasses(Element) {
  Element.forEach((el) => {
    el.classList.remove("active");
  });
}
function HadleTheClasses(Element) {
  Element.forEach((el) => {
    el.classList.remove("active");
    this.classList.add("active");
  });
}
