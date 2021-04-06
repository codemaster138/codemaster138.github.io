---
title: 'Creating a Programming Language: Part 1 – The Lexer'
description: 'In this series of posts I will walk you through creating your own programming language using JavaScript.'
time: 1614521938940
cover: '/assets/D4459CA6-EEE7-48B0-9E93-80CF9CA98B37.jpeg'
---

There are so many programming languages out there – hundreds, possibly thousands of different ways to write the same piece of code. Some are good for one thing, some are good for another, some are good for nothing at all. But have you ever wondered how those programming languages were made? That's what I'll teach you in this series of posts.

## Compiler vs. Interpreter
There are two mainstream ways to make programming languages: Compilers and Interpreters.

A compiler compiles a program ahead of time so that the computer can run it on it's own. An example of a compiled language would be C.

An interpreter executes a program on the fly. Examples of this are javascript and python. For the sake of simplicity, this series will focus only on making an interpreted language.

## Parts of an interpreter
When you run your program, the interpreter doesn't execute it right away. There are a few things the interpreter does to prepare the program for execution. Let's talk about those:

### 1. The Lexer
The lexer will be the focus of this tutorial. It takes your code and converts it into a list of something called "tokens". These tokens each have a type and a value.

### 2. The Parser
The parser takes the tokens and creates something called an _"Abstract Syntax Tree"_, or _"AST"_. The AST tells the interpreter what tokens belong together, and how. We'll discuss this in more detail in the next post.

### Execution
Once all these steps have run, the code will be executed. How exactly this works will also receive a dedicated post

## Setting up our workspace
For this project, create a new folder whereever you store your projects. I have a folder called `projects` on my desktop. I called my project folder `my-programming-language`. Open your folder in VSCode or whatever IDE you use. Open up the integrated terminal.

In the terminal type the following commands:
```bash
npm init -y
npm install enquirer chalk
```

Then, create a file, `index.js`. This will be the entry point for our program. In it, paste the following:
```js
const { createTokens } = require('./lexer');
const { prompt } = require('enquirer');
const chalk = require('chalk');

(async () => {
  // Repeat forever
  while (true) {
    // Prompt for a command
    const { command } = await prompt({ name: 'command', message: '>>>', type: 'input', prefix: '' });
    
    // Run the lexer on the command
    const tokens = createTokens(command);
    
    // Output the tokens
    console.log(`${chalk.gray('<•')} ${tokens.map(t => t.toString()).join('; ')}`);
  }
})();
```

This program will infinitely prompt you for a command, run the lexer and print the results. **However, this will not work at all until we start coding our lexer**, so don't be surprised if you receive an error.

## The Token class
Now, let's start working on our lexer. First, create a new folder in your project called `lexer`. In that folder, create a new file, `token.js`

In this file, create an empty class called `Token`:
```js
class Token {
  // add code here...
}
```

Now, we add a constructor that takes a type and value and stores them:
```js
class Token {
  constructor(_type, value) {
    this.type = _type;
    this.value = value;
  }
  
  // add code here...
}
```

And finally, add a method called `toString()` that stringifies the token in the form of `<TYPE:VALUE>` and export the class:
```js
class Token {
  constructor(_type, value) {
    this.type = _type;
    this.value = value;
  }
  
  toString() {
    return `<${this.type}:${this.value}>`;
  }
}

module.exports = Token;
```

And that's our token class, done!

## Creating the actual Lexer
> _This part might get a little bit complicated, but bear with me here._

First, we create a new file in the `lexer` folder called `index.js`. This is where the main Lexer code will go. Into this file, paste the following code:
```js
const token_types = {
  number: /[0-9]+(?:\.[0-9]+)?/,
  plus: /\+/,
  minus: /\-/,
  times: /\*/,
  divide: /\//,
  lparen: /\(/,
  rparen: /\)/,
};
```

Each entry in this object represents a token type. The key (left of the `:`) is the name of the type, the value (right of the `:`) is a [regex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) that explains to the lexer how to check whether a piece of text is equivalent to that token type or not.

Next, create a method called `createTokens` and export it so other files can access it. This method will run the lexer on a piece of code. (**For now, our lexer will only be able to process simple mathematical expressions**, but that will change later).

```js
const token_types = {
  number: /[0-9]+(?:\.[0-9]+)?/,
  plus: /\+/,
  minus: /\-/,
  times: /\*/,
  divide: /\//,
  lparen: /\(/,
  rparen: /\)/,
};

function createTokens(code) {
}

// add code here...

module.exports = {
  createTokens
};
```

Below the `createTokens` method, add an empty class called `Lexer`.
```js
const token_types = {
  number: /[0-9]+(?:\.[0-9]+)?/,
  plus: /\+/,
  minus: /\-/,
  times: /\*/,
  divide: /\//,
  lparen: /\(/,
  rparen: /\)/,
};

function createTokens(code) {
}

class Lexer {
}

module.exports = {
  createTokens
};
```

