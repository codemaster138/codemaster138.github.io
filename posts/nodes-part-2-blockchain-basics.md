---
title: "Blockchain: The Basics"
description: "In this post, I will try to break down the basics of what blockchains are, and how they work. This post lays the basis for many posts to come in my series “Nodes: The magic of the decentralized web”"
time: 1618674689841
cover: /assets/covers/nodes_2_blockchain_basics_cover.png
author: Jake Sarjeant
tags:
  - code
  - decentralization
  - blockchain
---

In the world of decentralization and cryptocurrency, there's no word you'll hear more often than blockchain. Litterally none. So, it falls into the category of things commonly considered "good ideas", to learn what a blockchain is and how it works.

In this post, I will break down on a basic level, how a blockchain works, and hopefully, by the time you're done reading this post, you'll have a high-level understanding of how a blockhain works.

## Blocks
As the name implies, a *block*-*chain* is a *chain* of *blocks*. Each block is this chain is composed of a few things:

1. **Some data to store in the block:** Often this contains transaction details, like the source, destination and magnitude (amount of currency) of a transaction.
2. **A hash:** The hash is a unique piece of data that is valid for only the exact contents of the block. If the block's conentents change, that hash must change too.
3. **Previous block's hash:** The hash from the previous block. This is what forms the chain between the blocks.

Here's a more visual representation:
![A block on a blockchain](/assets/images/blockchain_block.png)

As you can see, each block stores some data, in this case the transaction details and two hashes. It's own hash and the previous block's hash.

The first block in the blockchain has no previous block hash. This block is called the genesis block.

## How does it protect from tampering with transactions?
How can we make sure that hackers can't tamper with transactions and funnel all the money to themselves? To understand this, me must first establish how a hacker would tamper with a transaction:

1. Find the transaction to tamper with
2. Change transaction details

However, now the block is invalid, because the block's hash no longer matches up with it's contents. So, the hacker must do another thing:

3. Calculate and update hash

To make this harder to do, we use a system called *“Proof of work”*, or PoW for short. In the BitCoin blockchain, this complex mathematical process takes about 10 minutes to complete each time we add a block to the blockchain or change a block in the blockchain.

Now, the hacker faces another problem: Each block carries the hash of the previous block. But, because our tampered block's hash changed, every block after it now has an incorrect hash, and is therefore invalid. The only way to solve this is to calculate the PoW for every single following block, and at 10 minutes per block, we can assume that this is, for all intents and purposes, impossible.

## Another layer of security: Decentralization
Because the blockchain is a decentralized system, there is no central place for the hacker to tamper with transactions. Each "node" in the BitCoin network stores its own copy of the blockchain. So, to tamper with a block and succeed, the hacker would have to take over more than *50%* of the entire BitCoin network, which is also, for all intents and purposes, impossible.

I hope that this post gave you a good high-level understanding of blockchains. If you liked it, stick around, because I will definitely be adding a few more posts to this series!