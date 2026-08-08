document.addEventListener("DOMContentLoaded", function () {

    /* ================================
       ELEMENTS
    ================================= */

    const photoInput = document.getElementById("photoInput");
    const profileImage = document.getElementById("profileImage");

    const zoomSlider = document.getElementById("zoomSlider");
    const zoomValue = document.getElementById("zoomValue");

    const nameInput = document.getElementById("nameInput");
    const personName = document.getElementById("personName");

    const qrBox = document.getElementById("qrcode");


    /* ================================
       PHOTO UPLOAD
    ================================= */

    if (photoInput && profileImage) {

        photoInput.addEventListener("change", function (event) {

            const file = event.target.files[0];

            if (!file) {
                return;
            }

            if (!file.type.startsWith("image/")) {
                alert("Please select an image file.");
                return;
            }

            const reader = new FileReader();

            reader.onload = function (e) {

                profileImage.src = e.target.result;

            };

            reader.readAsDataURL(file);
        });
    }


    /* ================================
       ZOOM
    ================================= */

    if (zoomSlider && profileImage) {

        zoomSlider.addEventListener("input", function () {

            const zoom = parseFloat(this.value);

            profileImage.style.transform =
                "scale(" + zoom + ")";

            if (zoomValue) {

                zoomValue.textContent =
                    zoom.toFixed(2) + "×";

            }

        });
    }


    /* ================================
       NAME
    ================================= */

    if (nameInput && personName) {

        nameInput.addEventListener("input", function () {

            let name = this.value.trim();

            if (name === "") {
                name = "MONALISA GAAN";
            }

            personName.textContent =
                name.toUpperCase();

        });
    }


    /* ================================
       QR CODE
    ================================= */

    if (qrBox && typeof QRCode !== "undefined") {

        qrBox.innerHTML = "";

        new QRCode(qrBox, {

            text: "HH-GOA-240",

            width: 120,

            height: 120,

            correctLevel: QRCode.CorrectLevel.H

        });

    }


    /* ================================
       BARCODE
    ================================= */

    const barcodeElement =
        document.querySelector(".barcode");

    if (
        barcodeElement &&
        typeof JsBarcode !== "undefined"
    ) {

        barcodeElement.innerHTML = "";

        const svg =
            document.createElement("svg");

        barcodeElement.appendChild(svg);

        JsBarcode(
            svg,
            "HH-GOA-240",
            {
                format: "CODE128",
                width: 2,
                height: 45,
                displayValue: false,
                margin: 0
            }
        );
    }

});


/* =====================================
   AUTO CENTER
===================================== */

function autoCenter() {

    const profileImage =
        document.getElementById("profileImage");

    const zoomSlider =
        document.getElementById("zoomSlider");

    const zoomValue =
        document.getElementById("zoomValue");

    if (!profileImage) {
        return;
    }

    profileImage.style.transform =
        "scale(1)";

    profileImage.style.transformOrigin =
        "center center";

    if (zoomSlider) {
        zoomSlider.value = "1";
    }

    if (zoomValue) {
        zoomValue.textContent = "1.00×";
    }
}


/* =====================================
   DOWNLOAD POSTER
===================================== */

async function downloadPoster() {

    const poster =
        document.getElementById("poster");

    if (!poster) {

        alert("Poster not found!");

        return;
    }


    if (typeof html2canvas === "undefined") {

        alert(
            "Download library is not loaded. Please refresh the page."
        );

        return;
    }


    const button =
        document.querySelector(
            'button[onclick="downloadPoster()"]'
        );


    try {

        if (button) {

            button.disabled = true;

            button.textContent =
                "GENERATING...";
        }


        /*
         * Temporarily remove animations
         * while generating the image.
         */

        poster.classList.add(
            "download-mode"
        );


        /*
         * Wait for browser rendering.
         */

        await new Promise(function (resolve) {

            requestAnimationFrame(function () {

                requestAnimationFrame(resolve);

            });

        });


        const canvas =
            await html2canvas(
                poster,
                {

                    scale: 3,

                    useCORS: true,

                    allowTaint: false,

                    backgroundColor: "#fff2cf",

                    logging: false,

                    imageTimeout: 15000

                }
            );


        /*
         * Convert poster to PNG
         */

        const image =
            canvas.toDataURL(
                "image/png"
            );


        /*
         * Create download link
         */

        const link =
            document.createElement("a");


        link.download =
            "HH_GOA_2026_MONALISA_GAAN.png";


        link.href = image;


        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);


    } catch (error) {

        console.error(
            "Poster download error:",
            error
        );

        alert(
            "Unable to download the poster. Please try again."
        );


    } finally {

        poster.classList.remove(
            "download-mode"
        );


        if (button) {

            button.disabled = false;

            button.textContent =
                "DOWNLOAD POSTER";
        }

    }

}
document.addEventListener("DOMContentLoaded", function () {

    const qrContainer = document.getElementById("qrcode");

    if (qrContainer && typeof QRCode !== "undefined") {

        qrContainer.innerHTML = "";

        new QRCode(qrContainer, {
            text: "https://goahackerhouse-ecq8.vercel.app/",
            width: 108,
            height: 108,
            correctLevel: QRCode.CorrectLevel.H
        });

    }

});