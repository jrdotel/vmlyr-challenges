/*
Expense Calulator - v.1 (2022)

The following is a simple program to calculate the form's data and gather enough info to create a very simple bar graph. 

This program collects all for the values of the form and performs the following operations:

    -Sum all daily values.

    -Find the highest expense day.

    -Sets percentage change based from current baalance and sum of all daily expenses.

    -Create and set bar graph heights, and add an accent color to the highest expense day.
*/
   
// Variables.
const balanceTotal = document.querySelector('#balance_total');
const percent = document.querySelector('#percent_number');
const thisMonth = document.querySelector('#current_balance');
let dailyExpense = new Object;
let highestDay = ["", 0];
let total = 0;
let percentChange = 0;

// Parse values for each field in form.
new URLSearchParams(window.location.search).forEach((value, name) => {
    if (name !== 'current') {
        dailyExpense[name] = {
           'value': value,
           'bar-height': '0px' 
        };
    }
    else {
        dailyExpense[name] = {
            'value': value,
         };
    }
});

/*
Find the highest expense day and push each value to expesenses array except for current balance.

Calculate daily bar graph heights based on the highestDay.
*/
for (e in dailyExpense) {
    if (e !== 'current') {
        total += Number(dailyExpense[e]['value']);
        
        if (highestDay[1] < Number(dailyExpense[e]['value'])) {
            highestDay[0] = e;
            highestDay[1] = Number(dailyExpense[e]['value']);
        }
    }
}

// for (e in dailyExpense) {

// }

// Get the percent difference from last month.
let currentBalance = Number(dailyExpense.current.value);
percentChange = ((total/currentBalance)*100).toFixed(1);


/*

Push data to html.

*/
// TODO: Fix single decimal edgecase.
// // Clean up data. Function used from: http://jsfiddle.net/jhKuk/159/
// function addZeroes(num) {
//     var value = Number(num);
//     var res = num.split(".");
//     if(res.length == 1 || (res[1].length < 3)) {
//         value = value.toFixed(2);
//     }
//     return value
// }

let userTotal = ((currentBalance+total)*100/100).toFixed(2);
balanceTotal.innerHTML = '$' + userTotal;
percent.innerHTML = ((percentChange >= 0) ? '+' : '-') + percentChange + '%';
thisMonth.innerHTML = '$' + total;



// Uncomment necessary lines for debugging.
console.log(dailyExpense);    
console.log(total);
console.log(highestDay);
console.log(percentChange);
console.log(userTotal);