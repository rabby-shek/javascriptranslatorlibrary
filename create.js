const fs = require('fs');

const translations = {
    "en": {
        "greeting": "Hello",
        "message": "This is a simple translator",
        "good": "Good",
        "morning": "Morning"
    },
    "bn": {
        "greeting": "হ্যালো",
        "message": "এটি একটি সহজ অনুবাদক",
        "good": "ভাল",
        "morning": "সকাল"
    }
};

// Write the JSON data to a file
fs.writeFile("translations.json", JSON.stringify(translations, null, 2), (err) => {
    if (err) {
        console.error("Error writing JSON file:", err);
    } else {
        console.log("JSON file has been created successfully.");
    }
});
