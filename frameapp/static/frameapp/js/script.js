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
const barcode = document.getElementById("barcode");


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
   DEFAULT PHOTO
===================================================== */

const defaultPhoto = profileImage.src;

let uploadedPhoto = null;


/* =====================================================
   UPDATE POSTER
===================================================== */

function updatePoster() {

    const selectedMember = memberSelect.value;

    const member = members[selectedMember];

    if (!member) {
        return;
    }


    /* NAME */

    const customName = nameInput.value.trim();

    const finalName =
        customName !== ""
            ? customName.toUpperCase()
            : member.name;


    posterName.textContent = finalName;

    ticketName.textContent = finalName;


    /* DOMAIN */

    personRole.textContent = member.role;


    /* BUILDER CLASS */

    builderClass.innerHTML = member.builderClass;


    /* BUILDER ID */

    builderId.textContent = member.id;

    barcodeText.textContent = member.id;


    /* QR */

    generateQR(member);


    /* BARCODE */

    generateBarcode(member.id);

}


/* =====================================================
   QR CODE
===================================================== */

function generateQR(member) {

    qrContainer.innerHTML = "";

    if (typeof QRCode === "undefined") {
        console.error("QRCode library not loaded.");
        return;
    }

    new QRCode(qrContainer, {
        text:
            "HH Goa 2026 | " +
            member.name +
            " | " +
            member.role +
            " | " +
            member.id,

        width: 100,
        height: 100,

        colorDark: "#034432",
        colorLight: "#ffffff",

        correctLevel: QRCode.CorrectLevel.H
    });

}


/* =====================================================
   BARCODE
===================================================== */

function generateBarcode(id) {

    if (typeof JsBarcode === "undefined") {
        console.error("JsBarcode library not loaded.");
        return;
    }

    try {

        JsBarcode("#barcode", id, {

            format: "CODE128",

            width: 2,

            height: 48,

            displayValue: false,

            margin: 0,

            background: "#ffffff",

            lineColor: "#111111"

        });

    } catch (error) {

        console.error("Barcode error:", error);

    }

}


/* =====================================================
   PHOTO UPLOAD
===================================================== */

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

        uploadedPhoto = e.target.result;

        profileImage.src = uploadedPhoto;

        profileImage.style.transform = "scale(1)";

        zoomSlider.value = "1";

        zoomValue.textContent = "1.00×";

    };

    reader.readAsDataURL(file);

});


/* =====================================================
   ZOOM
===================================================== */

zoomSlider.addEventListener("input", function () {

    const zoom = parseFloat(this.value);

    profileImage.style.transform =
        "scale(" + zoom + ")";

    zoomValue.textContent =
        zoom.toFixed(2) + "×";

});


/* =====================================================
   NAME CHANGE
===================================================== */

nameInput.addEventListener("input", function () {

    const selectedMember = memberSelect.value;

    const member = members[selectedMember];

    if (!member) {
        return;
    }

    const name =
        nameInput.value.trim() !== ""
            ? nameInput.value.toUpperCase()
            : member.name;

    posterName.textContent = name;

    ticketName.textContent = name;

});


/* =====================================================
   MEMBER CHANGE
   THIS IS THE IMPORTANT PART
===================================================== */

memberSelect.addEventListener("change", function () {

    const member = members[this.value];

    if (!member) {
        return;
    }


    /* Change name */

    nameInput.value = member.name;

    posterName.textContent = member.name;

    ticketName.textContent = member.name;


    /* Change domain */

    personRole.textContent = member.role;


    /* Change builder class */

    builderClass.innerHTML =
        member.builderClass;


    /* Change ID */

    builderId.textContent = member.id;

    barcodeText.textContent = member.id;


    /* Regenerate QR */

    generateQR(member);


    /* Regenerate barcode */

    generateBarcode(member.id);

});


/* =====================================================
   AUTO CENTRE
===================================================== */

centerPhoto.addEventListener("click", function () {

    profileImage.style.objectPosition = "center center";

    profileImage.style.transform = "scale(1)";

    zoomSlider.value = "1";

    zoomValue.textContent = "1.00×";

});


/* =====================================================
   DOWNLOAD POSTER
===================================================== */

downloadPoster.addEventListener("click", async function () {

    const poster = document.getElementById("poster");

    if (!poster) {
        alert("Poster not found.");
        return;
    }


    if (typeof html2canvas === "undefined") {

        alert(
            "Download library is not loaded. Please refresh the page and try again."
        );

        return;
    }


    try {

        const canvas = await html2canvas(poster, {

            scale: 2,

            useCORS: true,

            backgroundColor: "#fff2cc",

            logging: false

        });


        const link =
            document.createElement("a");

        const selectedMember =
            memberSelect.value;

        const member =
            members[selectedMember];


        link.download =
            member.name
                .toLowerCase()
                .replace(/\s+/g, "-") +
            "-hh-goa-2026.png";


        link.href =
            canvas.toDataURL("image/png");


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

});


/* =====================================================
   INITIAL LOAD
===================================================== */

updatePoster();

});
