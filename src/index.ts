export interface PatchProvider {
  (...args: any[]): any;
}

export interface PatchIteratee {
  (patch: any, current: any): any;
}

export interface Reducer {
  (state: object): object;
}

export interface Action {
  (...args: any[]): Reducer;
}

/**
 * Returns true if the given value is a non-null, non-array
 * object type.
 */
function isObject(val: any): boolean {
  return (val && !Array.isArray(val) && typeof val === "object");
}

/**
 * Walk the given patch object and run the given function with the
 * current state's value for that tree node.
 */
export function patchTree(
  patch: object,
  state: object,
  iteratee: PatchIteratee
): object {
  var output = {};
  for (var k in patch) {
    if (patch && typeof patch === "object") {
      output[k] = patchTree(patch[k], state[k], iteratee);
    } else {
      output[k] = iteratee(patch[k], state[k]);
    }
  }
  return output;
}

/**
 * Concats the array value of B with the array value of A.
 */
function concatInto(a: any[], b: any[]): any[] {
  return (Array.isArray(b) ? b.concat(a) : a);
}

/**
 * Filters all values matching a from array b.
 */
function filterFrom(a: any, b: any[]): any[] {
  return (Array.isArray(b) ? b.filter(x => x !== a) : []);
}

/**
 * Performs a shallow merge with state using the object returned from the
 * given patch function.  Note that the given type signature is
 * for the return type - the given patch method receives the current
 * state as the first argument and the arguments specified in the signature
 * afterwards to avoid uneccessary function calls.
 */
export function shallow<F extends PatchProvider>(patch: PatchProvider): F {
  return function (...args: any[]): Reducer {
    return function (state: object): object {
      return Object.assign({}, state, patch(state, ...args));
    };
  } as F;
}

/**
 * Pushes the array values to the existing array at the same object field.
 *
 * Example:
 *
 * var addTodo = pushItems(todo => ({ todos: [todo] }));
 *
 * addTodo("foo"); // state -> { todos: ["foo"] }
 * addTodo("bar"); // state -> { todos: ["foo", "bar"] }
 */
export function pushItems<F extends PatchProvider>(patch: F): F {
  return function(...args: any[]): Reducer {
    return function(state: object): object {
      return patchTree(patch(...args), state, concatInto);
    };
  } as F;
}

/**
 *
 */
export function removeItems<F extends PatchProvider>(patch: F): F {
  return function(...args: any[]) {
    return function(state: object): object {
      return patchTree(patch(...args), state, filterFrom);
    };
  } as F;
}