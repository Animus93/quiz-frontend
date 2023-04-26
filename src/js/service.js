import data from "./data.json";
import setStep from "./stepsCounter";
import { form, quiz } from "./render";
import refs from "./refs";

refs.button.addEventListener("click", nextStep);
refs.buttonPrev.addEventListener("click", prevStep);
refs.content.addEventListener("click", makeMark);

//счетчик шага
let currentStep = 1;
//Сохранить в localeStorage все данные для дальнейших манипуляций
data.forEach((step) => {
  localStorage.setItem(`step ${step.id}`, JSON.stringify(step));
});

//Установить колличество шагов и текущий шаг
setStep(currentStep);

// отрендерить первый шаг опроса
quiz(currentStep);
//слушатель события клика на итем

// скрыть кнопку назад
refs.buttonPrev.classList.add("hide");
// content__form--btnNext
function nextStep(e) {
  // refs.content.classList.add("animate");
  if (e.target.classList.value === "content__form--btnNext") {
    refs.modal.classList.remove("hide");
  }
  const currentData = JSON.parse(localStorage[`step ${currentStep}`]);
  for (let key in currentData.options) {
    // console.log(currentData.options[key] = 's')
    if (currentData.options[key] === true) {
      if (localStorage.length > currentStep) {
        currentStep += 1;
        refs.buttonPrev.classList.remove("hide");
        setStep(currentStep);
        quiz(currentStep);
        return;
      }
      if (localStorage.length === currentStep) {
        form();
        return setStep(localStorage.length + 1);
      }
      if (localStorage.length === currentStep + 1) {
        console.log("qwewe");
      }
      return;
    }
  }
}

function prevStep() {
  if (1 < currentStep) {
    currentStep += -1;
    setStep(currentStep);
    quiz(currentStep);
    if (currentStep === 1) {
      refs.buttonPrev.classList.add("hide");
    }
  }
}
function makeMark(e) {
  const currentData = JSON.parse(localStorage[`step ${currentStep}`]);
  if (e.target.dataset.value === "list-item") {
    for (let key in currentData.options) {
      currentData.options[key] = key === e.target.value ? true : false;
    }
    return localStorage.setItem(
      `step ${currentStep}`,
      JSON.stringify(currentData)
    );
  }
  if (e.target.dataset.value === "item") {
    Array.from(refs.content.children).forEach((item) => {
      item.children[0].className = "content__main-item-label";
    });
    e.target.children[0].className = "label--cheked";
    for (let key in currentData.options) {
      currentData.options[key] = key === e.target.innerText ? true : false;
    }
    localStorage.setItem(`step ${currentStep}`, JSON.stringify(currentData));
  }
}
