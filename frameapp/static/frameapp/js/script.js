
document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       TEAM MEMBERS
    ========================================== */

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


    /* ==========================================
       GET ELEMENTS
    ========================================== */

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

    const posterName =
        document.getElementById("posterName");

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


    /* ==========================================
       PHOTO SETTINGS
    ========================================== */

    let zoom = 1;

    let positionX = 50;

    let positionY = 50;


    /* ==========================================
       UPDATE PHOTO
    ========================================== */

    function updatePhoto() {

        if (!profileImage) {
            return;
        }

        profileImage.style.transform =
            `scale(${zoom})`;

        profileImage.style.objectPosition =
            `${positionX}% ${positionY}%`;

    }


    /* ==========================================
       QR CODE
    ========================================== */

    function updateQRCode(member) {

        if (!qrCode) {
            return;
        }

        qrCode.innerHTML = "";


        if (typeof QRCode === "undefined") {

            qrCode.textContent =
                "QR";

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


    /* ==========================================
       BARCODE
    ========================================== */

    function updateBarcode(member) {

        if (!barcode) {
            return;
        }

        barcode.innerHTML = "";


        const number =
            member.builderId
                .replace(/\D/g, "");


        const barcodeLines =
            document.createElement("div");

        barcodeLines.className =
            "barcode-lines";


        for (let i = 0; i < number.length; i++) {

            const digit =
                Number(number[i]);


            const total =
                digit + 3;


            for (let j = 0; j < total; j++) {

                const line =
                    document.createElement("span");


                if (j % 2 === 0) {

                    line.className =
                        "bar";

                } else {

                    line.className =
                        "space";

                }


                barcodeLines.appendChild(line);

            }

        }


        barcode.appendChild(
            barcodeLines
        );


        const barcodeText =
            document.createElement("div");

        barcodeText.className =
            "barcode-number";

        barcodeText.textContent =
            member.builderId;


        barcode.appendChild(
            barcodeText
        );

    }


    /* ==========================================
       LOAD TEAM MEMBER
    ========================================== */

    function loadMember(memberKey) {

        const member =
            teamMembers[memberKey];


        if (!member) {
            return;
        }


        /* NAME */

        nameInput.value =
            member.name;

        posterName.textContent =
            member.name;


        /* DOMAIN */

        personRole.textContent =
            `⚡ ${member.role} ⚡`;


        /* BUILDER CLASS */

        builderClass.innerHTML =
            member.builderClass;


        /* BUILDER ID */

        builderId.textContent =
            member.builderId;


        /* PHOTO */

        profileImage.src =
            member.photo;


        /* RESET PHOTO */

        zoom = 1;

        positionX = 50;

        positionY = 50;


        zoomSlider.value =
            "1";


        zoomValue.textContent =
            "1.00×";


        updatePhoto();


        /* QR */

        updateQRCode(member);


        /* BARCODE */

        updateBarcode(member);

    }


    /* ==========================================
       TEAM SELECTOR
    ========================================== */

    if (memberSelect) {

        memberSelect.addEventListener(
            "change",
            function () {

                loadMember(
                    this.value
                );

            }
        );

    }


    /* ==========================================
       NAME INPUT
    ========================================== */

    if (nameInput) {

        nameInput.addEventListener(
            "input",
            function () {

                const name =
                    this.value
                        .trim()
                        .toUpperCase();


                posterName.textContent =
                    name || "BUILDER";

            }
        );

    }


    /* ==========================================
       PHOTO UPLOAD
    ========================================== */

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
                    function (event) {

                        profileImage.src =
                            event.target.result;


                        zoom = 1;

                        positionX = 50;

                        positionY = 50;


                        zoomSlider.value =
                            "1";


                        zoomValue.textContent =
                            "1.00×";


                        updatePhoto();

                    };


                reader.readAsDataURL(file);

            }
        );

    }


    /* ==========================================
       ZOOM
    ========================================== */

    if (zoomSlider) {

        zoomSlider.addEventListener(
            "input",
            function () {

                zoom =
                    Number(this.value);


                zoomValue.textContent =
                    `${zoom.toFixed(2)}×`;


                updatePhoto();

            }
        );

    }


    /* ==========================================
       AUTO CENTRE
    ========================================== */

    if (centerPhoto) {

        centerPhoto.addEventListener(
            "click",
            function () {

                zoom = 1;

                positionX = 50;

                positionY = 50;


                zoomSlider.value =
                    "1";


                zoomValue.textContent =
                    "1.00×";


                updatePhoto();

            }
        );

    }


    /* ==========================================
       DOWNLOAD POSTER
    ========================================== */

    if (downloadPoster) {

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
                        "Download error:",
                        error
                    );


                    alert(
                        "Poster download failed. Please try again."
                    );

                }

            }
        );

    }


    /* ==========================================
       INITIAL BUILDER
    ========================================== */

    loadMember("monalisa");

});

