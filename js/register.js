const createUser = ()=>{
    const name = document.getElementById("name").value; 
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;


    const arrayUsers = JSON.parse(localStorage.getItem("users"))? JSON.parse(localStorage.getItem("users")) : [];
    console.log(arrayUsers)
    const rol = arrayUsers ? "normal" : "admin";
    const id = Math.floor(Math.random() * 3000);

    const user = {id:id,name:name,email:email,password:password,rol:rol};
    arrayUsers.push(user)
    
    localStorage.setItem("users", JSON.stringify(arrayUsers));


    

    
}
