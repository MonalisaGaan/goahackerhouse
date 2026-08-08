document.addEventListener("DOMContentLoaded", function () {
/* ================================
   ELEMENTS
================================= */

const photoInput = document.getElementById("photoInput");
const profileImage = document.getElementById("profileImage");

const zoomSlider = document.getElementById("zoomSlider");
const zoomValue = document.getElementById("zoomValue");

const nameInput = document.getElementById("nameInput");
const posterName = document.getElementById("posterName");
const personRole = document.getElementById("personRole");

const ticketName = document.getElementById("ticketName");

const centerPhotoButton =
    document.getElementById("centerPhoto");

const downloadButton =
    document.getElementById("downloadPoster");

/* ================================
   TEAM MEMBERS
================================= */

const members = {

    monalisa: {
        name: "MONALISA GAAN",
        role: "⚡ FRONTEND DEVELOPER ⚡",
        image: "/static/frameapp/images/Profile.jpeg"
    },

    nikhil: {
        name: "NIKHIL ARYAN",
        role: "⚡ BLOCKCHAIN DEVELOPER ⚡",
        image: "/static/frameapp/images/nikhil.jpeg"
    },

    depesh: {
        name: "DEPESH SINGH",
        role: "⚡ BACKEND DEVELOPER ⚡",
        image: "/static/frameapp/images/depesh.jpeg"
    }

};


/* ================================
   SELECT TEAM MEMBER
================================= */

window.selectMember = function (memberName) {

    const member = members[memberName];

    if (!member) {
        console.error("Member not found:", memberName);
        return;
    }

    /* Change name */

    if (posterName) {
        posterName.textContent = member.name;
    }

    if (nameInput) {
        nameInput.value = member.name;
    }

    if (ticketName) {
        ticketName.textContent = member.name;
    }


    /* Change role */

    if (personRole) {
        personRole.textContent = member.role;
    }


    /* Change photo */

    if (profileImage) {

        profileImage.src = member.image;

        profileImage.style.transform = "scale(1)";
        profileImage.style.objectPosition =
            "center center";
    }


    /* Reset zoom */

    if (zoomSlider) {
        zoomSlider.value = "1";
    }

    if (zoomValue) {
        zoomValue.textContent = "1.00×";
    }

};


/* ================================
   NAME INPUT
================================= */

if (nameInput) {

    nameInput.addEventListener("input", function () {

        const name =
            this.value.trim() || "YOUR NAME";

        if (posterName) {
            posterName.textContent = name;
        }

        if (ticketName) {
            ticketName.textContent = name;
        }

    });

}


/* ================================
   PHOTO UPLOAD
================================= */

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
                    "Please select a valid image."
                );

                return;
            }

            const imageURL =
                URL.createObjectURL(file);

            profileImage.src = imageURL;

            profileImage.onload = function () {

                URL.revokeObjectURL(imageURL);

            };

        }
    );

}


/* ================================
   ZOOM
================================= */

if (zoomSlider) {

    zoomSlider.addEventListener(
        "input",
        function () {

            const zoom =
                parseFloat(this.value);

            if (profileImage) {

                profileImage.style.transform =
                    `scale(${zoom})`;

            }

            if (zoomValue) {

                zoomValue.textContent =
                    zoom.toFixed(2) + "×";

            }

        }
    );

}


/* ================================
   AUTO CENTRE
================================= */

window.autoCenter = function () {

    if (profileImage) {

        profileImage.style.transform =
            "scale(1)";

        profileImage.style.objectPosition =
            "center center";

    }

    if (zoomSlider) {
        zoomSlider.value = "1";
    }

    if (zoomValue) {
        zoomValue.textContent = "1.00×";
    }

};


/* ================================
   AUTO CENTRE BUTTON
================================= */

if (centerPhotoButton) {

    centerPhotoButton.addEventListener(
        "click",
        function () {

            window.autoCenter();

        }
    );

}


/* ================================
   DOWNLOAD POSTER
================================= */

if (downloadButton) {

    downloadButton.addEventListener(
        "click",
        function () {

            const poster =
                document.getElementById("poster");

            if (!poster) {

                alert(
                    "Poster element not found."
                );

                return;
            }


            if (
                typeof html2canvas ===
                "undefined"
            ) {

                alert(
                    "Download library is not loaded."
                );

                return;
            }


            html2canvas(poster, {

                scale: 2,

                useCORS: true,

                allowTaint: false,

                backgroundColor: null

            }).then(function (canvas) {

                const link =
                    document.createElement("a");

                link.download =
                    "HH-Goa-2026-Builder-ID.png";

                link.href =
                    canvas.toDataURL(
                        "image/png"
                    );

                link.click();

            }).catch(function (error) {

                console.error(
                    "Download error:",
                    error
                );

                alert(
                    "Could not download the poster."
                );

            });

        }
    );

}


});
