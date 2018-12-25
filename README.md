# Description List -  A WordPress Gutenberg block 📝
This is a WordPress plugin that allows you to add valid HTML description lists as a block in the Gutenberg editor. 

* ✅ Valid in accordance to the official `<dl>` [HTML Spec](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl).
* 📖 Allows multiple terms and descriptions
* ⬆️ Easy reordering

## Functionality

### Backend
Easy to use interface building on top of the default editor interface with inner blocks. It is currently supported to add `<p>`'s and `<img>`'s as description for terms.

![Block UI backend](https://user-images.githubusercontent.com/10498583/50421435-98bd1080-083f-11e9-8c02-b3300e2127ba.jpg)

### Frontend
This is how the description list looks on the frontend with default styling:

![Block frontend](https://user-images.githubusercontent.com/10498583/50421436-9bb80100-083f-11e9-96c1-0c426e5edddf.jpg)

#### Outputtet markup
```
<dl class="wp-block-lmt-description-list">
	<dt class="wp-block-lmt-description-list-item">
		<p>Apple</p>
	</dt>
	<dd class="wp-block-lmt-description-list-item">
		<p>Apple is a company</p>
	</dd>
	<dd class="wp-block-lmt-description-list-item">
		<p>Apple is a fruit</p>
	</dd>
	<dt class="wp-block-lmt-description-list-item">
		<p>Banana</p>
	</dt>
	<dd class="wp-block-lmt-description-list-item">
		<p>Is a yellow curved shaped fruit</p>
	</dd>
	<dt class="wp-block-lmt-description-list-item">
		<p>Pear</p>
	</dt>
	<dd class="wp-block-lmt-description-list-item">
		<p>Pear is a shape you become if you eat donuts instead of fruit</p>
	</dd>
</dl>
```

## Todo
> 🚧 You can use this block today but it's still work in progress

- [ ] Better styles. 🎨
- [ ] Add transform rules so the block can be transformed into other blocks. 🔄
- [ ] More stuff? 💡[Create an issue / PR.](https://github.com/lassemt/wp-block-description-list/issues)

## Development
If you want to build upon or contribute to this block. 🛠️

This project was bootstrapped with [Create Guten Block](https://github.com/ahmadawais/create-guten-block). Go to the repo find the most updated information about the block toolkit.

>create-guten-block is zero configuration dev-toolkit (#0CJS) to develop WordPress Gutenberg blocks in a matter of minutes without configuring React, webpack, ES6/7/8/Next, ESLint, Babel, etc.

### How to get started:

### 👉  `npm start`
- Use to compile and run the block in development mode.
- Watches for any changes and reports back any errors in your code.

### 👉  `npm run build`
- Use to build production code for your block inside `dist` folder.
- Runs once and reports back the gzip file sizes of the produced code.
