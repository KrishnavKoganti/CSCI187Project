// code of main too 
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getDatabase ,ref , push ,set, onValue,onChildAdded,get,remove,update, onChildChanged, onChildRemoved } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {
    getAuth,
    signOut,
    onAuthStateChanged,
  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUYQOOL7F-srIpfX6XzTbqJVYj9-3kJlQ",
  authDomain: "csci187-dc2c5.firebaseapp.com",
  projectId: "csci187-dc2c5",
  storageBucket: "csci187-dc2c5.appspot.com",
  messagingSenderId: "840610892835",
  appId: "1:840610892835:web:83dc443e39f878f35a3596"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase();

export function createEvent() {
  var eventTitle = document.getElementById("eventTitle");
  var startTime = document.getElementById("startTime");
  var endTime = document.getElementById("endTime");
  var location = document.getElementById("location");
  var description = document.getElementById("description");

  if(eventTitle.value == "" || startTime.value == "" || endTime.value == ""|| location.value == ""|| description.value == ""){
    alert("All Fields Are Required");
    return false;
  }

  var userId = localStorage.getItem("userId");
  console.log("User ID: ", userId); // Debugging line

  var event = {
    title: eventTitle.value,
    start: startTime.value,
    end: endTime.value,
    location: location.value,
    description: description.value,
    userId: localStorage.getItem("userId")
  };
  console.log("Event details: ", event);
  writeEventData(event.userId, event.title, event.start, event.end, event.location, event.description)
}

function writeEventData(userId, eventTitle, startTime, endTime, location, description) {
  const eventRef = ref(database, 'users/' + userId + '/events');
  const newEventRef = push(eventRef);

  set(newEventRef, {
    title: eventTitle,
    start: startTime,
    end: endTime,
    location: location,
    description: description
  })
  .then(() => {
    console.log("Data written successfully");
    alert("Data added");
  })
  .catch((error) => {
    console.error("Error writing data: ", error);
  });
}

// window.onload = function() {
//   document.getElementById('submitBtn').addEventListener('click', function(e){
//     e.preventDefault();
//     sendtodo();
//   });
//   document.getElementById('submitBtn').addEventListener('click', function(e){
//     e.preventDefault();
//     renderData();
//   });


// }


export function renderData(){
  var userId = localStorage.getItem("userId");
  console.log("User ID: ", userId); // Debugging line
  
  getEvents(userId);
}


function getEvents(userId) {
  const eventRef = ref(database, 'users/' + userId + '/events');

  get(eventRef).then((snapshot) => {
    if (snapshot.exists()) {
      const events = snapshot.val();
      for (let eventId in events) {
        console.log("Event ID: ", eventId);
        console.log("Title: ", events[eventId].title);
        console.log("Start Time: ", events[eventId].start);
        console.log("End Time: ", events[eventId].end);
        console.log("Location: ", events[eventId].location);
        console.log("Description: ", events[eventId].description);
      }
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}
















"user"
var un = [];
function username(){

  var usn =  document.getElementById('user');
  usn.innerHTML = "";
  for (var i=0; i<un.length; i++){
    usn.innerHTML += `<h2>${un[i].user}</h2>`
  }

}
username();

window.getdata = function () {

  onValue(ref(database, '/todotask/'), (snapshot) => {
    // console.log(snapshot.val())
  });


  const taskRef =ref(database,'todotask/');
  onChildAdded(taskRef, function(data){
   list.push(data.val());
      // console.log(data.val());
      renderData();
  });
  // console.log(list.uid)

}
window.delTask = function(y){
    let UID = y.parentElement.getAttribute("id")
  remove(ref(database,`todotask/${UID}`))
  .then(()=>{
    alert("data removed successfully ")
  })
  .catch((error)=>{
     alert("error"+error)
  })
  y.parentElement.parentElement.remove()
}
window.editask = function(y){
    let Value = prompt("Please Enter new name ",y.parentElement.value)
    let Value2 = prompt("Please Enter new description ",y.parentElement.value)
    let Value3 = prompt("Please Enter new Status ",y.parentElement.value)
    let UID = y.parentElement.getAttribute("id")
  const REF = ref(database, `todotask/${UID}`);
  update(REF,{
    task: Value,
    description:Value2,
    status:Value3
  })
  .then(()=>{
    alert("data Update successfully ")
    var parent = document.getElementById('parent')
    parent.innerHTML="";
    getdata()
  })
  .catch((error)=>{
     alert("error"+error)
  })
// console.log()
  
}



window.logout = function () {
  signOut(auth)
    .then(function () {
      alert("Logout Successfully");
      window.location.href = "login.html";
    })
    .catch(function (err) {
      console.log(err);
    });
};

function checkAuthentication() {
  onAuthStateChanged(auth, function (user) {
    if (user) {
      
      
      const uid = user.uid;
      console.log(uid);
      // ...
    } else {
      // User is signed out
      // ...
      window.location.href = "login.html";
    }
  });
}
checkAuthentication();