  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import {
    getAuth,
    createUserWithEmailAndPassword,
  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
  import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
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
  const auth = getAuth()
  const db = getDatabase();

var email = document.getElementById("email");
var phonenumber = document.getElementById("phone-number");
var password = document.getElementById("password");
var copassword = document.getElementById("copassword")


function writeUserData(userId, email, phonenumber,password,copassword) {
  const refrences = ref(db, 'users/' + userId);

  set(refrences, {
    email: email,
    phonenumber: phonenumber,
    password: password,
    copassword:copassword
  });
}
window.signup = function (e) {
if(password)

    if( email.value =="" ||phonenumber.value=="" || password.value =="" || copassword.value ==""){
        alert("All Field Are Required")
    }
    if(password.value == copassword.value){
     
    }
    else{
        alert("Password Confirmation is Wrong")
        return false
    }

    e.preventDefault();
    var obj = {
      email: email.value,
      phonenumber: phonenumber.value,
      password: password.value,
      copassword: copassword.value,
    };
  
    createUserWithEmailAndPassword(auth, obj.email, obj.password)
.then(function(success){
  return writeUserData(success.user.uid, obj.email, obj.phonenumber, obj.password,obj.copassword);
})
.then(function() {
  console.log("Data written successfully");
  alert("signup successfully");
  setTimeout(function() {
    window.location.replace('../index.html');
  }, 2000);
 
})
.catch(function(err){
  alert("Error in " + err)
});
    
   console.log()
    console.log(obj);
  };