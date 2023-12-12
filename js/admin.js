const createPost = ()=>{
 
    let  showPosts = JSON.parse(localStorage.getItem("showPosts")) ? JSON.parse(localStorage.getItem("showPosts")): [];
    
    const arrayInputs = ["id","title","extract","author","category","date","publish"];

    let  object = {};
    for (i = 0; i < arrayInputs.length; i++) {
        
        if (!document.getElementById(arrayInputs[i]).value && arrayInputs[i] !== "publish" ){
            return
        }
        
        arrayInputs[i] === "publish" 
        ? (object["isPublish"] = document.getElementById(arrayInputs[i]).checked)
        :  arrayInputs[i] === "id" 
        ? (object[arrayInputs[i]] = Number(document.getElementById(arrayInputs[i]).value))
        : (object[arrayInputs[i]] = document.getElementById(arrayInputs[i]).value)
    }
    
    showPosts ? (showPosts.push(object)) : (showPosts = object);

    localStorage.setItem("showPosts", JSON.stringify(showPosts)) ;
    document.newPostForm.reset();
       
    /*  let myModal = new bootstrap.Modal(document.getElementById('newPostModal'));
      myModal.hide(); */ 
      alert("¡Post creado con exito!");

}

