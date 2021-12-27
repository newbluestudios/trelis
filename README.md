# Trelis MVP Simple Lightning Payments 👾

This project relies on boltz-core:
https://github.com/BoltzExchange/boltz-core

Build from source by cloning a copy of boltz-core under the src directory.  This will be automatically included later on.

This project uses NextJS, specifically nextjs-advanced-starter:
https://github.com/agcty/nextjs-advanced-starter

## Table of Contents

- [Trelis MVP 👾]
  - [Why?](#why)
  - [Features](#features)
  - [How to use](#how-to-use)
  - [Explanation why some dependencies are in this template](#explanation-why-some-dependencies-are-in-this-template)
    - [@tailwindcss/forms](#tailwindcssforms)
    - [@tailwindcss/typography](#tailwindcsstypography)
  - [Extending the template](#extending-the-template)
    - [Config files](#config-files)
    - [Changing the font](#changing-the-font)
    - [Configuring ESLint rules](#configuring-eslint-rules)
    - [Adding new absolute import paths](#adding-new-absolute-import-paths)
  - [Recommended extensions for VSCode](#recommended-extensions-for-vscode)
  - [Resources](#resources)

## Why?

Crypto is hard (really hard).  Even integrating an existing end-to-end solution takes a few days to setup and understand.  This project aims to provide instant payments links using a publicly accessible API endpoint that uses the secure boltz backend in a non-custodial way to tranfer funds.

## Features

- Fast design workflow with Tailwind CSS 2.0
  - write css like the cool kids
  - unused classes are purged automatically = really small css bundle size
- TypeScript
  - typed JavaScript
  - drastically reduces errors
  - #1 must have in any web-dev project
- Customizable ESLint config
  - AirBnB code guidelines + prettier rules
- Code formatting with Prettier
  - Code is auto-formatted on save
- Inter font
  - Nice looking apple-like open source font.
  - Don't like it? It's easily [replacable](#changing-the-font)
- Standardized absolute imports
  - Import from @components/MyComp instead of ../../components/MyComp


## How to use

1. You will first need to clone https://github.com/BoltzExchange/boltz-core and place the entire project under the src directory. This works for now even though it includes a ton of unecesary source code. 

```bash
npm install
# or
yarn install

# then
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Explanation why some dependencies are in this template

### @tailwindcss/forms

First party dependency for resetting input styles so you don't have to manually reset like this:

```css
textarea,
input[type="text"],
input[type="search"],
input[type="button"],
input[type="submit"] {
  -webkit-appearance: none;
  border-radius: 0;
}
```

### @tailwindcss/typography

A Tailwind CSS plugin for automatically styling plain HTML content with beautiful typographic defaults. Just add the class "prose" to your html and content will be styled automatically.

E.g this html:

```html
<article class="prose lg:prose-xl">
  <h1>How to set up an enterprise Next.js stack</h1>
  <p>
    Configuring Next.js with TypeScript, ESLint & prettier can become really
    annoying, especially if you're a beginner and don't know the intricate
    details of all the moving parts in a web-dev environment. The most important
    things you have to set up are:
  </p>
  <ul>
    <li>A working ESLint config</li>
    <li>Prettier plugins that auto-format your code</li>
    <li>Absolute imports</li>
  </ul>
</article>
```

will be rendered like this:

![prose output](https://i.imgur.com/xJD5Ojv.png)

If you don't need or want this dependency you can safely remove it.

## Extending the template

### Config files

| File name               | What it does                                                                                              |
| ----------------------- | --------------------------------------------------------------------------------------------------------- |
| `tsconfig.json`         | TypeScript configuration. Tells IDE which absolute imports exist and works in conjunction with .babelrc   |
| `.eslintrc.json`        | Config file for finding and fixing problems in code. E.g: No function should be used before it's defined. |
| `tailwind.config.js`    | TailwindCSS config. Adds new sizes, shadows, borders etc. to your tailwind classes.                       |
| `postcss.config.js`     | Tells your project to include TailwindCSS in build chain.                                                 |
| `prettier.config.js`    | Rules for formatting your code. E.g: indent code 6 spaces instead of 4                                    |
| `babelrc.js`            | Extends the Next.js babel config and defines absolute imports.                                            |
| `.vscode/settings.json` | Custom settings for your VSCode workspace. Tells VSCode to auto-format code on save.                      |

### Changing the font

1. In `src/pages/_app.tsx` replace the link tag with your url (can be Google Fonts, Adobe Typekit, etc.)

```html
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
  rel="stylesheet"
/>
```

2. In tailwind.config.js replace "Inter" with your custom font

```javascript
extend: {
  fontFamily: {
    sans: ["Inter", ...defaultTheme.fontFamily.sans],
}
```

As of Next 10.0.2 google fonts are optimized automatically: https://nextjs.org/blog/next-10-2#automatic-webfont-optimization

Tip: The font you choose should have at least these weights: 400, 500, 600, 700, 800. You need these weights for the tailwind font classes to have an effect. E.g if you don't include the weight 500, the class "font-medium" won't have any effect.

### Configuring ESLint rules

If you need additional rules or want to turn off specific rules just edit `.eslintrc.js`. Only change the order of plugins and items in the "extends" array if you know what you're doing as this can have unexpected side effects: Items on the bottom ovverride the former items. This is the intended behaviour so you can extend and configure existing rules easily. For example first we add the popular airbnb rules and then have prettier ovverride some of these rules so code formatting doesn't interfere with other rules.

### Adding new absolute import paths


This will instruct Next.js to set up a new alias to your specific folder. If you try to import a file with @myalias now it will still throw an error however because we need to tell our IDE that this path actually exists:

Add path in `.tsconfig`

```javascript
"@myalias/*": ["./src/myaliasfolder/*"]
```

That's it! Nextjs 11 now automatically sets up babel and everything else and just works. In previous releases you had to manually configure babel as well.

## Recommended extensions for VSCode

If you're a beginner and don't know which extensions you need, definitely install these:

1. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint): Adds error highlighting to VSCode.
2. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode): Auto-fixes formatting errors everytime you hit save.
3. [TailwindCSS Intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss): Tailwind className suggestions as you type
4. [Headwind](https://marketplace.visualstudio.com/items?itemName=heybourn.headwind): Makes sure your tailwind classes have the correct order which makes components easier to read.

## Resources

If you're not yet familiar with some of the technologies used in this project here are some resources to help you get started:

[Tailwind CSS course](https://tailwindcss.com/course): Free course by the creators of tailwind. Definitely check it out. It helps you "think" in tailwind. E.g before going through this course I styled my webapps by adding classes from the beginning. However, a much better approach is to 1) semantically structure your html without any classes and 2) to then add styling by using tailwind classes.

[ESLint config guide](https://eslint.org/docs/user-guide/configuring): If you need to configure ESLint read their documentation (or at least the parts you need). You'll be surprised how much just makes sense after that.
