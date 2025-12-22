function print() {
    console.log("Hello, World!");
}

print();


//Anonymous function assigned to a variable
let greet = function(name) {
    console.log (`Hello, ${name}!`);
}

greet("Pallavi")


//ES6 Arrow function
let add = (a, b) => {
    console.log( a + b);
}

add(5, 10);