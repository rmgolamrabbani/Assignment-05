

    - 1️⃣ What is the difference between var, let, and const?
    - 2️⃣What is the spread operator (...)?
    - 3️⃣ What is the difference between map(), filter(), and forEach()?
    - 4️⃣ What is an arrow function?
    - 5️⃣ What are template literals?



1-
The difference between var, let, and const-

var, let, and const are used in JavaScript to declare variables, but they behave differently in terms of scope, re-declaration, and reassignment.

var is the old way to declare variables in JavaScript (before ES6).
Function scoped
Can be re-declared
Can be re-assigned
Hoisted to the top of its scope


let was introduced in ES6 and is a better alternative to var.
Block scoped
Can be re-assigned
Cannot be re-declared in the same scope
Hoisted but cannot be used before declaration



const is used to declare constant variables.

Block scoped
Cannot be re-declared
Cannot be re-assigned
Must be initialized when declared



2-

The spread operator (...) is used to expand or unpack elements from an array, object, or iterable into individual elements.

By using this mathod we can do ,

Copy arrays or objects
Merge arrays or objects
Pass array elements as function arguments


3-

map(), filter(), and forEach() methods used to loop through arrays, but they have different purposes and return values.


map() is used to create a new array by transforming each element of the original array.

-Returns a new array
-The length stays the same


filter() is used to select elements that match a condition.

-Returns a new array
-The length may be smaller


forEach() is used to loop through an array, but it does not return a new array.

-Used for side effects (logging, updating values, API calls, etc.)



4-

An arrow function is a shorter and modern way to write functions.
It uses the arrow (=>) syntax.

Example:
const greet = name => "Hello " + name;



5-

Template Literals are JavaScript strings written with backticks (``) that allow variable interpolation (${}), expressions, and multi-line strings.This feature is used to create strings more easily and dynamically.





