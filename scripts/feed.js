function showPosts() {
    db.collection("posts")
        .get()
        .then(snap => {
            snap.forEach(doc => {
                displayPostCard(doc);
            })
        })
}
showPosts();

function displayPostCard(doc) {
    var title = doc.data().name; // get value of the "name" key
    var desc = doc.data().description; //gets the length field
    var image = doc.data().image; //the field that contains the URL 

    //clone the new card
    let newcard = document.getElementById("postCardTemplate").content.cloneNode(true);
    //populate with title, image
    newcard.querySelector('.card-title').innerHTML = title;
    newcard.querySelector('.card-image').src = image;
    newcard.querySelector('.card-description').innerHTML = desc;
    //newcard.querySelector('#delete-icon').onclick = () => deletePost(doc.id);

    //append to the posts
    document.getElementById("posts-go-here").append(newcard);
}


function insertNameFromFirebase() {
    // to check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // let me to know who is the user that logged in to get the UID
            currentUser = db.collection("users").doc(user
                .uid); // will to to the firestore and go to the document of the user
            currentUser.get().then(userDoc => {
                //get the user name
                var user_Name = userDoc.data().name;
                console.log(user_Name);
                $("#name-goes-here").text(user_Name); //jquery
                // document.getElementByID("name-goes-here").innetText=user_Name;
            })
        }
    })
}
insertNameFromFirebase();

function deletePost(postid) {
    var result = confirm("Want to delete?");
    if (result) {
        //Logic to delete the item
        db.collection("posts").doc(postid).delete()
            .then(() => {
                console.log("1. doc deleted from posts collection");
                deleteFromMyPosts(postid);
            }).catch((error) => {
                console.error("Error deleting document: ", error);
            });
    }
}

function deleteFromMyPosts(postid) {
    firebase.auth().onAuthStateChanged(user => {
        db.collection("users").doc(user.uid).update({
                myposts: firebase.firestore.FieldValue.arrayRemove(postid)
            })
            .then(() => {
                console.log("2. post deleted from user doc");
                deleteFromStorage(postid);
            })
    })
}

function deleteFromStorage(postid) {
    // Create a reference to the file to delete
    var imageRef = storage.ref('images/' + postid + '.jpg');

    // Delete the file
    imageRef.delete().then(() => {
        // File deleted successfully
        console.log("3. image deleted from storage");
        alert("DELETE is completed!");
        location.reload();
    }).catch((error) => {
        // Uh-oh, an error occurred!
    });
}