async function translateText(text) {
    const apiKey = "YOUR_API_KEY"; // API key
    const url = "https://api-free.deepl.com/v2/translate";

    const params = new URLSearchParams();
    params.append("auth_key", apiKey);
    params.append("text", text);
    params.append("target_lang", "EN"); // Change to any target language (e.g., "PL" for Polish)

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params,
        });

        const data = await response.json();
        return data.translations[0].text;
    } catch (error) {
        console.error("Translation error:", error);
        return text;
    }
}

// Listen for keypress
document.addEventListener("keydown", async (event) => {
    if (event.key !== "b" && event.key !== "B") return; // Only trigger on "B"

    // Check if translation is enabled before executing translation
    chrome.storage.sync.get("enabled", async (data) => {
        console.log("Translation Enabled State:", data.enabled); // Debugging log
        if (data.enabled === false) return; // Stop execution if disabled

        const translationElement = document.querySelector(".translations");
        const answerInput = document.querySelector("#answer");

        if (translationElement && answerInput) {
            const originalText = translationElement.textContent.trim();
            const translated = await translateText(originalText);
            answerInput.value = translated;
        }
    });
});
