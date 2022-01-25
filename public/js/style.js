// a funciton that hide the select input and show the text input
function addNewGenre(obj) {
    // it checks that the user selected 'add new genre'
    var selectedValue = obj.options[obj.selectedIndex].value;

    if (selectedValue == -1) {
        var selectInput = document.getElementById('genreId');
        selectInput.classList.add('d-none');
        
        var textInput = document.getElementById('genreName');
        textInput.value = '';
        var textInputGroup = document.getElementById('genreNameInputGroup');
        textInputGroup.classList.remove('d-none');
    }
}

// a funciton that show the select input and hide the text input
function selectGenre() {
    var textInput = document.getElementById('genreName');
    textInput.value = 'empty';
    var textInputGroup = document.getElementById('genreNameInputGroup');
    textInputGroup.classList.add('d-none');

    var selectInput = document.getElementById('genreId');
    selectInput.value = '';
    selectInput.classList.remove('d-none');
}
