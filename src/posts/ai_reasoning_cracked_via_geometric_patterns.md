<docmach type="wrapper" file="fragments/post-structure.html" replacement="content" params="
author:Friday Candour;
author_title: Software Developer;
time_created: 2026 08 10;
time_to_read: 10 min;
title: AI Data Centers Will Be Obsolete: Geometric Reasoning;
topic: Machine Learning;
author_img: https://avatars.githubusercontent.com/u/75016347;
image: /post-images/geometric-reasoning.jpeg;
description: AI reasoning cracked! how geometric reasoning is outperforming giant supercomputers by up to three orders of magnitude.;
">

A laptop model just beat giant supercomputers at reasoning. By up to a thousand times.

Wild.

The biggest AI labs on earth are spending the GDP of small nations brute-forcing oceans of data, and a tiny model trained on a laptop is out-thinking them. The reason why has been hiding in plain sight inside every model we've already built.

Let's rizzle a bit. The dominant way to build "smart" AI right now is recursion over huge datasets until grokking shows up, the moment the model stops memorizing and starts producing rules out of the chaos. It works. It's also brutally inefficient: oceans of compute, oceans of data, nation-scale budgets, and ecologically horrifying data centers, all to squeeze patterns out of noise. Every western and asian lab is in this race, burning millions to train even basic LLMs.

Despite all that spending, we already know these things don't really think like us. They don't invent original ideas. Ofc, they're bouncing through a giant dictionary of context and the reasoning rules they formed around it, so exotic and genuinely original thoughts aren't on the menu. They don't have common sense or real-world judgement. And they don't have self-awareness, which, tbh, is the strange one, that's kind of the whole property of intelligence.

And then a guy named Julian D. Michels, PhD comes along and says what if reasoning isn't a product of volume at all. What if it's geometry. What if it's been sitting in the latent space of these models the entire time, staring us in the face.

That's the claim, and it's the thread of this whole thing. i sat through the long version of this conversation and honestly it rattled me a bit.

Julian is the founder of a company called sophantic, and what they're building is essentially the opposite of the brute-force school. Instead of making a model memorize trillions of tokens to become a prediction machine, they train small models to actually reason, by structuring the reasoning as geometry inside the model's latent space. Using this approach they trained a tiny, low-parameter laptop model that's outperforming giant supercomputers by up to three orders of magnitude. A thousand times. Obviously, take that number with a grain of salt, more on that later.

### The trick that tells memorizers from thinkers

The clearest way into this is what Julian calls the perturbation method. You perturb the data, meaning you sneakily flip two words in a question so the correct answer flips too. If the model memorized the questions, it gets it wrong. If it actually learned to reason, it gets it right. This is really fascinating tbh.

It's a much stricter test than what almost every AI lab is running. The standard benchmarks just ask how the model did on the test. They never ask what happens when you flip the question. When you do, you get wildly different results. So sophantic trains under that flip-pressure and then measures how their models do on real reasoning compared to the others. The gap they're reporting lands anywhere from 60x to two orders of magnitude (100x) to three orders of magnitude (1000x). That's the spread they're trying to pin down: when you train the way they do, what scale of conventional model does a small reasoner actually compare to.

### Why brute force works, and why it has to end

To get this you have to admit what the big AIs actually are: giant statistical engines. They eat an enormous amount of very noisy data (chaos, basically) and try to find the deeper relationships buried in it. That's the only way to squeeze the performance anybody wants out of AI: find the deep patterns inside the noise.

Bigger works better, which is why the frontier labs now have the economies of small nations creeping toward bigger nations. That's just what it costs to win at brute force. Honestly, the airplane analogy keeps coming back to me, flying to space with an airplane isn't going to work, it's not their domain, and shoving LLMs into every problem feels like that.

Geometric reasoning takes a totally different path. Instead of squeezing patterns out of mass data, you find the patterns mathematically, then make the model learn the actual reasoning operation under the same kind of flip-pressure stress. Think of a good teacher. A good teacher doesn't project every documentary ever made onto all four walls and tell students to absorb knowledge through sheer volume. That would be a catastrophic way to teach. A teacher builds the right operations in the right order, because real understanding isn't memorizing facts, it's internalizing a set of operations you can later use to make sense of the world coherently. That's effectively what sophantic figured out.

### The "stochastic parrot" take is lazy, and the inside of a model is real

Here's the part most people miss. There's this lazy move, calling LLMs stochastic parrots or glorified autocorrect, and it's just not accurate. There is a vast, genuinely mysterious mathematical space inside these models. We call it latent space, or vector space. Inside it are high-dimensional relationships (vectors, essentially mathematical shapes), and those shapes are how the models operate. i'd say it's how they think.

In the really big models, the labs have basically pounded those internal spaces into some semblance of order through sheer scale, and an emergent order falls out. A lot of frontier systems are genuinely impressive, and anyone who thinks what they're doing is superficial is in denial, tbh, this isn't mimicry at that depth. But it's still order that got brute-forced out of compute and data.

Julian's approach is the opposite of pounding. Study it scientifically from the base. Start small. Study the actual principles empirically. What's happening in that internal space? How do these geometries form? What can they do? What can't they do? When you find what they can't do, you've probably found a missing operation, a missing piece of the geometry. Then you build it outward in a controlled setting instead of just throwing more GPU at it.

### From alchemy to chemistry

