import refs from "./refs";

export function quiz(currentStep = 1) {
  const step = localStorage.length
    ? JSON.parse(localStorage[`step ${currentStep}`])
    : null;
  if (step) {
    refs.content.innerHTML = "";
    refs.quizTitle.innerHTML = `${step.title}`;
    step.type === "checkbox" ? renderChekbox(step) : renderList(step);
  }
}

function renderChekbox(data) {
  for (let key in data.options) {
    refs.content.insertAdjacentHTML(
      "afterbegin",
      `<div data-value="item" class="content__main-item animate">
        ${key}<label class="${
        data.options[key] ? "label--cheked" : "content__main-item-label"
      }"></label>
      </div>`
    );
  }
}

function renderList(data) {
  refs.content.innerHTML = `<select class="content__main-list animate" data-value="list-item">
  <option class="content__main-list-item" value="" disabled selected>${data.optionsTitle}</option>
  </select>`;
  const listItem = document.querySelector(".content__main-list-item");

  for (let key in data.options) {
    listItem.insertAdjacentHTML(
      "afterend",
      `<option value="${key}">${key}</option> `
    );
  }
}

export function form() {
  refs.quizTitle.innerHTML = "Ваша подборка готова! 🥳 Куда нам отправить её?";
  refs.content.innerHTML = `<input class="content__main-item-input animate" placeholder="Как вас зовут?" />
  <input class="content__main-item-input animate" placeholder="Номер телефона" />
  <input class="content__main-item-input animate" placeholder="E-mail" />
  `;
  refs.button.className = "content__form--btnNext";
  refs.politics.classList.remove("hide");
  refs.buttonPrev.classList.add("hide");
}
