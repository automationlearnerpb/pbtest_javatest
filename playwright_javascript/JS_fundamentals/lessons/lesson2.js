//concatenation of strings
let price = 10;
let item = "book";
let message = "The price of the " + item + " is $" + price + ".";
console.log("The price of the " + item + " is $" + price + "." +
    "mulytiple lines example.");

console.log(message);

//interpolation of strings using template literals
let quantity = 3;
let total = price * quantity;
let interpolatedMessage = `You have ordered ${quantity} ${item}s. The total price is $${total}.`;
console.log(interpolatedMessage);
console.log(`Total price for ${quantity} ${item}s: $${price * quantity}`);
console.log(`Total price for ${quantity} ${item}s: $${price * quantity}
    including tax.`);


//objects and accessing properties. Objects are key-value pairs.
//You can access properties using dot notation or bracket notation.
let car = {
    make: "Toyota",
    model: "Camry",
    year: 2020,
    color: "blue"
};
console.log("Car Make: " + car.make);
console.log("Car Model: " + car["model"]);

//arrays and accessing elements
let fruits = ["apple", "banana", "cherry"];
console.log("First Fruit: " + fruits[0]);
console.log("Second Fruit: " + fruits[1]);

//loose comparison vs strict comparison. In loose comparison only values are compared, 
// in strict comparison both value and type are compared.
let num1 = 5; //number
let str1 = "5"; //string

console.log("Loose Equality (==): " + (num1 == str1)); //true
console.log("Strict Equality (===): " + (num1 === str1)); //false