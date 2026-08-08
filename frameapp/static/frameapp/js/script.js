document.addEventListener("DOMContentLoaded", function () {

```
/* =========================================================
   ELEMENTS
========================================================= */

const photoInput = document.getElementById("photoInput");
const profileImage = document.getElementById("profileImage");

const zoomSlider = document.getElementById("zoomSlider");
const zoomValue = document.getElementById("zoomValue");

const nameInput = document.getElementById("nameInput");
const posterName = document.getElementById("posterName");

const centerPhoto = document.getElementById("centerPhoto");
const downloadPoster = document.getElementById("downloadPoster");

const qrContainer = document.getElementById("qrcode");
const barcode = document.getElementById("barcode");


/* =========================================================
   PHOTO VARIABLES
========================================================= */

let zoom = 1;

let positionX = 50;
let positionY = 50;

let uploadedImage = false;


/* =========================================================
   LOAD QR CODE LIBRARY
========================================================= */

function loadQRCodeLibrary(callback) {

    if (typeof QRCode !== "undefined") {
        callback();
        return;
    }

    const script = document.createElement("script");

    script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";

    script.onload = function () {
        callback();
    };

    script.onerror = function () {
        console.error("QR Code library failed to load.");
    };

    document.head.appendChild(script);
}


/* =========================================================
   GENERATE QR CODE
========================================================= */

function generateQRCode() {

    if (!qrContainer) {
        return;
    }

    qrContainer.innerHTML = "";

    loadQRCodeLibrary(function () {

        new QRCode(qrContainer, {

            text: "https://goahackerhouse-ecq8.vercel.app/",

            width: 105,

            height: 105,

            colorDark: "#034432",

            colorLight: "#ffffff",

            correctLevel: QRCode.CorrectLevel.H

        });

    });

}


/* =========================================================
   GENERATE BARCODE
========================================================= */

function generateBarcode() {

    if (!barcode) {
        return;
    }

    barcode.innerHTML = "";


    const namespace =
        "http://www.w3.org/2000/svg";


    const group =
        document.createElementNS(namespace, "g");


    const pattern = [

        2, 1, 2, 2, 1, 2, 3, 1,
        1, 2, 2, 1, 3, 2, 1, 1,
        2, 3, 1, 2, 2, 1, 3, 1,
        2, 2, 1, 3, 1, 2, 1, 2,
        3, 1, 2, 1, 2, 3, 1, 1,
        2, 2, 3, 1, 1, 2, 2, 1,
        3, 2, 1, 2, 1, 3, 2, 1,
        2, 1, 3, 2, 1, 2, 3, 1

    ];


    let x = 5;

    let black = true;


    pattern.forEach(function (width) {

        if (black) {

            const rect =
                document.createElementNS(
                    namespace,
                    "rect"
                );

            rect.setAttribute(
                "x",
                x
            );

            rect.setAttribute(
                "y",
                5
            );

            rect.setAttribute(
                "width",
                width * 2
            );

            rect.setAttribute(
                "height",
                50
            );

            rect.setAttribute(
                "fill",
                "#111111"
            );

            group.appendChild(rect);

        }

        x += width * 2;

        black = !black;

    });


    barcode.setAttribute(
        "viewBox",
        "0 0 190 60"
    );

    barcode.setAttribute(
        "width",
        "150"
    );

    barcode.setAttribute(
        "height",
        "58"
    );

    barcode.appendChild(group);

}


/* =========================================================
   UPDATE PHOTO
========================================================= */

function updatePhoto() {

    if (!profileImage) {
        return;
    }

    profileImage.style.transform =
        `scale(${zoom})`;

    profileImage.style.transformOrigin =
        `${positionX}% ${positionY}%`;

}


/* =========================================================
   PHOTO UPLOAD
========================================================= */

if (photoInput) {

    photoInput.addEventListener(
        "change",
        function (event) {

            const file =
                event.target.files[0];

            if (!file) {
                return;
            }


            if (!file.type.startsWith("image/")) {

                alert(
                    "Please select an image file."
                );

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                function (e) {

                    profileImage.src =
                        e.target.result;

                    uploadedImage = true;

                    zoom = 1;

                    positionX = 50;

                    positionY = 50;


                    if (zoomSlider) {

                        zoomSlider.value =
                            1;

                    }


                    if (zoomValue) {

                        zoomValue.textContent =
                            "1.00×";

                    }


                    updatePhoto();

                };


            reader.readAsDataURL(file);

        }
    );

}


/* =========================================================
   ZOOM
========================================================= */

if (zoomSlider) {

    zoomSlider.addEventListener(
        "input",
        function () {

            zoom =
                parseFloat(
                    zoomSlider.value
                );


            if (zoomValue) {

                zoomValue.textContent =
                    zoom.toFixed(2) + "×";

            }


            updatePhoto();

        }
    );

}


/* =========================================================
   AUTO CENTRE
========================================================= */

function autoCenter() {

    zoom = 1;

    positionX = 50;

    positionY = 50;


    if (zoomSlider) {

        zoomSlider.value =
            1;

    }


    if (zoomValue) {

        zoomValue.textContent =
            "1.00×";

    }


    updatePhoto();

}


if (centerPhoto) {

    centerPhoto.addEventListener(
        "click",
        autoCenter
    );

}


/* =========================================================
   NAME UPDATE
========================================================= */

if (nameInput) {

    nameInput.addEventListener(
        "input",
        function () {

            let name =
                nameInput.value
                    .trim()
                    .toUpperCase();


            if (!name) {

                name =
                    "MONALISA GAAN";

            }


            if (posterName) {

                posterName.textContent =
                    name;

            }


            const ticketName =
                document.getElementById(
                    "ticketName"
                );


            if (ticketName) {

                ticketName.textContent =
                    name;

            }

        }
    );

}


/* =========================================================
   DOWNLOAD POSTER
========================================================= */

if (downloadPoster) {

    downloadPoster.addEventListener(
        "click",
        async function () {

            const poster =
                document.getElementById(
                    "poster"
                );


            if (!poster) {

                alert(
                    "Poster not found."
                );

                return;

            }


            if (
                typeof html2canvas ===
                "undefined"
            ) {

                const script =
                    document.createElement(
                        "script"
                    );


                script.src =
                    "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";


                document.head.appendChild(
                    script
                );


                await new Promise(
                    function (resolve) {

                        script.onload =
                            resolve;

                    }
                );

            }


            try {

                const canvas =
                    await html2canvas(
                        poster,
                        {
                            scale: 2,
                            useCORS: true,
                            backgroundColor: null
                        }
                    );


                const link =
                    document.createElement(
                        "a"
                    );


                link.download =
                    "HH-Goa-2026-Frame-In-Goa.png";


                link.href =
                    canvas.toDataURL(
                        "image/png"
                    );


                link.click();

            }

            catch (error) {

                console.error(
                    "Poster download failed:",
                    error
                );

                alert(
                    "Unable to download poster. Please try again."
                );

            }

        }
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

updatePhoto();

generateQRCode();

generateBarcode();
```

});
