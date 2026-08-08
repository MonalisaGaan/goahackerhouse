
document.addEventListener("DOMContentLoaded", function () {


    /* =========================================
       TEAM DATA
    ========================================= */

    const teamMembers = {

        monalisa: {
            name: "MONALISA GAAN",
            role: "FRONTEND DEVELOPER",
            builderClass: "FRONTEND<br>BUILDER",
            builderId: "HH-GOA-240",
            photo: "/static/frameapp/images/Profile.jpeg"
        },

        nikhil: {
            name: "NIKHIL ARYAN",
            role: "BLOCKCHAIN DEVELOPER",
            builderClass: "BLOCKCHAIN<br>BUILDER",
            builderId: "HH-GOA-241",
            photo: "/static/frameapp/images/Nikhil.jpeg"
        },

        depesh: {
            name: "DEPESH SINGH",
            role: "BACKEND DEVELOPER",
            builderClass: "BACKEND<br>BUILDER",
            builderId: "HH-GOA-242",
            photo: "/static/frameapp/images/Depesh.jpeg"
        }

    };


    /* =========================================
       ELEMENTS
    ========================================= */

    const memberSelect =
        document.getElementById("memberSelect");

    const photoInput =
        document.getElementById("photoInput");

    const profileImage =
        document.getElementById("profileImage");

    const zoomSlider =
        document.getElementById("zoomSlider");

    const zoomValue =
        document.getElementById("zoomValue");

    const nameInput =
        document.getElementById("nameInput");

    const personName =
        document.getElementById("personName");

    const personRole =
        document.getElementById("personRole");

    const builderClass =
        document.getElementById("builderClass");

    const builderId =
        document.getElementById("builderId");

    const qrCode =
        document.getElementById("qrcode");

    const barcode =
        document.getElementById("barcode");

    const centerPhoto =
        document.getElementById("centerPhoto");

    const downloadPoster =
        document.getElementById("downloadPoster");


    /* =========================================
       PHOTO ZOOM
    ========================================= */

    let zoom = 1;


    function applyPhotoZoom() {

        if (!profileImage) {
            return;
        }


        /*
           DO NOT change the size of .photo-ring.

           Only the image itself is scaled.
        */

        profileImage.style.transform =
            `scale(${zoom})`;

        profileImage.style.transformOrigin =
            "center center";

    }


    /* =========================================
       QR CODE
    ========================================= */

    function generateQRCode(member) {

        if (!qrCode) {
            return;
        }


        qrCode.innerHTML = "";


        if (typeof QRCode === "undefined") {

            qrCode.textContent = "QR";

            return;

        }


        new QRCode(qrCode, {

            text:
                `${member.name} | ${member.role} | ${member.builderId}`,

            width: 105,

            height: 105,

            correctLevel:
                QRCode.CorrectLevel.H

        });

    }


    /* =========================================
       BARCODE
    ========================================= */

    function generateBarcode(member) {

        if (!barcode) {
            return;
        }


        barcode.innerHTML = "";


        const id =
            member.builderId;


        const digits =
            id.replace(/\D/g, "");


        const lines =
            document.createElement("div");


        lines.className =
            "barcode-lines";


        /*
           Start and end bars
        */

        addBar(lines, 3);


        for (let i = 0; i < digits.length; i++) {

            const digit =
                Number(digits[i]);


            const repetitions =
                digit + 3;


            for (
                let j = 0;
                j < repetitions;
                j++
            ) {

                if (j % 2 === 0) {

                    addBar(lines, 3);

                } else {

                    addSpace(lines, 2);

                }

            }

            addSpace(lines, 2);

        }


        addBar(lines, 3);


        barcode.appendChild(lines);


        const number =
            document.createElement("div");


        number.className =
            "barcode-number";


        number.textContent =
            id;


        barcode.appendChild(number);

    }


    function addBar(container, width) {

        const element =
            document.createElement("span");

        element.className =
            "bar";

        element.style.width =
            `${width}px`;

        container.appendChild(element);

    }


    function addSpace(container, width) {

        const element =
            document.createElement("span");

        element.className =
            "space";

        element.style.width =
            `${width}px`;

        container.appendChild(element);

    }


    /* =========================================
       LOAD BUILDER
    ========================================= */

    function loadBuilder(builderKey) {

        const member =
            teamMembers[builderKey];


        if (!member) {
            return;
        }


        /* NAME */

        if (personName) {

            personName.textContent =
                member.name;

        }


        if (nameInput) {

            nameInput.value =
                member.name;

        }


        /* DOMAIN */

        if (personRole) {

            personRole.textContent =
                `⚡ ${member.role} ⚡`;

        }


        /* BUILDER CLASS */

        if (builderClass) {

            builderClass.innerHTML =
                member.builderClass;

        }


        /* BUILDER ID */

        if (builderId) {

            builderId.textContent =
                member.builderId;

        }


        /* PHOTO */

        if (profileImage) {

            profileImage.src =
                member.photo;

            profileImage.style.transform =
                "scale(1)";

        }


        /* RESET ZOOM */

        zoom = 1;


        if (zoomSlider) {

            zoomSlider.value =
                "1";

        }


        if (zoomValue) {

            zoomValue.textContent =
                "1.00×";

        }


        /* QR */

        generateQRCode(member);


        /* BARCODE */

        generateBarcode(member);

    }


    /* =========================================
       BUILDER SELECT
    ========================================= */

    if (memberSelect) {

        memberSelect.addEventListener(
            "change",
            function () {

                loadBuilder(
                    this.value
                );

            }
        );

    }


    /* =========================================
       NAME EDIT
    ========================================= */

    if (nameInput) {

        nameInput.addEventListener(
            "input",
            function () {

                const value =
                    this.value
                        .trim()
                        .toUpperCase();


                if (personName) {

                    personName.textContent =
                        value || "BUILDER";

                }

            }
        );

    }


    /* =========================================
       PHOTO UPLOAD
    ========================================= */

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
                        "Please select an image."
                    );

                    return;

                }


                const reader =
                    new FileReader();


                reader.onload =
                    function (event) {

                        profileImage.src =
                            event.target.result;


                        zoom = 1;


                        if (zoomSlider) {

                            zoomSlider.value =
                                "1";

                        }


                        if (zoomValue) {

                            zoomValue.textContent =
                                "1.00×";

                        }


                        applyPhotoZoom();

                    };


                reader.readAsDataURL(file);

            }
        );

    }


    /* =========================================
       ZOOM SLIDER
    ========================================= */

    if (zoomSlider) {

        zoomSlider.addEventListener(
            "input",
            function () {

                zoom =
                    Number(this.value);


                if (zoomValue) {

                    zoomValue.textContent =
                        `${zoom.toFixed(2)}×`;

                }


                applyPhotoZoom();

            }
        );

    }


    /* =========================================
       AUTO CENTRE
    ========================================= */

    if (centerPhoto) {

        centerPhoto.addEventListener(
            "click",
            function () {

                zoom = 1;


                if (zoomSlider) {

                    zoomSlider.value =
                        "1";

                }


                if (zoomValue) {

                    zoomValue.textContent =
                        "1.00×";

                }


                applyPhotoZoom();

            }
        );

    }


    /* =========================================
       DOWNLOAD POSTER
    ========================================= */

    if (downloadPoster) {

        downloadPoster.addEventListener(
            "click",
            async function () {

                const poster =
                    document.getElementById("poster");


                if (!poster) {

                    alert(
                        "Poster element not found."
                    );

                    return;

                }


                if (typeof html2canvas === "undefined") {

                    alert(
                        "Download library is not loaded. Please refresh the page."
                    );

                    return;

                }


                const originalButtonText =
                    downloadPoster.textContent;


                downloadPoster.textContent =
                    "CREATING POSTER...";


                downloadPoster.disabled =
                    true;


                try {

                    const canvas =
                        await html2canvas(
                            poster,
                            {
                                scale: 2,
                                useCORS: true,
                                allowTaint: true,
                                backgroundColor: null
                            }
                        );


                    const link =
                        document.createElement("a");


                    link.download =
                        "HH-Goa-2026-Builder-ID.png";


                    link.href =
                        canvas.toDataURL(
                            "image/png"
                        );


                    document.body.appendChild(
                        link
                    );


                    link.click();


                    document.body.removeChild(
                        link
                    );

                }

                catch (error) {

                    console.error(
                        "Poster download error:",
                        error
                    );


                    alert(
                        "Poster download failed. Please try again."
                    );

                }


                finally {

                    downloadPoster.textContent =
                        originalButtonText;

                    downloadPoster.disabled =
                        false;

                }

            }
        );

    }


    /* =========================================
       INITIAL LOAD
    ========================================= */

    loadBuilder("monalisa");

});

