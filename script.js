const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const antonymUrl = "https://api.datamuse.com/words?rel_ant=";
const synonymUrl = "https://api.datamuse.com/words?rel_syn=";
const result = document.getElementById("result");
const btn = document.getElementById("search-btn");
const languageSelector = document.getElementById("language-selector");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value.trim(); 
    let targetLanguage = languageSelector.value;

    if (!inpWord) {
        result.innerHTML = `<h3 class="error">Please enter a word to search.</h3>`;
        return;
    }

    result.innerHTML = "<h3>Loading...</h3>";

    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.title === "No Definitions Found") {
                result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
                return;
            }

            result.innerHTML = `
                <div class="word">
                    <h3>${inpWord}</h3>
                    <a href="https://forvo.com/search/${inpWord}/" target="_blank">
                        <button class="pronunciation-btn">
                            <i class="fas fa-volume-up"></i> Pronunciation
                        </button>
                    </a>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;

            fetchLibreTranslate(inpWord, targetLanguage);
            fetchAntonymsAndSynonyms(inpWord);
        })
        .catch(error => {
            console.error('Dictionary API Error:', error);
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});


function fetchLibreTranslate(inpWord, targetLanguage) {
    const libreTranslateUrl = "https://libretranslate.com/translate";
    const requestBody = {
        q: inpWord,
        source: "en",
        target: targetLanguage,
        format: "text"
    };

    fetch(libreTranslateUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data && data.translatedText) {
            const translatedWord = data.translatedText;
            result.innerHTML += `
                <p class="translation">
                    <strong>Translation (${targetLanguage}):</strong> ${translatedWord}
                </p>`;
        } else {
            result.innerHTML += `<p class="error">Couldn't fetch translation from LibreTranslate. Please try again later.</p>`;
        }
    })
    .catch((error) => {
        console.error('LibreTranslate API Error:', error);
        result.innerHTML += `<p class="error">Couldn't fetch translation. Please try again later.</p>`;
    });
}


function fetchAntonymsAndSynonyms(word) {

    fetch(`${antonymUrl}${word}`)
        .then(response => response.json())
        .then(data => {
            const antonyms = data.length > 0 ? data.map(item => item.word).join(", ") : "No antonyms found";
            const antonymElement = document.createElement("div");
            antonymElement.classList.add("antonyms");
            antonymElement.innerHTML = `<strong>Antonyms:</strong> ${antonyms}`;
            result.appendChild(antonymElement);
        })
        .catch(error => {
            console.error("Antonym API Error:", error);
            const errorElement = document.createElement("p");
            errorElement.classList.add("error");
            errorElement.innerText = `Couldn't fetch antonyms: ${error.message}`;
            result.appendChild(errorElement);
        });

    fetch(`${synonymUrl}${word}`)
        .then(response => response.json())
        .then(data => {
            const synonyms = data.length > 0 ? data.map(item => item.word).join(", ") : "No synonyms found";
            const synonymElement = document.createElement("div");
            synonymElement.classList.add("synonyms");
            synonymElement.innerHTML = `<strong>Synonyms:</strong> ${synonyms}`;
            result.appendChild(synonymElement);
        })
        .catch(error => {
            console.error("Synonym API Error:", error);
            const errorElement = document.createElement("p");
            errorElement.classList.add("error");
            errorElement.innerText = `Couldn't fetch synonyms: ${error.message}`;
            result.appendChild(errorElement);
        });
}
