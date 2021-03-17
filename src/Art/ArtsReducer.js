import NanoDarkBlue from '../assets/images/arts/nano-dark-blue.jpg';

const Arts = {
    "nanoDarkBlue": {
        art: NanoDarkBlue,
        size: {
            width: 1000,
            height: 454,
        },
        public_key: {
            width: 320,
            height: 61,
            left: 680,
            bottom: 110,
            color: "black",
            fontSize: 11,
            lineHeight: "20px",
        },
        public_key_qr: {
            width: 119,
            height: 119,
            left: 775,
            bottom: 190,
        },
        private_key: {
            width: 260,
            height: 61,
            left: 32,
            bottom: 170,
            color: "black",
            fontSize: 11,
            lineHeight: "18px",
        },
        private_key_qr: {
            width: 119,
            height: 119,
            left: 100,
            bottom: 250,
        },
        infos: {
            width: 249,
            height: 434,
            left: 385,
            bottom: 11,
        },
    }
};

function base64image(url, callback = null) {
    let img = new Image();
    img.src = url;
    img.onload = () => {
        let canvas  =  document.createElement( 'canvas' );
        canvas.setAttribute("width", img.width);
        canvas.setAttribute("height", img.height);

        let context  =  canvas.getContext( '2d' );
        context.drawImage( img, 0, 0 );
        canvas.style.width = "100%";
        let data = canvas.toDataURL("image/jpeg");
        callback(data);
    };
    return url;
}


base64image(NanoDarkBlue, (response) => {Arts["nanoDarkBlue"].art = response});

export default function (state = Arts, action) {
   return state;
}
