async function getData() {
  const response = await fetch("server/courses.json");
  const data = await response.json();
  return data;
}

const app = document.querySelector("#app");
let container = document.querySelector(".container");
let cuurentCourse = document.querySelector(".course");

let acordion;
let fullAcordion = "";
const historyResolver = (title, location) => {
  this.event.preventDefault();

  render(this.event.srcElement.attributes.id.value);
  // history.pushState({}, title, location);
};

async function render(id) {
  let postsData = await getData();
  let courseFullInfo;
  postsData.forEach((el) => {
    if (el.id == id) {
      for (let index = 0; index < el.lessonDetails.length; index++) {
        if (el.lessonDetails[index].isOpen) {
          acordion = `<button class="accordion open" >${el.lessonDetails[index].title}</button>
        <div class="panel">
            <p>${el.lessonDetails[index].description}</p>
            <video class="course-item__lesson-video vid" id="vid${index}" title="Щоб змінити швидкість відео натисніть Z або X" controls poster='https://img5.goodfon.ru/wallpaper/nbig/3/9c/space-planet-landscape-wallpapers-1920-x-1080.jpg'>
            <source src="${el.lessonDetails[index].video}" type="video/mp4" />
            </video>
        </div>`;
          fullAcordion += acordion;
        } else {
          acordion = `<button class="accordion closed" disabled>${el.lessonDetails[index].title}</button>
        <div class="panel">
            <p>${el.lessonDetails[index].description}</p>
            <video class="course-item__lesson-video vid" controls title="Щоб змінити швидкість відео натисніть Z або X" poster='https://img5.goodfon.ru/wallpaper/nbig/3/9c/space-planet-landscape-wallpapers-1920-x-1080.jpg'>
            <source src="${el.lessonDetails[index].video}" type="video/mp4" />
            </video>
        </div>`;
          fullAcordion += acordion;
        }
      }

      courseFullInfo = el;
      console.log(courseFullInfo);
      container.style.display = "none";
      cuurentCourse.style.display = "block";
      cuurentCourse.innerHTML = `<div class="course-item">
        <div class="course-item__course-info">
        <h1 class="course-item__header">Назва: ${el.title}</h1>
        <h2 class="course-item__amount-of-lesson">Кількість уроків: ${el.lessonAmount}</h2>
        <h2 class="course-item__skills">Навички: ${el.skills}</h2>
        <h2 class="course-item__rate>Рейтинг: ${el.rating}</h2>
      </div>
      </div>`;
      cuurentCourse.innerHTML += fullAcordion;
    }
  });

  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
  let formatData;
  let video = document.querySelectorAll(".vid");
  const LS = localStorage;
  if (LS.length == 0) {
    formData = {};
  } else {
    formData = LS;
  }

  let flag = true;
  video.forEach((vid) => {
    let cuurentSecond = vid.attributes.id.nodeValue;
    console.log(vid.attributes);
    document.addEventListener("keydown", function (event) {
      if (event.code == "KeyX") {
        vid.playbackRate = 5.0;
      }

      if (event.code == "KeyZ") {
        vid.playbackRate = 1.0;
      }
    });
    let currentValue = "lastSecond" + cuurentSecond;
    vid.addEventListener("pause", function () {
      formData[`lastSecond${cuurentSecond}`] = parseFloat(vid.currentTime);
      LS.setItem(currentValue, formData[currentValue]);
    });

    // formDataJson = JSON.parse("", LS.getItem("formatData"));

    let formDataJson = LS;

    if (LS.currentValue !== 0) {
      vid.currentTime = LS[currentValue];
    }

    vid.addEventListener(
      "play",
      () => {
        paintVideo(vid, ctx, cw, ch);
      },
      false
    );
    function paintVideo() {
      requestAnimationFrame(paintVideo);
      if (vid.paused || vid.ended) {
        return;
      }
    }
  });
}
