const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
function register(event) {
    event.preventDefault();
    const f_input = document.getElementById('fname');
    const fname_text = f_input.value;
    const last_name = document.getElementById('lname').value;
    const gender = document.getElementById('gender').value;
    const date = document.getElementById('dob').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const retype_password = document.getElementById('retypePassword').value;

    if (!fname_text || fname_text == '') {
        alert('Please Insert First Name');
        return
    }
    if (!last_name || last_name == '') {
        alert('Please Insert last_name');
        return
    }
    if (!date) {
        alert('Please Insert dob');
        return
    }
    if (!email) {
        alert('Please Insert email');
        return
    } else {
        if (!validateEmail(email)) {
            alert('Invalid email');
            return
        }
    }
    if (!password || !retype_password || password.length < 5 || retype_password.length < 5) {
        alert('use strong password');
        return
    }
    else {
        if (retype_password != password) {
            alert(' password not matched!');
            return
        }
    }
    let data = {
        fname: fname_text,
        lname: last_name, 
        gender: gender,
        dob: date, 
        email: email, 
        password: password, 
        retype_password: retype_password
    };
    console.log('data', data);

    fetch("http://localhost:3000/register/post", {
    method: "POST",
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(data)
    }).then(res => res.json())
    .then(res => {
        if (res === 'success') {
            window.location.href = '../frontend/login.html'
        }
        else if(res === 'error'){
            alert("Try again");
        }
    });
}