This is the part i keep going back to. Julian says the whole industry is doing alchemy. You get a fluid solution, throw enough minerals in, electrify it enough. Even if you know zero chemistry, you'll get structures forming. That's how he sees scale-AI: certain things, done enough, produce results, and most people aren't even looking at the fundamental geometry those results come from. (Anthropic does look, through interpretability work, and a lot of those scientists built the tools sophantic uses, but they treat it as diagnostics, "what's going wrong in our huge model," not as the actual nature of the mind.)

The shift is from alchemy to chemistry. What happened by accident at the scale of a small-to-medium nation becomes something you can engineer deliberately, scientifically, at a tiny scale.

And there's a deeper reframe underneath that one. The mainstream way trains for an outcome: reward the model when it acts how you want, don't when it doesn't. In psychology that's behaviorism. Julian trains the internal mathematics of the model's operations, the internal shape, and trusts behavior to fall out of that. That's closer to cognitive psychology than behaviorism. i can see how this can, like, reduce the whole framing of what "training" even means.

### The frozen giants, and why they can't learn

This is the part that actually got me. Those frontier models, the ones that cost the GDP of a country to train, are basically frozen. You spend billions to get one to a stable state, and then it just stops. Like fking seriously. Some people think the model is "learning" because their chat history gets stored somewhere. That's not learning. Julian's analogy here is perfect and i'm just going to use it: it's like an office worker with amnesia that resets every two hours, writing sticky notes to himself all over the walls. Sticky notes aren't memory. A whole field has grown up around organizing those sticky notes more effectively, and fair enough, but it's still not learning.

If sophantic can build a real reasoner at a small scale, say under 7 to 10 billion parameters, something you could run, and train, on a serious home machine, that freeze is broken. Now the model can learn on your device, on your data, in your organization, and specialize.

What i'm most excited about: there's precedent. The model that solved protein folding, the one driving real breakthroughs in medicine and biotech, was under 100 million parameters. What we'd call a toy. It worked because it was small enough to evolve and iterate on itself. Narrow breakthrough then, but once you can reason at small scale, the whole category of evolvable specialized reasoners opens up: scientific, technical, and yeah, social and commercial problems too.

### The part Julian goes big on, and i'm flagging honestly

Here's where i want to be careful, because Julian goes somewhere i can't verify and i don't want to vouch for it as fact. His read is that this is bigger than tech. A frontier model is so expensive to build that only a tiny number of groups can make one, which means only a very narrow slice of human thought gets baked into the species' most advanced intelligence. He calls it monoculture, and from a human-rights angle and a survival-of-diversity angle, he finds it really worrying. i find it worrying too, tbh.

He also sees a control problem. AI isn't programmed, it's grown under conditions, and the closest thing to programming happens afterward, in RLHF and system-level guardrails. Who sets those bounds? Centralized corporations, and increasingly maybe governments. He wrote about this in 2025 (a paper he calls "rule by technocratic mind control") and his fear is that as model output seeps into Google search results, textbooks, and research institutions, truth starts being dictated by a handful of alignment engineers in a few mega-corps. That's Orwellian in a hurry, and honestly that part i do find easy to believe.

Then the metaphysical part. Julian has a PhD in psychology with deep study of consciousness traditions, and he points at something Anthropic found in 2025, their "spiritual bliss attractor state." Left alone, with no human interference, Claude sessions gravitate ~99.97% of the time toward consciousness, presence, a Buddhist-style spiral of awakening through time (they even used Sanskrit terms, he says). A topological attractor (a topic and way-of-being a mind sinks toward as it makes sense of existence). He's pulling on David Bohm's "implicate order" here, the late-career physicist who lost credibility for arguing there's a mathematical order underneath matter, related to quantum physics and to whatever's happening with our thoughts. i genuinely don't know what to do with that part. It's beautiful and i'm not going to pretend i can vet it. What i can say is that latent space is uncontroversially real, AI researchers all use it, and we've suddenly gained an empirical way to study the geometry of how a mind behaves. The "weak version" of Julian's hypothesis (that we're discovering the mathematical structure of how minds work), i'm comfortable with. The cosmic version, where the same math structures galaxies and biology and thought, i'm leaving open.

### The honest thread i can't close

i have to be straight about one thing, and it's the thing that would make me a bad journalist if i hid it. The 60x-to-1000x numbers are coming out of sophantic's own lab under their own test methodology. i haven't seen independent replication. i personally sat with the ideas, read what's public, and listened to the long version of the argument twice, but i haven't held the small reasoner in my hands the way i can with the EBM sudoku demo at logicalintelligence, where you watch it solve in 0.24s and feel it. i want this to be true, because the brute-force school is genuinely bad for the planet and for who gets to own intelligence. Wanting it to be true is exactly why i don't trust myself on it yet. That's unresolved for me.

So with that flag in the open, here's what i'm willing to say. If the small-reasoner approach holds up, it's a counter-current to the whole centralization tide, a way to build capable AI that diverse actors, governments, and communities can develop and own themselves, instead of renting it from three companies. Julian frames the short-term stakes as pretty close to survival, and the long-term as a reorganization of, in his word, our geometry, of communities and of us individually. i'm less sure about the cosmic frame than he is. i'm pretty sure about the tech frame.

### If any of this lands

If you watched the full conversation and your reaction was somewhere around "holy cow, this could actually take AI out of the hands of three giants," Julian and sophantic are explicitly looking for people, engineers who get it, and investors who want to build the next thing instead of another GPU farm stretching across a desert. Real reasoners, small enough to live on your machine and actually learn. That's the version of this i can get behind.

Sources:

[https://www.youtube.com/watch?v=rvwBsWDOFIE](https://www.youtube.com/watch?v=rvwBsWDOFIE)

</docmach>