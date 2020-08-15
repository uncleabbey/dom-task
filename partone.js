// task one

const container = document.getElementById('container');

// tasktwo

const containerQuery = document.querySelector('#container')

// task three
const classSecond = document.querySelectorAll('.second')

// task four

const classThird = document.querySelectorAll('.third')

console.log(classThird[1])

// task five 

// container.innerText = 'Hello!';



// task six

const footer = document.querySelector('.footer');

footer.classList.add('main');


// task seven 

footer.classList.remove('main')

// task eight

const li = document.createElement('li');

// task nine 

li.innerHTML = 'four';

const ul = document.querySelector('ul');

ul.appendChild(li);



// task ten

const ol = document.querySelector('ol');

const lis = ol.children;

console.log(lis);

for (let index = 0; index < lis.length; index++) {
  lis[index].style['background-color'] = 'green';
}


// task eleven

const body = document.body

body.removeChild(footer);


console.log(body);