---
title:  Making My Blog - Part 1
date: "2025-04-10"
tags: ["blog","concept","development"]
---
## The Concept

I really liked the idea of creating a blog, one that accepts uploads as markdown 
files, and which can be sent directly from my desktop to the website, without
having to redeploy the application, use any Git pushing or simply including each
post as a static page in my application. 
I decided I wanted this attached to my personal site, as it seemed to fit, so I
set about creating a personal site.

## The Set-Up

The most natural way of achieving this, at first glance, was to use a document
database like MongoDB, so I initially starting building my blog around a Mongo
Database. As I wanted to keep costs down, however, while creating an experiment
like this, I found more free deployment options with a PostgreSQL resources
included.
Good for me, I am comfortable with PostgreSQL and relational databases in
general, but I wanted to practice a little more with MongoDB. Maybe for another
project.
I also made the choice to try Svelte and SvelteKit, in place of my more usual
React + Express.js combination. This choice was simply to try out something new.
I had heard that Svelte was ideal for light-weight sites and I wanted to give it
a try.

## The Framework

From the start of the project, I was impressed with Svelte. It feels like a very
intuitive way of designing a website, I liked the project layout and Svelte
components had a nice feel, where everything was kept in one place. The server
modules for loading to and from databases or external sites were also nice, and
felt like an improvement on using useEffect to fetch data for each component
(although I can't be sure that is the best way to do things within React either,
definitely more experience is needed).

I think perhaps because the last time I used React was when the React-Router
library was undergoing its transition from declarative to export based routes, I
found data-loading didn't work for me during that project, I definitely need to
give React-Router another try with the updated version.

It felt easier to knock up a clean UI with Svelte also. In my last project I
learnt 'styled-components' with React, which was great - but I appreciated
Sveltes provided animations and transitions, to simplify something that was a
little time-consuming for me.

Using SvelteKit as a back-end also felt nice, with a clean distinction between
front and back components. I was able to keep my database actions separate and
also expose a POST endpoint, for when I want to upload blog posts, by using a
+server.js file in the right place. It all felt very natural.

All in all, a very positive experience with Svelte!

## The Database

A very lightweight approach for me this time. 

After using PrismaORM for my last project to handle all database operations,
providing SQL queries actually felt nice for me in this project. I was able to
easily fall back on recognisable SQL queries using joins and aggregations
without having to go through Prisma's documentation. Nothing against Prisma, and
it definitely has its uses - I just appreciated the minimalism for this one.

One table for posts - with fields for title, text, views, time-added, and an
image-url for when I include that (more on that saga later...). One table for
tags - I wanted to have some kind of 'key-word' filter system, so this works for
now. Later down the line I hope to include some full text search, some AI
extraction of keywords, and perhaps more - but for now a simple tag system will
suffice. Then a relational table to link posts to tags - all very nicely
normalised thank you very much.

Anyway, nothing too out of the ordinary here.

## The Sender

And the last piece of the puzzle.

Using node, I programmed a small utility on my local machine for sending
markdown files via a HTTP request to the POST endpoint I exposed in my
application. Now I didn't want just anyone being able to post messages so I
needed some kind of verification. I set it up to send my posts using HMAC
encryption - that way a compressed clean message, and the same message hashed
with a secret key are sent. If they don't match after the server has decrypted
the hashed message, then it is rejected outright.

The server then extracts the title, tags and content, and creates lists of blog
posts and the Marked library for javascript transforms my markdown into HTML.

## Next 22:30:32

The next step was to handle image uploading, so I can make these posts a little
more exciting, but also for cover images. I needed to find a file-storage
solution ... but more on that in part 2!
