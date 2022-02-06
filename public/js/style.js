// a function that hide the select input and show the text input
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

// a function that show the select input and hide the text input
function selectGenre() {
    var textInput = document.getElementById('genreName');
    textInput.value = 'empty';
    var textInputGroup = document.getElementById('genreNameInputGroup');
    textInputGroup.classList.add('d-none');

    var selectInput = document.getElementById('genreId');
    selectInput.value = '';
    selectInput.classList.remove('d-none');
}


// a function that open the modal when the user click on the book
function openModal(modalId) {
    var bookModal = new bootstrap.Modal(document.getElementById(modalId), {
        keyboard: false
      })
    bookModal.toggle();
}


// a function that change the modal type from info to form and the opposite
function changeModalType(bookId){
    // book-modal-form
    var bookModalForm = document.getElementById(`book${bookId}-modal-form`);
    var bookModalInfo = document.getElementById(`book${bookId}-modal-info`);
    var fieldset = document.getElementById

    // this means that the modal now in the info part
    if (bookModalForm.classList.contains('d-none')){
        bookModalForm.classList.remove('d-none');
        bookModalInfo.classList.add('d-none');
    }
    else if (bookModalInfo.classList.contains('d-none')){
        bookModalForm.classList.add('d-none');
        bookModalInfo.classList.remove('d-none');
    }

}


// dataTable
$(document).ready( function () {
    $('#booksTable').DataTable();
} );