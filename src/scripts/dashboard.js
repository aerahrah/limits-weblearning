import { auth, db, realtimeDb } from "./firebaseDB";
import { getDatabase, ref, child, get, update } from "firebase/database";

// Initialize Firebase
const usernameID = document.getElementById("username");
const postScoreID = document.getElementById("post-score");
const preScoreID = document.getElementById("pre-score");
const practicQuizID = document.getElementById("numOfQuizTaken");
const sumScoreID = document.getElementById("sum-score");
const preTestTakerID = document.getElementById("preTestTaker");
const avatarImgID = document.getElementById("avatar-img");
const avatarImgDefaultID = document.getElementById("avatar-img-default");
const avatarImgContainerID = document.getElementById("avatar-img-container");
const overlayProfileID = document.getElementById("overlay-profile");
const avatarImg1ID = document.getElementById("avatar-img-1");
const avatarImg2ID = document.getElementById("avatar-img-2");
const avatarImg3ID = document.getElementById("avatar-img-3");
const avatarImg4ID = document.getElementById("avatar-img-4");
const avatarImg5ID = document.getElementById("avatar-img-5");
const avatarImg6ID = document.getElementById("avatar-img-6");
const avatarImg7ID = document.getElementById("avatar-img-7");
const avatarChangeBtn = document.getElementById("avatar-change");
const closeBtn = document.getElementById("close-btn");
// Do something with the UID, such as storing it in a database
const uid = localStorage.getItem("uid");
console.log(uid);
// Do something with the UID, such as fetch data from Firebase Firestore
const userRef = ref(realtimeDb, `users/${uid}`);
const promises = [];
document.getElementById("loading-screen").style.display = "block";
// Fetch data from Firebase and push the promises to the array
function updateAvatar(imgSrc) {
  const imgUpdate = { avatarImg: imgSrc };
  avatarImgID.src = imgSrc;
  avatarDisplay("remove", "active", "none");
  update(userRef, imgUpdate);
}

// Use a loop to add click event listeners to all avatar images
const avatarImgIDs = [
  avatarImg1ID,
  avatarImg2ID,
  avatarImg3ID,
  avatarImg4ID,
  avatarImg5ID,
  avatarImg6ID,
  avatarImg7ID,
];
for (const avatarImgID of avatarImgIDs) {
  avatarImgID.addEventListener("click", () => {
    updateAvatar(avatarImgID.src);
  });
}

// Add click event listeners to change and close buttons
avatarChangeBtn.addEventListener("click", () => {
  avatarDisplay("add", "active", "block");
});
closeBtn.addEventListener("click", () => {
  avatarDisplay("remove", "active", "none");
});
function avatarDisplay(button, container, overlay) {
  if (button == "remove") {
    avatarImgContainerID.classList.remove(container);
  } else {
    avatarImgContainerID.classList.add(container);
  }
  overlayProfileID.style.display = overlay;
}
promises.push(
  get(child(userRef, "sumScore"))
    .then((snapshot) => {
      const sumScore = snapshot.val();
      sumScoreID.innerHTML = sumScore;
    })
    .catch((error) => {
      console.error(error);
    })
);
promises.push(
  get(child(userRef, "avatarImg"))
    .then((snapshot) => {
      const img = snapshot.val();
      avatarImgID.src = img;
    })
    .catch((error) => {
      console.error(error);
    })
);

promises.push(
  get(child(userRef, "username"))
    .then((snapshot) => {
      const username = snapshot.val();
      usernameID.innerHTML = username;
    })
    .catch((error) => {
      console.error(error);
    })
);

promises.push(
  get(child(userRef, "postScore"))
    .then((snapshot) => {
      const score = snapshot.val();
      postScoreID.innerHTML = score;
    })
    .catch((error) => {
      console.error(error);
    })
);

promises.push(
  get(child(userRef, "preScore"))
    .then((snapshot) => {
      const score = snapshot.val();
      preScoreID.innerHTML = score;
    })
    .catch((error) => {
      console.error(error);
    })
);
promises.push(
  get(child(userRef, "preTestTaker"))
    .then((snapshot) => {
      const preTestTakerVal = snapshot.val();
      preTestTakerID.innerHTML = preTestTakerVal;
    })
    .catch((error) => {
      console.error(error);
    })
);

promises.push(
  get(child(userRef, "moduleCompleted"))
    .then((snapshot) => {
      const moduleNum = snapshot.val();
      console.log("Module num:", moduleNum);

      if (moduleNum <= 13) {
        var progressBar = document.getElementById("progress-bar");
        var width = (moduleNum / 13) * 100;
        progressBar.style.width = width + "%";
        document.getElementById("progress-text").textContent =
          "Completed Modules: " + moduleNum + "/13";
      }
    })
    .catch((error) => {
      console.error(error);
    })
);

// Use Promise.all() to wait for all the promises to resolve
Promise.all(promises)
  .then(() => {
    document.getElementById("loading-screen").style.display = "none";
    console.log("Data from Firebase fetched completely.");
  })
  .catch((error) => {
    console.error(error);
  });
