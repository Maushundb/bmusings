---
title: 'How to Ace your Technical Interview'
date: '2020-03-01T09:00'
spoiler: 'Learn my personal process for succeeding in the technical interview process.'
keywords: 'software, engineer, technical, interview, data, stuctures, algorithms'
---

You’ve spent the past few months studying every data structure from lists to hash tables. You can
sort a list ten different ways and find the shortest path between any two things imaginable. And
yet, somehow you still feel unprepared.

No matter how many algorithms you study, you still tend to blank out when presented with a new
practice question from
[Cracking the Coding Interview](https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X)
or whatever other interview prep resource you may be using.

Don’t worry, this is totally normal. Every aspiring software engineer experiences it their first few
rounds of interviews. There is a significant gap between memorizing algorithms from a book and being
able to come up with one on the spot in a limited amount of time. The former comes down to rote
memorization, while the latter requires a creative process that is able to operate under the
pressure of very specific conditions.

After personally conducting hundreds of interviews, I’d like to share with you my personal interview
process that I use whenever I’m interviewing for a new role or screening candidates for my team.

## General Tips

The best interview advice I can give you is to have a rehearsed process that you go through for
every question. This ensures you hit all the right requirements without having to worry about each
one, letting you focus your energy on solving the problem at hand. Some general requirements that
interviewers typically look for in a candidate:

- They think through the question and communicate your general approach to solving it **before**
  writing any real code. This will demonstrate to your interviewer that you have a plan of attack
  and can think through a problem from beginning to end rather than just blindly writing code for a
  given task.

- You ask clarifying questions. Often interviewers don’t give you all of the information the problem
  requires, saving some of it only if asked. This simulates how real requirements gathering works on
  the job.

- You don’t go too long without talking with your interviewer. It’s hard for them to give you hints
  if you’re just silently staring at the question. Communicating your thought process as best you
  can helps them guide you along the right path if you get stuck.

- They communicate tradeoffs and real-world considerations. You may write a solution that has O(n)
  theoretical complexity and constant space, but on the job you may be okay with a O(logn)
  complexity with O(logn) space. Let them know you’re thinking about these things.

- Pick a language that you know inside and out. Most interviewers will have a working knowledge of
  the most popular languages, but showing them you know some esoterica is a strong signal that
  you’ve taken the time to really know your tool of choice.

These are some of the common things myself and other interviewers I know generally look for, aside
from just “getting the question right”.

On that note, yes, getting the question right is important and in many cases basically a free pass
to the next round. Most interview questions are designed to have multiple parts that progressively
get harder, so it may be more about how far you get in the progression.

That being said, it isn’t everything. If I have a candidate that gets 75% of the way there on my
question, but demonstrates all the aforementioned items, I’m very inclined to still give them a
“hire” rating. Writing code on a whiteboard under a time limit is far from everyday, real-world
conditions, so I like to give folks a little leeway if they still show the proper attitude, mindset,
and process.

## My Process

He’s a sample process that I personally use when interviewing to cover all these bases with ease:

### 1. Read the question and repeat it back to the interviewer

This ensures you’re on the same page from the beginning and didn’t overlook or misunderstand any
important details.

### 2. Ask any clarifying questions regarding edge cases, real world considerations, or anything else that comes to mind

Are our inputs always good? How much memory do we have to work with? How big is the search space?
Asking questions like this helps bound your problem space and puts you in the best position for a
spark of creativity that takes advantage of one of these characteristics.

### 3. Start to think of a solution to the problem. Mentally run through all major data structures that may be of use.

The majority of the time, your question will have a specific data structure or algorithm that it
lends itself best to. Are you looking for duplicates in a list? Hash tables are good for this.
Trying to find something in a sorted array? Think binary search.

There’s a finite number of data structures, so mentally go through each one, see if they can help,
and rule them out if not. More often than not, you’ll stumble upon a lead before reaching the end of
the list.

### 4. Once you come to a general approach, verbally communicate it to the interviewer. Consider and incorporate any feedback, as well as it’s eventual runtime.

This is a sanity check for you and a chance to elicit a hint from your interviewer. Once you have a
general idea, run it by them and see how they react. If they’re supportive, great! If they’re not,
often they will try to nudge you into the right direction. Also great! There’s no downside to this
step, so make sure not to skip it.

### 5. Write a test cases that you will use to verify your solution

Often you’ll be given one very basic input and output pair during the presentation of the problem.
Now is the time to come up with a few more to run your algorithm on to confirm it actually works.
This is arguable **the** most important step, as it’s the first time you put your approach into
practice.

This is the time to write some basic pseudocode. Be sure to run your algorithm on each test case,
keeping track of every variable and piece of logic you’ll need. It’s easy to be overly vague during
this step and run into a roadblock when finally trying to code it. Save yourself the time now and
work out the gorey details before trying to write too much real code.

### 6. Code up a solution

If you did the previous step thoroughly, this should be pretty straightforward. If you find that
it’s not, you probably aren’t getting into enough detail in step five. This is your time to deal
with things like syntax, language quirks, and show off your knowledge of whatever language you’re
using.

It’s also when your interviewer will be looking at your ability to translate words and thoughts into
code. Be sure to clearly communicate here.

### 7. Write out any error handling or base conditions

If you’re expected to deal with invalid input or edge cases, deal with them after you’ve got the
common case working.

### 8. Run through your test cases to confirm the solution works

Do one last run through to convince yourself and the interviewer your code does what you say it
does. This is also your chance to catch any off-by-one bugs or things you may have overlooked.

## Happy Interviewing

These eight steps are what I’ve found to be personally helpful. At the end of the day, you’ll need
to find what specifically works for you. While this is a great start, let me be honest with you:

> It’s going to take quite a few interviews to get fairly comfortable with the technical
> interviewing process. You’re essentially putting on a performance under inaccurate conditions that
> in many ways decides the track of your career. No one likes this.

Plan on doing a few practice interviews before doing any real ones. The best thing you can do is
have an existing engineer interview you a few times before you ever apply. That way, you have a
solid feel for what the conditions are. No amount of solo prep will ever come close to how the
pressure of a real interview feels.

Try to schedule some lower-stakes interviews at companies that you may not be as interested in
before your top choices so you have some additional practice. After awhile, you’ll start to feel
more comfortable and confident within the process. Until then, just keep at it and happy coding!
