imgInp.onchange = evt => {
    const [file] = imgInp.files
    if (file) {
      upload.src = URL.createObjectURL(file)
    }
}


function uploadPic(){
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('hikeDocID', ID);
    window.location.href = 'gallery.html';
}