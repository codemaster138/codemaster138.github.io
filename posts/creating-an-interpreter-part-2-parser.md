---
title: 'Creating a Programming Language: Part 2 – The Parser'
description: 'In this series of posts, I will walk you through creating your own programming language using JavaScript.'
time: 1617819268973
cover: '/assets/parser-title.png'
---

In my [previous post](/blog/creating-an-interpreter-part-1-lexer), I showed how to create your own *Lexical Analyzer* in JavaScript. In this follow-up post, I will show you how to create your own *Parser*. **The code from this post will be dependent on the code from the previous post, so I recommend you read it if you haven't!**

## But what is a parser?
A parser is a part of every programming language, whether it is compiled or interpreted. It takes the flat array of tokens from the Lexical Analyzer (from here on out referred to as the Lexer), and returns a so called "Abstract Syntax Tree" (aka AST).

### The AST
The AST is composed of many nodes, each of which represents an operation, for example, here's the AST for `1 + 1`:
![AST for `1 + 1`](/assets/ast-1.png)

In the above image, we see a *Node* called "Binary Operation". It's called this because it operates on exactly two values. It contains the *tokens* `<number:1>`, `<plus:+>`, and `<number:1>`.

Here's a more complex scenario:
![AST for `2 + 3 * 4`](/assets/ast-2.png)

This AST represents the operation `2 + 3 * 4`. If you have ever seen an AST before, you will know that this image shows `3 * 4` taking precedence over `2 + ...`, but if this is your first time looking at an AST, it might seem strange. This because against all expectations, the AST is actually executed from the bottom up!

Well, sorta. We first try to execute the top node. If any of its children are not tokens, but *nodes*, we execute those child nodes before returning from the top node. To wrap our head around this more easily, we can say that the tree is executed bottom up, because that's exactly the way it behaves.

Now, I could torture you with more examples of syntax trees, but I think you probably get the picture by now.

As for how the actual parsing process works, I will explain it as we go along with writing our parser.