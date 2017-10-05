## Cruiser Utilities

Often times, the biggest challenge with reduces comes from trying to keep your state immutable.  Since actions are just factories that create new reducers to manipulate state, we can use generic utilities to create these reducers for us that will keep our data immutable only on the parts of the tree that have actually changed.

## Getting Started

Install via `npm`:

```
npm install --save cruiser-utils
```

## Usage

```ts
import { createStore } from "cruiser";
import { pushItems } from "cruiser-utils";

/**
 * Step 1 - Create a store with a store with a complex
 *          state model (for example purposes).
 */
var store = createStore({
  todosPage: {
    loaded: false,
    todos: ["Write Example"],
  },
});

/**
 * Step 2 - Create a reducer that pushes new array items
 *          onto the nested `todos` array.
 */
var addTodos = pushItems((...todos) => ({
  todosPage: {
    todos: todos,
  },
}));

/**
 * Step 3 - Invoke the newly created function and pass it
 *          to our store's `.reduce()` method.
 */
store.reduce(addTodos("Write Better Examples", "Go Outside"));

/**
 * Step 4 - PROFIT.  The result should contain the nested
 *          `todos` array with the values:
 *
 *          ["Write Example", "Write Better Examples", "Go Outside"]
 */
console.log(store.getState());
```

## Operations

### Push Array Items

Merge found array values into the arrays found at the same branch locations.

```ts
import { pushItems } from "cruiser-utils";

var addTodo = pushItems(function (newTodo) {
  return { todos: [newTodo] };
});

addTodo("Push value onto todos");
```

### Remove Array Items

Remove found array values from the arrays found at the same branch locations.

```ts
import { removeItems } from "cruiser-utils";

var completeTodos = removeItems(function (removeTodo) {
  return { todos: [removeTodo] };
});

completeTodos("Delete any todo with this value");
```