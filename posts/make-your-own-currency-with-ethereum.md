---
title: Make your own basic currency with smart contracts!
description: There's lots of cryptocurrencies out there, but did you know it's ridiculously easy to make your own?
time: 1618902918388
cover: /assets/smart-contract-currency-cover.png
author: Jake Sarjeant
tags:
  - code
  - blockchain
---

There's lots of cryptocurrencies out there, but did you know it's ridiculously easy to make your own? In this post, I'll show you how to do so with _smart contracts_.

With this post, I want to introduce you to the world of smart contracts and show you how to write your own very first contract.

## But what _is_ a smart contract?

Smart contracts are a pretty expansive and complicated topic, but all you need to know is that a smart contract is just a program that runs inside a blockchain. In the case of this tutorial, the Ethereum blockhain.

## Creating your first smart contract

Before we start modelling complex data structures in out smart contracts, let's start with something basic. Many tutorials would build a "Hello World" contract now, but I think that since most people reading this are familiar with the basic concepts of programming, so we'll be creating our own simple cryptocurrency.

> **Note:** The currency we'll be creating is not standard-compliant and will not be able to interact with other tokens. Also, I can't guarantee that it's secure.

### Installing the tools

There's a couple things you'll need, so let's go over those real quick:

#### NodeJS & NPM

Follow the install instructions on https://nodejs.org/. To verify that it works, run the following two commands:

```bash
node -v # Should return (for example) v14.15.4
npm -v # Should return (for example) v7.9.0
```

#### SolC

On the ethereum blockchain, smart contracts are written using a programming language called `Solidity`. To use it we'll need its compiler, `solc`.

```bash
npm i -g solc
```

If this throws an error, try

```bash
sudo npm i -g solc
```

#### Truffle

To make our life a bit easier, we'll be using the [Truffle](https://trufflesuite.com/) framework. Install it using:

```bash
npm i -g truffle
```

#### Ganache

Ganache is a one-click blockchain to help you test your smart contracts. Follow the install instructions on https://www.trufflesuite.com/ganache/, open the app and click "Quick Start" to set up your blockchain.

### Setting up your project

Create and open your project folder in VSCode. In the terminal, run the following command:

```bash
truffle init
```

This will create an empty truffle project in your project directory.

You should see the following folder structure:

```txt
Project Root
 ├── contracts
 │   └── Migrations.sol
 ├── migrations
 │   └── 1_initial_migration.js
 ├── test
 │   └── .gitkeep
 └── truffle-config.js
```

Most of these files are of no interest right now, except for the configuration file. Delete it's contents and replace them with the following:

```js
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777",
    },
  },
  compilers: {
    solc: {
      version: "^0.6",
    },
  },
};
```

In the Ganache app, at the top you should see a bar with a bunch of data and statistics. The only thing that you need there are the `Network ID` and `RPC Server` fields. Replace the network ID in the configuration above with the netwotk ID from Ganache, then replace the port with the part _after_ the colon in the `RPC Server` field:

![Ganache App Topbar](/assets/Screenshot%202021-04-28%20at%2013.06.27.png)

### Writing the actual contract

That was quite a lot of set-up, but now we can finally begin to write our first smart contract! Smart contracts on the ethereum blockchain are written in a language called `Soldity`. It was purpose-built for making smart contracts.

Create a file in the `contracts` folder called `MyCoin.sol`, or whatever you want to call your cryptocurrency.

The first line in every Solidity program should define what versions of Soldity the contract requires to run. It looks like this:

```sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;
pragma experimental ABIEncoderV2;
```

As you can see, our program will be running in any version of solidity between version 0.6.0 and 0.9.0. The Comment at the top is not necessarily required, but many IDEs will complain if it's missing.

In Solidity, we write "contracts" like we would write classes in any other language. Let's create an empty contract inside our file:

```sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract MyCoin {
  // ... add code here
}
```

Our contract will allow users to do a couple of things: A user can transfer coins to another user, and view the balance of any user. Just to make the whole thing easier to wrap your head around, users will be able to buy new coins with Ethereum, thereby creating more coins and sell their coins for ethereum again, thereby removing coins from the system.

To store this data, we'll need a couple of variables. The first one is a `mapping` containing the balances of different users, where each user's Ethereum address points to their balance. The seconde one is a variable containing the total amount of coins in the system.

Let's declare those:

```sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract MyCoin {
  mapping(address => Balance) private balances;
  uint256 private totalCoins = 0;

  // ... add code here
}
```

The syntax for declaring these may seem a bit strange, but you'll get used to it. Here's the syntax for declaring a field:

```sol
<type> <access-modifier> <variable-name>;
```

The syntax for mapping types:

```sol
mapping(<index-type> => <value-type>)
```

Now, we need to delcare the `Balance` type used in our mapping:

```sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract MyCoin {
  struct Balance {
    address payable owner;
    uint256 amount;
  }

  mapping(address => Balance) private balances;
  uint256 private totalCoins = 0;

  // ... add code here
}
```

As you can see, each Balance holds two fields: The owner's address and the amount of coins they own. The difference between the `address` and `address payable` types is that only the latter one can receive ETH payments.

Now, let's add some getter methods. A getter method allows anyone to read a private value from the contract. This is useful if you want to allow reading, but not writing a certain value, for example totalCoins.

```sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract MyCoin {
  struct Balance {
    address payable owner;
    uint256 amount;
  }

  mapping(address => Balance) private balances;
  uint256 private totalCoins = 0;

  /**
   * @dev Get total amount of coins
   */
  function getTotalCoins() public view returns(uint256) {
    return totalCoins;
  }
}
```

Also, we'll add a method to get a user's balance:

```sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract MyCoin {
  struct Balance {
    address payable owner;
    uint256 amount;
  }

  mapping(address => Balance) private balances;
  uint256 private totalCoins = 0;

  /**
   * @dev Get total amount of coins
   */
  function getTotalCoins() public view returns(uint256) {
    return totalCoins;
  }

  /**
   * @dev Get balance
   */
  function getBalance(address _address) public view returns(Balance memory) {
    return balances[_address];
  }
}
```

Now, let's finally add a method for users to buy our currency. I'v decided to pin the value of the currency at 2.5 microether (2,500,000,000,000 wei). To allow users to buy things from smart contracts, Solidity provides us with the `payable` modifier. If we mark a method as payable, a user can send ether to this method. We can use the `msg.sender` and `msg.value` fileds to detect the address of the sender and amount of ether sent.

```sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract MyCoin {
  struct Balance {
    address payable owner;
    uint256 amount;
  }

  mapping(address => Balance) private balances;
  uint256 private totalCoins = 0;
  // 1 MyCoin = <converionRate> wei
  uint256 conversionRate = 2500000000000;

  /**
   * @dev Get total amount of coins
   */
  function getTotalCoins() public view returns(uint256) {
    return totalCoins;
  }

  /**
   * @dev Get balance
   */
  function getBalance(address _address) public view returns(Balance memory) {
    return balances[_address];
  }

  /**
   * @dev Buy MyCoin
   */
  function buyMyCoin() external payable {
    require(msg.value > 1 gwei, "Minimum transaction is 1 gwei"); // Not very much

    uint256 amount = convert(msg.value, conversionRate, true);

    balances[msg.sender].owner = payable(msg.sender);
    balances[msg.sender].amount += amount;

    totalCoins += amount;
  }

  /**
   * @dev Convert currencies
   */
  function convert(uint256 amount, uint256 conversion_rate, bool from) public pure returns(uint256) {
    return from ? amount / conversion_rate : amount * conversion_rate;
  }
}
```

There's quite a lot of changes here, so I'll just give you the gist:

- `convert` is a simple function that takes an amount and conversion rate and converts between two currencies.
- The new `conversion_rate` field is the conversion rate from MyCoin to `wei`. 1 wei is 1 quintillionth of an ether, and is the unit used for `msg.value`.
- `buyMyCoin` is a payable method that buy some MyCoin

Another obviously important thing to do is to allow the user to transfer money to other users. To do this, we'll add a method called `transfer` that transfers tokens and and event called `Transfer`. Events allow nodes to listen for transactions and react to them.

```sol
...
contract MyCoin {
  ...
  event Transfer(address from, address to, uint256 amount);
  ...
}
```

Method to transfer tokens:

```sol
...
contract MyCoin {
  ...
  /**
   * @dev Transfer MyCoin
   */
  function transferMyCoin(address payable to, uint256 amount) external returns(bool) {
    require(balances[msg.sender].amount >= amount, "Cannot overdraw MyCoin. (You don't have enough money for this transaction)");

    balances[msg.sender].amount -= amount;
    balances[to].amount += amount;
    emit Transfer(msg.sender, to, amount);
    return true;
  }
  ...
}
```

