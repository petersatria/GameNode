const playMatch = () => {
	const options = document.querySelectorAll(".options button");
	const playerBatu = document.querySelector("#playerBatu");
	const playerKertas = document.querySelector("#playerKertas");
	const playerGunting = document.querySelector("#playerGunting");
	const playerBatuBorder = document.querySelector("#playerBatuBorder");
	const playerKertasBorder = document.querySelector("#playerKertasBorder");
	const playerGuntingBorder = document.querySelector("#playerGuntingBorder");

	const batuDisabled = () => {
		playerBatu.setAttribute('disabled', 'disabled')
	}
	const kertasDisabled = () => {
		playerKertas.setAttribute('disabled', 'disabled')
	}
	const guntingDisabled = () => {
		playerGunting.setAttribute('disabled', 'disabled')
	}

	// const playerHands = document.querySelectorAll(".player-hand");

	const comBatu = document.querySelector('#comBatu');
	const comKertas = document.querySelector('#comKertas');
	const comGunting = document.querySelector('#comGunting');

	const computerOptions = ['batu', 'kertas', 'gunting'];
	let computerNumber = Math.floor(Math.random() * 3);
	let computerChoice = computerOptions[computerNumber];
	console.log('computer: ', computerChoice);

	// const playerOption = () => {
	// 	playerHands.forEach(playerHand => {
	// 		playerHand.addEventListener('click', function () {
	// 			playerHand.classList.add('border-option-selected')
	// 			return
	// 		});
	// 	});
	// };

	const computerOption = () => {
		if (computerChoice === 'batu') {
			comBatu.style.background = '#C4C4C4';
		} else if (computerChoice === 'kertas') {
			comKertas.style.background = '#C4C4C4';
		} else {
			comGunting.style.background = '#C4C4C4';
		};
	}

	options.forEach(option => {
		option.addEventListener('click', function () {
			const playerChoice = option.getAttribute('class');
			const winnerBorder = document.querySelector(".border-result");
			const winner = document.querySelector(".border-result p");

			const playerOption = () => {
				if (playerChoice === 'batu') {
					playerBatuBorder.style.background = '#C4C4C4';
				} else if (playerChoice === 'kertas') {
					playerKertasBorder.style.background = '#C4C4C4';
				} else {
					playerGuntingBorder.style.background = '#C4C4C4';
				};
			}

			computerOption();
			playerOption();
			console.log('player: ', option.getAttribute('class'));

			const resultWin = () => {
				winner.classList.add('result-text');
				winnerBorder.classList.add('border-result-win');
			}
			const resultDraw = () => {
				winner.classList.add('result-text');
				winnerBorder.classList.add('border-result-draw');
			}

			const compareHands = (playerChoice, computerChoice) => {
				if (playerChoice === computerChoice) {
					winner.textContent = 'Draw';
					resultDraw();
					return
				}
				if (playerChoice === 'batu') {
					if (computerChoice === 'gunting') {
						winner.textContent = 'Player 1 Win';
						resultWin();
					} else {
						winner.textContent = 'Com Win';
						resultWin();
					}
					return
				}
				if (playerChoice === 'kertas') {
					if (computerChoice === 'gunting') {
						winner.textContent = 'Com Win';
						resultWin();
					} else {
						winner.textContent = 'Player 1 Win';
						resultWin();
					}
					return
				}
				if (playerChoice === 'gunting') {
					if (computerChoice === 'batu') {
						winner.textContent = 'Com Win';
						resultWin();
					} else {
						winner.textContent = 'Player 1 Win';
						resultWin();
					}
					return
				}
			};

			compareHands(playerChoice, computerChoice);
			batuDisabled();
			kertasDisabled();
			guntingDisabled();
			console.log(winner.textContent);

			const resetButton = () => {
				if (playerChoice === 'refresh') {
					computerNumber = Math.floor(Math.random() * 3);
					computerChoice = computerOptions[computerNumber];
					winner.classList.remove('result-text');
					winner.textContent = 'VS';
					winner.classList.add('versus-text');
					winnerBorder.classList.remove('border-result-win');
					winnerBorder.classList.remove('border-result-draw');
					winnerBorder.classList.add('border-result');

					console.log('computer 2: ', computerChoice);

					// playerHands.forEach(playerHand => {
					// 	playerHand.classList.remove('border-option-selected')
					// 	return
					// });

					comGunting.style.background = 'transparent';
					comBatu.style.background = 'transparent';
					comKertas.style.background = 'transparent';
					playerBatuBorder.style.background = 'transparent';
					playerKertasBorder.style.background = 'transparent';
					playerGuntingBorder.style.background = 'transparent';
					playerBatu.removeAttribute('disabled', 'disabled');
					playerKertas.removeAttribute('disabled', 'disabled');
					playerGunting.removeAttribute('disabled', 'disabled');
				}
			}

			resetButton();
		});
	});

};

playMatch();



