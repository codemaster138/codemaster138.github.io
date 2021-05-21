const {
  sass,
  write,
  writeFile,
  copy,
  imgOptimize,
  htmlBuild,
  singleHTMLBuild,
  markdown,
  halt,
} = inert;

const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

const config = {
  custom: {
    hostname: 'https://codemaster138.github.io',
    title: "Jake Sarjeant",
    authors: {
      "Jake Sarjeant": {
        description: "Owns this blog",
        about: `Hi! I'm Jake. I'm a web developer 👨‍💻, web designer 🎨, and space enthusiast 🚀🛰. I am also
                quite interested in decentralization, cryptocurrency and blockchain, and I hope to be able
                to write more about those topics in the near future.`,
        avatar: "/assets/avatars/avatar.png",
      },
    },
    tags: {
      space: {
        display: "Space 🚀🛰",
        color: "#1d32d3",
        bg: "#1d32d325",
      },
      meta: {
        display: "Meta",
        color: "#888888",
        bg: "#88888825",
      },
      pandemic: {
        display: "Pandemic 😷",
        color: "#dd2163",
        bg: "#dd216325",
      },
      code: {
        display: "Code 👨‍💻",
        color: "#26d43a",
        bg: "#2acc3d25",
      },
      design: {
        display: "Design 🎨",
        color: "#631fd1",
        bg: "#631fd125",
      },
      decentralization: {
        display: "Decentralization 🤯",
        color: "#2dc9b4",
        bg: "#2dc9b425",
      },
      blockchain: {
        display: "Blockchain ⛓",
        color: "#d8a117",
        bg: "#d8a11525",
      },
      skynet: {
        display: "Skynet ☁️",
        color: "#00C65E",
        bg: "#00C65E25",
      },
    },

    donations: [
      {
        // BitCoin Donations
        symbol: '₿TC',
        text: '14kB52DWbsRS3nYYooe8P24veuYTjXE9h9',
        link: 'https://blockchain.com/btc/address/14kB52DWbsRS3nYYooe8P24veuYTjXE9h9',
        color: '#f2a900',
        bg: '#f2a90025',
      },
      {
        // DogeCoin Donations
        symbol: 'ÐOGE',
        text: 'DB51McxHZTKzmn8QQHQJgDSMDwbiTNYDAD',
        link: 'https://blockchair.com/dogecoin/address/DB51McxHZTKzmn8QQHQJgDSMDwbiTNYDAD',
        color: '#cbaf59',
        bg: '#cbaf5925'
      },
      {
        // ZCash
        symbol: 'ZEC',
        text: 't1Y56nzdFwHedBcyRHcJe6x4i7cc7gRBusi',
        link: 'https://blockchair.com/zcash/address/t1Y56nzdFwHedBcyRHcJe6x4i7cc7gRBusi',
        color: '#f9bb01',
        bg: '#f9bb0125'
      }
      // Add other donation methods here (Patreon, CoFi, etc.)
    ],

    posts: {}, // Will be automatically populated
    by_tag: {}, // Also automatically populated
  },
  build: {
    globals: [require, inert],

    templates: {
      home: "templates/home.ejs",
      post: "templates/post.ejs",
    },

    sourceDirs: {
      scss: "scss",
      assets: "assets",
      posts: "posts",
    },

    outDirs: {
      output: "docs",
      tags: ":output:/tags",
      sassOutput: ":output:/style",
      assets: ":output:/assets",
      optimizedAssets: ":assets:/optimized",
      postOutput: ":output:/blog",
    },

    rootFile: "templates/home.ejs",
    slashPipeline: [
      halt({ tag: null }),
      singleHTMLBuild(),
      writeFile(":output:/index.html"),
      halt(),
      (config, file) => {
        Object.keys(config.custom.by_tag).forEach((tag) => {
          writeFile(`:tags:/${tag}/index.html`)(
            config,
            file,
            singleHTMLBuild()(config, file, { tag: tag })
          );
        });
      },
      async (config, file) => {
        // Build SiteMap
        var links = [{
          url: '/',
          changefreq: 'weekly',
          priority: 0.6,
          lastmod: new Date().toISOString()
        }];
        Object.keys(config.custom.posts).forEach(post => {
          links.push({
            url: `/blog/${path.basename(post, '.md')}`,
            changefreq: 'monthly',
            priority: 0.8,
            lastmod: new Date(config.custom.posts[post].attributes.lastmod || config.custom.posts[post].attributes.time).toISOString()
          });
        });
        Object.keys(config.custom.by_tag).forEach(tag => {
          links.push({
            url: `/tags/${tag}`,
            changefreq: 'weekly',
            priority: 0.5,
            lastmod: new Date().toISOString()
          });
        });

        // Compile into XML and save
        const stream = new SitemapStream({ hostname: config.custom.hostname });
        const data = await streamToPromise(Readable.from(links).pipe(stream));
        writeFile(`:output:/sitemap.xml`)(config, file, data.toString());
      }
    ],

    folders: [
      {
        folder: "scss",
        build: {
          traverseLevel: "flat",
          filePipeline: [sass(), write("sassOutput", ".css")],
        },
      },
      {
        folder: "assets",
        build: {
          traverseLevel: "recursive",
          filePipeline: [
            copy("assets"),
            imgOptimize("optimizedAssets", { ignore: [] }),
          ],
        },
      },
      {
        folder: "posts",
        build: {
          traverseLevel: "recursive",
          filePipeline: [
            markdown(),
            /**
             * Populate config.custom.posts
             */
            (config, file, data) => {
              data.file = file;
              config.custom.posts[file.basename] = data;
              if (data.attributes.tags) {
                data.attributes.tags.forEach((tag) => {
                  if (!config.custom.by_tag[tag])
                    config.custom.by_tag[tag] = [];
                  config.custom.by_tag[tag].push(data);
                });
              }
              return data;
            },
            htmlBuild("post"),
            write("postOutput", ".html", "index"),
          ],
        },
      },
    ],
  },
};

module.exports = config;
