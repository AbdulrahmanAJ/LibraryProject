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
    console.log(modalId);
    var bookModal = new bootstrap.Modal(document.getElementById(modalId), {})
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


let books = []

// The search bar in the grid view
function searchBook(searchValue, id) {
    let booksCovers = document.getElementsByClassName('bookCover')

    
    // insert the book that matches the search value in the books list
    for (let i = 0; i < booksCovers.length; i++) {
        const bookCover = booksCovers[i];
        const bookName = bookCover.getAttribute('bookname')
        const authorName = bookCover.getAttribute('authorname')
        const genreId = bookCover.getAttribute('genreId')
        const isVisible =  bookName.toLowerCase().includes(searchValue.toLowerCase()) ||
                            authorName.toLowerCase().includes(searchValue.toLowerCase()) ||
                            genreId != id;
        
        // if (isVisible && genreId==id) console.log(bookName, authorName, isVisible);
        bookCover.classList.toggle("d-none", !isVisible)
    }

}

// Data table
$(document).ready(() => {
    // make a table
    var table = $('table.display').DataTable({
        
    }); 

    // var bookCovers = 

})