import fs from 'fs-extra';
import chalk from 'chalk';
import { prefixText, color } from './ora-config.js';
import ora from 'ora';

const builSpinner = ora({ text: `${prefixText} Compilers Running...\n`, color }).start();
const ceTemplate = `/// <reference lib="dom" />

import React from "react";
import ReactDOM from "react-dom";
import ReplaceMe from "../components/ReplaceMe";
import styles from "../css/globalcss";
import { setupForReact } from "@exweiv/wix-ce-helpers";

const fonts = [
    // Include Fonts Here (Font Links or <link> Tags Both Works)
]

class CustomElement extends HTMLElement {
    rootDiv = document.createElement("div");

    constructor() {
        super();
        setupForReact(fonts, [styles], this);
        this.render(this.getAttribute("props"));
    }

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
        const app = React.createElement(ReplaceMe, { ...JSON.parse(props), customElement: this });
        ReactDOM.render(app, this.rootDiv);
    }
}

customElements.define("custom-element", CustomElement);
`;

try {
    ora(builSpinner.text = `${prefixText} Creating a Custom Element Template...`);
    let fileName = process.argv[2];

    if (fileName.includes('.js')) {
        fileName = fileName.replace('.js', '');
    }

    await fs.writeFile(`../src/public/custom-elements/${!fileName ? "exweiv-cce-template" : fileName}.js`, ceTemplate);
    builSpinner.succeed(`Custom Element Created at ../src/public/custom-elements/${fileName}.js`);
} catch (err) {
    console.log(chalk.red(`Error (Custom Element Creator): ${err}`));
}