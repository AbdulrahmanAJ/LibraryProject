// a function that hide the select input and show the text input
function addNewGenre(selectInput) {
    // it checks that the user selected 'add new genre'
    var selectedValue = selectInput.options[selectInput.selectedIndex].value;

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


// a function that open the book modal when the user click on the book cover
function openBookModal(bookId) {
    var bookModalId =  `book${bookId}Modal`
    var bookModal = new bootstrap.Modal(document.getElementById(bookModalId), {})
    bookModal.toggle();
}

// a function that open the book modal when the user click on the book cover
function openAuthorModal(authorId) {
    var authorModalId =  `author${authorId}Modal`
    var authorModal = new bootstrap.Modal(document.getElementById(authorModalId), {})
    console.log(authorModal);
    authorModal.toggle();
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

async function changeTheme(isDark) {
    console.log(isDark);
    const lightThemeLink = document.getElementById("lightThemeLink");
    const darkThemeLink = document.getElementById("darkThemeLink");

    if (isDark) {
        darkThemeLink.setAttribute("rel", "stylesheet")
        setTimeout(function() {
            //your code to be executed after 250 millie second
            lightThemeLink.removeAttribute('rel')
          }, 250);
    } else {
        lightThemeLink.setAttribute("rel", "stylesheet")
        setTimeout(function() {
            //your code to be executed after 250 millie second
            darkThemeLink.removeAttribute('rel')
          }, 250);
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

// The search of authors
function searchAuthor(searchValue) {
    let authorsCards = document.getElementsByClassName('authorCard')
    
    // insert the book that matches the search value in the books list
    for (let i = 0; i < authorsCards.length; i++) {
        const authorCard = authorsCards[i];
        const authorName = authorCard.getAttribute('authorname');
        const isVisible =  authorName.toLowerCase().includes(searchValue.toLowerCase());
        
        // console.log(bookName, authorName, isVisible);
        authorCard.classList.toggle("d-none", !isVisible);
    }

}



// Data table
$(document).ready(() => {
    // make a table
    var table = $('table.display').DataTable({
        
    }); 

    // var bookCovers = 

})

