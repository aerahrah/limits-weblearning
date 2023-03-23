  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
  import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyD8C_pRjLoIOANX2THHCSsHiaZ_t6BYCTo",
    authDomain: "limitslearningwebsite.firebaseapp.com",
    databaseURL: "https://limitslearningwebsite-default-rtdb.firebaseio.com",
    projectId: "limitslearningwebsite",
    storageBucket: "limitslearningwebsite.appspot.com",
    messagingSenderId: "142209218109",
    appId: "1:142209218109:web:c2e97662d98d9eb7999c54"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth();

  saveData.addEventListener('click',(e) => {

      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      var username = document.getElementById('username').value;

      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      // Signed in 
          const user = userCredential.user;

          set(ref(database, 'users/' + user.uid),{
              username: username,
              email: email
          })

          alert('user created!');
          // ...
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          alert(errorMessage);
      // ..
      });

  });