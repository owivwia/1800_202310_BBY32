
function displayHikeInformation(){
    //retreive the document id from the url
    let params = new URL(window.location.href) //get the url from the searbar
    let ID = params.searchParams.get("docID");
    console.log(ID);

    db.collection("posts").doc(ID).get().then( thisPost =>{
        postInfo = thisPost.data();
        postDesc = postInfo.description;
        postTitle = postInfo.title;
        img = postInfo.image;

        document.getElementById("postTitle").innerHTML = postTitle;
        document.getElementById("postImage").src = img;
        document.getElementById('postDescription').innerHTML = postDesc;
    }

    )

}
displayHikeInformation();