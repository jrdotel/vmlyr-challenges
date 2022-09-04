/*
Expense Calulator - v.1 (2022)

The following is a simple program to calculate the form's data and gather enough info to create a very simple bar graph. 

This program collects all for the values of the form and performs the following operations:

    -Sum all daily values.

    -Find the highest expense day.

    -Sets percentage change based from current balance and sum of all daily expenses.

    -Create and set bar graph heights, and add an accent color to the highest expense day(s).
*/
   
// Variables.
const balanceTotal = document.querySelector('#balance_total');
const percent = document.querySelector('#percent_number');
const thisMonth = document.querySelector('#current_balance');
const mon = document.querySelector('#monday').style;
const tue = document.querySelector('#tuesday').style;
const wed = document.querySelector('#wednesday').style;
const thu = document.querySelector('#thursday').style;
const fri = document.querySelector('#friday').style;
const sat = document.querySelector('#saturday').style;
const sun = document.querySelector('#sunday').style;
let dailyExpense = new Object;
let highestDay = ['', 0];
let total = 0;
let percentChange = 0;

// Parse values for each field in form.
new URLSearchParams(window.location.search).forEach((value, name) => {
    if (name !== 'current') {
        dailyExpense[name] = {
           'bar_value': Number(value),
           'bar_height': '0px',
           'bar_color': '#ec755d' 
        };
    }
    else {
        dailyExpense[name] = {
            'bar_value': Number(value),
         };
    }
});

/*
Find the highest expense day and push each value to expesenses array except for current balance.

Calculate daily bar graph heights based on the highestDay.
*/
for (e in dailyExpense) {
    if (e !== 'current') {
        total += dailyExpense[e]['bar_value'];

        if (highestDay[1] <= dailyExpense[e]['bar_value']) {    
            if (highestDay[0] === '') {
                highestDay[0] = e;
                highestDay[1] = dailyExpense[e]['bar_value'];
                dailyExpense[e]['bar_height'] = '120px';
                dailyExpense[e]['bar_color'] = '#76b5bc';
            }
            else {
                // Reset bar_height if needed.
                (highestDay[1] === dailyExpense[e]['bar_value']) ?
                dailyExpense[highestDay[0]]['bar_height'] = '120px' :
                dailyExpense[highestDay[0]]['bar_height'] = '0px';
                // Reset bar_color if needed.
                (highestDay[1] === dailyExpense[e]['bar_value']) ?
                dailyExpense[highestDay[0]]['bar_color'] = '#76b5bc' :
                dailyExpense[highestDay[0]]['bar_color'] = '#ec755d';
                // Set new highestDay values.
                highestDay[0] = e;
                highestDay[1] = dailyExpense[e]['bar_value'];
                dailyExpense[e]['bar_height'] = '120px';
                dailyExpense[e]['bar_color'] = '#76b5bc';
            }
        }
    }
}

for (e in dailyExpense) {
    if (e !== highestDay[0] && e !== 'current') {
        let day = dailyExpense[e]['bar_value'];
        let size = ((day*100)/highestDay[1]).toFixed(1);
        console.log(size)
        let pixel = ((size*120)/100).toFixed(2);
        console.log(pixel)
        dailyExpense[e]['bar_height'] = `${pixel}px`;
    }
}

// Get the percent difference from last month.
let currentBalance = dailyExpense.current.value;
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

/*

Push px sizes and color for bar graphs.

*/
// Monday.
mon.setProperty('--height', `${dailyExpense['monday']['bar_height']}`);
mon.setProperty('--color', `${dailyExpense['monday']['bar_color']}`);
// Tuesday.
tue.setProperty('--height', `${dailyExpense['tuesday']['bar_height']}`);
tue.setProperty('--color', `${dailyExpense['tuesday']['bar_color']}`);
// Wednesday.
wed.setProperty('--height', `${dailyExpense['wednesday']['bar_height']}`);
wed.setProperty('--color', `${dailyExpense['wednesday']['bar_color']}`);
// Thursday.
thu.setProperty('--height', `${dailyExpense['thursday']['bar_height']}`);
thu.setProperty('--color', `${dailyExpense['thursday']['bar_color']}`);
// Friday.
fri.setProperty('--height', `${dailyExpense['friday']['bar_height']}`);
fri.setProperty('--color', `${dailyExpense['friday']['bar_color']}`);
// Saturday.
sat.setProperty('--height', `${dailyExpense['saturday']['bar_height']}`);
sat.setProperty('--color', `${dailyExpense['saturday']['bar_color']}`);
// Sunday.
sun.setProperty('--height', `${dailyExpense['sunday']['bar_height']}`);
sun.setProperty('--color', `${dailyExpense['sunday']['bar_color']}`);



// Uncomment necessary lines for debugging.
console.log(dailyExpense);    
console.log(total);
console.log(highestDay);
console.log(percentChange);
console.log(userTotal);