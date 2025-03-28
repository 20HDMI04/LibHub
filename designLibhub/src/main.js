document.addEventListener('DOMContentLoaded', async function() {
  await import("bootstrap/dist/js/bootstrap.bundle.min");
  await import("bootstrap/dist/css/bootstrap.min.css");

    const wrapper1 = document.querySelector('body > article > section.wrapper1 > div.wrapper2 > div.wrapper3 > div.wrapper4 > div.wrapper5 > div.wrapper7 > div');
    const previousButton0 = document.getElementById('previous0');
    const nextButton0 = document.getElementById('next0');
    animateCaraousel(wrapper1, previousButton0, nextButton0);

    const wrapper19 = document.querySelector('body > article > section.wrapper1 > div.wrapper2 > div.wrapper15 > div.wrapper16 > div.wrapper18 > div');
    const previousButton = document.getElementById('previous');
    const nextButton = document.getElementById('next');
    animateCaraousel(wrapper19, previousButton, nextButton);

    const wrapper20 = document.querySelector('body > article > section.wrapper1 > div.wrapper2 > div.wrapper15 > div.wrapper20 > div.wrapper18 > div');
    const previousButton2 = document.getElementById('previous2');
    const nextButton2 = document.getElementById('next2');
    animateCaraousel(wrapper20, previousButton2, nextButton2);

    const wrapper21 = document.querySelector("body > article > section.wrapper1 > div.wrapper2 > div.wrapper15 > div:nth-child(4) > div.wrapper18 > div");
    const previousButton3 = document.getElementById('previous3');
    const nextButton3 = document.getElementById('next3');
    animateCaraousel(wrapper21, previousButton3, nextButton3);

    const wrapper22 = document.querySelector("body > article > section.wrapper1 > div.wrapper2 > div.wrapper15 > div:nth-child(6) > div.wrapper18 > div");
    const previousButton4 = document.getElementById('previous4');
    const nextButton4 = document.getElementById('next4');
    animateCaraousel(wrapper22, previousButton4, nextButton4);

    const wrapper23 = document.querySelector("body > article > section.wrapper1 > div.wrapper2 > div.wrapper15 > div:nth-child(7) > div.wrapper18 > div");
    const previousButton5 = document.getElementById('previous5');
    const nextButton5 = document.getElementById('next5');
    animateCaraousel(wrapper23, previousButton5, nextButton5);
  });


function animateCaraousel(wrapper, previousButton, nextButton){
  let startIndex = 0;
  let isAnimating = false; // Animáció közben vagyunk-e
  const images = wrapper.querySelectorAll('img');

  function updateCarousel(direction) {
      if (isAnimating) return;
      isAnimating = true;

      images.forEach((img, index) => {
          let targetPosition = (index - startIndex) * 10;
          img.style.transition = 'transform 0.5s ease-in-out';
          img.style.transform = `translateX(${targetPosition}px)`;
      });

      setTimeout(() => {
          isAnimating = false;
      }, 500); // Animáció ideje
  }

  function nextImage() {
    startIndex = (startIndex + 1) + images.length + 15;
    console.log(startIndex);
    if (startIndex > 54) {
      startIndex = 0;
      updateCarousel('previous');
      return;
    }
      updateCarousel('next');
  }

  function previousImage() {
      startIndex = (((startIndex - 1 + images.length) - images.length) - 15);
      if (startIndex < 0) {
        startIndex = 0;
      }
      updateCarousel('previous');
  }

  // Initial megjelenítés
  updateCarousel();

  // Eseménykezelők a gombokhoz
  nextButton.addEventListener('click', nextImage);
  previousButton.addEventListener('click', previousImage);
}
