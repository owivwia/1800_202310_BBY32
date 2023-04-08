var currentUser;
var userId;

// min and max included 
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

var weather;

// Get the user's time zone offset in minutes
const timezoneOffset = new Date().getTimezoneOffset();

// Create a new date object and adjust it to the user's time zone
const now = new Date();
const userDate = new Date(now.getTime() - (timezoneOffset * 60 * 1000));

// Format the date as desired (for example, as "MM/DD/YYYY")
const year = userDate.getFullYear();
const month = String(userDate.getMonth() + 1).padStart(2, '0');
const day = String(userDate.getDate()).padStart(2, '0');
const formattedDate = `${month}/${day}/${year}`;

// Display the date on the website
document.getElementById("current_date").innerHTML = formattedDate;


const getData = async () => {
  const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Burnaby&appid=7d6d38173ae18bf5a612fcdf14342cd4");
  const data = await response.json();
  weather = data.weather[0].main.toLowerCase();
  doAll();
  return data;
};

(async () => {
  await getData();
  console.log(weather);
})();

var newCreativityTaskId;
var newPhysicalTaskId;


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
          const lastCreativityTaskId = userData.lastCreativityTaskId;
          const lastPhysicalTaskId = userData.lastPhysicalTaskId;
          const lastCreativityTaskDate = userData.lastCreativityTaskDate;
          const lastPhysicalTaskDate = userData.lastPhysicalTaskDate;

          // If the last task date matches today's date, use the same task ID
          if (lastCreativityTaskDate === `${year}-${month}-${day}` && lastCreativityTaskId) {
            readCreativityTask(lastCreativityTaskId);
          } else {
            // If the last task date is not today's date, generate a new task ID and save it to the user's document
            newCreativityTaskId = randomIntFromInterval(1, 6).toString();
            currentUser.update({
              lastCreativityTaskId: newCreativityTaskId,
              lastCreativityTaskDate: `${year}-${month}-${day}`
            }).then(() => {
              readCreativityTask(newCreativityTaskId);
            }).catch(error => {
              console.log("Error updating user document:", error);
            });
          }

          // If the last task date matches today's date, use the same task ID
          if (lastPhysicalTaskDate === `${year}-${month}-${day}` && lastPhysicalTaskId) {
            readPhysicalTask(lastPhysicalTaskId);
          } else {
            // If the last task date is not today's date, generate a new task ID and save it to the user's document
            newPhysicalTaskId = randomIntFromInterval(1, 6).toString();
            currentUser.update({
              lastPhysicalTaskId: newPhysicalTaskId,
              lastPhysicalTaskDate: `${year}-${month}-${day}`
            }).then(() => {
              readPhysicalTask(newPhysicalTaskId);
            }).catch(error => {
              console.log("Error updating user document:", error);
            });
          }

          var rndMsg = randomIntFromInterval(1, 5).toString();
          if (weather === "rain" || weather === "drizzle" || weather == "thunderstorm") {
            readMessageRainy(rndMsg.toString());
          } else if (weather === "clear" || weather === "clouds") {
            readMessageSunny(rndMsg.toString());
          } else if (weather === "snow") {
            readMessageSnowy(rndMsg.toString());
          } else {
            readMessageExtreme(rndMsg.toString());
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
      console.log(user.displayName); //print the user name in the browser console
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

// Select the refresh button element
const refreshButton = document.getElementById("refresh-tasks");

// Add an event listener to the button
refreshButton.addEventListener("click", () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const currentUser = db.collection("users").doc(user.uid);

      // Get the last refresh date from the user document
      currentUser.get().then(doc => {
        if (doc.exists) {
          const data = doc.data();
          const lastRefreshDate = data.lastRefreshDate;
          const currentDate = new Date().toISOString().substr(0, 10);

          // Check if the last refresh date is the same as the current date
          if (lastRefreshDate === currentDate) {
            console.log("Button can only be clicked once per day");
            alert("Tasks can only be refreshed once per day! You've already refreshed tasks for today!");
          } else {
            // Update the last refresh date in the user document
            currentUser.update({
              lastRefreshDate: currentDate
            }).then(() => {
              // Generate new task IDs and save them to Firestore
              const newCreativityTaskId = randomIntFromInterval(1, 6).toString();
              const newPhysicalTaskId = randomIntFromInterval(1, 6).toString();
              const year = new Date().getFullYear();
              const month = new Date().getMonth() + 1;
              const day = new Date().getDate();

              currentUser.update({
                lastCreativityTaskId: newCreativityTaskId,
                lastCreativityTaskDate: `${year}-${month}-${day}`,
              }).catch(error => {
                console.log("Error updating user document:", error);
              });

              currentUser.update({
                lastPhysicalTaskId: newPhysicalTaskId,
                lastPhysicalTaskDate: `${year}-${month}-${day}`
              }).catch(error => {
                console.log("Error updating user document:", error);
              });

              doAll();
            }).catch(error => {
              console.log("Error updating user document:", error);
            });
          }
        } else {
          console.log("User document not found");
        }
      }).catch(error => {
        console.log("Error getting user document:", error);
      });
    }
  })
});

