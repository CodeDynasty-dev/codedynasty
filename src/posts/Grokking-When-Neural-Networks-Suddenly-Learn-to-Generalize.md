<docmach type="wrapper" file="fragments/post-structure.html" replacement="content" params="
author:Friday Candour;
author_title: Software Developer;
time_created:2025 12 21;
time_to_read:12 min read;
title:Grokking: When Neural Networks Suddenly Learn to Generalize;
topic:Machine Learning;
author_img:https://avatars.githubusercontent.com/u/75016347;
image:/post-images/0_T9RFAIgw6R2p8q9A.webp;
description:An exploration of grokking—the phenomenon where neural networks abruptly transition from memorization to genuine learning—and what it reveals about transformer internals.;
">

<docmach type="function" params="tags:grokking,transformers,mechanistic interpretability,neural networks,modular arithmetic,deep learning,AI research" file="fragments/tags.js" />

## The Accidental Discovery

In 2021, an OpenAI researcher went on vacation and left a model training. Upon return, they found something unexpected: a model that had appeared stuck for thousands of training steps had suddenly generalized perfectly. This accident birthed the study of _grokking_—a term borrowed from Robert Heinlein's 1961 novel _Stranger in a Strange Land_, meaning to understand something so thoroughly that you merge with it.

The phenomenon is genuinely strange. A model fits training data in a few hundred steps, then appears dormant for thousands more, then abruptly achieves perfect test accuracy. What mechanism could possibly explain this?

## The Setup: Modular Arithmetic

The experimental setup is deliberately minimal. Take modular addition with a modulus of 113:

$$
(x + y) \mod 113
$$

This creates a bounded problem space. Inputs are one-hot encoded vectors of length 114 (113 digits plus an equals sign). The model sees patterns like:

```
Input:  [0,1,0,...,0] [0,0,1,...,0] [0,0,0,...,1]  →  represents "1 + 2 ="
Output: [0,0,0,1,...,0]                            →  represents "3"
```

From the model's perspective, there's no inherent meaning to these symbols. It's just learning to map sparse input patterns to sparse output patterns. The fact that we've labeled position 1 as "one" and position 2 as "two" is entirely our convention.

## What the Model Actually Learns

Here's where it gets interesting. If you probe the activations of a trained model—specifically the neurons in the second layer of the MLP block—you find wave-like structures. Plot neuron outputs as you sweep through input values, and you see sinusoids.

Taking a discrete Fourier transform reveals dominant frequencies like $\frac{8\pi}{113}$. The model has learned to compute sines and cosines of its inputs.

But why trigonometry for addition?

## The Clock Analogy

Modular arithmetic is circular. A 2-hour meeting starting at 11 AM ends at 1 PM: $(11 + 2) \mod 12 = 1$. Analog clocks implement this physically—the circular motion of hands matches the modulo operation.

The model appears to exploit this same structure. Early in the network, sparse linear probes reveal that the embedding layer computes approximations of:

$$
\cos\left(\frac{8\pi x}{113}\right), \quad \sin\left(\frac{8\pi x}{113}\right)
$$

Plotting cosine on the x-axis and sine on the y-axis produces a circle as you sweep through input values. The model has learned a circular representation.

## The Trigonometric Identity Trick

Computing sines and cosines of $x$ and $y$ separately doesn't solve the problem. We need $x + y$, not $\cos(x) + \cos(y)$.

The attention layer can easily sum these trigonometric functions. But that's not what we need. We need to add the _angles_ themselves.

Here's the clever part. In the MLP's second layer, the strongest frequency component of certain neurons is $\cos(x) \cdot \cos(y)$. Other neurons show $\sin(x) \cdot \sin(y)$. The following layer takes weighted sums of these outputs.

When you subtract:

$$
\cos(x)\cos(y) - \sin(x)\sin(y) = \cos(x + y)
$$

This is the cosine sum-of-angles identity. The network has effectively learned to use this trigonometric identity to convert products of sines and cosines into a function of $x + y$.

The resulting activation surfaces show diagonal symmetry. A neuron that fires maximally when $x + y = 65$ will fire for $(0, 65)$, $(20, 45)$, $(40, 25)$, and $(65, 0)$—all pairs summing to 65. It will also fire for $(66, 112)$ and $(112, 66)$, since $178 \mod 113 = 65$.

## Why Grokking Happens

The training dynamics now make sense. Early in training, the model memorizes. It fits the training data through brute-force pattern matching. The sinusoidal structures don't exist yet.

During the "dormant" phase where metrics appear flat, the model is slowly building these trigonometric representations. The structures are forming, but they haven't yet overtaken the memorized solution.

Neel Nanda and collaborators introduced a metric called _excluded loss_: measure performance after removing information at the key frequencies. This metric climbs steadily during the dormant phase, revealing that the model is increasingly relying on frequency-domain representations even as standard metrics stay flat.

Grokking occurs not when the sinusoidal structures complete, but during a subsequent "cleanup phase" where the model actively removes the memorized examples it relied on earlier.

```python
# Conceptual illustration of excluded loss
def excluded_loss(model_output, target, excluded_freq):
    # Remove frequency component from output
    filtered = remove_frequency(model_output, excluded_freq)
    return cross_entropy(filtered, target)

# During dormant phase:
# - Standard loss: flat
# - Excluded loss: climbing (model using excluded frequencies more)
```

## The Anthropic Extension

Recent work from Anthropic ([arXiv:2502.01774](https://arxiv.org/html/2502.01774v1)) applies similar analysis to Claude 3.5 Haiku, examining how the model decides when to insert line breaks. The model represents character count on a six-dimensional manifold—somewhat analogous to the circular structures in our toy model.

The team found what they call a "QK twist": helix-like geometries in the attention heads that rotate relative to each other. A character count of 70 aligns with a line width of 75 after rotation, creating a consistent offset that lets the model estimate remaining space before line end.

Compared to Haiku's full capabilities, line-break detection is trivial. But finding such clean mechanisms in a production model is encouraging.

## The Limits of Understanding

This is the most complex AI model we fully understand. That's a strong claim, and deliberately provocative. A single-layer transformer doing modular arithmetic is vanishingly simple compared to GPT-4's hundreds of billions of parameters.

Yet even here, the analysis required:

- Probing intermediate activations across thousands of input combinations
- Fourier analysis to identify learned frequencies
- Constructing sparse linear probes to extract clean signals
- Designing new metrics (excluded loss) to reveal hidden dynamics

Scale this to a model with 96 layers and 200,000 vocabulary tokens, and the combinatorial explosion becomes intractable. We can find isolated mechanisms—like Anthropic's line-break circuit—but comprehensive understanding remains distant.

## A Note on Alien Intelligence

Karpathy recently remarked that training LLMs feels less like building animal intelligence and more like summoning ghosts. The term "grokking" fits this framing. It originates from a complex Martian language in Heinlein's novel, carrying connotations of something fundamentally alien.

We communicate with these models in human language, but that's a thin veneer. One layer deeper, we find absurdly complex patterns—Fourier components, trigonometric identities, six-dimensional manifolds. The model didn't learn these because we taught them. It discovered them because they solve the optimization problem.

Whether this makes future AI feel more alien or more human remains genuinely uncertain. What's clear is that the gap between what we can observe (input-output behavior) and what we can explain (internal mechanisms) grows wider with each parameter we add.

</docmach>
