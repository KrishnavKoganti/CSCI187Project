// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUYQOOL7F-srIpfX6XzTbqJVYj9-3kJlQ",
  authDomain: "csci187-dc2c5.firebaseapp.com",
  databaseURL:"https://csci187-dc2c5-default-rtdb.firebaseio.com/",
  projectId: "csci187-dc2c5",
  storageBucket: "csci187-dc2c5.appspot.com",
  messagingSenderId: "840610892835",
  appId: "1:840610892835:web:83dc443e39f878f35a3596"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

var email = document.getElementById("email");
var password = document.getElementById("password");
window.login= function(e) {
  e.preventDefault();
  var obj = {
    email: email.value,
    password: password.value,
  };

  signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (success) {
      alert("logined Successfully")
     const userId = auth.currentUser.uid;
      localStorage.setItem("userId", userId);
      console.log(userId);
    setTimeout(function() {
      window.location.replace('UserPage.html');
    }, 2000);
    })
    .catch(function (err) {
      alert("login error"+err);
    });

  console.log(obj);
}