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
getNameFromAuth(); //run the function

// Function to read the message of the day from Firestore "weather message" collection
// Input param is the String representing the day of the week, aka, the document name
function readMessage(weather) {
  db.collection("weather message").doc(weather)                                                      //name of the collection and documents should matach excatly with what you have in Firestore
    .onSnapshot(rainingDoc => {                                                               //arrow notation
         console.log("current document data: " + rainingDoc.data());                          //.data() returns data object
         document.getElementById("message-goes-here").innerHTML = rainingDoc.data().message;      //using javascript to display the data on the right place
    })
}
readMessage("raining");        //calling the function

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const rndInt1 = randomIntFromInterval(1, 5)
const rndInt2 = randomIntFromInterval(1, 5)

function readCreativityTask(creativityId) {
  db.collection("creativity tasks").doc(creativityId)                                                      //name of the collection and documents should matach excatly with what you have in Firestore
    .onSnapshot(taskDoc => {                                                               //arrow notation
         console.log("current document data: " + taskDoc.data());                          //.data() returns data object
         document.getElementById("creativity-task-goes-here").innerHTML = taskDoc.data().Task;      //using javascript to display the data on the right place
         
         //Here are other ways to access key-value data fields
         //$('#quote-goes-here').text(tuesdayDoc.data().quote);         //using jquery object dot notation
         //$("#quote-goes-here").text(tuesdayDoc.data()["quote"]);      //using json object indexing
         //document.querySelector("#quote-goes-here").innerHTML = tuesdayDoc.data().quote;
    })
}
readCreativityTask(rndInt1.toString());

function readPhysicalTask(physicalId) {
  db.collection("physical tasks").doc(physicalId)                                                      //name of the collection and documents should matach excatly with what you have in Firestore
    .onSnapshot(taskDoc => {                                                               //arrow notation
         console.log("current document data: " + taskDoc.data());                          //.data() returns data object
         document.getElementById("physical-task-goes-here").innerHTML = taskDoc.data().task;      //using javascript to display the data on the right place
         
         //Here are other ways to access key-value data fields
         //$('#quote-goes-here').text(tuesdayDoc.data().quote);         //using jquery object dot notation
         //$("#quote-goes-here").text(tuesdayDoc.data()["quote"]);      //using json object indexing
         //document.querySelector("#quote-goes-here").innerHTML = tuesdayDoc.data().quote;
    })
}
readPhysicalTask(rndInt2.toString());

