function isLogged() {
  var userSession = JSON.parse(localStorage.getItem('userSession'));

  if (userSession && userSession.isLogged === 'true') {
    var userId = userSession.id;

    var users = JSON.parse(localStorage.getItem('users'));

    var user = users.find(user => user.id === userId);

    if (user) {
      var userName = user.name;

      if (user.role === 'admin') {
        document.getElementById('adminItem').style.display = 'block';
      }
    }
  }
}
