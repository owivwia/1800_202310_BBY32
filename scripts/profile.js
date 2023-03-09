var currentUser;          //put this right after you start script tag before writing any functions.
function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userSchool = userDoc.data().school;
                    var userCity = userDoc.data().city;
                    var userCountry = userDoc.data().country;
                    var userState = userDoc.data().state;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userSchool != null) {
                        document.getElementById("schoolInput").value = userSchool;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                    if (userName != null) {
                        document.getElementById("countryInput").value = userCountry;
                    }
                    if (userName != null) {
                        document.getElementById("stateInput").value = userState;
                    }
                })
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });
}

//call the function to run it 
populateUserInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
 }

 function saveUserInfo() {
    //a) get user entered values
    userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
    userSchool = document.getElementById('schoolInput').value;     //get the value of the field with id="schoolInput"
    userCity = document.getElementById('cityInput').value;       //get the value of the field with id="cityInput"
    userCountry = document.getElementById('countryInput').value;
    userState = document.getElementById('stateInput').value;
    //b) update user's document in Firestore
    currentUser.update({
                    name: userName,
                    school: userSchool,
                    city: userCity,
                    state: userState,
                    country: userCountry
                })
                .then(() => {
                    console.log("Document successfully updated!");
                })
    //c) disable edit 
    document.getElementById('personalInfoFields').disabled = true;            
    
}

