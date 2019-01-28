const codes = {};

    codes.dot = {letter: 'e'};
    codes.dot.dot = {letter: 'i'};
    codes.dot.dash = {letter: 'a'};

    codes.dash = {letter: 't'};
    codes.dash.dot = {letter: 'n'};
    codes.dash.dash = {letter: 'm'};

    /**
      * Convert an integer to a 'decision string'
      * It feels like there should be an easier way to do this
    **/
    function intToDecString(num) {
      /* Find the length this number represents */
      /* div = 2^length */
      let div = 2;
      /* Skip base case of 0 or 1 when divisor stays as 2 */
      if (num >= 2){
        /* Keep doubling divisor until it is 3 or more larger */
        while(num + 3 > div) {
          div *= 2;
        }
        /* Divisor is always twice as big as needed */
        div /= 2;
      }

      /* Build the 'decision string' */
      let bin_string = '';
      /* For each power of two in divisor */
      while (div > 2) {
        /* Convert down to one bit with division, mod, 
          and a bit shift */
        bin_string += (((num + 2 - div) / (div / 2) % 2) >>> 0).toString(2);
        div /= 2;
      }
      /* Handle base case for least significant bit */
      bin_string += (num % 2 >>> 0).toString(2);

      return bin_string;
    }
    
    for (i = 0; i < 62; i++) {
      console.log(i, intToDecString(i));
    }

    document.querySelectorAll('.option').forEach(element => {
      element.addEventListener("click", () => {
        document.querySelectorAll('.option').forEach(option => {
          if (option.id !== element.id) {
            option.style.opacity = 0;
          } else {
            option.style.boxShadow = 'inset 0 0 0 500px';
            setTimeout(() => {
              option.style.opacity = 0;
            },500);
            setTimeout(() => {
              startGame(option.id);
            },1000);
          }
        });
      });
    });

    function startGame(mode) {
      document.getElementById('main').style.display = 'none';
      document.getElementById('level').style.display = 'flex';
    }