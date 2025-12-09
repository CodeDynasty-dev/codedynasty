<docmach type="wrapper" file="fragments/post-structure.html" replacement="content" params="
author:Friday Candour;
author_title: Software Developer;
time_created:2025 12 05;
time_to_read:11 min;
title:Tiny Recursive Models and the Design of Efficient Reasoning Systems;
topic:Efficient recursive models for logical reasoning;
author_img:https://avatars.githubusercontent.com/u/75016347;
image:/post-images/tlm.webp;
description:An exploration of hierarchical and tiny recursion models as an alternative to scaling large language models for structured reasoning tasks;
">

<docmach type="function" params="tags:AI,recursive-models,ARC-AGI,reasoning-systems,HRM,TRM,model-architecture" file="fragments/tags.js" />

# Tiny Recursive Models and the Design of Efficient Reasoning Systems

Modern AI practice is dominated by a simple intuition: scale solves everything. Larger models, more data, and more compute are assumed to deliver better intelligence across the board. Benchmarks and marketing material reinforce this narrative, often blurring the line between pattern recognition and genuine reasoning.

Recently, a different design direction has appeared. Instead of adding more parameters, these approaches add more _thinking_. Hierarchical and recursive models such as the Hierarchical Reasoning Model (HRM) and the Tiny Recursion Model (TRM) demonstrate that small, carefully structured networks can match or outperform much larger systems on tightly specified reasoning tasks. They do this not by memorising more, but by reorganising how computation unfolds over time.

This article looks at how these models work, why they matter, and what they imply for the design of reasoning systems.

## Benchmarks, Domains, and Expectations

Before examining the models themselves, it is important to understand the problem they are designed to solve.

### The ARC-AGI benchmark

The ARC-AGI benchmark is built around grid puzzles. Each instance consists of several input–output examples, where both input and output are small coloured grids. The task is to infer the transformation that maps input grids to output grids, then apply the same transformation to a new test grid.

If this sounds close to an IQ test, that is largely the point. The benchmark is intended to stress a system’s ability to discover and apply abstract rules under tight constraints:

- **Structured inputs and outputs.** The model never sees natural language. It only observes coloured cells on a grid.
- **Few examples.** Each task provides only a handful of demonstrations of the underlying rule.
- **Combinatorial variety.** Rules can involve symmetry, counting, masking, replication, and composition of these primitives.

In this setting, we do not need a model that can summarise documents or role‑play. We need a system that can maintain and refine hypotheses over a small, discrete state.

### Task‑specific, not general intelligence

Models such as HRM and TRM are not general language models. They do not generate text, operate a chat interface, or trade off between many different capabilities. Instead, they:

- Accept a representation of grids as input.
- Maintain an internal scratchpad representing a candidate solution.
- Iteratively refine that scratchpad until a halting policy decides that the answer is ready.

Measuring these models on the same benchmark charts as large language models can be misleading. The real comparison is not “tiny model beats trillion‑parameter system at everything”, but rather “tiny model beats large, general system on its home turf: constrained logical puzzles”. This is still interesting, but for different reasons.

## Hierarchical Reasoning Model (HRM)

The Hierarchical Reasoning Model is one of the first widely discussed architectures in this space. Its key idea is temporal hierarchy: different parts of the network operate at different speeds and with different responsibilities.

### Two time scales, two roles

HRM splits its processing into two cooperating transformer networks:

- **Fast network (inner loop).** Runs many micro‑steps. It updates a hidden scratchpad that encodes the current reasoning state: provisional hypotheses, partial transforms on the grid, and intermediate features.
- **Slow network (outer loop).** Runs less frequently. It reads the scratchpad, makes larger strategic adjustments, and decides how the fast network should behave next.

Intuitively, the fast network performs local edits, while the slow network acts as a coarse‑grained controller. The scratchpad connects the two.

### Halting and refinement

HRM introduces a halting mechanism so that the model can decide when it has thought enough about a particular instance. The slow network includes a “halting head” that estimates whether further refinement is likely to improve the answer.

At a high level, the process looks like this:

