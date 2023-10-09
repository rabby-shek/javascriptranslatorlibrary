document.addEventListener("DOMContentLoaded", function() {
    
    const toggleButton = document.getElementById("toggle-language");
    const translations = {
        "en": {},
        "bn": {}
    };

    // Load translations from JSON
    function loadTranslations() {
        return fetch("translations.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load translations.json: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (data && data["en"] && data["bn"]) {
                    translations["en"] = data["en"];
                    translations["bn"] = data["bn"];
                } else {
                    throw new Error("Invalid JSON format for translations.json");
                }
            })
            .catch(error => {
                console.error(error);
                // Handle error (e.g., display a message to the user)
            });
    }

    function translateElements() {
        const elementsToTranslate = document.querySelectorAll("[data-translate]");
        elementsToTranslate.forEach(element => {
            const translationKey = element.getAttribute("data-translate");
            const translation = translations[getCurrentLanguage()];

            // Check if translation exists, use English as default if not
            const translatedText = translation && translation[translationKey] ? translation[translationKey] : element.textContent;

            element.textContent = translatedText;
        });
    }

    function getCurrentLanguage() {
        return sessionStorage.getItem("language") || "en";
    }

    function initTranslator() {
        loadTranslations()
            .then(() => {
                translateElements();
                generateAndDisplayJson(); 
                // Call this function on page load
            });
    }

    // Initialize translator and handle language toggle
    initTranslator();
    toggleButton.addEventListener("click", function() {
        const currentLanguage = sessionStorage.getItem("language");
        const newLanguage = currentLanguage === "en" ? "bn" : "en"; // Toggle between English and Bengali
        
        if (newLanguage === "en" || newLanguage === "bn") {
            sessionStorage.setItem("language", newLanguage);
            translateElements();
        } else {
            console.error("Invalid language: " + newLanguage);
            // Handle invalid language (e.g., display an error message)
        }
    });

    // Function to generate and display custom translations JSON
    function generateAndDisplayJson() {
        const customTranslations = {
            "en": {},
            "bn": {}
        };
        

        const elementsWithCustomTranslation = document.querySelectorAll("[data-translate]");
        elementsWithCustomTranslation.forEach(element => {
            const translationKey = element.getAttribute("data-translate");
            const englishTranslation = element.getAttribute("data-english");
            const bengaliTranslation = element.getAttribute("data-bengali");

            if (translationKey && englishTranslation && bengaliTranslation) {
                customTranslations["en"][translationKey] = englishTranslation;
                customTranslations["bn"][translationKey] = bengaliTranslation;
            } else {
                console.warn(`Incomplete translation data for element: ${element}`);
                // Handle incomplete translation data (e.g., log a warning)
            }
        });

        // Display the custom translations JSON
        const blob = new Blob([JSON.stringify(customTranslations, null, 2)], { type: "application/json" });
        blob.text().then(text => {
            console.log(text)
        });
      


    }
});

;
