
/*  Model  */

var model = {
    currentCat: null,
    cats: [
        {
            clickCount : 0,
            name : 'Zozi',
            imgSrc : 'img/zozi.jpg'
			},
        {
            clickCount : 0,
            name : 'Sofo',
            imgSrc : 'img/sofo.jpg'
			},
        {
            clickCount : 0,
            name : 'Fluffy',
            imgSrc : 'img/fluffy.jpg'
			},
        {
            clickCount : 0,
            name : 'Sheko',
            imgSrc : 'img/sheko.jpg'
			},
        {
            clickCount : 0,
            name : 'Surprise?',
            imgSrc : 'img/twinky.jpg'
			}
    ]
};


/* Octopus */

var octopus = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to start
        catListView.init();
        catView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    }
};


/*  View  */

var catView = {

    init: function() {
        // store our DOM elements 
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // update the DOM elements with the right values
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {

    init: function() {
        this.catListElem = document.getElementById('cat-list');
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat)); // this is an IIFY

            this.catListElem.appendChild(elem);
        }
    }
};

octopus.init();
