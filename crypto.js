
function drawImage(imageObj){
    var canvas = document.getElementById("mau");
    var canvas2 = document.getElementById("mal");
    var context = canvas.getContext("2d");
    var context2 = canvas2.getContext("2d");

    var destX = 1;
    var destY = 1;

    context.drawImage(imageObj, destX, destY, 320, 180);
    context2.drawImage(imageObj, destX, destY, 320, 180);

    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
      const rgb = {
        red: data[i],
        green: data[i + 1],
        blue: data[i + 2]
      }
          
      // obj rgb, chave, (1 = Cifra de Cesar; 2 = Cifra XOR, Outro = S-DES)
      const newRgb = cripto(rgb, "1010000010", 3);

      // i+3 is alpha (the fourth element)
      data[i] = newRgb.red;
      data[i + 1] = newRgb.green;
      data[i + 2] = newRgb.blue;
    }
    
    // overwrite ori,ginal image
    context.putImageData(imageData, 0, 0);
}

const cripto = (rgb, chave, algo) => {
  const newRGB = {
    red: 0,
    green: 0,
    blue: 0
  }

  if( algo === 1 ) {
    newRGB.red = (rgb.red + chave) % 256;
    newRGB.green = (rgb.green + chave) % 256;
    newRGB.blue = (rgb.blue + chave) % 256;
  
  } else if( algo === 2) {
    const intKey	=	parseInt( chave, 2 );
    console.log(intKey);
    newRGB.red = (rgb.red ^ intKey);
    newRGB.green = (rgb.green ^ intKey);
    newRGB.blue = (rgb.blue ^ intKey);
    
  } else {
    const keys = generateKeys(chave);
    newRGB.red = encrypt(rgb.red, keys)
    newRGB.green = encrypt(rgb.green, keys)
    newRGB.blue = encrypt(rgb.blue, keys)
  }

  return newRGB;
}

function p10(k) {
  var pA = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6];
  var kA = k.split('');
  var r = [];

  pA.forEach(element => {
      r.push(kA[element-1])
  });
  return r;
}

function p8(k) {
  var pA = [6, 3, 7, 4, 8, 5, 10, 9];
  var kA = k.split('');
  var r = [];

  pA.forEach(element => {
      r.push(kA[element-1])
  });
  return r;
}

function p4(k){
  var pA = [2, 4, 3, 1];
  var kA = k.split('');
  var r = [];

  pA.forEach(element => {
      r.push(kA[element-1])
  });
  return r;
} 

function lShift (a) {
  
  var shifted = [];
  var last;
  a.forEach( (element, key) => {
      if (key === 0) {
          last = element;
      } else {
          shifted.push(element);
      }
  })
  shifted.push(last);
  return shifted;
}

function lShiftN (a, m) {
  for(let i = 0; i < m; i++){
      a = lShift(a);
  } 
  return a;
}

function generateKeys (key) {

  key = p10(key)
  var kA1 = key.slice(0, 5);
  var kA2 = key.slice(5, 10);
  var LS1 = lShiftN(kA1, 1).concat(lShiftN(kA2, 1));


  kA1 = LS1.slice(0, 5);
  kA2 = LS1.slice(5, 10);

  var LS2 = lShiftN(kA1, 2).concat(lShiftN(kA2, 2));

  var key1 = p8(LS1.join(''));
  var key2 = p8(LS2.join(''));

  return [key1.join(''), key2.join('')];
}

function p8Init(k) {
  var pA = [2, 6, 3, 1, 4, 8, 5, 7];
  var kA = k.split('');
  var r = [];

  pA.forEach(element => {
      r.push(kA[element-1])
  });
  return r;
}

function p8Inverse (k) {
  var pA = [4, 1, 3, 5, 7, 2, 8, 6];
  var kA = k.split('');
  var r = [];

  pA.forEach(element => {
      r.push(kA[element-1])
  });
  return r;
}

