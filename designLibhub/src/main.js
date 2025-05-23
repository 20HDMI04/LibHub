document.addEventListener("DOMContentLoaded", async function () {
	const element_img1 = document.getElementById("img1");
	const element_img2 = document.getElementById("img2");
	const element_img3 = document.getElementById("img3");
	const element_img4 = document.getElementById("img4");
	const element_img5 = document.getElementById("img5");
	const element_img6 = document.getElementById("img6");
	const element_img7 = document.getElementById("img7");
	let res = await fetch("http://localhost:3000/api/v1/books/main", {
		method: "GET",
		mode: "cors",
		headers: {
			Accept: "application/json",
		},
	});
	let data = await res.json();
	console.log(data);
	element_img1.src = `http://localhost:4566/libhub/` + data.main[0].picture;
	element_img2.src = `http://localhost:4566/libhub/` + data.main[1].picture;
	element_img3.src = `http://localhost:4566/libhub/` + data.main[2].picture;
	element_img4.src = `http://localhost:4566/libhub/` + data.main[3].picture;
	element_img5.src = `http://localhost:4566/libhub/` + data.main[4].picture;
	element_img6.src = `http://localhost:4566/libhub/` + data.main[5].picture;
	element_img7.src = `http://localhost:4566/libhub/` + data.main[6].picture;

	await import("bootstrap/dist/js/bootstrap.bundle.min");
	await import("bootstrap/dist/css/bootstrap.min.css");

	const wrapper1 = document.querySelector(
		"body > article > section.wrapper1 > div.wrapper2 > div.wrapper3 > div.wrapper4 > div.wrapper5 > div.wrapper7 > div"
	);
	const previousButton0 = document.getElementById("previous0");
	const nextButton0 = document.getElementById("next0");
	animateCaraousel(wrapper1, previousButton0, nextButton0);

	const wrapper19 = document.querySelector(
		"body > article > section.wrapper1 > div.wrapper2 > div.wrapper15 > div.wrapper16 > div.wrapper18 > div"
	);
	const previousButton = document.getElementById("previous");
	const nextButton = document.getElementById("next");
	animateCaraousel(wrapper19, previousButton, nextButton);

	const wrapper20 = document.querySelector(
		"body > article > section.wrapper1 > div.wrapper2 > div.wrapper15 > div.wrapper20 > div.wrapper18 > div"
	);
	const previousButton2 = document.getElementById("previous2");
	const nextButton2 = document.getElementById("next2");
	animateCaraousel(wrapper20, previousButton2, nextButton2);

	const wrapper21 = document.querySelector(
		"body > article > section.wrapper1 > div.wrapper2 > div.wrapper15 > div:nth-child(4) > div.wrapper18 > div"
	);
	const previousButton3 = document.getElementById("previous3");
	const nextButton3 = document.getElementById("next3");
	animateCaraousel(wrapper21, previousButton3, nextButton3);

	const wrapper22 = document.querySelector(
		"body > article > section.wrapper1 > div.wrapper2 > div.wrapper15 > div:nth-child(6) > div.wrapper18 > div"
	);
	const previousButton4 = document.getElementById("previous4");
	const nextButton4 = document.getElementById("next4");
	animateCaraousel(wrapper22, previousButton4, nextButton4);

	const wrapper23 = document.querySelector(
		"body > article > section.wrapper1 > div.wrapper2 > div.wrapper15 > div:nth-child(7) > div.wrapper18 > div"
	);
	const previousButton5 = document.getElementById("previous5");
	const nextButton5 = document.getElementById("next5");
	animateCaraousel(wrapper23, previousButton5, nextButton5);
});

function animateCaraousel(wrapper, previousButton, nextButton) {
	let startIndex = 0;
	let isAnimating = false; // Animáció közben vagyunk-e
	const images = wrapper.querySelectorAll("img");

	function updateCarousel(direction) {
		if (isAnimating) return;
		isAnimating = true;

		images.forEach((img, index) => {
			let targetPosition = (index - startIndex) * 10;
			img.style.transition = "transform 0.5s ease-in-out";
			img.style.transform = `translateX(${targetPosition}px)`;
		});

		setTimeout(() => {
			isAnimating = false;
		}, 500); // Animáció ideje
	}

	function nextImage() {
		startIndex = startIndex + 1 + images.length + 25;
		console.log(startIndex);
		if (startIndex > 54) {
			startIndex = 0;
			updateCarousel("previous");
			return;
		}
		updateCarousel("next");
	}

	function previousImage() {
		startIndex = startIndex - 1 + images.length - images.length - 25;
		if (startIndex < 0) {
			startIndex = 0;
		}
		updateCarousel("previous");
	}

	// Initial megjelenítés
	updateCarousel();

	// Eseménykezelők a gombokhoz
	nextButton.addEventListener("click", nextImage);
	previousButton.addEventListener("click", previousImage);
}
