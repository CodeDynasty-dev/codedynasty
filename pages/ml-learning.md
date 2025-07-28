<docmach
 type="wrapper"
 file="fragments/page-structure.html"
 replacement="content"
params="title: Machine Learning Classroom; description: Machine Learning Classroom" >

# Machine Learning Classroom

We are going to build cool ml projects, that is the main goal.

# for the next two months

Only Sat–Sun. 2 days per week, 8 weeks total, okay.

---

## Weekend-by-Weekend Plan

| Weekend | Core Goal         | One-Line Task                               | Essential Resource                                                                                                                                      |
| ------- | ----------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1**   | Python & NumPy    | “Write a 2-layer NN in pure NumPy.”         | [Hands-On ML, Ch. 2–9](https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/)                                                   |
| **2**   | Linear → Logistic | “From scratch logistic regression on Iris.” | [The Hundred-Page ML Book, §1–5](https://www.amazon.com/dp/199957950X)                                                                                  |
| **3**   | Loss Landscapes   | “Add L2, dropout, early-stopping.”          | [Deep Learning, Ch. 7](https://www.deeplearningbook.org/)                                                                                               |
| **4**   | Convolutions      | “Pure NumPy CNN on CIFAR-10.”               | [CNN from Scratch Notebook](https://github.com/eriklindernoren/ML-From-Scratch/blob/master/mlfromscratch/deep_learning/convolutional_neural_network.py) |
| **5**   | Autograd Engine   | “Build micro autograd in <200 lines.”       | [MicroGrad Walkthrough](https://youtu.be/VMj-3S1tku0)                                                                                                   |
| **6**   | Optimizers        | “Implement Adam & RMSprop.”                 | [Optimization for DL course notes](https://cs231n.github.io/optimization-1/)                                                                            |
| **7**   | Generative        | “Train a VAE on CelebA 64×64.”              | [VAE from Scratch](https://github.com/AntixK/PyTorch-VAE/blob/master/models/vanilla_vae.py)                                                             |
| **8**   | Deploy & Invent   | “Wrap your best model in a REST API.”       | [FastAPI ML Serving Guide](https://fastapi.tiangolo.com/tutorial/)                                                                                      |

---

## Libraries needed?

```bash
pip install numpy matplotlib tqdm requests fastapi uvicorn
```

---

## Our Weekend Routine (needs review?)

1. **Sat 09:00-12:00** – Read the “Essential Resource” for that weekend.
2. **Sat 14:00-18:00** – Code & debug.
3. **Sun 09:00-12:00** – Improve & benchmark.
4. **Sun 14:00-17:00** – Push to GitHub?.

---

## Bookshelf (needs review?)

- **Hands-On ML** – practical APIs after you build from scratch
- **The Hundred-Page ML Book** – theory in one sitting
- [Dive into Deep Learning](https://d2l.ai/) – free HTML
- [Deep Learning](https://www.deeplearningbook.org/) – free PDF

---

## Deliverable (needs review?)

After 8 weekends: GitHub repo with

- 8 notebooks summarries (one per weekend)
- A tiny invention? hmm

## Foundational Topics

| Topics                  | Resources                                                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Python Refresher        | • [Python for Everybody](https://www.py4e.com/) (free course)                                                                                        |
| Linear Algebra Crash    | • [3Blue1Brown Essence of LA](https://youtu.be/fNk_zzaMoSs) (YouTube)                                                                                |
| Build a Perceptron      | • [Perceptron from Scratch Notebook](https://github.com/eriklindernoren/ML-From-Scratch/blob/master/mlfromscratch/supervised_learning/perceptron.py) |
| NumPy & Matplotlib      | • [Official NumPy Tutorial](https://numpy.org/devdocs/user/quickstart.html)                                                                          |
| Feed-Forward Neural Net | • [Neural Networks from Scratch Book](https://nnfs.io/) (PDF)                                                                                        |
| Train on MNIST          | • [MNIST in NumPy](https://github.com/hsjeong5/MNIST-for-Numpy)                                                                                      |
| Backprop Deep-Dive      | • [Calculus on Backprop](https://colah.github.io/posts/2015-08-Backprop/)                                                                            |
| Implement SGD & Adam    | • [Optimization Algorithms Code](https://github.com/llSourcell/How_to_use_Adam_Optimizer_in_TensorFlow)                                              |
| Regularization Tricks   | • [Dropout Paper](https://arxiv.org/abs/1207.0580)                                                                                                   |
| Build ConvNet           | • [ConvNet from Scratch](https://github.com/eriklindernoren/ML-From-Scratch/blob/master/mlfromscratch/deep_learning/convolutional_neural_network.py) |
| Experiment on CIFAR-10  | • [CIFAR-10 Dataset](https://www.cs.toronto.edu/~kriz/cifar.html)                                                                                    |
| Invent Something Small  | • [Ideas List](https://github.com/topics/ml-project-ideas)                                                                                           |

# When done what goals are achieved?

| Artifact                      | Level                   | What It Means                                                                                              |
| ----------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| **8 clean notebooks**         | Beginner → Intermediate | Each notebook trains a model **from scratch in pure NumPy**: 2-layer NN, logistic reg, CNN, VAE, etc.      |
| **Custom autograd engine**    | Intermediate            | ~200 lines of code that can compute gradients for any feed-forward graph you design.                       |
| **Working CNN on CIFAR-10**   | Intermediate            | 70 %+ accuracy without PyTorch/TensorFlow; proves you understand convolutions, backprop, and optimization. |
| **VAE that samples faces**    | Intermediate            | Generates 64×64 celebrity faces; you coded the re-parameterization trick yourself.                         |
| **Personal GitHub portfolio** | Showcase                | One repo, clear timeline, reproducible notebooks → instant credibility for any future collaborator.        |
| **Mental model**              | Advanced                | You can open any new paper and implement it in raw NumPy because you’ve already done the moving parts.     |

</docmach>
