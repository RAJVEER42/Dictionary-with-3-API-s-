# Dictionary-with-3-API-s-

This is a simple Word Search application that allows you to search for word definitions, synonyms, antonyms, and translations. It uses several APIs to fetch data, including:

Dictionary API

Datamuse API for Synonyms and Antonyms

LibreTranslate API for translations 

There are 4 APIs used. 

1) for searching the words Dictionary API for word definitions. (https://api.dictionaryapi.dev/api/v2/entries/en/")

2) For Synonyms and Antonyms: Using the Datamuse API, the app fetches synonyms and antonyms for the entered word. (https://api.datamuse.com/words?rel_ant=) & (https://api.datamuse.com

3) for Translation: The app calls the LibreTranslate API to provide translations of the word in the selected language. (https://libretranslate.com/translate) {can have some mirror errors.}

The new things I have learned in this project are:

1) Use of -webkit-background-clip: text (the background will only be visible where the text appears, giving you a cool text effect like gradient text).

2) Use of the linear gradient effect in the background.

3) Use of the glassy effect for the main container.

4) use of *:not(i): - pseudo-class to exclude specific elements from being styled.

5) Also, I have been now smoother and friendlier with the usage of CSS, finding new CSS properties, and being more comfortable with old CSS properties like @keyframes, :hover, etc.

6) Also with how to add Google Fonts to your code.

7) How to use and fetch API data.

8) Also help us with creating good designs in the frontend.

* The pronunciation will take you to a website (Forvo) to help the user to listen to the pronunciation of the word to help them with it.

* If you receive an error message like "Couldn't Find The Word," ensure the word is correctly spelled.

* If the synonyms or antonyms do not show up, there may be an issue with the API response. Check the console for details.

