$(document).ready(function(){
    make_base()
})

function make_base()
  {
    let canvas = document.getElementById('viewport')
    let context = canvas.getContext('2d');
    let base_image = new Image();
    base_image.src = './images.jpeg';
    console.log(base_image)
    base_image.onload = function(){
      context.drawImage(base_image, 0, 0);
    }
  }


const getImgData = (imgWidth, imgHeigth) => {
    const imgData = ctx.getImageData(0, 0, imgWidth, imgHeigth);
    console.log(imgData.data);
    
    red=imgData.data[0];
    green=imgData.data[1];
    blue=imgData.data[2];
    alpha=imgData.data[3];


    //loop
    // cripto
    
}

const criptoCifraCesar = (R, G, B, chave) => {

    const newR = (R+chave)%256;
    const newG = (G+chave)%256;
    const newB = (B+chave)%256;

    const newRGB = {
        newR,
        newG,
        newB
    }

    return newRGB;
}


const decriptoCifraCesar = (R, G, B, chave) => {

    const newR = R-chave
    const newG = G-chave
    const newB = B-chave

    if (newR < 0) {
        newR += 256
    }

    if (newG < 0) {
        newG += 256
    }

    if (newB < 0) {
        newB += 256
    }

    const newRGB = {
        newR,
        newG,
        newB
    }

    return newRGB;
}

const criptoCifraXor = (R, G, B, chave) => {

    const newR = (R^chave);
    const newG = (G^chave);
    const newB = (B^chave);

    const newRGB = {
        newR,
        newG,
        newB
    }

    return newRGB;
}