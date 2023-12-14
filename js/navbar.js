function isLogged() {
  
  const userSession = JSON.parse(localStorage.getItem('userSession'));
  console.log(userSession[0])
  if (userSession && userSession[0].isLogged === true) {
    
    const login = document.getElementById("navbar-login");
    login.textContent = "Desconectarse";
    console.log(login)
    //login.onclick = logout();
    login.href = "#";

    const userId = userSession[0].id;

    const users = JSON.parse(localStorage.getItem('users'));

    const user = users.find(user => user.id === userId);
    
    if (user) {
      const userName = user.name;
      const buttonRegister = document.getElementById("navbar-reg-name");
      buttonRegister.href = "";
      buttonRegister.textContent = userName;

      if (user.role === 'admin') {
        document.getElementById('adminItem').style.display = 'block';
      }
    }
  }
}

const logout = () =>{
  const userSession = JSON.parse(localStorage.getItem('userSession'));
  /* userSession[0].isLogged = false; */
  /* console.log(userSession) */
  /* localStorage.setItem("userSession", JSON.stringify(userSession)); */
  localStorage.removeItem("userSession")
}