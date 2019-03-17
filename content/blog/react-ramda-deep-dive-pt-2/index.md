---
title: 'Using Ramda with React and Redux: A Functional Deep Dive - Part 2'
date: '2019-03-02T13:30'
spoiler: 'The downsides of strict functional Javascript.'
keywords: 'react, redux, ramda, functional, javascript, pipeline, programming, curry'
---

In [Part One](https://www.bmusings.io/react-ramda-deep-dive-pt-1/), we saw some of the benefits we
get from strictly adhering to basic functional principles in our frontend React and Redux
application. However, as with all engineering decisions, this comes with its own set of tradeoffs
we'll have to consider.

These tradeoffs include:

- Lack of good static typings
- Difficult developer ramp-up
- Long term enforcement

## Lack of good static typing

Ramda has type definitions for both [typescript](https://github.com/types/npm-ramda/) and
[flow](https://github.com/flow-typed/flow-typed/tree/master/definitions/npm/ramda_v0.x.x) but, to be
honest, they are not very good. While many of the functions have decent types, using these types
will often cause a type error when you are doing something perfectly valid, due to currying and the
transformation-focused nature of many of the functions in Ramda.

This leaves you with two options - either limit yourself with less expressive potential and deal
with the subpar typings, or throwaway the types altogether and accept that many of your functions
are going to be untyped. Either way, you end up in a suboptimal world compared to the usual
imperative procedural route.

That being said, there are ways to mitigate this. Given you went with the fully untyped route, you
can still manually type your functions at sensible boundaries:

```jsx
// @flow
type myObj = { foo: number, baz: boolean };
const allBazTrue: (myObj[]) => boolean = R.pipe(
  R.pluck('baz'), // untyped
  R.reduce(R.and, true), // untyped
);

allBazTrue([{ foo: 1, baz: true }]); // typed
```

However, this requires a fair amount of diligence, since neither flow nor typescript will complain
to you if you don't manually do this. In addition, this still leaves room for bugs between the
functions in your pipe. Your static type system of choice will not check that the output of your
first function matches with the expected input of your second.

If you are using a static typing system, this is probably the biggest cost you will have to weigh.

## Difficult developer ramp-up

Let's face it, object-oriented programming is still the defacto industry standard. As a result, most
other developers will likely be unfamiliar with concepts like currying, functional composition,
immutability, etc. They will think point-free style is difficult and hard to read. They will want to
go back to using objects, mutation, and for-loops.

You're going to have to help them ramp up initially. Remind them that just because something isn't
familiar, doesn't necessarily mean it's difficult or complicated. Reject a few pull requests and
explain some of these concepts. Link them to this article.

Eventually, they will get comfortable with the paradigms and become productive once again. This will
take longer than if they were starting in the average React and Redux codebase.

## Long-term enforcement

Long-term enforcement involves keeping the paradigms and patterns you went to great lengths to
establish early in the project present and enforced as the project scales and matures.

New developers are going to come in and want to do things their way. Tech debt will start to accrue
and force even the best pipelines to be torn apart and reworked. There will be that itch to go back
to working with objects, to put a little bit of logic in the component because, hey, our sprint ends
tomorrow and we have to get this done.

Make no mistake, functional paradigms are not a panacea for all the woes of maintaining a frontend
codebase. Nevertheless, they do help manage and mitigate said woes. So you will have to make some
effort to remind people of this without constantly keeping your eye on every corner of the codebase.

Lint rules go a long way here - I especially like
[Eslint's FP plugin](https://github.com/jfmengels/eslint-plugin-fp) that prevents creation of
classes, `this`, and many other things you'll want to enforce.

But at the end of the day, the best argument is results. People will go back and refactor a big
selector and, much to their surprise, find that it was easier than they thought because the
functions weren't tangled together. Have them make a change in one file and, before pushing, they
will notice their change broke something because of a failed unit test. When doing a page redesign
and they will only have to change styles rather than pull apart a ton of `shouldComponentUpdate`
logic in the process.

These scenarios should serve as your strongest piece of evidence when encouraging others to keep
pursuing functional paradigms.

## Conclusion

Due to their already functional nature, React and Redux produce myriad synergies when combined with
a few basic functional programming principles. As we have seen, these synergies, while letting you
write more terse and maintainable code, do come with their own set of tradeoffs.

If you're in a smaller team, working with people already familiar with functional programming on
primarily untyped JS, then I would highly recommend you consider this route when starting your next
frontend project. Otherwise, perhaps you can use some or all of these techniques to augment your
existing projects. Either way, it's something new and exciting to consider.
