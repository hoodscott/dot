const codes = {};
const dotLength = 150;
const shortLength = 500;
const longLength = 1000;
let textString = '';
let mouseUp = true;

codes.dot = {
  letter: 'e'
};
codes.dot.dot = {
  letter: 'i'
};
codes.dot.dash = {
  letter: 'a'
};

codes.dash = {
  letter: 't'
};
codes.dash.dot = {
  letter: 'n'
};
codes.dash.dash = {
  letter: 'm'
};

/**
 * Convert an integer to a 'decision string'
 * It feels like there should be an easier way to do this
 **/
function intToDecString(num) {
  /* Find the length this number represents */
  /* div = 2^length */
  let div = 2;
  /* Skip base case of 0 or 1 when divisor stays as 2 */
  if (num >= 2) {
    /* Keep doubling divisor until it is 3 or more larger */
    while (num + 3 > div) {
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

// for (i = 0; i < 62; i++) {
//   console.log(i, intToDecString(i));
// }

document.querySelectorAll('.option').forEach(element => {
  element.addEventListener("click", () => {
    document.querySelectorAll('.option').forEach(option => {
      if (option.id !== element.id) {
        option.style.opacity = 0;
      } else {
        option.style.boxShadow = 'inset 0 0 0 500px';
        setTimeout(() => {
          option.style.opacity = 0;
        }, 500);
        setTimeout(() => {
          startGame(option.id);
        }, 1000);
      }
    });
  });
});

/* Record when the input button is pressed */
document.getElementById('input').addEventListener("mousedown", () => {
  mouseUp = false;
  downTime = Date.now();
});
/* Trigger some functions when the button is released */
document.getElementById('input').addEventListener("mouseup", () => {
  mouseUp = true;
  upTime = Date.now();
  /* If the uptime is short, this is a dot, otherwise a dash */
  if (upTime - downTime < dotLength) {
    textString += '.';
  } else {
    textString += '-';
  }
  /* Add the symbol to the string */
  document.getElementById('text').innerText = textString;

  /* Store the current string locally so we can check if it has changed */
  const t = textString;
  /* Create short callback function for spaces between letters */
  setTimeout(() => {
    /* If the string is unchanged and there are no current clicks */
    if (t == textString && mouseUp) {
      /* Add a space between letters */
      textString += ' ';
    }
  }, shortLength, t);
  /* Create long callback function for spaces between words */
  setTimeout(() => {
    /* If the string is unchanged (other than letterspace)
      and there are no current clicks */
    if ((t + ' ') == textString && mouseUp) {
      /* Print the string, then reset it */
      console.log(textString);
      textString = '';
    }
  }, longLength, t);
});

function startGame(mode) {
  document.getElementById('main').style.display = 'none';
  document.getElementById('level').style.display = 'flex';
}