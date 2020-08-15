// part one

window.addEventListener('load', function () {
  const header = document.querySelector('#change_heading')
  header.innerHTML = 'Hello World!';

  const selected = document.querySelector('.selected')

  const section = document.querySelector('section')

  const colours = section.children

  
  const purple = document.createElement('div')
  purple.classList.add('purple');
  purple.style['background-color'] = 'purple'
  section.appendChild(purple)

  for (let i = 0; i < colours.length; i++) {
    colours[i].addEventListener('mouseover', () => {
      selected.innerHTML = colours[i].className
    })
  }



  // part two 
  const button = document.querySelector('button');
  const car1 = document.querySelector('.car1');
  const car2 = document.querySelector('.car2');

  button.addEventListener('click', () => {
    car1.classList.add('move-cars');
    car2.classList.add('move-cars');
  })

})



