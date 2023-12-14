const elementCreator=(post,element,tagContainer,className = null,isSearch = false)=>{
        
  /* console.log(post); */
      
      const arrayTags = [
                          {img:post.image, className:"card-news__image"},
                          {h2:post.title},
                          {h3:post.author,author:post.author,date:post.date,category:post.category,avatar:post.avatar},
                          {p:post.extract},
                          {a:post.id, className:"card-news__btn"}
                        ];
const arrayTagsKeys = arrayTags.map(e => Object.keys(e)); 

const articleNode = document.createElement(tagContainer);
articleNode.className = className;
articleNode.id = "post-"+post.id;

  for (let index = 0; index < arrayTags.length; index++) {
      const tag = arrayTagsKeys[index][0]
      const newNode = document.createElement(tag);
           
      switch (tag) {
          case "a":
                      newNode.href = "./posts/post-" + arrayTags[index][tag] + ".html";
                      newNode.className = arrayTags[index][arrayTagsKeys[index][1]]; 
                      /* const AtextNode = document.createTextNode(arrayTags[index][tag]); */
                      const AtextNode = document.createTextNode("Leer Completo");
                      newNode.appendChild(AtextNode);
              break;
          case "img":
                      newNode.src = arrayTags[index][tag];
                      newNode.className = arrayTags[index][arrayTagsKeys[index][1]];
              break;
          case "h3":
                      const imageNode = document.createElement('img');
                      imageNode.className= "card-news__author";
                      imageNode.src= arrayTags[index][arrayTagsKeys[index][4]];
                      newNode.appendChild(imageNode);
                                              
                      const textContentent = arrayTags[index][arrayTagsKeys[index][1]] + " - " + arrayTags[index][arrayTagsKeys[index][2]] +" - ";
                      const h3Node = document.createTextNode(textContentent);
                      newNode.appendChild(h3Node);

                      const categoryNode = document.createElement('a');
                      categoryNode.href = "./error404.html";
                      categoryNode.className = "card-news__category";
                      const categoryTextContent = document.createTextNode(arrayTags[index][arrayTagsKeys[index][3]]);
                      categoryNode.appendChild(categoryTextContent);
                      newNode.appendChild(categoryNode);
              break;
          default:
                      const textNode = document.createTextNode(arrayTags[index][tag]);
                      newNode.appendChild(textNode);
              break;
      }
            
      articleNode.appendChild(newNode);
  
  }    
    const firstChild = element.firstElementChild;
    /* const childBefore = isSearch ? firstChild : firstChild.nextSibling; */
   (post.isSticky && !isSearch) ? element.replaceChild(articleNode, firstChild)
    : element.insertBefore(articleNode, firstChild.nextSibling);
    
       
}

const searchPosts = ()=>{

    let arrayPosts = JSON.parse(localStorage.getItem("showPosts"));
    let searchText = document.getElementById('search').value  
     
    if(!searchText){
        return;
     }

    let searchResult = arrayPosts.filter(object => {
     const title = object.title.toLowerCase();
      return title.includes(searchText.toLowerCase());
    });

  localStorage.setItem("searchResult", JSON.stringify(searchResult))
  localStorage.setItem("search", JSON.stringify(true))
  //showPosts();

  const mainContainer = document.getElementById("main");
   
  arrayPosts.forEach((object) => { 
      if(object.isPublish){
        const postID = "post-"+object.id;
        const child = document.getElementById(postID);
        child && mainContainer.removeChild(child);
      }
     });

     if(!document.getElementById("searchedPosts")){
        const articleNode = document.createElement("article");
        articleNode.className = "card-news";
        articleNode.id = "searchedPosts";
        const textNode = document.createTextNode("Resultados de la búsqueda:");
        articleNode.appendChild(textNode);
        const firstChild =  mainContainer.firstElementChild;
        mainContainer.insertBefore(articleNode,  firstChild);
      }

     searchResult.forEach(post => (post.isPublish) && elementCreator(post,mainContainer,"article","card-news",true)
     ); 

}

const showPosts =() =>{
  localStorage.setItem("search", JSON.stringify(false));
  preloadPost();

  const  posts = JSON.parse(localStorage.getItem("showPosts"));
  const mainContainer = document.getElementById("main");
  
  if(posts){
    
    const stickyPost = posts.find((object) => (object.isSticky === true && object.isPublish === true));
    elementCreator(stickyPost,mainContainer,"article","card-news")
       

    posts.forEach(post => (post.isPublish && !post.isSticky) && elementCreator(post,mainContainer,"article","card-news")); 
  } else {
    const articleNode = document.createElement("article");
    articleNode.className = "card-news";
    articleNode.id = "no-posts";
    const textNode = document.createTextNode("No hay post para mostrar. =(");
    articleNode.appendChild(textNode);
    /* articleNode.appendChild(newNode); */
  }
   
}

const preloadPost=() =>{

   const post = [ 
                  { id:1, 
                    title:"Lenguajes de Programación Populares y sus Aplicaciones en el Mundo Real", 
                    extract:"Descubre las aplicaciones prácticas de lenguajes de programación populares en el mundo real. Desde la versatilidad de Python hasta el desarrollo web con JavaScript, explora cómo estos lenguajes dan forma a la tecnología actual. Un análisis esclarecedor para programadores de todos los niveles...",
                    author:"Luis", 
                    category:"Programación",
                    date:"2023/11/25",
                    isPublish:true,
                    image: "./img/posts/post-1.jpg", 
                    isSticky:true,
                    avatar:"./img/team/luis.jpg",
                  },
                  { id:2, 
                    title:"Las Tendencias de Smartphones que Dominarán el 2023", 
                    extract:"Explora las emocionantes tendencias de smartphones para el 2023: desde la omnipresencia de la 5G hasta avances en fotografía móvil y sostenibilidad. Descubre cómo estos cambios transformarán nuestra interacción diaria con la tecnología...",
                    author:"Francisco", 
                    category:"Celulares",
                    date:"2023/12/01",
                    isPublish:true,
                    image: "./img/posts/post-2.jpg",
                    isSticky:false, 
                    avatar:"./img/team/francisco.png",
                  },
                  { id:3, 
                    title:"El Impacto de la Inteligencia Artificial en las Computadoras Personales", 
                    extract:"Sumérgete en el impactante mundo donde la Inteligencia Artificial transforma nuestras computadoras personales. Desde asistentes virtuales más inteligentes hasta la automatización y la seguridad, descubre cómo la IA redefine nuestra experiencia digital cotidiana.",
                    author:"Flavio", 
                    category:"Computación",
                    date:"2023/12/12", 
                    isPublish:true,
                    image: "./img/posts/post-3.jpg",
                    isSticky:false,
                    avatar:"./img/team/flavio.jpg",
                  },
                  { id:4, 
                    title:"El Nuevo 'aifon9999999' te dejará boquiabierto", 
                    extract:"Review del nuevo 'aifon9999999' donde comentamos sus mejores caracteristicas",
                    author:"Francisco", 
                    category:"Celulares",
                    date:"2023/12/10", 
                    isPublish:false,
                    image: "./img/posts/post-4.jpg",
                    isSticky:false,
                    avatar:"./img/team/francisco.png",
                  }
                ]

       const hasPosts = JSON.parse(localStorage.getItem("showPosts"));   

       !hasPosts && (localStorage.setItem("showPosts", JSON.stringify(post)),localStorage.setItem("stikyPost", JSON.stringify(post[0])));

}