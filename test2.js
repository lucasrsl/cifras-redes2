var criptXor = new Image
var criptCezar = new Image

function drawFirstImage(imageObj) {
    let canvas = document.getElementById("original");
    let context = canvas.getContext("2d");

    let destX = 1;
    let destY = 1;
    context.drawImage(imageObj, destX, destY, 320, 180);
}

function callXor(imageObjTest) {
    criptoXor = imageObjTest;
    drawImageWithCifra(imageObjTest, "xor")
}

function callDescriptXor(){
    descriptImage("xor")
}

function callCezar(imageObjTest) {
    drawImageWithCifra(imageObjTest, "cezar")
}

function callDescriptCezar(){
    descriptImage("cezar")
}

function callSdes(){

}

function callDecriptSdes() {
  descriptImage("sdes")
}

function drawImageWithCifra(imageObj, id) {
    var canvas = document.getElementById(id);
    var context = canvas.getContext("2d");

    var destX = 1;
    var destY = 1;

    context.drawImage(imageObj, destX, destY, 320, 180);

    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        var red = data[i]; // red
        var green = data[i + 1]; // green
        var blue = data[i + 2]; // blue

        let newRgb = ""
        switch (id) {
            case "xor":
              newRgb = criptoCifraXor(red, green, blue);
              break;
            case "cezar":
              newRgb = criptoCifraCesar(red, green, blue);
              break;
            case "sdes":
              newRgb = criptoCifraSdes(red, green, blue);
              break;
        }

        // i+3 is alpha (the fourth element)
        data[i] = newRgb.red;
        data[i + 1] = newRgb.green;
        data[i + 2] = newRgb.blue;
    }

    // overwrite original image
    context.putImageData(imageData, 0, 0);
}

function descriptImage(id = "xor"){
    var canvas = document.getElementById(id);
    var context = canvas.getContext("2d");
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    console.log(imageData)
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        var red = data[i]; // red
        var green = data[i + 1]; // green
        var blue = data[i + 2]; // blue

        let newRgb = ""
        switch (id) {
            case "xor":
              newRgb = criptoCifraXor(red, green, blue);
              break;
            case "cezar":
              newRgb = decriptoCifraCesar(red, green, blue);
              break;
            case "sdes":
              newRgb = decriptoSdes(red, green, blue);
              break;
        }

        // i+3 is alpha (the fourth element)
        data[i] = newRgb.red;
        data[i + 1] = newRgb.green;
        data[i + 2] = newRgb.blue;
    }
    console.log(data)
    console.log(imageData.data)

    // overwrite ori,ginal image
    context.putImageData(imageData, 0, 0);
}

function criptoCifraCesar(R, G, B) {
    const chave = parseInt($("#input").val())

    const red = (R + chave) % 256;
    const green = (G + chave) % 256;
    const blue = (B + chave) % 256;

    const newRGB = {
        red,
        green,
        blue
    }

    return newRGB;
}

function decriptoCifraCesar(R, G, B){
    const chave = parseInt($("#input").val())
    let red = R - chave
    let green = G - chave
    let blue = B - chave

    if (red < 0) {
        red += 256
    }

    if (green < 0) {
        green += 256
    }

    if (blue < 0) {
        blue += 256
    }

    const newRGB = {
        red,
        green,
        blue
    }

    return newRGB;
}

function criptoCifraXor(R, G, B){
    const chave = parseInt($("#input").val()).toString(2)
    const key = parseInt(chave, 2)

    const red = (R ^ key);
    const green = (G ^ key);
    const blue = (B ^ key);

    const newRGB = {
        red,
        green,
        blue
    }

    return newRGB;
}

function criptoCifraSdes(R, G, B) {
  const chave = parseInt($("#input").val()).toString(2)
  const keys = generateKeys(chave);
  let red = R.toString(2);
  let green = G.toString(2);
  let blue = B.toString(2);
  
  while (red.length < 8) {
    red = "0" + red;
  }
  while (green.length < 8) {
    green = "0" + green;
  }
  while (blue.length < 8) {
    blue = "0" + blue;
  }
  const rgb = {
    red,
    green,
    blue
  }
  
  newRGB.red = parseInt(encryptSdes(rgb.red, keys), 2);
  newRGB.green = parseInt(encryptSdes(rgb.green, keys), 2);
  newRGB.blue = parseInt(encryptSdes(rgb.blue, keys), 2);
}

function decriptoCifraSdes(R, G, B) {
  
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


function encryptSdes (p, keys) {

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
function decryptSdes (p, keys) {

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


var imageObjTest = new Image

function readFile() {

    if (this.files && this.files[0]) {

        var FR = new FileReader();

        FR.addEventListener("load", function (e) {
            imageObjTest.src = e.target.result
        });

        FR.readAsDataURL(this.files[0]);
    }
}

document.getElementById("upload").addEventListener("change", readFile);

var imageObj = new Image();
imageObj.onload = function () {
    // drawImageWithCifra(this, "mal");
};