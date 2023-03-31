var currentUser;
var userId;

// min and max included 
function randomIntFromInterval(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

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

      // Read the user's Firestore document to get the last creativity task ID and the date it was generated
      currentUser.get().then(doc => {
        if (doc.exists) {
          const userData = doc.data();
          const lastTaskId = userData.lastTaskId;
          const lastTaskDate = userData.lastTaskDate;

          // If the last task date matches today's date, use the same task ID
          if (lastTaskDate === `${year}-${month}-${day}` && lastTaskId) {
            readCreativityTask(lastTaskId);
          } else {
            // If the last task date is not today's date, generate a new task ID and save it to the user's document
            const newTaskId = randomIntFromInterval(1, 5).toString();
            currentUser.update({
              lastTaskId: newTaskId,
              lastTaskDate: `${year}-${month}-${day}`
            }).then(() => {
              readCreativityTask(newTaskId);
            }).catch(error => {
              console.log("Error updating user document:", error);
            });
          }

          // If the last task date matches today's date, use the same task ID
          if (lastTaskDate === `${year}-${month}-${day}` && lastTaskId) {
            readPhysicalTask(lastTaskId);
          } else {
            // If the last task date is not today's date, generate a new task ID and save it to the user's document
            const newTaskId = randomIntFromInterval(1, 5).toString();
            currentUser.update({
              lastTaskId: newTaskId,
              lastTaskDate: `${year}-${month}-${day}`
            }).then(() => {
              readPhysicalTask(newTaskId);
            }).catch(error => {
              console.log("Error updating user document:", error);
            });
          }

          if (weather === "rain" || weather === "drizzle" || weather == "thunderstorm") {
            readMessageRainy(rndInt1.toString());
          } else if (weather === "clear" || weather === "clouds") {
            readMessageSunny(rndInt1.toString());
          } else if (weather === "snow") {
            readMessageSnowy(rndInt1.toString());
          } else {
            readMessageExtreme(rndInt1.toString());
          }
        } else {
          console.log("User document not found");
        }
      }).catch(error => {
        console.log("Error getting user document from Firestore:", error);
      });
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

function readMessageRainy(msgId) {
  db.collection("raining").doc(msgId)                                                      
    .onSnapshot(rainingDoc => {                                                           
         console.log("current document data: " + rainingDoc.data());                         
         document.getElementById("message-goes-here").innerHTML = rainingDoc.data().msg;      
    })
} 

function readMessageSunny(msgId) {
  db.collection("sunny").doc(msgId)                                                      
    .onSnapshot(sunnyDoc => {                                                           
         console.log("current document data: " + sunnyDoc.data());                         
         document.getElementById("message-goes-here").innerHTML = sunnyDoc.data().msg;      
    })
}

function readMessageSnowy(msgId) {
  db.collection("snowy").doc(msgId)                                                      
    .onSnapshot(snowyDoc => {                                                           
        console.log("current document data: " + snowyDoc.data());                         
        document.getElementById("message-goes-here").innerHTML = snowyDoc.data().msg;      
    })
}

function readMessageExtreme(msgId) {
  db.collection("extreme").doc(msgId)                                                      
    .onSnapshot(extremeDoc => {                                                           
        console.log("current document data: " + extremeDoc.data());                         
        document.getElementById("message-goes-here").innerHTML = extremeDoc.data().msg;      
    })
}

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

