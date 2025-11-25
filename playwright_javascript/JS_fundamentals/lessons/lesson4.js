import { CustomerDetails } from "../helpers/printhelper.js";
var customer = new CustomerDetails();
customer.printName("John Doe");
customer.printName(customer.reverseArray([1,2,3,4,5]))
customer.rotateRight([10,20,30,40,50], 1);