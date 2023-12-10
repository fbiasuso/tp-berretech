
const emailValidations =(input) =>{
   
    /* const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; */
    /* return input.value.match(regEx) */
    const regEx = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/; 
    return regEx.test(input.value);
    
}

const killElement = (element,id)=>{
    const parentNode = element.parentNode;
    const child = document.getElementById(id);
    child && parentNode.removeChild(child);
}

const elementCreator=(element,tag,message,id,className = null)=>{
        
        killElement(element,id);
        const newNode = document.createElement(tag);
        newNode.id = id;
        newNode.className = className;
        const textNode = document.createTextNode(message);
        newNode.appendChild(textNode);
        const parentNode = element.parentNode;
        parentNode.insertBefore(newNode, element.nextSibling);
}

const loginValidations =()=>{

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    let arrayUsers = JSON.parse(localStorage.getItem("users"))? JSON.parse(localStorage.getItem("users")) : [];
    let user = arrayUsers ? arrayUsers.find((object) => object.email === email.value ) : "";

    if (!emailValidations(email)) {
        
        return   elementCreator(email,"span","Email inválido","emailError","validationError");
    }

    if (!user) {
        return elementCreator(email,"span","El usuario no existe","emailError","validationError");
    }

    killElement(email,"emailError");
    
    if (password.value !== user.password) {
        return elementCreator(password,"span","La contraseña es incorrecta","passwordError","validationError");
    }

    
    killElement(password,"passwordError");

    let  userSession = JSON.parse(localStorage.getItem("userSession")) ? JSON.parse(localStorage.getItem("userSession")): [];
    const userLogged = userSession ? userSession.find((object) => object.id === user.id ) : "";

    if (!userLogged) {
        const logged = {id:user.id,isLogged:true};
        userSession.push(logged)  
        
    } else {
        const position = userSession.findIndex((object) => object.id === user.id)
        const replacement = {id:user.id,isLogged:true};
        userSession.splice(position, 1, replacement)
    }
  
    localStorage.setItem("userSession", JSON.stringify(userSession))  
    
    document.loginForm.submit();
}