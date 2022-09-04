/*
**********************************************************************
**********************************************************************
Expense Calculator - v.1 (2022)

The following is a simple program to calculate the form's data and gather enough info to create a very simple bar graph. 

This program collects all for the values of the form and performs the following operations:

    -Sum all daily values.

    -Find the highest expense day.

    -Sets percentage change based from current balance and sum of all daily expenses.

    -Create and set bar graph heights, and add an accent color to the highest expense day(s).
**********************************************************************
**********************************************************************
*/

/*
***********
Variables.
***********
*/

const balance_total = document.querySelector('#balance_total');
const percent = document.querySelector('#percent_number');
const this_month = document.querySelector('#current_balance');
let daily_expense = new Object;
let highest_day = ['', 0];
let percent_change = 0;
let primary_color = '#ec755d';
let secondary_color = '#76b5bc'
let total = 0;

/*
************************************
Parse values for each field in form.
************************************
*/

new URLSearchParams(window.location.search).forEach((value, name) => {
    if (name !== 'current') {
        daily_expense[name] = {
           'bar_value': Number(value),
           'bar_height': '0px',
           'bar_color': primary_color 
        };
    }
    else {
        daily_expense[name] = {
            'bar_value': Number(value),
         };
    }
});

/*
************************************************************************************************
Find the highest expense day and push each value to expesenses array except for current balance.

Calculate daily bar graph heights based on the highest_day.
************************************************************************************************
*/

// Loop through dail_expense and set values for highest_day bar_height, and bar_color.
for (e in daily_expense) {
    if (e !== 'current') {
        total += daily_expense[e]['bar_value'];

        if (highest_day[1] <= daily_expense[e]['bar_value']) {  
            // Check if highest_day is initial value.  
            if (highest_day[0] === '') {
                highest_day[0] = e;
                highest_day[1] = daily_expense[e]['bar_value'];
                daily_expense[e]['bar_height'] = '120px';
                daily_expense[e]['bar_color'] = secondary_color;
            }
            else {
                // Reset bar_height if needed.
                (highest_day[1] === daily_expense[e]['bar_value']) ?
                daily_expense[highest_day[0]]['bar_height'] = '120px' :
                daily_expense[highest_day[0]]['bar_height'] = '0px';
                // Reset bar_color if needed.
                (highest_day[1] === daily_expense[e]['bar_value']) ?
                daily_expense[highest_day[0]]['bar_color'] = secondary_color :
                daily_expense[highest_day[0]]['bar_color'] = primary_color;
                // Set new highest_day values.
                highest_day[0] = e;
                highest_day[1] = daily_expense[e]['bar_value'];
                daily_expense[e]['bar_height'] = '120px';
                daily_expense[e]['bar_color'] = secondary_color;
            }
        }
    }
}

for (e in daily_expense) {
    if (e !== highest_day[0] && e !== 'current') {
        let day = daily_expense[e]['bar_value'];
        let size = ((day*100)/highest_day[1]).toFixed(1);
        let pixel = ((size*120)/100).toFixed(2);
        daily_expense[e]['bar_height'] = `${pixel}px`;
    }
}

// Get the percent difference from last month.
let current_balance = daily_expense.current.bar_value;
percent_change = ((total/current_balance)*100).toFixed(1);


/*
******************
Push data to html.
******************
*/

// Clean and push total.
let user_total = ((current_balance+total)*100/100).toFixed(2);
balance_total.innerHTML = '$' + user_total;
// Clean and push percentage.
percent.innerHTML = ((percent_change >= 0) ? '+' : '-') + percent_change + '%';
// Clean and push current total.
total = ((total*100)/100).toFixed(2);
this_month.innerHTML = '$' + total;

/*
***************************************
Push px sizes and color for bar graphs.
***************************************
*/

// Loop through whole_week, and set daily_expense bar_height and bar_color if needed
const whole_week = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
for (day in whole_week) {
    let style = document.querySelector('#'+`${whole_week[day]}`).style;
    style.setProperty('--height', `${daily_expense[`${whole_week[day]}`]['bar_height']}`);
    style.setProperty('--color', `${daily_expense[`${whole_week[day]}`]['bar_color']}`);
}

/*
****************************************
Uncomment necessary lines for debugging.
****************************************
*/

// console.log(daily_expense);    
// console.log(total);
// console.log(highest_day);
// console.log(percent_change);
// console.log(user_total);