1. Initialise a latent state from the input grids.
2. Run several fast steps to adjust the scratchpad.
3. Run one slow step to update global strategy and query the halting head.
4. If not halted, repeat.
5. When halted, decode the final scratchpad into an output grid.

The important property is that the amount of computation spent on a problem is not fixed. Harder instances can trigger more iterations of the loop, while simpler ones terminate early.

### Training under an equilibrium assumption

Training such a system naively would require back‑propagating through many repeated inner‑loop steps, which is expensive. HRM sidesteps this by assuming that the fast inner loop would converge to a stable state if allowed to run long enough. Instead of unrolling every micro‑step, it approximates gradients as if this stable equilibrium had already been reached.

This equilibrium assumption reduces compute and memory costs, but it introduces ambiguity:

- The inner loop is not truly run to equilibrium in practice.
- Gradients are computed under an approximation that may not match the actual runtime trajectory.

Despite this, empirical performance on ARC‑AGI is impressive. The model demonstrates that temporal hierarchy and internal refinement are viable tools for boosting reasoning without scaling parameter counts dramatically.

## Tiny Recursion Model (TRM)

The Tiny Recursion Model builds on the same intuition—spend more compute on thinking rather than on parameters—but addresses several of HRM’s conceptual and training issues. It does so by making the design more explicit and the training procedure more faithful to the model’s actual behaviour.

### Functional separation of states

TRM starts from a simpler, more functional interpretation of the two‑state structure:

- **Scratchpad.** A workspace where intermediate reasoning steps are written.
- **Canvas.** A more stable representation of the current answer.

The key decision is to keep these roles separate. If both “thinking” and “answer” live in the same state, updates that improve the provisional answer can interfere with the ongoing reasoning process. Maintaining two states prevents this interference and provides a clearer interface between local edits and final outputs.

TRM does not rely on a biological analogy to justify this structure. It is simply a clean separation of concerns.

### Training on the actual loop

TRM dispenses with the equilibrium assumption. Instead, it trains on exactly the loop it runs at inference time:

1. Initialise scratchpad and canvas from the input.
2. For a fixed number of steps:
   - Update the scratchpad according to the current canvas and input.
   - Apply a controlled update from the scratchpad to the canvas.
3. Read the final canvas as the answer and back‑propagate through the entire unrolled loop.

There is no hidden assumption that the loop will converge if extended indefinitely. The model is trained on the real, finite sequence of updates that it will execute in production.

A simplified pseudo‑code sketch makes the structure more concrete:

```python
scratch = init_scratch(input_grids)
canvas = init_canvas(input_grids)

for step in range(NUM_STEPS):
    scratch = fast_update(scratch, canvas, input_grids)
    canvas = slow_update(canvas, scratch)

output_grid = decode(canvas)
loss = task_loss(output_grid, target_grid)
loss.backward()
```

The details of `fast_update` and `slow_update` involve small transformers or MLPs, but the overall pattern is a recursive refinement of a shared canvas, driven by a separate scratchpad.

### Scaling down, not up

An interesting feature of TRM is how it behaves under scaling. Instead of adding layers and parameters, the authors report better generalisation by:

- **Reducing depth.** Fewer layers reduce the model’s capacity to memorise scarce data.
- **Increasing recursion.** More refinement steps on a small model allow it to approximate complex transformations despite limited capacity.

In one configuration, a two‑layer TRM outperforms deeper variants on reasoning tasks, despite having fewer parameters. The model remains small—on the order of seven million parameters—yet achieves strong scores on ARC‑AGI and related benchmarks.

This runs counter to the usual scaling laws observed for general‑purpose language models, where larger models trained on vast corpora tend to generalise better. Here, the limiting factor is not the diversity of natural language, but the scarcity of high‑quality, structured reasoning data.

### Attention versus MLP

TRM also illustrates that attention mechanisms are not universally superior. For tasks with limited context and relatively small grids—for example, a standard Sudoku—an MLP‑based variant can outperform attention‑based versions. When the grid grows (such as a 30×30 maze or a larger ARC instance), attention becomes useful again because it handles longer contexts more effectively.

