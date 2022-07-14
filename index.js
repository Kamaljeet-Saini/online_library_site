console.log("This is lib.js");
//To-dos
//1.) Store all the data to the local storage.
//2.) Give an option to delete a book from the table.
//3.) Add a scrollbar to the view(use when the number of bookd are large for e.g. 600 or more)

function Book(name,author,type){
    this.name=name;
    this.author=author;
    this.type=type;
}
function Display(){

}
//Add methods to display prototype
Display.prototype.add = function(book){
    console.log("Adding to UI");
    tableBody = document.getElementById("tableBody");
    let uiString =  `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`;
    tableBody.innerHTML += uiString;
};
//implementing the clear function
Display.prototype.clear = function(){
    //grab the form by its id and erase its content after it has been added to the table
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
};

//implementing the validate function
Display.prototype.validate = function(book){
    if(book.name.length < 3 || book.author.length < 3){
        return false;
    }
    else{
        return true;
    }
};

//implementing the show function
Display.prototype.show = function(type,displayMessage){
    let message = document.getElementById("message");
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                        <strong>Message:</strong> ${displayMessage}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                        </div>`
};

//Add submit event listener to libraryForm 
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit",libraryFormSubmit);

function libraryFormSubmit(e){  //whenever a form submits it reloads the page this is the default behaviour
    console.log("You have submitted the form");
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    //checking the type of book which is checked by the user
    let fiction = document.getElementById("fiction");
    let nonfiction = document.getElementById("non-fiction");
    let programming = document.getElementById("programming");
    let analysis = document.getElementById("analysis");
    let comics = document.getElementById("comics");
    let biography = document.getElementById("biography");
    let autobiography = document.getElementById("autobiography");
    let type;

    if(fiction.checked){
        type=fiction.value;
    }
    else if(nonfiction.checked){
        type=non-fiction.value;
    }
    else if(analysis.checked){
        type=analysis.value;
    }
    else if(programming.checked){
        type=programming.value;
    }
    else if(comics.checked){
        type=comics.value;
    }
    else if(biography.checked){
        type=biography.value;
    }
    else if(autobiography.checked){
        type=autobiography.value;
    }
    let book = new Book(name,author,type);
    console.log(book);
    //to erase the content of form that u submitted after it has been added to the table.
    let display = new Display();
    //display.validate(book); //to check if details enetered are valid or not
    if(display.validate(book)){
        display.add(book);  //will add the book details to the table.
        display.clear();    //will clear all the values in display of the form.
        display.show('Success','Your book has been successfully added');
    }
    else{
        //show error to the user.
        display.show('Danger','Sorry You cannot add this book');
    }

    e.preventDefault();
}

//as soon as page will reload all the memory is gone. So we need to keep the backend data.

