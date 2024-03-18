# ExWeiv Wix-React Integration Setup

Let us show you how you can use this repo as a starting point to integrate React.js into your Wix powered website (Wix Editor or Wix Studio) to work with React in Wix you will use `custom elements` and you will also need Git integration enabled so you can automatically integrate it or you can setup the same folders and copy paste same files/folders manually into Wix.

#### Create a `React` folder in your root dir.

#### Then go into that folder with `cd React` command.

```cli
cd React
```

#### Now clone this repo into that folder with a command:

```cli
git clone git@github.com:ExWeiv/wix-react.git .
```

> . in the end is important it'll only copy files in that way

#### Time to install packages inside the repo, run this command:

```cli
npm i
```

#### You can create folders automatically by running:

```cli
npm run setup
```

#### And now you are ready for compiling React components and CSS files, run this command to compile pre-built example components:

```cli
npm run build
```

#### We are not finised yet, you must also install React and ReactDOM in you Wix site, go to root folder back and run these:

```cli
cd ..
```

```cli
wix install react
```

```cli
wix install react-dom
```

> You can use `cd ..` for going back between folders.

#### Optionally you can also install another package to send objects to your custom elements and setup custom element for React faster:

```cli
wix install @exweiv/wix-ce-helpers
```

> If you want to remove Git tracking features you can run `npm run rm-git` (only Windows). You can also delete hidden .git folder inside React folder.

You will see new files inside of your `public` folder. And now next step is creating custom elements codes. Each time you want to create a new custom element you need to manually create a new `.js` file inside of your `src/public/custom-elements` (custom-elements) folder. Wix will be pulling any custom-element files from this dir.

Here is an example custom element component that's using example components created from this repo. You can copy this code and paste it into a JS file and then you will be good to go for adding your custom element into desired page.

> After you add the custom element in the editor don't forget to set the tag name of custom element if it's set incorrect it won't work!

```js
/// <reference lib="dom" />

// Custom Element Example

import React from "react";
import ReactDOM from "react-dom";
import Counter from "../components/Counter";
import styles from "../css/globalcss";
import { setupForReact } from '@exweiv/wix-ce-helpers';

const fonts = [
    `<link rel="preconnect" href="https://fonts.googleapis.com">`,
    `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`,
    `<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">`
]

class CounterReactExample extends HTMLElement {
    rootDiv = document.createElement("div");

    constructor() {
        super();
        setupForReact(fonts, [styles], this);
        this.render(this.getAttribute("props"));
    }

    // Attributes keys that's listened for changes
    static get observedAttributes() {
        return ["props"];
    }

    /**
     * @param {string} name Name of attribute (key)
     * @param {String} oldValue Old value of attribute
     * @param {String} newValue New value of attribute
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "props") {
            this.render(newValue);
        }
    }

    render(props) {
        // Create another HTML element to mount into div element + pass props as JS object
        const app = React.createElement(Counter, { ...JSON.parse(props), customElement: this });
        // Mount created app to div and render (after first mount it will only render changed elements)
        ReactDOM.render(app, this.rootDiv);
    }
}

customElements.define("react-counter-example", CounterReactExample);
```

For the page code copy paste this:

```js
import { sendJSON } from "@exweiv/wix-ce-helpers";

$w.onReady(() => {
  sendJSON("props", { clickCount: 100 }, "#customElement");

  $w("#customElement").on("onButtonClick", ({ detail }) => {
    sendJSON("props", { clickCount: detail.count * 2 }, "#customElement");
  });
});
```

WebGL Example:

```js
/// <reference lib="dom" />

import React from "react";
import ReactDOM from "react-dom";
import WebGL from "../components/WebGLExample";
import styles from "../css/files/webglexamplecss";
import { setupForReact } from '@exweiv/wix-ce-helpers';

const fonts = [`<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap" rel="stylesheet">`];

class WebGLExample extends HTMLElement {
    rootDiv = document.createElement("div");

    constructor() {
        super();
        setupForReact(fonts, [styles], this);
        this.render();
    }

    render() {
        const app = React.createElement(WebGL, { customElement: this });
        ReactDOM.render(app, this.rootDiv);
    }
}

customElements.define("react-webgl-example", WebGLExample);
```

When you use external components and libraries from NPM you should install these into your Wix site. And if you want auto-complete features enabled while working with these external components you can also install these inside React folder where your components lives.

> Don't forget when installing for Wix use `wix install < package name >` when installing inside React folder (first navigate to that folder using `cd React`) use `npm install < package name >`.

---

Powered by ExWeiv Apps <br>
[Kolay Gelsin](https://medium.com/the-optimists-daily/kolay-gelsin-a-turkish-expression-we-should-all-know-and-use-83fc1207ae5d) 💜
