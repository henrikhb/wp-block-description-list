# Description List WP Gutenberg Block
This is a WordpPress plugin for adding description list functionality to WordPress's gutenberg editor.

The plugin is still in the works, but is already ready to use in production.

## Features
#### The descirption list block contains easy to use UI using gutenbergs default UI.
![Image of UI of block in backend](https://raw.githubusercontent.com/lassemt/wp-block-description-list/master/examples/example-backend.png)

#### How the block look in the frontend
![Image of block in frontend](https://raw.githubusercontent.com/lassemt/wp-block-description-list/master/examples/example-frontend.png)
#### Block markup in the frontend
```
<dl class="wp-block-lmt-description-list">
	<dt>Apple</dt><dd>Apple is a company, not a fruit.</dd>
	<dt>Banana</dt><dd>Banana is a yellow curved shaped fruit.</dd>
	<dt>Pear</dt><dd>Pear is a shape you become if you eat donuts instead of fruit.</dd>
</dl>
```

#### Todo
- [ ] Better styles.
- [ ] Add transforms rules so the block can be transformed into other blocks.
- [ ] Other? [Create an issue / PR.](https://github.com/lassemt/wp-block-description-list/issues)

---

This project was bootstrapped with [Create Guten Block](https://github.com/ahmadawais/create-guten-block).

Below you will find some information on how to run scripts.

>You can find the most recent version of this guide [here](https://github.com/ahmadawais/create-guten-block).

## 👉  `npm start`
- Use to compile and run the block in development mode.
- Watches for any changes and reports back any errors in your code.

## 👉  `npm run build`
- Use to build production code for your block inside `dist` folder.
- Runs once and reports back the gzip file sizes of the produced code.

## 👉  `npm run eject`
- Use to eject your plugin out of `create-guten-block`.
- Provides all the configurations so you can customize the project as you want.
- It's a one-way street, `eject` and you have to maintain everything yourself.
- You don't normally have to `eject` a project because by ejecting you lose the connection with `create-guten-block` and from there onwards you have to update and maintain all the dependencies on your own.
