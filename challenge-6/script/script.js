// Variables.
let dailyExpense = new Object;
let expenses = [];
let highestDay = ["", 0];
let total = 0;
let percentChange = 0;

// Parse values for each field in form.
new URLSearchParams(window.location.search).forEach((value, name) => {
    dailyExpense[name] = value;
});

// Find the highest expense day and push each value to expesenses array.
for (let e in dailyExpense) {
    expenses.push(dailyExpense[e]);

    if (highestDay[1] < Number(dailyExpense[e])) {
        highestDay[0] = e;
        highestDay[1] = Number(dailyExpense[e]);
    }
}

// Convert each string and get sum of array.
for (let i=0; i<expenses.length; i++) {
    total += Number(expenses[i]);
}

// Get the percent difference from last month.
let balance;
percentChange = total/balance*100;





console.log(dailyExpense);    
console.log(expenses);
console.log(total);
console.log(highestDay);
console.log(percentChange);