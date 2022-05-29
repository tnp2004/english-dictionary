const word = document.getElementById('word-input');
const btn = document.getElementById('search-btn');
const meaning = document.getElementById('meaning');
const exampleSentence = document.getElementById('example');
const playAudioBtn = document.getElementById('play-audio')

const searchMeaning = async (e) => {
    e.preventDefault();
    const searchUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word.value}`
    fetch(searchUrl).then(response => response.json())
        .then(data => {
            const { definition, example } = data[0].meanings[0].definitions[0]
            const { audio } = data[0].phonetics[0]
            audioGlobal = audio
            showMeaning(definition, example)
        }).catch(err => {
            alertErr("Word not found", "Please check your word", "error")
            audioGlobal = null
        })
}

const showMeaning = (definition, example) => {
    meaning.innerHTML = definition ? definition : "No definition"
    exampleSentence.innerHTML = example ? example : 'No example'
}

let audioGlobal // for save previous audio
const playAudio = () => {
    new Audio(`${audioGlobal}`).play().catch(err => alertErr("Sorry", "Audio not found", "error"))
}

const alertErr = (title, text, icon) => {
    swal({
        title: title,
        text: text,
        icon: icon,
      });
}

btn.addEventListener('click', searchMeaning)
playAudioBtn.addEventListener('click', playAudio)