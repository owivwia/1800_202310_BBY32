var currentUser;

function doAll() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid);
      console.log(currentUser);

      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      document.getElementById("current_date").innerHTML = month + "/" + day + "/" + year;

      getNameFromAuth();
      readCreativityTask(rndInt1.toString());
      readPhysicalTask(rndInt2.toString());
      if (weather == "rain") {
        readMessageRain(rndInt1.toString());
      } else if (weather == "clear") {
        readMessageClear(rndInt1.toString());
      } else {
        console.log("any other weather");
      }
    } else {
      console.log("No user is signed in");
      window.location.href = "login.html";
    }
  })
}

doAll();


function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            user_Name = user.displayName;

            //method #1:  insert with JS
            //document.getElementById("name-goes-here").innerText = userName;    
            //method #2:  insert using jquery
            //$("#name-goes-here").text(userName); //using jquery
            //method #3:  insert using querySelector
            document.querySelector("#name-goes-here").innerText = user_Name

        } else {
            // No user is signed in.
        }
    });
}

var weather;

const getData = async () => {
  const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Burnaby&appid=7d6d38173ae18bf5a612fcdf14342cd4");
  const data = await response.json();
  weather = data.weather[0].main.toLowerCase();
  return data;
};

(async () => {
  await getData();
  console.log(weather);
})();

function readMessageRain(msgId) {
  db.collection("raining").doc(msgId)                                                      
    .onSnapshot(rainingDoc => {                                                           
         console.log("current document data: " + msgId.data());                         
         document.getElementById("message-goes-here").innerHTML = rainingDoc.data().msg;      
    })
} 

function readMessageClear(msgId) {
  db.collection("clear").doc(msgId)                                                      
    .onSnapshot(clearDoc => {                                                           
         console.log("current document data: " + msgId.data());                         
         document.getElementById("message-goes-here").innerHTML = clearDoc.data().msg;      
    })
}

// min and max included 
function randomIntFromInterval(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const rndInt1 = randomIntFromInterval(1, 5)
const rndInt2 = randomIntFromInterval(1, 5)

function readCreativityTask(creativityId) {
  db.collection("creativity tasks").doc(creativityId)                                                     
    .onSnapshot(taskDoc => {                                                           
         console.log("current document data: " + taskDoc.data());                         
         document.getElementById("creativity-task-goes-here").innerHTML = taskDoc.data().Task;      
    })
}


function readPhysicalTask(physicalId) {
  db.collection("physical tasks").doc(physicalId)                                           
    .onSnapshot(taskDoc => {                                                          
         console.log("current document data: " + taskDoc.data());                       
         document.getElementById("physical-task-goes-here").innerHTML = taskDoc.data().task;      
    })
}

