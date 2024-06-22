const customCheckbox = document.querySelectorAll(".custom-checkbox");
const inputGoals = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressLabel = document.querySelector(".progress-label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const addGoal = document.querySelector(".add");
const goal = document.querySelector(".goal");
const goalContainer = document.querySelector(".goal-container");

const allQuotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done!",
  "Just a step away, keep going!",
  "Whoa! You just completed all the goals, time for chill :🤩",
];
// const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
//   first: {
//     name: "",
//     completed: false,
//   },
//   second: {
//     name: "",
//     completed: false,
//   },
//   third: {
//     name: "",
//     completed: false,
//   },
// };
const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};
let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;

progressValue.style.width = `${
  (completedGoalsCount / inputGoals.length) * 100
}%`;
progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputGoals.length} completed`;
progressLabel.innerText = allQuotes[completedGoalsCount];

customCheckbox.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    const allInputGoals = [...inputGoals].every((input) => {
      return input.value;
    });
    if (allInputGoals) {
      checkbox.parentElement.classList.toggle("completed");
      progressValue.style.width = "33.33%";

      const inputId = checkbox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;
      progressValue.style.width = `${
        (completedGoalsCount / inputGoals.length) * 100
      }%`;
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputGoals.length} completed`;
      progressLabel.innerText = allQuotes[completedGoalsCount];
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      // errorLabel.style.display = "block";
      progressBar.classList.add("show-error");
    }
  });
});

inputGoals.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name;

    if (allGoals[input.id].completed) {
      input.parentElement.classList.add("completed");
    }
  }

  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
  });

  input.addEventListener("input", (e) => {
    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }
    if (allGoals[input.id]) {
      allGoals[input.id].name = input.value;
    } else {
      allGoals[input.id] = {
        name: input.value,
        completed: false,
      };
    }

    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});

// let count = 3;
// addGoal.addEventListener("click", () => {
//   let inputID = `input${count++}`;
//   const goalCloned = goal.cloneNode(true);
//   goalCloned.classList.remove("completed");
//   goalCloned.querySelector(".goal-input").id = inputID;

//   goalContainer.appendChild(goalCloned);

//   console.log(goalCloned);
// });
