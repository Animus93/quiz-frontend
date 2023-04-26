import refs from "./refs";

function setStep(step) {
  refs.stepCount.innerHTML = `Шаг ${step}/${localStorage.length + 1}`;
}

export default setStep;
