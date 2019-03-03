---
title: 'Using Ramda with React and Redux: A Functional Deep Dive - Part 1'
date: '2019-03-01T13:30'
---

Functional programming is all the rage amongst javascript developers these days. With the recent
addition of React hooks, it's now possible to have a frontend codebase without using a single class.
In addition, Redux and React already encourage a functional style of programming with things like
stateless components, transactional state, and middleware for isolation of side-effects. This leads
to an interesting prospect: what if we go all-in on functional programming for our frontend project?

In this post, we'll go through some of benefits of this approach, enumerating some of the useful
patterns, coding conventions, and effects on maintainability that strict declarative and functional
JS gets you, as well as calling out some of the concessions you'll be making compared to a more
procedural or object-oriented style.

## The Status Quo

In my experience, the average frontend React and Redux codebase suffers from a handful of common
issues:

### Components have too much logic embedded in them

View logic is usually tangled up with rerender and data processing or fetching logic. This makes
components hard to reason about, refactor, and maintain. Because these are usually class components,
it also leaves room open for more junior or full-stack engineers without a strong grasp of frontend
best practices to start storing application state in `state` or worse, `this`.

### Reducers are hard to reason about

Large reducers tend top use the canonical `switch` statement along with some heavy procedural data
manipulation, usually with loops and local mutation. This leads to bugs when things accidentally get
mutated when they aren't supposed to and thus relevant components fail to rerender.

### Underutilizing selectors

Too many components and connected containers have to dig into and process various aspects of state
to get to the data they want, thus forcing them to embed knowledge of the current structure of your
state object. This makes reducers doubly hard to refactor since these two things get tangled
together.

As the codebase scales, many of these negative aspects tend to become more exacerbated and developer
productivity starts to slow down. After seeing this a few times, you start to ask yourself - can we
do better?

## Going All-In

I'm not going to try to convince of the benefits of functional programming. If you want to be
convinced, you can check out

