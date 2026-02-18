<docmach type="wrapper" file="fragments/post-structure.html" replacement="content" params="
author:Friday Candour;
author_title: Software Developer;
time_created: 2026 02 18;
time_to_read: 5 min;
title: Energy-Based Models (EBMs);
topic: Machine Learning;
author_img: https://avatars.githubusercontent.com/u/75016347;
image: /post-images/ebms.png;
description: The next era of AI is not LLMs, it's something else, and it's fascinating;
">

The next era of AI is not LLMs, it's something else, 

One thing that really interests me about the future of AI are the enormous potential uses.

My fellow rib cages, see, LLM are language models, they are not good at reasoning about spatial thinking and hierarchical planning critical, by design that's not their domain, but why are AI companies keep shoving LLMs into every possible application?

it's like trying to fly to space with an airplane, it's not going to work, it's not their domain.

This also pins down the reason why we won't see AI cracking every domain anytime soon.

recently we saw meta AI chief leaving to found a new company focused on none language dependent models.

What i'm most excited about is the work of Eve Bodnia of Logical Intelligence

They are working on Energy-Based Models (EBMs), they are a new kind of AI that can be used for a lot of things.

Energy-Based Models (EBMs) fundamentally differ from LLM by not relying on tokens or next-word prediction. Instead, they process data by mapping it into an "energy landscape", this is really fascinating tbh.

Here's a technical breakdown of how they work:

EBMs (Energy Landscape Mapping) take input data and transform it into an abstract representation within an "energy landscape." In this landscape, different scenarios or solutions are assigned an "energy" value.

### Probability and Energy Minimization

[![The next era of AI is not LLMs, it's something else, ](/post-images/1xpJ-DEt5aVeDJHROJlnvmA.webp)](/)

Highly probable scenarios are represented as low-energy points or "valleys" in the landscape.
Less probable scenarios appear as high-energy points or "peaks".
The core principle is to minimize this energy, guiding the model towards the most probable and correct solutions. This is similar to theoretical physics models where systems naturally seek minimal energy states, and i can see how this can like reduce the amount of energy needed to compute something.

### Constraint Setting

During the training process, engineers or users can define constraints that influence the shape of this energy landscape. This ensures that the model adheres to specific rules or conditions, which helps prevent "hallucinations".

### Self-Alignment and Correction

EBMs have correction terms that allow the model to self-align during training. If the energy landscape deviates, these terms can bring it back to the desired configuration, ensuring precision and correctness.

### Direct Solution Finding

Unlike LLMs that predict the "next word," EBMs directly "see" the energy landscape, allowing them to instantly identify/lead-to the right answer without a "guessing game." This direct navigation saves computational time and resources and minimise hallucinations obviously.

This approach makes EBMs highly efficient and capable of working with smaller models, reducing reliance on extensive GPU power.

## Additional Technical Aspects:

- Boltzmann Distribution

EBMs assign probabilities to data configurations where lower energy values mean higher compatibility or likelihood. This is often described using the Boltzmann distribution, which relates energy to probability.

- Deep EBMs

Modern EBMs often use deep neural networks to parameterize their energy function, allowing them to model highly complex data distributions.

The result is a model that is fast, small, and can reason about spatial thinking and hierarchical planning without relying on language.


The interesting is the new direction and how more effective it can be, 

i personally played with the demonstration at [https://sudoku.logicalintelligence.com/](https://sudoku.logicalintelligence.com/)

It's really fascinating how it can solve sudoku puzzles faster than any llm and it does so in 0.24s, while no current LLM could even find a solution to the problem, like fking seriously.

Sources:

[https://www.youtube.com/watch?v=rvwBsWDOFIE](https://www.youtube.com/watch?v=rvwBsWDOFIE)

</docmach>
