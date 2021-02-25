const config = {
    build: {
        input: "./posts",
        output: "./docs",
        posts: "blog",
        sassEntry: './scss/index.scss',
        sassFolder: './scss',
        sassOutput: 'index.css',
        templates: {
            home: './templates/home.ejs',
            post: './templates/post.ejs'
        }
    },
    blogName: `Jake's Blog`,
    ownerName: `Jake Sarjeant`,
    description: `Full-stack web developer 👨‍💻, web designer 🎨 & space enthusiast 🚀🛰`,
    navLinks: [
        {
            href: '/',
            text: 'Home'
        },
        {
            href: 'https://github.com/codemaster138',
            text: 'GitHub'
        }
    ],
    plugins: ['plugin.js'],
    assets: './assets',
    i18n: {
        languages: {
            'en': {
                name: 'English',
                primaryName: 'English',
                path: '/'
            }
        },
        primary: 'en'
    }
}

module.exports = config;
