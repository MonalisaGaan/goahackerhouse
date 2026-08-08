```javascript
document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const photoInput = document.getElementById("photoInput");
    const profileImage = document.getElementById("profileImage");

    const zoomSlider = document.getElementById("zoomSlider");
    const zoomValue = document.getElementById("zoomValue");

    const nameInput = document.getElementById("nameInput");
    const domainInput = document.getElementById("domainInput");

    const personName = document.getElementById("personName");
    const personRole = document.getElementById("personRole");
    const ticketName = document.getElementById("ticketName");

    const centerPhoto = document.getElementById("centerPhoto");
    const downloadPoster = document.getElementById("downloadPoster");

    const qrCode = document.getElementById("qrcode");
    const barcode = document.getElementById("barcode");

    const teamMembers = document.querySelectorAll(".team-member");


    /* =====================================================
       PHOTO
    ====================================================== */

    let currentZoom = 1;


    if (photoInput) {

        photoInput.addEventListener("change", function (event) {

            const file = event.target.files[0];

            if (!file) {
                return;
            }

            const reader = new FileReader();

            reader.onload = function (e) {

                profileImage.src = e.target.result;

                currentZoom = 1;

                zoomSlider.value = 1;

                updateZoom();

            };

            reader.readAsDataURL(file);
        });
    }


    /* =====================================================
       ZOOM
    ====================================================== */

    function updateZoom() {

        currentZoom = parseFloat(zoomSlider.value);

        zoomValue.textContent =
            currentZoom.toFixed(2) + "×";

        profileImage.style.transform =
            "scale(" + currentZoom + ")";
    }


    zoomSlider.addEventListener(
        "input",
        updateZoom
    );


    /* =====================================================
       AUTO CENTRE
    ====================================================== */

    if (centerPhoto) {

        centerPhoto.addEventListener(
            "click",
            function () {

                profileImage.style.objectPosition =
                    "center center";

                profileImage.style.transform =
                    "scale(" +
                    parseFloat(zoomSlider.value) +
                    ")";

            }
        );
    }


    /* =====================================================
       NAME
    ====================================================== */

    function updateName() {

        let name =
            nameInput.value.trim().toUpperCase();

        if (!name) {
            name = "BUILDER";
        }

        personName.textContent = name;

        ticketName.textContent = name;
    }


    nameInput.addEventListener(
        "input",
        updateName
    );


    /* =====================================================
       DOMAIN
    ====================================================== */

    function updateDomain() {

        const domain =
            domainInput.value;

        personRole.textContent =
            "⚡ " + domain + " ⚡";
    }


    domainInput.addEventListener(
        "change",
        updateDomain
    );


    /* =====================================================
       QR CODE
    ====================================================== */

    function generateQRCode() {

        if (!qrCode) {
            return;
        }

        qrCode.innerHTML = "";

        if (typeof QRCode === "undefined") {

            console.error(
                "QRCode library was not loaded."
            );

            return;
        }


        const name =
            nameInput.value.trim() ||
            "BUILDER";


        const domain =
            domainInput.value;


        const qrText =
            "HH Goa 2026 | " +
            name +
            " | " +
            domain;


        new QRCode(qrCode, {

            text: qrText,

            width: 105,

            height: 105,

            colorDark: "#075c43",

            colorLight: "#ffffff",

            correctLevel:
                QRCode.CorrectLevel.H

        });
    }


    /* =====================================================
       BARCODE
    ====================================================== */

    function generateBarcode() {

        if (!barcode) {
            return;
        }

        if (typeof JsBarcode === "undefined") {

            console.error(
                "JsBarcode library was not loaded."
            );

            return;
        }


        const name =
            nameInput.value.trim() ||
            "BUILDER";


        const cleanName =
            name
                .replace(/[^A-Z0-9]/gi, "")
                .toUpperCase()
                .substring(0, 8);


        const barcodeText =
            "HHGOA" +
            cleanName;


        JsBarcode(
            barcode,
            barcodeText,
            {
                format: "CODE128",

                width: 2,

                height: 45,

                displayValue: false,

                margin: 0,

                background: "#ffffff",

                lineColor: "#17362c"
            }
        );
    }


    /* =====================================================
       TEAM MEMBER BUTTONS
    ====================================================== */

    teamMembers.forEach(function (member) {

        member.addEventListener(
            "click",
            function () {

                teamMembers.forEach(
                    function (item) {
                        item.classList.remove("active");
                    }
                );


                member.classList.add("active");


                const selectedName =
                    member.dataset.name;


                const selectedDomain =
                    member.dataset.domain;


                nameInput.value =
                    selectedName;


                domainInput.value =
                    selectedDomain;


                updateName();

                updateDomain();

                generateQRCode();

                generateBarcode();

            }
        );

    });


    /* =====================================================
       UPDATE QR + BARCODE WHEN NAME CHANGES
    ====================================================== */

    nameInput.addEventListener(
        "input",
        function () {

            updateName();

            generateQRCode();

            generateBarcode();

        }
    );


    domainInput.addEventListener(
        "change",
        function () {

            updateDomain();

            generateQRCode();

        }
    );


    /* =====================================================
       DOWNLOAD POSTER
    ====================================================== */

    if (downloadPoster) {

        downloadPoster.addEventListener(
            "click",
            async function () {

                const poster =
                    document.getElementById("poster");


                if (!poster) {

                    alert(
                        "Poster could not be found."
                    );

                    return;
                }


                if (
                    typeof html2canvas ===
                    "undefined"
                ) {

                    alert(
                        "Download library is not loaded. Please refresh the page."
                    );

                    return;
                }


                try {

                    downloadPoster.textContent =
                        "CREATING POSTER...";


                    const canvas =
                        await html2canvas(
                            poster,
                            {
                                scale: 2,

                                useCORS: true,

                                backgroundColor:
                                    "#fff2cc",

                                logging: false
                            }
                        );


                    const link =
                        document.createElement("a");


                    const name =
                        nameInput.value
                            .trim()
                            .replace(
                                /\s+/g,
                                "-"
                            )
                            .toLowerCase() ||
                        "builder";


                    link.download =
                        "HH-Goa-2026-" +
                        name +
                        ".png";


                    link.href =
                        canvas.toDataURL(
                            "image/png"
                        );


                    link.click();


                } catch (error) {

                    console.error(
                        "Poster download error:",
                        error
                    );


                    alert(
                        "Could not download the poster. Please try again."
                    );

                }


                downloadPoster.textContent =
                    "⬇ DOWNLOAD POSTER";

            }
        );
    }


    /* =====================================================
       INITIAL SETUP
    ====================================================== */

    updateZoom();

    updateName();

    updateDomain();

    generateQRCode();

    generateBarcode();

});
```
