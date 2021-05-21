---
title: "Storing files on the decentralized web: Skynet"
description: In this post, I will explain how the SkyNet network allows you to store files on the decentralized web
time: 1618771025799
cover: /assets/covers/nodes_3_skynet_cover.png
author: Jake Sarjeant
tags:
  - code
  - decentralization
  - blockchain
  - skynet
---

The decentralized web is an amazing place. There's cryptocurrencies, there's [decentralized domain name systems](/blog/nodes-part-1-handshake) and so many more amazing things. But how do we store files on the decentralized web? Certainly not through centralized enterprise server farms, but then how?

The answer to this question is: [Skynet](https://siasky.net). Skynet is a decentralized, distributed network of nodes that allows you to store files in a decentralized manner. How does it work? How can I start using it? That's exactly what we'll explore in this post!

## A high-level overview

First, I want to establish a basic, high-level understanding of how Skynet works. To do this, we'll use an example:

Someone, let's call them _Bob_, has a file he wants to make available through the skynet network. So he goes to a skynet [portal](#portals). On this portal, he can upload his file. This file is uploaded to at least 30 nodes in the skynet network, and assigned an address called a ["skylink"](#skylinks).

When Bob wants to share his file, he shares the skylink that the network assigned to his file. Now someone else, let's call this person _Alice_, wants to download the file. Using any skynet [portal](#portals), she can request the file with that skylink. This portal will send a request to a node in the network, which will either respond with the file, if it has the file on hand, or request the file from another node. Eventually, this process hits a node that has the file, and the file is returned from node to node until it reaches the portal.

Now that we know how the skynet operates on a basic level, we can look into it in more detail.

## Skylinks

As you now know from the previous section, each file on the skynet network is identified by a long string of random-looking letters and numbers called a skylink. This skylink is unique to one, and only one file. But how does it work, and why don't we just use plain text file names instead?

First, a primer on addressing:

### Location-based addressing

This is probably the type of addressing you're most familiar with. A location-based address, as the name implies, points to the location of a file. It is how files are addressed on the centralized web, and it's also how local files on your computer are addressed.

This approach is more easily comprehensible by humans, and it works really well on the centralized internet, but on decentralized networks, it starts to break down.

You see, because files are stored on multiple nodes at once and may switch from one node to another at any given point in time, we cannot establish a universal location of said file. Instead, we must address it differently:

### Content-based addressing

In this addressing scheme, we address files not based on their location in the network, but instead based on their content. For the reasons described above, this addressing scheme is the one that makes the most sense in a decentralized network.

When a file is requested using a content-based address, we can bounce the request from node to node until one of the nodes discovers a file, the contents of which match up with the given address.

So, a skylink is nothing else than a content-based address pointing to the content of the file.

#### Generating content-based addresses

If a content-based address contained the full content of the file, there would be no point in storing the file on the skynet. So how do we establish a content-based address for our file?

To do this, we use hashes. A hash is function that takes in a file and returns a short string. This string will change drastically when the tiniest change is made to the input value. For example the hash of "hello" would in no way resemble the hash of "hell0". Hashing methods are used to store passwords, and they also happen to be a perfect fit for content-based addressing. There are many, many different hash functions out there, and I am not exactly sure which one uses, but some very popular ones are [SHA-256 and SHA-512](https://en.wikipedia.org/wiki/SHA-2).

## Portals

The easiest way to access files on the skynet is through a skynet portal. A portal can be operated by anyone. In fact, check out [this documentation](https://support.siasky.net/key-concepts/skynet-portals/using-a-sia-node-as-a-portal) to host your own portal.

A portal is basically a glorified sia node that provides some sort of interface through which users can upload and download files from/to skynet.

A portal operates exactly like I described above in the [basic example](#a-high-level-overview).

### Further reading

I hope this post helped you understand the basics of skynet, but if you wish to learn more, you should check out the following sites:

- [Sia Skynet Portal Homepage](https://siasky.net)
- [Skynet documentation](https://support.siasky.net/)