var creativityTaskCompleted;

const creativityCheckbox = document.getElementById("creativity-checkbox");

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const currentUser = db.collection("users").doc(user.uid);

    const creativityCheckbox = document.querySelector(".creativity-task .checkbox i");

    creativityTaskCompleted = localStorage.getItem("creativityTaskCompleted") === "true";

    // Update the checked status of the checkbox based on the value of the creativityTaskCompleted boolean
    if (creativityTaskCompleted) {
      creativityCheckbox.innerText = "check_box";
    } else {
      creativityCheckbox.innerText = "check_box_outline_blank";
    }

    // Add an event listener to the checkbox
    creativityCheckbox.addEventListener("click", () => {
      // Toggle the value of the creativityTaskCompleted boolean
      creativityTaskCompleted = !creativityTaskCompleted;

      // Update the creativityTaskCompleted boolean in the currentUser document
      currentUser.update({
        creativityTaskCompleted: creativityTaskCompleted
      }).then(() => {
        console.log("Creativity task completed status updated in Firestore.");
      }).catch(error => {
        console.log("Error updating creativity task completed status in Firestore:", error);
      });

      // Update the checked status of the checkbox based on the new value of the creativityTaskCompleted boolean
      if (creativityTaskCompleted) {
        creativityCheckbox.innerText = "check_box";
      } else {
        creativityCheckbox.innerText = "check_box_outline_blank";
      }

      if (checkTasksCompleted()) {
        // Show a congratulatory pop-up message
        alert("Congratulations! You have completed both daily challenges!");
      }

      // Store the value of the creativityTaskCompleted boolean in local storage
      localStorage.setItem("creativityTaskCompleted", creativityTaskCompleted.toString());
    })
  }
});

var physicalTaskCompleted;

const physicalCheckbox = document.getElementById("physical-checkbox");

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const currentUser = db.collection("users").doc(user.uid);

    const physicalCheckbox = document.querySelector(".physical-activity .checkbox i");

    // Get the current value of the physicalTaskCompleted boolean from Firestore
    currentUser.get().then(doc => {
      if (doc.exists) {
        physicalTaskCompleted = doc.data().physicalTaskCompleted;

        // Update the checked status of the checkbox based on the value of the physicalTaskCompleted boolean
        if (physicalTaskCompleted) {
          physicalCheckbox.innerText = "check_box";
        } else {
          physicalCheckbox.innerText = "check_box_outline_blank";
        }

        // Add an event listener to the checkbox
        physicalCheckbox.addEventListener("click", () => {
          // Toggle the value of the physicalTaskCompleted boolean
          physicalTaskCompleted = !physicalTaskCompleted;

          // Update the physicalTaskCompleted boolean in the currentUser document
          currentUser.update({
            physicalTaskCompleted: physicalTaskCompleted
          }).then(() => {
            console.log("Physical task completed status updated in Firestore.");
          }).catch(error => {
            console.log("Error updating physical task completed status in Firestore:", error);
          });

          // Update the checked status of the checkbox based on the new value of the physicalTaskCompleted boolean
          if (physicalTaskCompleted) {
            physicalCheckbox.innerText = "check_box";
          } else {
            physicalCheckbox.innerText = "check_box_outline_blank";
          }

          if (checkTasksCompleted()) {
            // Show a congratulatory pop-up message
            alert("Congratulations! You have completed both daily challenges!");
          }
          
        });
      }
    }).catch(error => {
      console.log("Error retrieving physical task completed status from Firestore:", error);
    });
  }
});

// Function to check if both tasks have been completed
function checkTasksCompleted() {
  return physicalTaskCompleted && creativityTaskCompleted;
}
