//Multiple pages URLS
let root_url = 'http://127.0.0.1:3000/';
let search_user_by_barcode_url = 'search?type=user&barcode=';
let users_url = "users/";
let book_url = 'books/';
let allEntities = "&allEntities=true";
let allEntitiesQuestionMark = "?allEntities=true";

//Users URLS
let search_user_by_name_url = "search?type=user&name=";

//Books URLS
let search_by_book_name_url = 'search?type=book&title=';
let search_by_isbn_url = 'search?type=book&isbn=';
let search_book_by_author_url = 'search?type=author&name=';

//Loans URLS
let slash_loans_url = "/loans/";
let loans_url = "loans/";


//Multiple pages messages
let inputEmpty = "The input field must be filled in";
let inputsEmpty = "All input fields must be filled in";
let continueModifyingTableConfirmation = "Press OK if you would like to continue using the table";
let notFound = "The book or user searched doesn't exist";
let bookNotFound = "There is no book with this ID";
let userNotFound = "User cannot be found in the library system";


//Book messages
let bookAdded = "The book has been added to the system";
let bookDeleted = "The book has been deleted from the system";
let cantDeleteOnLoan =  "This book can't be deleted as it is currently on loan";
let authorHasNoBooks = "This author does not currently have any books in the system";


//User messages
let detailsUpdated = "The users details have been successfully updated";


//Loans alert messages
let loanAdded = "Loan has been added to the system";
let notOnLoan = "This book is not currently on loan";
let bookReturned = "The book has been recorded as returned on the system";
let userNoLoans = "This user does not currently have any loans!";



//Generates a params object array ready to send in the post,put or patch request
let paramsGenerator = function(paramsKeyArray, inputIdArray){
  	"use strict";
    return new Promise((resolve, reject)=>{
        let params = {};
    for(let i=0; i<paramsKeyArray.length; i++){
        params[paramsKeyArray[i]] = document.getElementById(inputIdArray[i]).value;
    }
    resolve(params);
    });
};


//Used when extra information is needed in an alert message
function alertMessage(whichChange, extraInfo){
    	"use strict";
    return new Promise((resolve,reject)=>{
        if (whichChange === "onLoan") {
            alert("This book is currently on loan to another user until " + extraInfo);
        }
        if (whichChange === "userAdded"){
            alert("User has been added with a unique barcode of " + extraInfo);
        }
    resolve();
    });
}

//Get request with a little error handling for if the item cannot be found. 
//Get request that that resolves the response so that it can be assigned to a variable
function getRequest(url){
    	"use strict";
    return new Promise((resolve,reject)=>{
        let xhttp = new XMLHttpRequest();
        xhttp.onload = function(){
            if(this.status==200){
                let response = JSON.parse(xhttp.response);
                resolve(response);
            }
            if(this.status==404){
                alert(notFound);
            }
            else{
                return;
            }
        };
        xhttp.open('get',url);
        xhttp.send();
    });
}

//Post request that resolves the response so that it can be assigned to a variable
function postRequest(params, url){
    	"use strict";
    return new Promise ((resolve,reject)=>{
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", url);
        // remember to set the content type header
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(params));
        xhttp.onload = function(){
            let response = JSON.parse(xhttp.response);
            resolve(response);
        };
    });
    }

//Put request that that resolves the response so that it can be assigned to a variable
function putRequest(url, params){
    	"use strict";
    return new Promise ((resolve,reject)=>{
        var xhttp = new XMLHttpRequest();
        xhttp.open("put", url);
        // remember to set the content type header
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(params));
        xhttp.onload = function(){
            resolve(JSON.parse(xhttp.response));
        };
    });
}

//Patch request that resolves the response so that it can be assigned to a variable
function patchRequest(url, params){
    	"use strict";
    return new Promise ((resolve,reject)=>{
        var xhttp = new XMLHttpRequest();
        xhttp.open("PATCH", url);
        // remember to set the content type header
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(params));
        xhttp.onload = function(){
            resolve(JSON.parse(xhttp.response));
        };
    });
}

//Delete request that only resolves if there is a successful response
function deleteRequest(url){
    	"use strict";
    return new Promise ((resolve,reject)=>{
        let xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", url);
        xhttp.send();
        xhttp.onload = function(){
            if(this.readyState == 4 && this.status==200){
               resolve();
            }
        };
    });
}


//Removes any table by clearing the inner HTML of the table headings container and the table body container
function removeTable(tableHeadingsContainerId, tableBodyContainerId){
    	"use strict";
    let tableHeadingsContainer = document.getElementById(tableHeadingsContainerId);
    let tableBodyContainer = document.getElementById(tableBodyContainerId);
    tableHeadingsContainer.innerHTML = "";
    tableBodyContainer.innerHTML = "";
}





//Adds data labels to each of the cells in the table. This is so they can be used to create the responsive table.
function addDataLabelAttributes(tableHeadingsArray){
      	"use strict";
    let tableBody = document.querySelector("#bodyRows");
    let numberOfRows = tableBody.rows.length;
    for(let i=0; i<numberOfRows; i++){
        let row = tableBody.rows[i];
        let numberOfCells = row.cells.length;
        for(let j=0; j<numberOfCells; j++){
            let cell = row.cells[j];
            cell.setAttribute("data-label", tableHeadingsArray[j]);
        }
    }
}

//Hides the main body of the page as well as the footer when the burger menu is clicked
document.getElementById("burger").addEventListener('click', function(){
    	"use strict";
    let mainBody = document.getElementsByTagName("main")[0];
    let footer = document.getElementsByTagName("footer")[0];
    mainBody.classList.toggle('displayNone');
    footer.classList.toggle('displayNone');
});