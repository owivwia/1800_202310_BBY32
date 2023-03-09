function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("uploadTemplate");

    db.collection(collection).get()   //the collection called "hikes"
        .then(allUploads=> {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allUploads.forEach(doc => { //iterate thru each doc
                //var title = doc.data().name;       // get value of the "name" key
                //var details = doc.data().details;  // get value of the "details" key
				var uploadCode = doc.data().code;    //get unique ID to each hike to be used for fetching right image
                //var hikeLength = doc.data().length; //gets the length field
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                //newcard.querySelector('.card-title').innerHTML = title;
                //newcard.querySelector('.card-length').innerHTML = hikeLength +"km";
                //newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = `./images/${uploadCode}.jpg`; //Example: NV01.jpg
                newcard.querySelector('a').href = "eachUpload.html?docID="+docID;

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery, Example: "hikes-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayCardsDynamically("uploads");  //input param is the name of the collection
