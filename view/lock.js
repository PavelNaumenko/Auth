"use strict";

console.log('Hello');

let lock = new Auth0Lock('mt9vUcHsEZB2hUvUfUDquC1ywjEOjnMJ', 'pashka95.eu.auth0.com');

lock.on('authenticated', (authResult) => {

	lock.getProfile(authResult.idToken, (error, profile) => {

		if (error) {

			console.log(error);
			return;

		}

		fetch('http://localhost:3000/login', {

			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + authResult.idToken
			}

		})
		.then(response => {

			response.json().then(data => {

				console.log(data);

				localStorage.setItem('token', `Bearer ${authResult.idToken}`);
				localStorage.setItem('profile', JSON.stringify(profile));

			});

		});

	});

});

document.getElementById('btn-login').addEventListener('click', () => {

	lock.show();

});
