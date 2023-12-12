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

const elementCreator=(post,element,tagContainer)=>{
    const arrayTags = [
                            {tag:"th", value:post.id},
                            {tag:"td", value:post.title},
                            {tag:"td", value:post.extract},
                            {tag:"td", value:post.author},
                            {tag:"td", value:post.category},
                            {tag:"td", value:post.date},
                            {tag:"td", value:post.isPublish},
                            {tag:"td", value:"Borrar | Editar |  Destacar"},
                       ];

const mainNode = document.createElement(tagContainer);


    for (let index = 0; index < arrayTags.length; index++) {
      
       const tag = arrayTags[index]["tag"];
       const value = arrayTags[index]["value"];
        
        const newNode = document.createElement(tag);
        const textNode = document.createTextNode(value);
        newNode.appendChild(textNode);
        newNode.scope = (tag === "th") && "row";
        mainNode.appendChild(newNode);
    }    
        
        element.appendChild(mainNode);
        
}

const showPosts = ()=>{
    const posts = JSON.parse(localStorage.getItem("showPosts")) ? JSON.parse(localStorage.getItem("showPosts")) : [];

    const mainContainer = document.getElementById("tbody");

    posts.forEach(post => {
        elementCreator(post,mainContainer,"tr");
    }); 
}
