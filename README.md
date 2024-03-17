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

#### Optionally you can also install another package to send objects to your custom elements:

```cli
wix install @exweiv/wix-ce-helpers
```

You will see new files inside of your `public` folder. And now next step is creating custom elements codes. Each time you want to create a new custom element you need to manually create a new `.js` file inside of your `src/public/custom-elements` (custom-elements) folder. Wix will be pulling any custom-element files from this dir.

Here is an example custom element component that's using example components created from this repo. You can copy this code and paste it into a JS file and then you will be good to go for adding your custom element into desired page.

> After you add the custom element in the editor don't forget to set the tag name of custom element if it's set incorrect it won't work!

```js
// Custom Element Example

import React from "react";
import ReactDOM from "react-dom";
import Counter from "../components/Counter";
import styles from "../css/countercss";

// Create a root div to mount React component
const mountDiv = document.createElement("div");

// Making possible to style root div
mountDiv.id = "root-div";

// We need to save customElement into a variable to pass it
let customElement;

class CounterReactExample extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Set HTML (CSS with style tag) in custom element
    this.shadowRoot.innerHTML = styles;

    // Add div into custom element
    this.shadowRoot.appendChild(mountDiv);

    // Save custom element to pass it to React
    customElement = this;
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
      // Create another HTML element to mount into div element + pass props as JS object
      const app = React.createElement(Counter, { ...JSON.parse(newValue), customElement });
      // Mount created app to div and render (after first mount it will only render changed elements)
      ReactDOM.render(app, mountDiv);
    }
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

When you use external components and libraries from NPM you should install these into your Wix site. And if you want auto-complete features enabled while working with these external components you can also install these inside React folder where your components lives.

> Don't forget when installing for Wix use `wix install < package name >` when installing inside React folder (first navigate to that folder using `cd React`) use `npm install < package name >`.

---

Powered by ExWeiv Apps <br>
[Kolay Gelsin](https://medium.com/the-optimists-daily/kolay-gelsin-a-turkish-expression-we-should-all-know-and-use-83fc1207ae5d) 💜
