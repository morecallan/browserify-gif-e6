"use strict";

const printToDom = require('./dom');
const loadGifs = require('./gifs');
const loadCategories = require('./categories');

let gifArray = [];

const errorFunction = () => {
	console.log("You broke everything!");
};

const whenGifsLoad = function() {
	gifArray = JSON.parse(this.responseText).gifs;
	loadCategories(whenCategoriesLoad, errorFunction);
};

const whenCategoriesLoad = function() {
	let categoryArray = JSON.parse(this.responseText).categories;
	combineArrays(categoryArray);
};

const combineArrays = (categories) => {
	categories.forEach((category) => {
		gifArray.forEach((gif) => {
			if (gif.category === category.id) {
				gif.categoryName = category.name;
				gif.categoryDataName = category.dataName;
			}
		});
	});
	printToDom(gifArray);
};

const initializer = () => {
	loadGifs(whenGifsLoad, errorFunction);
};

module.exports = initializer;