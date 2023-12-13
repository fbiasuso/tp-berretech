const searchPosts = ()=>{

    let arrayPosts = JSON.parse(localStorage.getItem("showPosts"));
    let searchText = document.getElementById('search').value  
     
    if(!searchText){
        return;
     }

    let searchResult = arrayPosts.filter(object => {
     return object.title.includes(searchText);
    });

  localStorage.setItem("searchResult", JSON.stringify(searchResult))
  localStorage.setItem("search", JSON.stringify(true))
  
  
}