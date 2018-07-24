Set Operations
```javascript
_.intersection([2, 1], [2, 3]);
// => [2]
_.union([2], [1, 2]);
// => [2, 1]
```

Unique
```javascript
_.uniq([2, 1, 2]);
// => [2, 1]
```

GroupBy Using key
```javascript
// The `_.property` iteratee shorthand.
_.groupBy(['one', 'two', 'three'], 'length');
// => { '3': ['one', 'two'], '5': ['three'] }
```

GroupBy Using function
```javascript
_.groupBy([6.1, 4.2, 6.3], Math.floor);
// => { '4': [4.2], '6': [6.1, 6.3] }
```

Flatten Array Multilevel
```javascript
// infinite deep
_.flattenDeep([1, [2, [3, [4]], 5]]);
// => [1, 2, 3, 4, 5]

// known depth
var array = [1, [2, [3, [4]], 5]];
 
_.flattenDepth(array, 1);
// => [1, 2, [3, [4]], 5]
 
_.flattenDepth(array, 2);
// => [1, 2, 3, [4], 5]
```

Debounce
```javascript
function validateEmail() {
    // Validate email here and show error message if not valid
}

var emailInput = document.getElementById("email-field");
emailInput.addEventListener("keyup", _.debounce(validateEmail, 500));
// function will execute 500ms after the last keystroke
```

Create Key over an array of objects
```javascript
ar posts = [
    { id: "1abc", title: "First blog post", content: "..." },
    { id: "2abc", title: "Second blog post", content: "..." },
    // more blog posts
    { id: "34abc", title: "The blog post we want", content: "..." }
    // even more blog posts
];

posts = _.keyBy(posts, "id");

var post = posts["34abc"]
// post -> { id: "34abc", title: "The blog post we want", content: "..." }
```

Extract a subset from an object
```javascript
var object = { 'a': 1, 'b': '2', 'c': 3 };
 
_.pick(object, ['a', 'c']);
// => { 'a': 1, 'c': 3 }

var object = { 'a': 1, 'b': '2', 'c': 3 };
 
_.pickBy(object, _.isNumber);
// => { 'a': 1, 'c': 3 }
```

Random Sampling from array
```javascript
var luckyDraw = ["Colin", "John", "James", "Lily", "Mary"];

// Lodash - Getting 2 random item
_.sample(luckyDraw, 2); // ['John','Lily']
// without the second argument, default to one sample
```

IE Polyfills
```javascript
Object.assign = _.assign
Array.reduce = _.reduce

```