Now, our cryptocurrency is fully useable, but it's kind of a one-way money sink, and most peoply don't like that in a currency. So, we'll add a way to sell these tokens for regular boring ethereum:

```sol
...
contract MyCoin {
  ...
  /**
   * @dev Withdraw MyCoin tokens
   */
  function withdrawMyCoin(uint256 amount) external returns (bool) {
    require(balances[msg.sender].amount >= amount, "Cannot overdraw MyCoin. (You don't have enough money for this transaction)");

    balances[msg.sender].amount -= amount;
    balances[msg.sender].owner.transfer(convert(amount, conversionRate, false));
    return true;
  }
  ...
}
```

And, our currency is done! To recap, here's what it should look like now:

```sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract MyCoin {
  struct Balance {
    address payable owner;
    uint256 amount;
  }

  mapping(address => Balance) private balances;
  uint256 private totalCoins = 0;
  // 1 MyCoin = <converionRate> wei
  uint256 conversionRate = 2500000000000;

  event Transfer(address from, address to, uint256 amount);

  /**
   * @dev Get total amount of coins
   */
  function getTotalCoins() public view returns(uint256) {
    return totalCoins;
  }

  /**
   * @dev Get balance
   */
  function getBalance(address _address) public view returns(Balance memory) {
    return balances[_address];
  }

  /**
   * @dev Buy MyCoin
   */
  function buyMyCoin() external payable {
    require(msg.value > 1 gwei, "Minimum transaction is 1 gwei"); // Not very much

    uint256 amount = convert(msg.value, conversionRate, true);

    balances[msg.sender].owner = payable(msg.sender);
    balances[msg.sender].amount += amount;

    totalCoins += amount;
  }

  /**
   * @dev Transfer MyCoin
   */
  function transferMyCoin(address payable to, uint256 amount) external returns(bool) {
    require(balances[msg.sender].amount >= amount, "Cannot overdraw MyCoin. (You don't have enough money for this transaction)");

    balances[msg.sender].amount -= amount;
    balances[to].amount += amount;
    emit Transfer(msg.sender, to, amount);
    return true;
  }

  /**
   * @dev Withdraw MyCoin tokens
   */
  function withdrawMyCoin(uint256 amount) external returns (bool) {
    require(balances[msg.sender].amount >= amount, "Cannot overdraw MyCoin. (You don't have enough money for this transaction)");

    balances[msg.sender].amount -= amount;
    balances[msg.sender].owner.transfer(convert(amount, conversionRate, false));
    return true;
  }

  /**
   * @dev Convert currencies
   */
  function convert(uint256 amount, uint256 conversion_rate, bool from) public pure returns(uint256) {
    return from ? amount / conversion_rate : amount * conversion_rate;
  }
}
```

## Deploying your currency

Now, if you wanted to deploy your currency to the actual mainnet, you'd need to cough up some real ether (Ethereum's Currency), but there's other ways to deploy if you're just testing.

As a first test, we'll deploy out currency to Ganache. Ganache is local blockchain simulation that runs on your computer. If you followed the [tool setup instructions](#installing-the-tools), you should already have a Ganache blockchain running on your computer.

To deploy our contract, we'll need a so-called "deployer" script. Place it in the `migrations` folder and call it `2_deploy_contract.js`. Paste the following code:

```js
const MyCoin = artifacts.require("MyCoin");

module.exports = function (deployer) {
  deployer.deploy(MyCoin);
};
```

In your terminal, run:

```bash
truffle migrate --network development
```

You should see something like this:

```txt
2_deploy_contract.js
====================

   Replacing 'MyCoin'
   ------------------
   > transaction hash:    0xcb93681fa381d7a8c4032f30f0932e9cc639558687d20e6ea07b16f7a33f8ad3
   > Blocks: 0            Seconds: 0
   > contract address:    0xce4410b8C5d31706ED113B2Ac5caA3Db67441c0b
   > block number:        78
   > block timestamp:     1619763192
   > account:             0x2d0616BF48214513f70236D59000F1b4f395a2Fd
   > balance:             99.458752342
   > gas used:            694430 (0xa989e)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.0138886 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0138886 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.01772746 ETH
```

This command might take a moment to run, but when it's done, you'll have your very own cryptocurrency token!

## To be continued...
Stay tuned for my next post, where I'll show you how to interact with your currency!
