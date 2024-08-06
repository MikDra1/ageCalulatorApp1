const inputYears = document.querySelector(".input__years");
const inputMonths = document.querySelector(".input__months");
const inputDays = document.querySelector(".input__days");
const form = document.querySelector(".form");

const contentSpanYears = document.querySelector(".content__span--years");
const contentSpanMonths = document.querySelector(".content__span--months");
const contentSpanDays = document.querySelector(".content__span--days");

const formInputs = document.querySelectorAll(".form__input");
const formLabels = document.querySelectorAll(".form__label");

const errorMsg = document.querySelectorAll(".error__message");
const errorMsg2 = document.querySelectorAll(".error__message2");

const textYears = document.querySelector(".text__years");
const textDays = document.querySelector(".text__days");
const textMonths = document.querySelector(".text__months");

const ageApi = async function () {
  const res = await fetch(
    `https://digidates.de/api/v1/age/${inputYears.value.padStart(
      2,
      "0"
    )}-${inputMonths.value.padStart(2, "0")}-${inputDays.value.padStart(
      2,
      "0"
    )}`
  );
  const data = await res.json();
  contentSpanYears.textContent = data.ageextended.years;
  contentSpanMonths.textContent = data.ageextended.months;
  contentSpanDays.textContent = data.ageextended.days;
  textYears.textContent =
    +contentSpanYears.textContent === 1 ? "year" : "years";
  textMonths.textContent =
    +contentSpanMonths.textContent === 1 ? "month" : "months";
  textDays.textContent = +contentSpanDays.textContent === 1 ? "day" : "days";
  return data;
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (
    +inputYears.value > new Date().getFullYear() ||
    +inputDays.value > 31 ||
    +inputMonths.value > 12 ||
    !Number.isFinite(+inputYears.value) ||
    !Number.isFinite(+inputDays.value) ||
    !Number.isFinite(+inputMonths.value)
  ) {
    formInputs.forEach((input) => input.classList.add("form__input--special"));
    formLabels.forEach((label) => label.classList.add("form__label--special"));
    errorMsg.forEach((err) => err.classList.remove("hidden"));
    errorMsg2.forEach((err) => err.classList.add("hidden"));
    return;
  } else if (
    inputYears.value === "" ||
    inputDays.value === "" ||
    inputMonths.value === ""
  ) {
    formInputs.forEach((input) => input.classList.add("form__input--special"));
    formLabels.forEach((label) => label.classList.add("form__label--special"));
    errorMsg2.forEach((err) => err.classList.remove("hidden"));
    errorMsg.forEach((err) => err.classList.add("hidden"));
  }
  // const birth = (
  //   +(
  //     new Date().getTime() -
  //     new Date(
  //       `${inputMonths.value}/${inputDays.value}/${inputYears.value}`
  //     ).getTime()
  //   ) /
  //   (1000 * 60 * 60 * 24)
  // ).toFixed(0);

  // const years = Math.round(+birth / 365);
  // const months = Math.round((+birth - +years * 365) / 30);
  // const days = Math.round(+birth - +years * 365 - +months * 30);
  // console.log(days + months * 30 + years * 365);

  // console.log(+birth);

  formInputs.forEach((input) => input.classList.remove("form__input--special"));
  formLabels.forEach((label) => label.classList.remove("form__label--special"));
  errorMsg.forEach((err) => err.classList.add("hidden"));
  errorMsg2.forEach((err) => err.classList.add("hidden"));

  ageApi();

  inputYears.value = inputDays.value = inputMonths.value = "";
});