- [Why functional programming matters](https://www.cs.kent.ac.uk/people/staff/dat/miranda/whyfp90.pdf)
- [Why curry helps](https://hughfdjackson.com/javascript/why-curry-helps/)
- [An introduction to functional programming in Javascript](https://github.com/getify/Functional-Light-JS)

I claim that **heavily applying the following functional paradigms to our frontend application helps
us mitigate and in some cases solve all of the aforementioned problems:**

- Functional composition
- Data immutability
- Function purity and segregation of side-effects

### Functional Composition

Functional composition encourages the creation of small, general purpose functions that are composed
together to create larger and more complex functions. For example:

<!-- prettier-ignore -->
```jsx
const sliceString = (string, start, end) => string.slice(start, end);
const stringHead = string => sliceString(string, 0, 1);

const isA = character => ['a', 'A'].includes(character);
const isHeadA = string => isA(stringHead(string));

isHeadA("ant") // true

// to do this pattern more generally, we can use compose
const isHeadA = compose(
  isA,
  stringHead,
);

// or in reverse order, pipe, which lets us 
// pipe our input through functions from top to bottom
const isHeadA = pipe(
  stringHead,
  isA,
);
```

This technique can be used in both component containers and selectors to both share common logic
between and segregate application logic from your containers and components.

### Function Purity and Segregation of Side-Effects

All functions in our application are pure, with the exception of middleware for things like network
requests or I/O. In this case, we maintain a strict convention of segregating our side-effectful
calls from the pure computation that influences their results. Our functional core does all the
heavy lifting and logic, and the result is passed to a dumb API that produces a side-effect with the
result given to it by the functional core, i.e. our reducers.

In other words, data transformation only happens in pure functions, never in a a side-effectful one.
[Gary Bernhardt](https://www.destroyallsoftware.com/talks/boundaries) has a great talk on this that
I highly encourage you to check out.

### Data immutability

To change a piece of data, you must always return a new instance of that data type. Methods like
`.push` on arrays and setting properties on existing objects are not allowed.

```jsx
const array = [1];
const object = {};

// bad
array.push(2);
object.prop = 2;

// good
const newArray = array.concat(2) /* or */ [...array, 2];
const newObject = { ...object, prop: 2 };
```

This will prevent us from ever running into rerendering bugs, and generally most errors caused by
implicit data mutation. If you've ever had an async callback mess with an object you were working on
in the middle of a function, you'll know what I'm talking about.

## The Tools

Here is where [Ramda](https://ramdajs.com/) comes in. Ramda is a javascript utility library for
functional styling programming, focusing on creating data pipelines.

Each function is curried, never mutates its input, and accepts the data to be operated on as a its
last parameter. This gives us immutability, easy function composition, and helps to segregate side
effects for us right out of the box. You can read more on the philosophy of the library
[here](https://fr.umio.us/the-philosophy-of-ramda/).

As we will see, these patterns end up having an exceptional synergy with many of the patterns in
React and Redux. We'll be making use of Ramda extensively in our examples, and as a result, will be
writing many of our functions as pipelines in a
[point-free style](https://en.wikipedia.org/wiki/Tacit_programming).

Keep in mind, we don't necessarily need Ramda. The code in the rest of this article can be written
with any functional library, or even with standard JS functions and a little bit of diligence. This
is about applying general functional programming paradigms, not a tutorial on the library itself.
I've just found Ramda to be the best bang for your buck when it comes to executing functional
programming right in Javascript.

---

## Code

Now that we've established our game plan, lets see how it plays out.

### Selectors

The majority of our selectors are simple pipelines within a `createSelector` if we're using
[reselect](https://www.npmjs.com/package/reselect):

```jsx
/**
 *  Lets say our state looks something like
 *  {
 *    homePrices: [
 *     { isForSale: true, price: 1000 },
 *     { isForSale: false, price: 2000 },
 *     ...,
 *    ],
 *    analytics: {
 *      pages: {
 *        landing: {
 *          hasBeenViewed: true,
 *          hasSignedUp: false,
 *        },
 *      },
 *    },
 *  }
 *
 */
const getHomePriceSelector = ({ homePrices }) => homePrices;
const getAnalyticsSelector = ({ analytics }) => analytics;

// Simple paths selectors
const getHasUserSignedUp = createSelector(
  getAnalyticsSelector,
  R.path(['pages', 'landing', 'hasSignedUp']),
);

const getHasUserViewedLanding = createSelector(
  getAnalyticsSelector,
  R.path(['pages', 'landing', 'hasBeenViewed']),
);

// Point-free composition of selectors
const getUserHasViewedAndSignedUp = createSelector(
  getHasUserSignedUp,
  getHasUserViewedLanding,
  R.and,
);

// More complicated filter / reduce pipeline
const getTotalValueOfHomesForSale = createSelector(
  getHomePriceSelector,
  R.pipe(
    R.filter(R.prop('isForSale')),
    R.pluck('price'),
    R.reduce(R.add, 0),
  ),
);
```

We can use Ramda's object utilities to dig into nested state for simple reducers, compose selectors
cleanly, and create data pipelines that scale to an arbitrary number of steps.

Since selectors are unary functions of `state -> someData`, they fit extremely well with our
pipeline model. In addition, since Ramda never mutates data, we can have faith that memoization will
always work as intended and won't cause unnecessary rerenders in our receiving components.

Because all our functions are pure, factoring out common logic between selectors is also a breeze:

```jsx
// Factor our some logic
const getHomesForSale = createSelector(
  getHomePriceSelector,
  R.filter(R.prop('isForSale')),
);

const getAreHomesForSale = createSelector(
  getHomesForSale,
  R.complement(R.isEmpty),
);

// More complicated filter / reduce pipeline
const getTotalValueOfHomesForSale = createSelector(
  getHomeForSale,
  R.pipe(
    R.pluck('price'),
    R.reduce(R.add, 0),
  ),
);
```

This makes selectors easy to maintain, test, and reason about.

In general, the point-free notation, while sometimes hard to reason about (having
`x => console.log(x) || x` is a great debugging tool to stick in pipelines), makes it harder for
other developers to come in and introduce mutation and potential bugs into your pipeline without a
large rewrite and significant understanding of FP practices.

It makes it easy to add additional steps in your pipeline, and otherwise creates a slight barrier to
entry that protects your code from being muddled back into an imperative style, which, if you are
working in a section of a larger codebase without as strict standards, is a very good defence to
have.

### Reducers

Reducers are where some really strong Redux + Ramda synergies start to arise. Lets start by taking
the `createReducer` tool that is popularly used to reduce (pun intended) `switch` statement
boilerplate

<!-- prettier-ignore -->
```jsx
const createReducer = (initialState, handlers) => (
  state = initialState,
  action,
) =>
  handlers.hasOwnProperty(action.type)
    ? handlers[action.type](state, action)
    : state;
```

This lets us write our reducers in a more declarative style

```jsx
const myReducer = createReducer(INITIAL_STATE, {
  [MY_ACTION]: (state, action) => ...reducer logic
});
```

This also fits really well with Ramda, since most reducer work is just setting some object value or
data processing:

```jsx
const taxFormReducer = createReducer(INITIAL_STATE, {
  // Setting a field
  [SET_MARRIAGE_STATUS]: (state, action) =>
    R.assocPath(['form1090', 'marriageStatus'], action.status, state),
  // Append to a list
  [ADD_EXEMPTION]: (state, action) =>
    R.evolve(
      {
        exemptions: R.append(action.exemption),
      },
      state,
    ),
  // Deep merging
  [IMPORT_W2]: (state, action) => R.mergeDeepLeft(action.w2JSON, state),
});
```

After doing this a few times, we start to see a pattern emerge. Since Ramda has a data last
philosophy, **all of our reducer functions take state as a final parameter**. What if we could
embrace this pattern and pass state to these handlers implicitly?

Since Ramda functions are all curried, omitting `state` as a final parameter in our handlers would
turn our handlers from a function `(state, action) -> state` to `(state, action) -> state -> state`.
We can then swap the argument order and curry our handler itself to get a function
`action -> state -> state`, letting us write handlers like

<!-- prettier-ignore -->
```jsx
const taxFormReducer = createReducer(INITIAL_STATE, {
  // Setting a field
  [SET_MARRIAGE_STATUS]: action => R.assocPath(
    ['form1090', 'marriageStatus'], 
    action.status,
   ),
  // Append to a list
  [ADD_EXEMPTION]: action =>
    R.evolve({
      exemptions: R.append(action.exemption),
    }),
  // Deep merging
  [IMPORT_W2]: action => R.mergeDeepLeft(action.w2JSON),
});
```

We can easily write a modified utility, `createCurriedReducer` to let us write reducers like this:

<!-- prettier-ignore -->
```jsx{7}
const createCurriedReducer = (initialState, handlers) => (
  state = initialState,
  action,
) =>
  handlers.hasOwnProperty(action.type)
    // swap the argument order and expect a curried handler
    ? handlers[action.type](action)(state) 
    : state;
```

**This lets us write reducers by simply declaring the data transformation we want to apply to our
state and the utility takes care of applying it for us.**

No more worrying about accidental data mutation!

As usual, there is also an escape hatch for when you need to access some data from the previous
state to inform your transformation:

<!-- prettier-ignore -->
```jsx{3}
const taxFormReducer = createReducer(INITIAL_STATE, {
  // Gives you access to state in your reducer again
  [ADD_EXEMPTION]: action => state =>
    R.evolve({
      exemptions: state.exemptions < MAX_EXEMPTIONS 
        ? R.append(action.exemption)
        : R.identity
    }, state),
});
```

### Containers and Components

Stateless functional components, by definition, most naturally lend themselves to a function style
of programming already:

```jsx
// Simply a unary function props -> jsx
const myComponent = ({ props }) => <div>Hello {props.username}</div>;
```

So where functional paradigms add a lot of utility is in containers and higher order components.
Lets take a basic connected container component

```jsx
import VideoPlaybackComponent from 'components/VideoPlayback.react';

const mapStateToProps = state => ({
  username: getUsername(state),
  currentVideoUrl: getCurrentVideoUrl(state),
  videoRating: getVideoRating(state),
});

// using the shorthand syntax
const mapDispatchToProps = {
  playVideo: actions.play,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VideoPlaybackComponent);
```

The first thing to notice here is that the component and the container live in separate files. This
helps to enforce a boundary between your view code (the component) and your controller (the
container). Even though `connect` is a function, it essentially is creating a higher order component
when called with `mapStateToProps` and `mapDispatchToProps`, thus we put it in a different file.

One thing to notice here is that `connect` is curried - calling it with those two arguments returns
another function that then expects a react component to wrap. We can take advantage of this when we
want to add additional functionality to our component beyond `connect`ing it to state and dispatch.
We'll use [recompose](https://github.com/acdlite/recompose) in our examples, but everything here can
also be done with hooks.

Lets say we want to add some state handlers, a substitution for using `setState` within a class
component. Since containers are also unary functions, `component -> component`, we can once again
use a pipeline. Oh, and lets say we want to make it a pure component as well:

```jsx{13-23}
import VideoPlaybackComponent from 'components/VideoPlayback.react';
import { pure, withStateHandlers } from 'recompose';

const mapStateToProps = state => ({
  username: getUsername(state),
  currentVideoUrl: getCurrentVideoUrl(state),
  videoRating: getVideoRating(state),
});

// using the shorthand syntax
const mapDispatchToProps = { playVideo: actions.play };

export default R.pipe(
  pure,
  withStateHandlers(...),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(VideoPlaybackComponent);
```

Now, our component is pure, wrapped in some state handlers, and connected to our Redux store.
Additional HOCs can be added by just adding another line to our `pipe`. This leads to more modular
and composable HOCs that fit within the context of a pipe. You could easily imagine the same pattern
extending to data fetching, perhaps with GraphQL, or with some manual DOM handlers if really needed
to keep pure react code separated from escape hatch imperative DOM manipulation via `refs`.

We can also notice another patterns in the typical `mapStateToProps` - it's just an object spec that
applies various functions to the same input argument. Ramda has a utility for that, `applySpec`:

```jsx
const mapStateToProps = state => ({
  username: getUsername(state),
  currentVideoUrl: getCurrentVideoUrl(state),
  videoRating: getVideoRating(state),
});

// becomes...

const mapStateToProps = R.applySpec({
  username: getUsername,
  currentVideoUrl: getCurrentVideoUrl,
  videoRating: getVideoRating,
});
```

Once again letting us write our containers in a laconic point-free style.

### Testing

One of the biggest benefits of a functional style is testability. In order to test a pure function,
all you have to do is give it an input, and check it's output. Since all of our functions doing
computation of interest are pure. Testing becomes a breeze. Lets look at testing reducers, as you
would normally do it:

```jsx
describe('my test', () => {
  it('passes', () => {
    const initialState = getInitialState();
    const state = reduce(initialState, myAction);
    expect(selector(state)).toBe(whatever);
  });
});
```

As you can see, in order to test a reducer, all you have to do is `reduce` some initial state and an
action, and check some value of your state.

What happens when you want to apply multiple actions in one test?

```jsx
describe('my test', () => {
  it('passes', () => {
    const initialState = getInitialState();
    let state = reduce(initialState, myAction);
    state = reduce(state, mySecondAction);
    state = reduce(state, myThirdAction);
    expect(selector(state)).toBe(whatever);
  });
});
```

This starts to become rather repetitive. Lets create a function, `applyActions`, that lets us pass
in an array of actions to be applied in order:

<!-- prettier-ignore -->
```jsx
describe('my test', () => {
  it('passes', () => {
    const state = applyActions(getInitialState(), [
      myAction, 
      mySecondAction, 
      myThirdAction,
    ]);
    expect(selector(state)).toBe(whatever);
  });
});
```

How do we do it? Currying of course!

```jsx
const applyActions = R.reduce(reduce);
```

That's it. Calling `R.reduce` with a single reducer argument returns a two argument function that
takes in the start state, and a list of values to reduce. In our case, that's just `initialState`
and our actions.

**In general, as long as we listen to Gary Bernhardt's advice and maintain a boundary between our
pure, functional core and our side-effectful interface to the user, testing remains trivial and
efficient.**

This is especially important to keep in mind if you are writing you domain-specific library
yourself, since you have the opportunity to define these boundaries as you go.

## The Tradeoffs

Now that we've seems some of the benefits of this approach, part two will discuss the tradeoffs
we'll have to make to get these benefits.
