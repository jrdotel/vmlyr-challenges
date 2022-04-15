/*
Masonry js library implemented:

    https://masonry.desandro.com/
*/

import Masonry from 'masonry-layout';

window.onload = () => {
    var elem = document.querySelector('.container');
    var msnry = new Masonry( elem, {
      // options
      itemSelector: '.card',
      columnWidth: 300
    });
}