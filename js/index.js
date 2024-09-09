const pageTitleContainer = document.getElementById("page-title-container");
const profileIconContainer = document.getElementById("profile-icon-container");
const profilePopupBox = document.getElementById("profile-popup-box");

pageTitleContainer.addEventListener("click", () => {
    window.location.href = "./index.html";
});

profileIconContainer.addEventListener("click", () => {
    if (profilePopupBox.style.visibility === "hidden") {
        profilePopupBox.style.visibility = "visible";
    } else {
        profilePopupBox.style.visibility = "hidden";
    }
});

document.addEventListener("click", (event) => {
    if (
        !profileIconContainer.contains(event.target) &&
        !profilePopupBox.contains(event.target)
    ) {
        profilePopupBox.style.visibility = "hidden";
    }
});

const quizButton = document.getElementById("box-1");
quizButton.addEventListener("click", () => {
    window.location.href = "./pages/quiz-page/quiz.html";
});

// fetch("/home")
//     .then((res) => res.json())
//     .then((data) => {
//         console.log(data);
//     });

fetch("/users")
    .then((res) => res.text())
    .then((data) => {
        console.log(data);
    });