In the Lexer class, add a constructor that takes in a string of code and a map of token types:
```js
const token_types = {
  number: /[0-9]+(?:\.[0-9]+)?/,
  plus: /\+/,
  minus: /\-/,
  times: /\*/,
  divide: /\//,
  lparen: /\(/,
  rparen: /\)/,
};

function createTokens(code) {
}

class Lexer {
  constructor(code, types) {
    this.types = types;
    this.code = code;
  }
}

module.exports = {
  createTokens
};
```

### Representing postitions
This might not make sense now, but it will become important later to keep track of positions. For this, we will create a class called position. It stores a copy of the code, the current line, column and absolute index in the code. **This class will be located in a file called `pos.js` in the project folder**
```js
class Pos {
  constructor(idx, ln, col, code) {
    this.idx = idx;
    this.ln = ln;
    this.col = col;
    this.code = code;
  }
  
  advance(n) {
    for (let i = 0; i < (n || 1); i++) {
      this.idx++;
      this.col++;
      if (this.code[idx] === '\n') {
        this.col = 0;
        this.ln++;
      }
    }
  }
  
  clone() {
    return new Pos(this.idx, this.ln, this.col, this.code);
  }
}

module.exports = Pos;
```

### Back to the lexer
In the `Lexer` constructor, initialize a position and add a method to advance by n characters:
```js
const Pos = require('../pos');

const token_types = {
  number: /[0-9]+(?:\.[0-9]+)?/,
  plus: /\+/,
  minus: /\-/,
  times: /\*/,
  divide: /\//,
  lparen: /\(/,
  rparen: /\)/,
};

function createTokens(code) {
}

class Lexer {
  constructor(code, types) {
    this.types = types;
    this.code = code;
    this.pos = new Pos(0, 0, 0, code);
    this.slice = code;
  }
  
  advance(n) {
    this.pos.advance(n);
    this.slice = code.slice(pos.idx);
  }
}

module.exports = {
  createTokens
};
```

Now, in the `Lexer` class, add a method called `createTokens`. Inside it, intialize an empty array of tokens.
```js
// ...
class Lexer {
  constructor(code, types) {
    this.types = types;
    this.code = code;
    this.pos = new Pos(0, 0, 0, code);
    this.slice = code;
  }
  
  advance(n) {
    this.pos.advance(n);
    this.slice = code.slice(pos.idx);
  }
  
  createTokens() {
    const tokens = [];
  }
}
// ...
```

In this method, loop until `this.slice` is falsy, e.g. There is no more code left over to work with:
```js
// ...
class Lexer {
  constructor(code, types) {
    this.types = types;
    this.code = code;
    this.pos = new Pos(0, 0, 0, code);
    this.slice = code;
  }
  
  advance(n) {
    this.pos.advance(n);
    this.slice = code.slice(pos.idx);
  }
  
  createTokens() {
    const tokens = [];
    
    while (this.slice) {
      var token = null;
      
      // add code here...
      
      if (token === null) {
        // This code is not valid. Throw an error
        return ['ERROR'] // We will change this later.
      }
      tokens.push(token);
      this.advance(token.length)
    }
    
    return tokens;
  }
}
// ...
```

In each iteration of this loop, we will iterate through the token types until we either find a token that matches the beginning of `this.slice` or run out of tokens, the latter of which means that the code is not valid and should result in an error.

Inside the loop, just below `var token = null;`, add the following code (it does exactly what I described above):
```js
for (let _type in this.types) {
  const e = this.types[_type].exec(this.slice) // Run the regex
  if (e === null) continue; // Skip if no match exists
  
  token = new Token(_type, e[0]);
  break; // We don't have to loop over all the others; we already have a match
}
```

Also, at the top of the file, we need to import the `Token` class.
```js
const Token = require('./token');
```

The lexer file should now look like this:
```js
const Pos = require('../pos');
const Token = require('./token');

const token_types = {
  number: /[0-9]+(?:\.[0-9]+)?/,
  plus: /\+/,
  minus: /\-/,
  times: /\*/,
  divide: /\//,
  lparen: /\(/,
  rparen: /\)/,
};

function createTokens(code) {
}

class Lexer {
  constructor(code, types) {
    this.types = types;
    this.code = code;
    this.pos = new Pos(0, 0, 0, code);
    this.slice = code;
  }
  
  advance(n) {
    this.pos.advance(n);
    this.slice = code.slice(pos.idx);
  }
  
  createTokens() {
    const tokens = [];
    
    while (this.slice) {
      var token = null;
      
      for (let _type in this.types) {
        const e = this.types[_type].exec(this.slice) // Run the regex
        if (e === null) continue; // Skip if no match exists
  
        token = new Token(_type, e[0]);
        break; // We don't have to loop over all the others; we already have a match
      }
      
      if (token === null) {
        // This code is not valid. Throw an error
        return ['ERROR'] // We will change this later.
      }
      tokens.push(token);
      this.advance(token.length)
    }
    
    return tokens;
  }
}

module.exports = {
  createTokens
};
```

The lexer class is finished now, so let's finally implement the `createTokens` method (not the one in the `Lexer` class). In the method, we create a lexer class, and run it:
```js
function createTokens(code) {
  const lexer = new Lexer(code, token_types);
  return lexer.createTokens();
}
```

## That's it!
And that's it! We're finally done! Stay tuned for the next tutorial where we will learn how to create a parser for our code.
