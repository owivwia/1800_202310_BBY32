function logout() {
  firebase.auth().signOut().then(() => {
    // sign-out successful.
    console.log("logging out user");
  }). catch((error) => {
    // an error happened.
  })
}