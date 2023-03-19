//getting data from server/courses.json
async function getData() {
  const response = await fetch("server/courses.json");
  const data = await response.json();
  return data;
}

async function main() {
  const postsData = await getData();
  let currentPage = 1;
  let rows = 10;
  let btns;

  function displayList(arrData, rowPerPage, page) {
    const postsEl = document.querySelector(".posts");
    postsEl.innerHTML = "";
    page--;

    const start = rowPerPage * page;
    const end = start + rowPerPage;
    const paginatedData = arrData.slice(start, end);

    paginatedData.forEach((el) => {
      const postEl = document.createElement("div");
      postEl.classList.add("post");
      postEl.innerText = `${el.title}`;
      postsEl.appendChild(postEl);

      postEl.innerHTML = `<div class="container-item">
      <video class="myVideo" muted poster='https://s1.1zoom.ru/b5050/596/Evening_Forests_Mountains_Firewatch_Campo_Santo_549147_1920x1080.jpg'>
      <source src="${el.previewVideo}" type="video/mp4" />
        </video>
      <h1 class="container-item__header">Назва: ${el.title}</h1>
      <h2>Кількість уроків: ${el.lessonAmount}</h2>
      <h2>Навички: ${el.skills}</h2>
      <h2>Рейтинг: ${el.rating}</h2>
      
      <span><progress class="bar" max="5" value="${el.rating}"></span>
      <p>
      <a href="/" class="container-item__click" id="${el.id}" onclick="historyResolver('${el.title}', '/users/${el.id}')"
        >Детальніше</a
      >
    </p>

    
  </div>`;

      let videos = document.querySelectorAll(".myVideo");

      videos.forEach((video) => {
        video.onmouseover = function () {
          video.play();
          setInterval(() => {
            video.setAttribute("controls", "");
          }, 500);
        };
        video.onmouseup = function () {
          video.stop();
        };
      });
    });
  }

  function displayPagination(arrData, rowPerPage) {
    const paginationEl = document.querySelector(".pagination");
    const pagesCount = Math.ceil(arrData.length / rowPerPage);
    const ulEl = document.createElement("ul");
    ulEl.classList.add("pagination__list");

    for (let i = 0; i < pagesCount; i++) {
      const liEl = displayPaginationBtn(i + 1);
      ulEl.appendChild(liEl);
    }
    paginationEl.appendChild(ulEl);
  }

  function displayPaginationBtn(page) {
    const liEl = document.createElement("li");
    liEl.classList.add("pagination__item");
    liEl.innerText = page;

    if (currentPage == page) liEl.classList.add("pagination__item--active");

    liEl.addEventListener("click", () => {
      btns = document.querySelectorAll(".container-item__click");
      currentPage = page;
      displayList(postsData, rows, currentPage);

      let currentItemLi = document.querySelector("li.pagination__item--active");
      currentItemLi.classList.remove("pagination__item--active");

      liEl.classList.add("pagination__item--active");
    });

    return liEl;
  }

  displayList(postsData, rows, currentPage);
  displayPagination(postsData, rows);
}

main();
