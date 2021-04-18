---
title: "Handshake: What is it? How does it work?"
description: In this post, I will explain handshake.org, the awesome new experimental decentralized alternative to the DNS root zone.
time: 1618665404547
cover: /assets/nodes_1_handshake_cover.png
author: Jake Sarjeant
tags:
  - code
  - decentralization
  - blockchain
---

Not too long ago, I was looking through all the nerdy chat groups I'm in and discovered a very interesting project – handshake.org. When I read through the website, I became immediately intrigued by its premise:

> Handshake is a decentralized, permissionless naming protocol where every peer is validating and in charge of managing the root DNS naming zone with the goal of creating an alternative to existing Certificate Authorities and naming systems.

But what exactly is it? Why is it important? And also, how does it work 🤔?

In this post, I will try to break down the motivation behind creating handshake.org and also try to explain how it works behind the scenes.

## What problem does handshake solve?
Currently, all names on the internet are controlled by central authorities. For example, the TLD (top-level domain name) `.com` is controlled by the company Verisign. If Verisign, or, even worse, the US goverment wants to take away someone's domain, they can do so with ease.

TL;DR, Companies like Verisign and their respective goverments monopolize the domain market and stand in the way of freedom of speech on the internet.

**This is often referred to as “the treachery of the internet”:**

When the internet was first introduced, it promised us a free way to communicate with others and share our oppinions. Instead, the internet has, for most people, done the opposite: It has become the only accessible channel of communication where one can be heard and if one's oppinion isn't in canon with that of one's respective local goverment or the enterprises controlling the media channels, they have no voice.

Lately, this problem has become more and more pronouced. One especially big event was the *parler shutdown*. Completely regardless of political view, I think this does not set a good precedent and it also goes to show how much power companies like Amazon, Google and Verisign have over the internet.

## How does handshake solve the problem?
One word: *decentralization*. This one word is the key to freedom on the internet. (This part might get a little nerdy 😂)

Handshake is, actually, a blockchain. In fact, it is *two* blockchains: One for handshake's own currency, *"HNS"* and one for handshake domains. So, in a way, handshake domains are also a form of cryptocurrency.

When someone wants to buy a domain, they first buy some HNS. Then, they find a handshake domain name that is not registered yet and start an auction. Other people can also bid on the handshake domain name. The highest bidder wins the auction and pays the *second highest* bid (This is called a vickrey auction, you can read more about it [here](https://en.wikipedia.org/wiki/vickrey_auction))

After the auction is closed, the winner receives the handshake domain name. No one can take it away from them, because it is on a blockchain. The only way to lose a domain name is to forget to renew it.