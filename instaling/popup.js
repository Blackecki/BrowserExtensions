document.addEventListener("DOMContentLoaded", () => {
    const toggleEnabled = document.getElementById("toggleEnabled");
    chrome.storage.sync.get("enabled", (data) => {
        toggleEnabled.checked = data.enabled !== false;
    });

    toggleEnabled.addEventListener("change", () => {
        chrome.storage.sync.set({ "enabled": toggleEnabled.checked });
    });
});