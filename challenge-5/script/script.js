const url = 'https://api.adviceslip.com/advice';

let randomQuoteNum = document.querySelector('.advice__number');
let randomQuote = document.querySelector('.advice__quote');
let button = document.querySelector('.accent__button');

// Add id and quote to html.
function advice(id, quote) {
  randomQuoteNum.innerHTML = `ADVICE #${id}`;
  randomQuote.innerHTML = `"${quote}"`;
}

// Initial fetch for API.
fetch(url)
  .then(response => response.json())
  .then((data) => {
      let id = data.slip.id
      let quote = data.slip.advice
      advice(id, quote);
  } 
);

// Function utilized for click listener.
function getNewAdvice() {
  fetch(url)
  .then(response => response.json())
  .then((data) => {
      let id = data.slip.id
      let quote = data.slip.advice
      advice(id, quote);
  })
}

// On dice 'click'.
button.addEventListener('click', getNewAdvice);

// Loading an alert after 3s.
// window.addEventListener('load', setTimeout(()=>{alert('Click on the dice for a new advice!')}, 3000));