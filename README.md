# Lightweight bundler _(alpha)_

Oriented for better DX while creating landing pages or other small projects

## TODO

- [x] Init project script
- [ ] Development server script
- [ ] Build server script
- [ ] Config ESLint and Prettier

## Getting Started

_First of all you need Node.js version `8.9` or higher. You can find installation instructions for the last version [here](https://nodejs.org/en/)._

Let's go:

1. Init your progect with ``npm init -y`` command.
1. Install bundler:
    ```sh
    npm install @prismdev/lightweight-bundler
    ```
1. Create initial file structure:
    ```sh
    $(npm bin)/lightweight-bundler init
    ```
    _For Windows:_
    ```sh
    .\node_modules\.bin\lightweight-bundler.cmd init
    ```

1. Start to create awesome things!
    ```sh
    npm start
    ```

## File Structure

```tree
.
├── README.md
├── node_modules
├── package.json
├── .gitignore
└── src
    ├── index.css
    ├── index.js
    ├── assets // Resources the interface depends on
    │   ├── images
    │   ├── fonts
    │   └── icons
    ├── components
    │   └── [component-name]
    │       ├── [component-name].css
    │       └── [component-name].js
    │
    │   // Here you can place your components with their own
    │   // styles and scripts
    │
    └── static
        ├── favicon.ico
        ├── manifest.json
        ├── index.html
        └── content

            // Directory contains different content resources.
            // Such as product images, profile photos, galleries
            // etc.
```

_More information will be added here lately._

🚲  for Prism dev team 🕴🏼