The lesson is straightforward: the right inductive bias depends on the structure and scale of the input. There is no single architecture that optimises all regimes.

## Design Implications for Reasoning Systems

From a software design perspective, HRM and TRM make a simple but powerful point: internal control flow matters. Instead of treating a model as a single forward pass from input to output, we can treat it as a small program that calls itself, revises its state, and decides when to stop.

Several design themes emerge.

### Separate workspace from answer

Maintaining a distinct scratchpad and canvas mirrors common practices in program design:

- **Separate mutable working state** from externally visible outputs.
- Allow the working state to go through inconsistent or speculative phases.
- Only commit changes to the answer representation when they pass some internal check.

In a reasoning system, this separation allows the model to explore alternative hypotheses without corrupting its best current guess. TRM’s explicit two‑state design is a concrete architectural expression of this principle.

### Use recursion to trade time for parameters

Recursive refinement offers a controlled way to exchange parameters for computation:

- **More parameters** concentrate capability into a single, expensive step.
- **More recursion** spreads capability over many cheap steps that reuse the same small network.

When data is limited and tasks are well‑structured, the second option can be preferable. It also aligns more closely with how human reasoning often works: small, repeated updates rather than a single leap from premise to conclusion.

### Control halting explicitly

Hard‑coding a fixed number of thinking steps is simple but brittle. Some instances require more scrutiny than others. Models like HRM introduce an explicit halting policy so that the system can allocate more computation to hard problems and less to easy ones.

In implementation terms, this looks like another prediction head that estimates “is this good enough?”. The choice of loss function and training signals for this head are design decisions in their own right.

From a system viewpoint, halting is also an interface to resource management: it tells the runtime when to stop spending compute on a given instance.

### Match architecture to data

HRM and TRM both highlight an often under‑emphasised point: architectural decisions are only meaningful relative to the data regime.

- When data is scarce and tasks are tightly specified, over‑parameterisation quickly leads to overfitting.
- In those regimes, smaller models with more internal computation can generalise better.
- When input contexts grow or tasks become more varied, attention and scale regain their appeal.

Designing reasoning systems therefore starts with a clear statement of the domain: grid puzzles, code transformations, theorem proving, planning, or something else. The architecture should be chosen to match that domain, not inherited wholesale from large language modelling.

## Beyond Benchmarks

It is tempting to interpret these results as evidence that large‑scale language modelling is fundamentally misguided. That would be an overreach. HRM and TRM are highly specialised tools, effective on problems with constrained structure and well‑defined rules.

Their significance lies elsewhere:

- They provide _existence proofs_ that small models can solve hard logical problems when given the right inductive biases.
- They challenge the assumption that the only way to improve reasoning is to add more parameters.
- They expand the design space of AI systems towards more explicit control flow, internal state, and recursive computation.

For practitioners, the main question is not “Will tiny recursive models replace large language models?”, but “Where in my system do I need structured reasoning, and could a small recursive component serve that role better than a monolithic model?”

Possible application areas include:

- Constraint‑based subroutines: scheduling, routing, puzzle‑like components inside larger workflows.
- Verification passes: small models that check or refine the outputs of a broader generative system.
- Domain‑specific reasoning engines: for code transformations, formal manipulation of data structures, or symbolic tasks.

In each case, the recursive model plays a targeted role rather than acting as a general conversational interface.

## Reflecting on the Trade‑offs

Scaling large models has delivered remarkable capabilities, especially in natural language. Recursive models such as HRM and TRM show that this is not the only axis along which we can move. By:

- Separating workspace from answer,
- Allowing internal loops of computation,
- Controlling halting explicitly, and
- Matching architecture to data regimes,

we can extract surprising amounts of reasoning ability from small parameter counts.

The trade‑off is clear:

- Large models offer broad competence and flexibility but demand substantial resources and data.
- Tiny recursive models offer narrow, precise reasoning in well‑structured domains with far lower resource requirements.

Good systems design rarely chooses between extremes. Instead, it composes different components, each shaped to its problem. Recursive reasoning modules are a useful addition to that toolkit—a reminder that how a model _thinks_ can matter as much as how big it is.

</docmach>
