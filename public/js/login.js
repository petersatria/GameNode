

function login() {
	let username = document.querySelector('#username').value
	let password = document.querySelector('#password').value
	document.querySelector("#login").textContent = 'Logout';

	if (username === '' || password === '') {
		alert('username / password cant be blank')
	} else {
		fetch('/login', {
			method: 'post',
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({
				username: username,
				password: password
			})
		}).then(function (response) {
			return response.json()
		}).then(function (result) {
			console.log(result)
			setCookie('user-data', JSON.stringify(result.resultData), 1)
			console.log(getCookie('user-data'))
			let dataUser = getCookie('user-data')
			if (dataUser == null) {
				console.log('not found')
			} else {
				window.location.href = '/'
			}
		}).catch(function (err) {
			console.log(err)
		})
	}
}

// function openForm() {
// 	document.querySelector('#loginForm').style.display = "grid";
// }
// function closeForm() {
// 	document.querySelector('#loginForm').style.display = "none";
// 	console.log('onclick')
// }

function setCookie(name, value, days) {
	let expires = "";
	if (days) {
		let date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
	let nameEQ = name + "=";
	let ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}
function eraseCookie(name) {
	document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
