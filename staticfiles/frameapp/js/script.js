
document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const photoInput = document.getElementById("photoInput");
    const profileImage = document.getElementById("profileImage");

    const zoomSlider = document.getElementById("zoomSlider");
    const zoomValue = document.getElementById("zoomValue");

    const nameInput = document.getElementById("nameInput");
    const domainSelect = document.getElementById("domainSelect");

    const personName = document.getElementById("personName");
    const personRole = document.getElementById("personRole");

    const centerPhoto = document.getElementById("centerPhoto");
    const downloadPoster = document.getElementById("downloadPoster");

    const qrContainer = document.getElementById("qrcode");
    const barcode = document.getElementById("barcode");

    const builderId = document.getElementById("builderId");
    const ticketNames = document.getElementById("ticketNames");

    const poster = document.getElementById("poster");


    /* =====================================================
       TEAM
    ===================================================== */

    const teamMembers = [
        {
            name: "MONALISA GAAN",
            domain: "FRONTEND DEVELOPER"
        },
        {
            name: "DEPESH SINGH",
            domain: "BACKEND DEVELOPER"
        },
        {
            name: "NIKHIL ARYAN",
            domain: "BLOCKCHAIN DEVELOPER"
        }
    ];


    /* =====================================================
       UPDATE NAME
    ===================================================== */

    function updateName() {

        if (!nameInput || !personName) {
            return;
        }

        let name = nameInput.value.trim();

        if (name === "") {
            name = "BUILDER";
        }

        name = name.toUpperCase();

        personName.textContent = "✦ " + name + " ✦";

        updateQR();
        updateBarcode();
    }


    /* =====================================================
       UPDATE DOMAIN
    ===================================================== */

    function updateDomain() {

        if (!domainSelect || !personRole) {
            return;
        }

        const domain = domainSelect.value;

        personRole.textContent =
            "⚡ " + domain + " ⚡";

        updateQR();
        updateBarcode();
    }


    /* =====================================================
       PHOTO UPLOAD
    ===================================================== */

    if (photoInput) {

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

                profileImage.style.transform =
                    "scale(1)";

                if (zoomSlider) {
                    zoomSlider.value = "1";
                }

                if (zoomValue) {
                    zoomValue.textContent = "1.00×";
                }

            };

            reader.readAsDataURL(file);

        });

    }


    /* =====================================================
       ZOOM
    ===================================================== */

    function updateZoom() {

        if (!profileImage || !zoomSlider) {
            return;
        }

        const zoom = parseFloat(zoomSlider.value);

        profileImage.style.transform =
            "scale(" + zoom + ")";

        if (zoomValue) {

            zoomValue.textContent =
                zoom.toFixed(2) + "×";

        }

    }


    if (zoomSlider) {

        zoomSlider.addEventListener(
            "input",
            updateZoom
        );

    }


    /* =====================================================
       AUTO CENTER
    ===================================================== */

    if (centerPhoto) {

        centerPhoto.addEventListener(
            "click",
            function () {

                if (!profileImage) {
                    return;
                }

                profileImage.style.objectPosition =
                    "center center";

                profileImage.style.transform =
                    "scale(1)";

                if (zoomSlider) {
                    zoomSlider.value = "1";
                }

                if (zoomValue) {
                    zoomValue.textContent = "1.00×";
                }

            }
        );

    }


    /* =====================================================
       QR CODE
    ===================================================== */

    function updateQR() {

        if (!qrContainer) {
            return;
        }

        qrContainer.innerHTML = "";

        if (typeof QRCode === "undefined") {
            console.warn("QRCode library not loaded.");
            return;
        }

        const name =
            nameInput
                ? nameInput.value.trim()
                : "BUILDER";

        const domain =
            domainSelect
                ? domainSelect.value
                : "FRONTEND DEVELOPER";

        const qrText =
            "HH GOA 2026 | " +
            name +
            " | " +
            domain;

        new QRCode(qrContainer, {
            text: qrText,
            width: 105,
            height: 105,
            correctLevel: QRCode.CorrectLevel.H
        });

    }


    /* =====================================================
       BARCODE
    ===================================================== */

    function updateBarcode() {

        if (!barcode) {
            return;
        }

        if (typeof JsBarcode === "undefined") {
            console.warn("JsBarcode library not loaded.");
            return;
        }

        const name =
            nameInput
                ? nameInput.value.trim()
                : "BUILDER";

        const safeName =
            name
                .toUpperCase()
                .replace(/[^A-Z0-9]/g, "")
                .substring(0, 10);

        const code =
            "HHGOA" +
            safeName;

        try {

            JsBarcode(barcode, code, {

                format: "CODE128",

                width: 2,

                height: 45,

                displayValue: true,

                fontSize: 10,

                margin: 3,

                background: "#ffffff",

                lineColor: "#111111"

            });

        } catch (error) {

            console.error(
                "Barcode generation error:",
                error
            );

        }

    }


    /* =====================================================
       UPDATE BUILDER ID
    ===================================================== */

    function updateBuilderId() {

        if (!builderId) {
            return;
        }

        const name =
            nameInput
                ? nameInput.value.trim()
                : "BUILDER";

        const cleaned =
            name
                .toUpperCase()
                .replace(/[^A-Z]/g, "")
                .substring(0, 3);

        builderId.textContent =
            "HH-GOA-" +
            (cleaned || "240");

    }


    /* =====================================================
       UPDATE TICKET
    ===================================================== */

    function updateTicket() {

        if (!ticketNames) {
            return;
        }

        const name =
            nameInput
                ? nameInput.value.trim().toUpperCase()
                : "MONALISA GAAN";

        ticketNames.textContent =
            name +
            " · DEPESH SINGH · NIKHIL ARYAN";

    }


    /* =====================================================
       NAME CHANGE
    ===================================================== */

    if (nameInput) {

        nameInput.addEventListener(
            "input",
            function () {

                updateName();
                updateBuilderId();
                updateTicket();

            }
        );

    }


    /* =====================================================
       DOMAIN CHANGE
    ===================================================== */

    if (domainSelect) {

        domainSelect.addEventListener(
            "change",
            updateDomain
        );

    }


    /* =====================================================
       DOWNLOAD POSTER
    ===================================================== */

    async function downloadPosterImage() {

        if (!poster) {
            alert("Poster not found.");
            return;
        }

        if (typeof html2canvas === "undefined") {

            alert(
                "Poster download library is not loaded. Please refresh the page."
            );

            return;

        }


        try {

            /*
             * Make sure QR and barcode are generated
             * before taking the screenshot.
             */

            updateQR();
            updateBarcode();


            /*
             * Give the browser a moment to render
             * QR and barcode.
             */

            await new Promise(function (resolve) {

                setTimeout(resolve, 500);

            });


            const canvas =
                await html2canvas(
                    poster,
                    {

                        scale: 2,

                        useCORS: true,

                        allowTaint: false,

                        backgroundColor: "#fff2cc",

                        logging: false,

                        imageTimeout: 15000

                    }
                );


            const image =
                canvas.toDataURL(
                    "image/png",
                    1.0
                );


            const link =
                document.createElement("a");


            link.download =
                "HH-Goa-2026-" +
                (
                    nameInput
                        ? nameInput.value.trim()
                        : "Builder"
                )
                    .replace(/\s+/g, "-")
                    .replace(/[^a-zA-Z0-9-_]/g, "") +
                ".png";


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
                "Poster could not be downloaded. Please refresh the page and try again."
            );

        }

    }


    if (downloadPoster) {

        downloadPoster.addEventListener(
            "click",
            downloadPosterImage
        );

    }


    /* =====================================================
       INITIAL SETUP
    ===================================================== */

    updateName();

    updateDomain();

    updateBuilderId();

    updateTicket();

    updateQR();

    updateBarcode();

});

