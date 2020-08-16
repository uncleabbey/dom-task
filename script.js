// part one

window.addEventListener('load', function () {
  const header = document.querySelector('#change_heading');
  header.innerHTML = 'Hello World!';

  const selected = document.querySelector('.selected');

  const section = document.querySelector('section');

  const colours = section.children;

  const purple = document.createElement('div');
  purple.classList.add('purple');
  purple.style['background-color'] = 'purple';
  section.appendChild(purple);

  for (let i = 0; i < colours.length; i++) {
    colours[i].addEventListener('mouseover', () => {
      selected.innerHTML = colours[i].className;
    });
  }

  // part two
  const button = document.querySelector('button');
  const car1 = document.querySelector('.car1');
  const car2 = document.querySelector('.car2');
  const moveCar = (car, freq) => {
    let interval = setInterval(() => {
      freq++;
      car.style.transform = `translateX(${freq}px)`;
      if (freq === 1300) {
        clearInterval(interval);
        alert(`Yipeeee. ${car.className} is the WINNER`);
        document.location.reload(true);
      }
    }, Math.random() * 30);
    return interval;
  };

  const start = () => {
    moveCar(car1, 10);
    moveCar(car2, 10);
  };

  button.addEventListener('click', () => {
    if (button.innerHTML === 'Start the race!') {
      start();
      button.innerHTML = 'Restart!';
    } else {
    document.location.reload(true);
    }
  });
});
