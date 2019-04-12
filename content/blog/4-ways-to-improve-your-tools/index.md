---
title: '4 Ways Every Software Developer Should Improve Their Tools'
date: '2019-04-11T20:00'
spoiler: "Here's a few ways to get more out of your existing development tools."
keywords: 'software, tools, improve'
---

A software developer’s tools are what allow us to convert our thoughts into exact commands a
computer can understand. From text editors to source control, these are the tools of the trade that
we use hundreds of times per day in pursuit of our craft. Although unlike a carpenter and their
tools, we simply cannot go out and buy a new hammer one day when we decide we need a better one.
That raises the question: how do we improve the tools that we use as software developers on a
day-to-day basis? Here’s four ways how you can level up your tools in order to get more out of them.

## Learn Shortcuts

Shortcuts and aliases are the easiest and most effective ways to get more out of your existing
tools. They let you decrease the time it takes for you to issue any input to your computer by using
the keyboard instead of a series of one or more mouse clicks.

A well known law in the field of Human Computer Interaction,
[Fitt’s Law](http://automation.berkeley.edu/fitts-dataset/) states that the time it takes to click
on a target is correlated directly to its distance from the pointer and inversely to the target’s
size. In other words, smaller and farther targets take more time to click then closer and large
ones. The number of times I’ve seen professional software engineers fumbling around with their mouse
across three sets of increasingly smaller menus to get to one command is absolutely ludacris.
Learning the keyboard shortcut for this command lets you reduce the time it takes to a constant
number (usually between 0.1 - 0.4 seconds).

![VSCode keybindings file](https://kaushalsubedi.com/wp-content/uploads/2015/11/visual-studio-code.png 'VSCode keybindings file')

Most text editors, web browsers, and other GUIs will usually have an extensive list of keyboard
shortcuts that you start learning immediately. Just don’t try to learn too many of them at once -
start with one or two, get them down, then pick a few more and repeat.

[Aliases](<https://en.wikipedia.org/wiki/Alias_(command)>) and macros are also a great way to reduce
the number of keystrokes you have to type to accomplish a specific task. They let you create a
shorter representation of any command or set of commands that you frequently use. This can add up to
saving your hours of time over the course of a month if done right.

## Customization

Many of your most important tools (namely, your text editor) will allow you to add various layers of
customization to them. This allows you to shape the interface to the tool to not only fit your
unique taste, but to also add synergy between other tools you’re already using. For example, if
you’re a vim user, you’re used to using `j` and `k` to navigate up and down on a page, so why not
install a
[Chrome extension](https://chrome.google.com/webstore/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb?hl=en)
to let you use that same shortcut in the browser?

On that note, you can also go beyond just simple keybindings. Many tools have scripting languages or
extension frameworks that let you write custom code to augment the tool itself. While a larger time
investment than changing a keybinding, it’s a great way to understand the internals of the tools you
use as well as a chance to start an open source project you can share with other developers and even
list on your resume.

## Have a Portable Configuration

You’ve installed all your tools, learned all your keybindings, and customized them more than even
Xzibit could dream of when, suddenly, you are forced to work on a remote machine or get a new
computer. All that work down the drain and you’re back to using the default. Or is it?

What if you not only customized your tools, but also made their configuration easily portable? Most
tools have a `.rc` or config file in plaintext that contains the tool’s configuration parameters.
This allows you to put these files under source control and share them between machines like any
other repo. That, combined with a script to symlink them into the right place, could make most of
your configuration a two command process - clone your repo, run the script, and you’re off to the
races.

[Here’s a great example](https://github.com/mattjmorrison/dotfiles) of a setup like that.

## Reduce Context Switching

The final way to get more out of your tools is to minimize the time it takes to switch between them.
Do you really need your terminal taking up your entire screen, when all you really care about is few
most recent lines?

Experiment with different window layouts, number of screens, and general workspace configuration in
order to optimize the sets of information your need in front of you at any given time. You can
maintain sets of preset layouts for various parts of your day - I have one window setup for writing
code and debugging, and another different one for reading and reviewing code. Switching between
these two is also bound to a hotkey.

## Conclusion

Your tools are a natural extension of yourself, and just like any other part of yourself, require
investment and practice to improve. Whether you were feeling frustrated by your archaic workflow or
just wanted to squeeze out an extra bit of performance, I hope this post has given you some insight
into how to improve the use of your everyday software tools.
