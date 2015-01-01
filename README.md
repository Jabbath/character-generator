#Description
This module generates all possible permutations of characters within set positions in 
a string when given a possible range.

##Usage
The positions at which the characters are to be inserted are represented with '@'.
Each position must have a corresponding range placed in a flat array. These ranges can be anything in the form
of 'A-Z','a-z' or '0-9'. In fact, any characters can be used as long as the starting character
has a lower character code than the end character.

```javascript
var generator = require('character-generator');
console.log(generator('Hell@ W@rld',['l-p','0-3']));

/* Output:
[ 'Helll W0rld',
  'Helll W1rld',
  'Helll W2rld',
  'Helll W3rld',
  'Hellm W0rld',
  'Hellm W1rld',
  'Hellm W2rld',
  'Hellm W3rld',
  'Helln W0rld',
  'Helln W1rld',
  'Helln W2rld',
  'Helln W3rld',
  'Hello W0rld',
  'Hello W1rld',
  'Hello W2rld',
  'Hello W3rld',
  'Hellp W0rld',
  'Hellp W1rld',
  'Hellp W2rld',
  'Hellp W3rld' ]
*/
```

##License
MIT, see license.txt.