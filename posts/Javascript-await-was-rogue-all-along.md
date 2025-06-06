<docmach type="wrapper" file="fragments/post-structure.html" replacement="content" params="
author:Friday Candour;
author_title: Software Developer;
time_created: Apr 1 2025;
time_to_read: 8 min;
title: Javascript await was rogue all along;
topic: Development;
author_img: https://avatars.githubusercontent.com/u/75016347;
image: /post-images/then.png;
description: Don't tell me you don't know await is rogue too, jess christ.;
" >

<docmach type="function" params="tags:Js,await,thenable,then,Promise" file="fragments/tags.js" />

Don't tell me you don't know await is rogue too, jess christ.

Tell me what is going here.

```ts
(async () => {
  const x = await { then: (f) => f(4 + 2) };

  console.log(x);
  // 6
})();
```

#### _Example by Thomas_

Right there is a thenable, a big time Javascript interface implemented in .then callback chaining.

![Image description](/post-images/thenable-meaning.jpg)

Or as _MKRhere_ like to put it

> "An object that exposes a then method is a Thenable"

Now let's explore some more interesting things.

Let's quickly reiterate on a fundamental definition.

**A Thenable is simply an object with a `.then()` method.** That's it. No fancy constructors, no `new Promise()`, no specific internal slots. Just a method named `then`.

Think about it, the `Promise` specification itself relies heavily on the `then` method. It's the core of how asynchronous operations are chained and resolved. And `await`, bless its rogue little heart, just says, "Hey, if you've got a `then` method that behaves like a `then` method, I'm good. I'll wait for whatever value you pass to that function." that's incredibly pragmatic in my opinion.

Now, if we internalize this, what else becomes possible? What if we don't even need a `Promise` at all to `await` something? Thomas's example with `f => f(4 + 2)` is simple enough. But what if the "value" isn't immediately available? What if it's... delayed?

Imagine we've got a function that simulates fetching a user's profile, but instead of returning a `Promise`, it returns a plain object that just _looks_ like a promise.

#### Scenario 1: The 'Fake Promise' that's totally legit to await

```ts
const fetchUserProfileThenable = (userId) => {
  console.log(`Fetching user ${userId}...`);
  return {
    then: (resolve) => {
      // Simulate network delay
      setTimeout(() => {
        const user = {
          id: userId,
          name: `User ${userId}'s Profile`,
          status: "active",
        };
        console.log(`User ${userId} fetched!`);
        resolve(user); // Resolve with the user object
      }, 1000); // 1 second delay
    },
  };
};

(async () => {
  console.log("Application starting.");
  const user1 = await fetchUserProfileThenable(1);
  console.log("Awaited user 1:", user1);

  const user2 = await fetchUserProfileThenable(2);
  console.log("Awaited user 2:", user2);
  console.log("Application finished.");
})();
```

#### Expected output:

Application starting.
Fetching user 1...
User 1 fetched!
Awaited user 1: { id: 1, name: "User 1's Profile", status: "active" }
Fetching user 102...
User 102 fetched!
Awaited user 2: { id: 2, name: "User 2's Profile", status: "active" }
Application finished.

Surely that looks fantastic right?, lesser overhead than using new Promise();

Here's a real life use-case in from Prisma [docs](<https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma#:~:text=const%20allUsers%20%3D%20await%20prisma.user.findMany()>).

If you have, probably written code that looks suspiciously like this:

```typescript
// Prepares the query but does not run any thing;
const allUsers = prisma.user.findMany();

// Actually run the query.
await allUsers;
// so you know how Prisma is designed to handle this right?
```

Well mostly we will just run...

```ts
const allUsers = await prisma.user.findMany();
```

But in their implementation, It's a form of **lazy execution provided by implementing the thenable interface**.

### When NOT to go rogue

- Tho powerful, custom thenables can be harder to debug if their `then` method is too complex or deviates from expected promise-like behavior. Native Promises often provide more consistent guarantees.

- **"The `Promise.resolve()` Connection":** Explicitly showing how `Promise.resolve(thenable)` works, as `await` uses a similar internal mechanism.

How new language features might standardize some of the patterns custom thenables can achieve, is something i'm i will be watching for.

If you have some interesting additions, let's chat in the comments :)

</docmach>
