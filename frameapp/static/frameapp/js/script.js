document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const photoInput = document.getElementById("photoInput");
    const profileImage = document.getElementById("profileImage");

    const zoomSlider = document.getElementById("zoomSlider");
    const zoomValue = document.getElementById("zoomValue");

    const nameInput = document.getElementById("nameInput");
    const memberSelect = document.getElementById("memberSelect");

    const posterName = document.getElementById("posterName");
    const ticketName = document.getElementById("ticketName");

    const personRole = document.getElementById("personRole");
    const builderClass = document.getElementById("builderClass");

    const builderId = document.getElementById("builderId");
    const barcodeText = document.getElementById("barcodeText");

    const centerPhoto = document.getElementById("centerPhoto");
    const downloadPoster = document.getElementById("downloadPoster");

    const qrContainer = document.getElementById("qrcode");
    const barcodeElement = document.getElementById("barcode");


    /* =====================================================
       CHECK REQUIRED ELEMENTS
    ===================================================== */

    if (!photoInput ||
        !profileImage ||
        !zoomSlider ||
        !nameInput ||
        !memberSelect ||
        !posterName ||
        !ticketName ||
        !personRole ||
        !builderClass ||
        !builderId ||
        !barcodeText ||
        !centerPhoto ||
        !downloadPoster ||
        !qrContainer ||
        !barcodeElement) {

        console.error("Some poster elements are missing.");
        return;
    }


    /* =====================================================
       TEAM DATA
    ===================================================== */

    const members = {

        monalisa: {
            name: "MONALISA GAAN",
            role: "⚡ FRONTEND DEVELOPER ⚡",
            builderClass: "TERMINAL<br>WIZARD",
            id: "HH-GOA-240"
        },

        nikhil: {
            name: "NIKHIL ARYAN",
            role: "⚡ BLOCKCHAIN DEVELOPER ⚡",
            builderClass: "BLOCKCHAIN<br>BUILDER",
            id: "HH-GOA-241"
        },

        depesh: {
            name: "DEPESH SINGH",
            role: "⚡ BACKEND DEVELOPER ⚡",
            builderClass: "BACKEND<br>ARCHITECT",
            id: "HH-GOA-242"
        }

    };


    /* =====================================================
       QR CODE
    ===================================================== */

    function generateQR(member) {

        qrContainer.innerHTML = "";

        if (typeof QRCode === "undefined") {

            console.error(
                "QRCode library is NOT loaded."
            );

            qrContainer.innerHTML =
                '<span style="font-size:8px;color:#e92d63;">QR unavailable</span>';

            return;
        }

        try {

            new QRCode(qrContainer, {

                text:
                    "HH Goa 2026 | " +
                    member.name +
                    " | " +
                    member.role +
                    " | " +
                    member.id,

                width: 105,
                height: 105,

                colorDark: "#034432",
                colorLight: "#ffffff",

                correctLevel: QRCode.CorrectLevel.H

            });

        } catch (error) {

            console.error(
                "QR generation failed:",
                error
            );

        }

    }


    /* =====================================================
       BARCODE
    ===================================================== */

    function generateBarcode(id) {

    if (!barcode) {
        console.error("Barcode element not found.");
        return;
    }

    if (typeof JsBarcode === "undefined") {
        console.error("JsBarcode library not loaded.");
        return;
    }

    try {

        barcode.innerHTML = "";

        JsBarcode(barcode, id, {
            format: "CODE128",
            width: 2,
            height: 48,
            displayValue: false,
            margin: 4,
            background: "#ffffff",
            lineColor: "#111111"
        });

    } catch (error) {

        console.error("Barcode error:", error);

    }
}

    /* =====================================================
       UPDATE POSTER
    ===================================================== */

    function updatePoster() {

        const selectedMember =
            memberSelect.value;

        const member =
            members[selectedMember];

        if (!member) {
            return;
        }


        /* NAME */

        const customName =
            nameInput.value.trim();

        const finalName =
            customName !== ""
                ? customName.toUpperCase()
                : member.name;

        posterName.textContent =
            finalName;

        ticketName.textContent =
            finalName;


        /* ROLE */

        personRole.textContent =
            member.role;


        /* CLASS */

        builderClass.innerHTML =
            member.builderClass;


        /* ID */

        builderId.textContent =
            member.id;

        barcodeText.textContent =
            member.id;


        /* QR */

        generateQR(member);


        /* BARCODE */

        generateBarcode(member.id);

    }


    /* =====================================================
       PHOTO UPLOAD
    ===================================================== */

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
                function (event) {

                    profileImage.src =
                        event.target.result;

                    profileImage.style.transform =
                        "scale(1)";

                    zoomSlider.value =
                        "1";

                    zoomValue.textContent =
                        "1.00×";

                };

            reader.readAsDataURL(file);

        }
    );


    /* =====================================================
       ZOOM
    ===================================================== */

    zoomSlider.addEventListener(
        "input",
        function () {

            const zoom =
                parseFloat(this.value);

            profileImage.style.transform =
                "scale(" + zoom + ")";

            zoomValue.textContent =
                zoom.toFixed(2) + "×";

        }
    );


    /* =====================================================
       NAME CHANGE
    ===================================================== */

    nameInput.addEventListener(
        "input",
        function () {

            const member =
                members[memberSelect.value];

            if (!member) {
                return;
            }

            const name =
                nameInput.value.trim() !== ""
                    ? nameInput.value.toUpperCase()
                    : member.name;

            posterName.textContent =
                name;

            ticketName.textContent =
                name;

        }
    );


    /* =====================================================
       MEMBER CHANGE
    ===================================================== */

    memberSelect.addEventListener(
        "change",
        function () {

            const member =
                members[this.value];

            if (!member) {
                return;
            }

            nameInput.value =
                member.name;

            posterName.textContent =
                member.name;

            ticketName.textContent =
                member.name;

            personRole.textContent =
                member.role;

            builderClass.innerHTML =
                member.builderClass;

            builderId.textContent =
                member.id;

            barcodeText.textContent =
                member.id;

            generateQR(member);

            generateBarcode(member.id);

        }
    );


    /* =====================================================
       AUTO CENTRE
    ===================================================== */

    centerPhoto.addEventListener(
        "click",
        function () {

            profileImage.style.objectPosition =
                "center center";

            profileImage.style.transform =
                "scale(1)";

            zoomSlider.value =
                "1";

            zoomValue.textContent =
                "1.00×";

        }
    );


    /* =====================================================
       DOWNLOAD POSTER
    ===================================================== */

    downloadPoster.addEventListener(
        "click",
        async function () {

            const poster =
                document.getElementById("poster");

            if (!poster) {

                alert(
                    "Poster not found."
                );

                return;
            }

            if (typeof html2canvas === "undefined") {

                alert(
                    "Download library is not loaded. Please refresh the page."
                );

                return;
            }

            try {

                const canvas =
                    await html2canvas(
                        poster,
                        {

                            scale: 2,

                            useCORS: true,

                            allowTaint: false,

                            backgroundColor:
                                "#fff7e8",

                            logging: false

                        }
                    );


                const link =
                    document.createElement("a");


                const member =
                    members[
                        memberSelect.value
                    ];


                link.download =
                    member.name
                        .toLowerCase()
                        .replace(/\s+/g, "-") +
                    "-hh-goa-2026.png";


                link.href =
                    canvas.toDataURL(
                        "image/png"
                    );


                link.click();

            } catch (error) {

                console.error(
                    "Poster download failed:",
                    error
                );

                alert(
                    "Could not download the poster. Please try again."
                );

            }

        }
    );


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    updatePoster();

});