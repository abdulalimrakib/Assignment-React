const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
function login(event) {
  event.preventDefault();

//   fetch("http://localhost:3000/login/data", {
//     method: "POST",
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       console.log(res);
//     });

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

    if (!email) {
      alert("Please Insert email");
      return;
    } else {
      if (!validateEmail(email)) {
        alert("Invalid email");
        return;
      }
    }
    if (!password) {
      alert("Please Insert password");
      return;
    } 

    let data = {
      email: email,
      password: password,
    };

  fetch("http://localhost:3000/login/post", {
    method: "POST",
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(data)
    }).then(res => res.json())
    .then(res => {
        if (res === 'success') {
            window.location.href = '../frontend/profile.html'
        }
       else if(res === 'error'){
            alert("Invelid email or password");
        }
    })
}
