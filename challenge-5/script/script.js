const APIUrl = 'https://api.adviceslip.com/advice';

let randomQuoteNum = document.querySelector('.advice__number');
let randomQuote = document.querySelector('.advice__quote');

fetch(APIUrl)
  .then(response => response.json())
  .then((data) => {
      console.log(data);
      randomQuoteNum.innerHTML = `ADVICE #${data.slip.id}`;
      randomQuote.innerHTML = `"${data.slip.advice}"`;
  } 
);