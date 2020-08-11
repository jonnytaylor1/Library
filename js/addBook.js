
//-------------------------Adding Books -----------------------------------


//When the add book button is pressed this function is run


async function postBookProcess() {
    "use strict";
    let url = root_url + book_url;
    let bookName = document.getElementById("bookName").value;
    let isbnNumber = document.getElementById("isbnNumber").value;
    let authorNames = document.getElementsByClassName("authorNames");
    //All author inputs are stored in this array and used in the author
    //post requests later on.
    let authorsArray = [];
    for (let i=0; i<authorNames.length; i++){
        if(authorNames[i].value !==""){
            authorsArray.push(authorNames[i].value);
        }
    }
    //Checks there are no empty fields
    if(authorNames.length !== authorsArray.length || bookName === "" || isbnNumber === "" || authorNames.length ===0){
        alert(inputsEmpty);
        //Author names input fields are removed
        $("input").remove(".authorNames");
    }
    else{
        $("input").remove(".authorNames");

    let params = {
        title: bookName,
        isbn: isbnNumber
    };
    //First a post request is made with the book details - Title, ISBN (but not the authors)
    await postRequest(params,url);

    let url2 = root_url + search_by_isbn_url + isbnNumber;

    let response = await getRequest(url2);
    let bookID = (response[0].id);


    //Then the authors are added to the book
    let url3 = root_url + book_url + bookID + "/authors";
    for (let i=0; i<authorsArray.length; i++){
        let params2 = {
            name: authorsArray[i]
        };
           await postRequest(params2, url3);
    }
    //User is made aware that the book has been added to the system
    alert(bookAdded);
    }
}        


document.getElementById("saveBookDetails").addEventListener("click", postBookProcess);


//When a value is entered in the 'Number of authors to add' input field this function will run
//The correct number of input fields are created and placed before the 'saveBtn' (which is
//below where you request the number of authors you would like).

document.getElementById("numberRequested").addEventListener("input", function() {
    "use strict";
    $("input").remove(".authorNames");
    let numberOfInputsRequested = document.getElementById("numberRequested").value;
    let saveBookBtn = document.getElementById("saveBookDetails");
    for(let i=1; i<=numberOfInputsRequested;i++){
        let inputElement = document.createElement("input");
        inputElement.placeholder = "Author " + i;
        inputElement.className = "authorNames inputField addItemInput";
        document.getElementById("addBookForm").insertBefore(inputElement,saveBookBtn);
    }
    });