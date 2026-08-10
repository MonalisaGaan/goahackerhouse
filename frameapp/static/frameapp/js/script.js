document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // ELEMENTS
    // =====================================================

    const photoInput = document.getElementById("photoInput");

    const profileImage = document.getElementById("profileImage");
    const photoPlaceholder = document.getElementById("photoPlaceholder");

    const nameInput = document.getElementById("nameInput");
    const roleInput = document.getElementById("roleInput");
    const classInput = document.getElementById("classInput");
    const idInput = document.getElementById("idInput");

    const cardName = document.getElementById("cardName");
    const cardRole = document.getElementById("cardRole");
    const cardClass = document.getElementById("cardClass");
    const cardId = document.getElementById("cardId");

    const admitName = document.getElementById("admitName");
    const qrId = document.getElementById("qrId");

    const randomBtn = document.getElementById("randomBtn");
    const downloadBtn = document.getElementById("downloadBtn");

    const qrCodeContainer = document.getElementById("qrcode");
    const barcode = document.getElementById("barcode");
    const idCard = document.getElementById("idCard");


    // =====================================================
    // UPDATE CARD INFORMATION
    // =====================================================

    function updateCard() {

        const name =
            nameInput.value.trim() || "MONALISA GAAN";

        const role =
            roleInput.value.trim() || "FRONTEND DEVELOPER";

        const builderClass =
            classInput.value || "TERMINAL WIZARD";

        const builderId =
            idInput.value.trim() || "HH-GOA-240";


        // Name
        cardName.textContent = name.toUpperCase();
        admitName.textContent = name.toUpperCase();


        // Role
        cardRole.textContent = role.toUpperCase();


        // Builder class
        cardClass.textContent = builderClass.toUpperCase();


        // Builder ID
        const formattedId =
            "#" + builderId.replace(/^#/, "").toUpperCase();

        cardId.textContent = formattedId;
        qrId.textContent = formattedId;


        // Generate QR
        generateQRCode(builderId);


        // Generate barcode
        generateBarcode(builderId);
    }


    // =====================================================
    // PHOTO UPLOAD
    // =====================================================

    photoInput.addEventListener("change", (event) => {

        const file = event.target.files[0];

        if (!file) {
            return;
        }


        // Make sure the selected file is an image
        if (!file.type.startsWith("image/")) {

            alert("Please select a valid image file.");

            photoInput.value = "";

            return;
        }


        const reader = new FileReader();


        reader.onload = (event) => {

            profileImage.src = event.target.result;

            profileImage.style.display = "block";

            photoPlaceholder.style.display = "none";
        };


        reader.readAsDataURL(file);
    });


    // =====================================================
    // QR CODE
    // =====================================================

    function generateQRCode(builderId) {

        if (!qrCodeContainer) {
            return;
        }


        // Clear previous QR code
        qrCodeContainer.innerHTML = "";


        const cleanId =
            builderId
                .replace(/^#/, "")
                .toUpperCase();


        new QRCode(qrCodeContainer, {

            text: `HH GOA 2026 - ${cleanId}`,

            width: 75,

            height: 75,

            colorDark: "#073f2d",

            colorLight: "#ffffff",

            correctLevel: QRCode.CorrectLevel.H
        });
    }


    // =====================================================
    // BARCODE
    // =====================================================

    function generateBarcode(builderId) {

        if (!barcode) {
            return;
        }


        let cleanId =
            builderId
                .replace(/[^a-zA-Z0-9]/g, "")
                .toUpperCase();


        if (!cleanId) {
            cleanId = "HHGOA240";
        }


        JsBarcode(barcode, cleanId, {

            format: "CODE128",

            width: 1.5,

            height: 32,

            displayValue: false,

            lineColor: "#073f2d",

            background: "transparent",

            margin: 0
        });
    }


    // =====================================================
    // INPUT EVENTS
    // =====================================================

    nameInput.addEventListener("input", updateCard);

    roleInput.addEventListener("input", updateCard);

    classInput.addEventListener("change", updateCard);

    idInput.addEventListener("input", updateCard);


    // =====================================================
    // RANDOMIZE
    // =====================================================

    randomBtn.addEventListener("click", () => {

        const names = [
            "MONALISA GAAN",
            "NIKHIL ARYAN",
            "ARJUN MEHTA",
            "RIYA SHARMA",
            "ADITYA DAS",
            "ANANYA PATNAIK",
            "ROHAN SINGH",
            "KAVYA NAYAK"
        ];


        const roles = [
            "FRONTEND DEVELOPER",
            "FULL STACK DEVELOPER",
            "AI ENGINEER",
            "BACKEND DEVELOPER",
            "UI/UX DESIGNER",
            "DEVOPS ENGINEER",
            "BLOCKCHAIN DEVELOPER"
        ];


        const builderClasses = [
            "TERMINAL WIZARD",
            "CODE PIRATE",
            "PIXEL ALCHEMIST",
            "STACK SAMURAI",
            "DEBUG DETECTIVE"
        ];


        // Random name
        const randomName =
            names[Math.floor(Math.random() * names.length)];


        // Random role
        const randomRole =
            roles[Math.floor(Math.random() * roles.length)];


        // Random class
        const randomClass =
            builderClasses[
                Math.floor(Math.random() * builderClasses.length)
            ];


        // Random ID
        const randomNumber =
            Math.floor(100 + Math.random() * 900);


        const randomId =
            `HH-GOA-${randomNumber}`;


        // Put values into inputs
        nameInput.value = randomName;

        roleInput.value = randomRole;

        classInput.value = randomClass;

        idInput.value = randomId;


        // Update card
        updateCard();
    });


    // =====================================================
    // DOWNLOAD CARD
    // =====================================================

    downloadBtn.addEventListener("click", async () => {

        if (!idCard) {
            return;
        }


        const originalText =
            downloadBtn.textContent;


        downloadBtn.textContent =
            "GENERATING...";


        downloadBtn.disabled = true;


        try {

            const canvas =
                await html2canvas(idCard, {

                    scale: 3,

                    useCORS: true,

                    allowTaint: true,

                    backgroundColor: null,

                    logging: false
                });


            // Create download link
            const link =
                document.createElement("a");


            // Get name for filename
            const fileName =
                (
                    nameInput.value.trim() ||
                    "MONALISA_GAAN"
                )
                    .replace(/[^a-zA-Z0-9]+/g, "_")
                    .toUpperCase();


            link.download =
                `${fileName}_HH_GOA_2026.png`;


            link.href =
                canvas.toDataURL("image/png");


            // Start download
            link.click();

        } catch (error) {

            console.error(
                "Card download error:",
                error
            );


            alert(
                "Unable to download the card. Please try again."
            );

        } finally {

            downloadBtn.textContent =
                originalText;

            downloadBtn.disabled = false;
        }
    });


    // =====================================================
    // INITIAL CARD SETUP
    // =====================================================

    updateCard();

});