## Cruiser Utilities

Often times, the biggest challenge with reduces comes from trying to keep your state immutable.  Since actions are just factories that create new reducers to manipulate state, we can write generic utilities that perfom common operations safely on our behalf.

### Push to Array

An incredibly common operation, typically resolved using `.concat()`.  Takes a function that receives the arguments provided and uses the returned value as a "patch" to perform the push-style operations.  If you have nested

```js
import { pushArray } from "cruiser-utils";

var addTodo = pushArray((...todos) => { todos });

addTodo("Mow the lawn", "Walk the dog");
```


```ts
import { createStore } from "cruiser";
import { alterNode } from "cruiser-utils";

var store = createStore({ foo: { bar: true } });

var toggleFooBar = alterNode("foo.bar", val => !val);
```