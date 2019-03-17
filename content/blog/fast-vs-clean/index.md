---
title: 'The Fast Versus Clean Tradeoff'
date: '2019-03-17T16:00'
spoiler: "Are you taking the wrong approach to your code's quality?"
keywords: 'code, quality, hack, quick, dirty, slow, clean'
---

Frustrated by that one person on your dev team who always takes twice as long to finish a feature as
the the rest of the team? They’ll write tests, clear documentation, and refactor everything as they
go, only to see their work scraped two weeks later when priorities change. Are you the architect on
your project who meticulously thinks through proper abstractions, service boundaries, and class
diagrams, only to see other engineers writing hacky code that breaks abstraction and constantly adds
tech debt that slows you down?

These two approaches - let’s call them The Quick and Dirty Method and The Slow and Clean Method -
are two forces that are constantly at odds with each other in any software project; the yin and yang
of feature development, if you will.

As a young engineer, I lived almost exclusively in the Slow and Clean realm. Only after a few years,
missed deadlines, and some difficult conversations did I learn that there is, in fact, a place for
both methods. In the rest of this post, we’ll discuss the qualities and tradeoffs of both approaches
and answer the question, “which one should I pick for my current work?”.

## The Quick and Dirty Method

The Quick and Dirty Method is generally characterized by doing whatever it takes to get the code to
work, then moving on to the next thing. This may include:

- Breaking abstraction boundaries or using private APIs
- Writing code that isn’t easily testable
- Knowingly adding to technical debt
- Using a deprecated API or legacy tool that has little current support

This is often known as “hackathon code”. It is perfectly adapted to that particular situation, when
you have a limited amount of time to work and you are aiming for the shortest possible path between
“I want this feature” and “it’s working in production”.

The Quick and Dirty Method is great for getting your work out quickly and moving on to the next
thing. **Every moment you spend on a feature has the opportunity cost of not allowing you to be
working on the next thing.** In a strict agile, or dev shop environment, saving this time could be
the difference between succeeding at your sprint and failing, letting your customers down as a
result. It could also be the critical difference between finding product market fit and running out
of funding for your startup.

However, this comes at a cost: you’re borrowing technical capital from your future self. In other
words, you’re adding tech debt that will eventually have to be paid. Perhaps feature A works now and
you can get it done in one week, but when you want to add feature B on top of it, it takes a week
and a half since you’re forced to work around the hacks you’re relying on. This debt will eventually
begin to compound and really slow you down. Your debts must eventually be paid.

Unless, perhaps, this is code you know is temporary, and will be deleted or rewritten in a few
weeks. In that case, you’re borrowing at 0% interest.

## The Slow and Clean Method

The Slow and Clean Method is marked by an air of perfectionism or polish. This polish tends to
include:

- Refactoring existing code
- Extending an established pattern or creating a new one if your current work does not fit the
  current one
- Writing extensive tests and documentation
- Preparing and reviewing a design document
- Adding robustness to your new feature such as error handling, edge cases, and backwards
  compatibility

Code written with the Slow and Clean Method tends to be more like code you see in computer science
literature. Your paradigms and abstractions exhaustively cover your program’s set of use cases. The
code is colloquially known as “clean”.

The structure of a given piece of code is not only affected by the set of features it supports, but
also the order in which those features were written. The set of assumptions you have when a program
supports one or two use cases is vastly different than the set of assumptions you have when it
supports dozens of cases. As a result, as a program develops it accrues “cruft” from previous
assumptions that are now known to be outdated. **Code written with the Slow and Clean Method tends
to be closer to what code would look like if all the information was available at the outset,**
through things like consistent refactoring and well thought out abstraction.

As a result, code like this tends to be more robust, less buggy, and more enjoyable for develops to
work with. It allows them to move fast when adding new features that fit the established patterns
and it is easier for new developers to ramp up on.

While these are all good qualities, code like this takes a certain level of experience to write; it
takes years of experience only a more senior engineer or domain specialist possesses. As a result,
it is generally more expensive in terms of dollars spent. It is also more expensive in another
sense: time. Refactoring and doing various design iterations takes a significant amount of time.
This time is a luxury that many startups simply don’t have.

## Which is Better?

The answer is, unfortunately, that it depends. It depends on what stage your program or product is
at in its development cycle and what type of constraints your environment imposes on your
developers.

For example, the Quick and Dirty Method clearly prevails if your product still has not achieved
product market fit. Your development team is building features, throwing them against the wall (in
an educated and user-informed fashion) to see what sticks. You go into this knowing that a
significant amount of the code you write this week will probably be gone one or two months down the
line. In this environment, it doesn’t make sense to spend a ton of time and money on senior
engineers and fancy abstractions. Fast and dirty is more than sufficient to quickly build an MVP and
test your hypothesis. If it doesn’t work out, you didn’t spend a bunch of money on something that
ends up getting deleted.

On the other hand, Slow and Clean is a no-brainer for a large company’s infrastructure project or
any mission-critical system. If all ten thousand servers at your company are going to depend on this
system for the next five years, it’s well worth putting extra thought and time into a solid design
and extensible abstractions so that when a rat chews through a wire at the datacenter or the intern
pushes a bad config change everything doesn’t come crashing down. If there’s also a large number of
developers working on the codebase, it may also pay off to have a clear way to extend various
aspects.

Most projects will lie somewhere in between these two extremes. **The reality is that there isn’t a
stark binary between these two methods, but rather a smooth spectrum.** You can do certain parts of
a feature Fast and Dirty and other aspects Clean and Slowly. Thus, things get muddy. A good rule of
thumb I have found is that the earlier in your project’s development cycle you are, the more you
will want to lean towards Fast and Dirty. As your project scales and matures, you’ll start to move
closer to Slow and Clean.

As with many engineering choices, there is no one right answer. Rather, there are sets of tradeoffs
that you will have to choose from under the conditions reality imposes on you. Being a great
engineer means being thoughtful and experienced enough to be as aware of these tradeoffs as
possible.
