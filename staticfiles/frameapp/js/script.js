
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
       ELEMENTS
    ========================================== */

    const memberSelect = document.getElementById("memberSelect");

    const photoInput = document.getElementById("photoInput");

    const profileImage = document.getElementById("profileImage");

    const zoomSlider = document.getElementById("zoomSlider");

    const zoomValue = document.getElementById("zoomValue");

    const nameInput = document.getElementById("nameInput");

    const posterName = document.getElementById("posterName");

    const personRole = document.getElementById("personRole");

    const builderClass = document.getElementById("builderClass");

    const builderId = document.getElementById("builderId");

    const qrcode = document.getElementById("qrcode");

    const barcode = document.getElementById("barcode");

    const centerPhoto = document.getElementById("centerPhoto");

    const downloadPoster = document.getElementById("downloadPoster");


    /* ==========================================
       PHOTO POSITION
    ========================================== */

    let zoom = 1;

    let positionX = 50;

    let positionY = 50;


    /* ==========================================
       UPDATE PHOTO
    ========================================== */

    function updatePhoto() {

        if (!profileImage) return;

        profileImage.style.transform =
            `scale(${zoom})`;

        profileImage.style.objectPosition =
            `${positionX}% ${positionY}%`;

    }


    /* ==========================================
       UPDATE QR CODE
    ========================================== */

    function updateQRCode(member) {

        if (!qrcode) return;

        qrcode.innerHTML = "";

        if (typeof QRCode === "undefined") {

            qrcode.innerHTML =
                "<span>QR unavailable</span>";

            return;
        }

        new QRCode(qrcode, {

            text:
                `${member.name} | ${member.role} | ${member.builderId}`,

            width: 105,

            height: 105,

            correctLevel:
                QRCode.CorrectLevel.H

        });

    }


    /* ==========================================
       CREATE BARCODE
    ========================================== */

    function updateBarcode(member) {

        if (!barcode) return;

        barcode.innerHTML = "";

        const value =
            member.builderId.replace(/[^0-9]/g, "");

        const bars = document.createElement("div");

        bars.className = "barcode-lines";

        for (let i = 0; i < value.length; i++) {

            const digit =
                parseInt(value[i], 10);

            const repetitions =
                digit + 2;

            for (let j = 0; j < repetitions; j++) {

                const line =
                    document.createElement("span");

                line.className =
                    (j % 2 === 0)
                        ? "bar"
                        : "space";

                bars.appendChild(line);

            }

        }

        barcode.appendChild(bars);

        const text =
            document.createElement("div");

        text.className =
            "barcode-number";

        text.textContent =
            member.builderId;

        barcode.appendChild(text);

    }


    /* ==========================================
       LOAD TEAM MEMBER
    ========================================== */

    function loadMember(memberKey) {

        const member =
            teamMembers[memberKey];

        if (!member) return;


        /* NAME */

        nameInput.value =
            member.name;

        posterName.textContent =
            member.name;


        /* ROLE */

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


        /* RESET ZOOM */

        zoom = 1;

        zoomSlider.value = 1;

        zoomValue.textContent =
            "1.00×";

        positionX = 50;

        positionY = 50;

        updatePhoto();


        /* QR */

        updateQRCode(member);


        /* BARCODE */

        updateBarcode(member);

    }


    /* ==========================================
       MEMBER SELECT
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
       NAME CHANGE
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

                if (!file) return;


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

                        zoom = 1;

                        zoomSlider.value =
                            1;

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
                    parseFloat(this.value);

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

                positionX = 50;

                positionY = 50;

                zoom = 1;

                zoomSlider.value = 1;

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

                if (!poster) return;


                if (typeof html2canvas === "undefined") {

                    alert(
                        "Download library is not loaded. Please refresh the page and try again."
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
                                backgroundColor: null
                            }
                        );


                    const link =
                        document.createElement("a");

                    link.download =
                        "HH-Goa-2026-Builder-ID.png";

                    link.href =
                        canvas.toDataURL("image/png");

                    link.click();

                }

                catch (error) {

                    console.error(
                        "Poster download error:",
                        error
                    );

                    alert(
                        "Could not download the poster. Please try again."
                    );

                }

            }
        );

    }


    /* ==========================================
       INITIAL LOAD
    ========================================== */

    loadMember("monalisa");

});
