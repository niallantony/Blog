--- 
title: Crafting Interpreters - Part 1
date: "2026-02-20"
tags: ['learning', 'C', 'java', 'compiler', 'book']
---
## Learning Languages

As I spend a great deal of my time now sitting with a newborn on my lap or in close proximity, I have to have something to occupy my mind, and so I have decided to work through a book I have had on my reading list for a while: Robert Nystrom's [Crafting Interpreters](https://craftinginterpreters.com).

## Lox

I am currently around two thirds of the way through the book, and so far it has
been immensely enjoyable. It has taken me back to my Foundations of Computing
lectures, where I learnt about finite state machines, Turing machines, Lambda
calculus and the whole lot... suffice to say, it scratches an itch in the
geekier side of my brain. But I didn't set out on this just to remember good
times, I wanted to use it to learn something I could actually apply, and I think
I have achieved that.

## J-Lox

The first part of the book implements JLox, a compiler and interpreter for a
language written in Java. Having a good handle on Java, there wasn't really much
here that was new to me in terms of learning the language, although it was a new
thing writing a Java program that outputs Java code (the code generates boilerplate for the Abstract Syntax Tree implementation of JLox, by hand it would have been arduous to write out all the classes).

For the most part the interpreter was able to make use of Java's own
functionality to interpret the Lox language. The scanner was uses a lot of
Java's own file/string scanning functions, and the expressions being
interpretted could pretty much be mapped one to one on Java expressions.
Implementing a resolver was pretty fun, and seeing it pass through the code
analysing the variables and scope was an interesting exercise. 

Overall it was quite satisfying typing some code in a language that was made
from the ground up, and being able to talk about exactly how that code is
interpretted.

## C-Lox

Now I am working through the CLox section of the book, and this is a completely
different beast. The author's decision to use Java and then C is a really smart
choice, as through Java we can see on a higher level how an interpretter is
running through a program, but we are also confronted with the fact that Java's
implementation is incredibly wasteful in terms of memory, and not very fast
either. That is were C comes in, we can now create a Bytecode interpretter which
manages memory smarter, by interpretting code directly into commands, instead of
building an AST and walking through it several times.

Using C also means we have to implement a lot of the things which were handled
for us in Java. At some point we have to work on Garbage Collection (sooner
    rather than later is the author's suggestion). We have to manage memory
    allocation. Even though Lox is a dynamically typed language, we have to
    infer the types when we are doing things like testing for equality or saving
    to the heap. It means we confront a lot more of the things which we take for
    granted when we are programming.

This part of the book has been by far the most enjoyable, and sometimes when I
feel like I am swimming in the deep end, I can take a step back, really think
about things and find I understand a lot more than I thought. C's functions for
managing memory are becoming clearer to me, and using pointers has become
easier. I even worked on finally getting my DAP debugger working with Neovim
which has opened up a whole new world of possibilities. 

For now I am having a good time working through the book, slowly but surely when
my daughter gives me a few spare moments with two hands free. Who knows if I am
going to be sick of it by the end, but I will surely report back once I have
completed the book.