// Permutate and expand 4 bits to 8 bits
function p4E(k){
  
  var pA = [4, 1, 2, 3, 2, 3, 4, 1];

  var kA = k.split('');
  var r = [];

  pA.forEach(element => {
      r.push(kA[element-1])
  });
  return r;
} 

function p4(k){
  var pA = [2, 4, 3, 1];
  var kA = k.split('');
  var r = [];

  pA.forEach(element => {
      r.push(kA[element-1])
  });
  return r;
} 

function XOR (a, b) {
  a = a.split('');
  b = b.split('');

  var r = [];
  a.forEach( (element, key) => {
      if (element !== b[key]) {
          r.push(1);
      } else {
          r.push(0);
      }
  });

  return r.join('');
}

var MATRIX_S0 = [
  ['01', '00', '11', '10'],
  ['11', '10', '01', '00'],
  ['00', '10', '01', '11'],
  ['11', '01', '11', '10']
];

var MATRIX_S1 = [
  ['00', '01', '10', '11'],
  ['10', '00', '01', '11'],
  ['11', '00', '01', '00'],
  ['10', '01', '00', '11']
]

// 4 bit input
// 1 and 4 of input is the row
// 2 and 3 of input is the column
function SUB1 (r, c) {

  r = parseInt(r, 2);
  c = parseInt(c, 2);

  return MATRIX_S0[r][c];
}

function SUB0 (r, c) {

  r = parseInt(r, 2);
  c = parseInt(c, 2);

  return MATRIX_S1[r][c];
}

function fk (P1, P2, key) {

  // Expand P2's 4 bits into 8
  var P2E = p4E(P2.join('')).join('')

  // XOR P2E with key1
  var XOR2 = XOR(P2E, key);

  // Split the 8 bits
  var S0 = XOR2.slice(0, 4);
  var S1 = XOR2.slice(4, 8);

  // Row is 1, 4 bits
  // Col is 2, 3 bits
  var R0 = S0[0] + S0[3];
  var C0 = S0[1] + S0[2];

  var R1 = S1[0] + S1[3];
  var C1 = S1[1] + S1[2];

  // Look up in the matrix
  var P4 = p4(SUB1(R0, C0) + SUB0(R1, C1));

  // XOR P4 and P1
  return XOR(P4.join(''), P1.join(''));
  
}


function encrypt (p, keys) {

  // Initial permutation
  // Split initial permutation into two halfs
  // P1 is the left bits and P2 is the right bits
  var IP = p8Init(p);

  var P1 = IP.slice(0, 4);
  var P2 = IP.slice(4, 8);

  // Run fk with key 0
  var fk1 = fk(P1, P2, keys[0]);

  // Swap
  var SW = P2.join('') + fk1;

  SW = SW.split('');

  // Put SW into the funtion fk again
  SW1 = SW.slice(0, 4);
  SW2 = SW.slice(4, 8);

  // Run fk with key 1
  var fk2 = fk(SW1, SW2, keys[1]);
  
  // Join
  var RES = fk2 + SW2.join('');
  var p8I = p8Inverse(RES);

  return p8I.join('');
}

// Decrypt is the same as encrypt , except that we start 
// Using key[1] as the first key and the key[0]
function decrypt (p, keys) {

  // Initial permutation
  // Split initial permutation into two halfs
  // P1 is the left bits and P2 is the right bits
  var IP = p8Init(p);

  var P1 = IP.slice(0, 4);
  var P2 = IP.slice(4, 8);

  // Run fk with key 1
  var fk1 = fk(P1, P2, keys[1]);

  // Swap
  var SW = P2.join('') + fk1;

  SW = SW.split('');

  // Put SW into the funtion fk again
  SW1 = SW.slice(0, 4);
  SW2 = SW.slice(4, 8);

  // Run fk with key 0
  var fk2 = fk(SW1, SW2, keys[0]);
  
  // Join
  var RES = fk2 + SW2.join('');
  var p8I = p8Inverse(RES);

  return p8I.join('');
}


var imageObj = new Image();
imageObj.onload = function(){
   drawImage(this);
};

imageObj.src = 'data:image/jpeg;base64,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';