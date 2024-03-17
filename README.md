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

You will see new files inside of your `public` folder. And now next step is creating custom elements codes. Each time you want to create a new custom element you need to manually create a new `.js` file inside of your `src/public/custom-elements` (custom-elements) folder. Wix will be pulling any custom-element files from this dir.

Here is an example custom element component that's using example components created from this repo. You can copy this code and paste it into a JS file and then you will be good to go for adding your custom element into desired page.

> After you add the custom element in the editor don't forget to set the tag name of custom element if it's set incorrect it won't work!

```js
// Custom Element Example
```

---

Powered by ExWeiv Apps <br>
[Kolay Gelsin](https://medium.com/the-optimists-daily/kolay-gelsin-a-turkish-expression-we-should-all-know-and-use-83fc1207ae5d) 💜