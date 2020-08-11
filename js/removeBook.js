//-------------------------Deleting Books -----------------------------------
 
async function deleteBookProcess(){
    "use strict";
     let bookID = document.getElementById("bookId").value; 
     //Checks if there is an input value
     if(bookID!==""){
         let url = root_url + book_url + bookID + allEntitiesQuestionMark;
         //Get request to see if the book you are trying to delete is on loan
         //You cannot delete a book if it is on loan
         let response = await getRequest(url);
         //Makes sure that the book that you are trying to delete is not on loan
         if(response.Loan === null){
             //Confirm before deleting the book
             let confirmation = confirm("Click OK to confirm that you want to delete the book with an ID of " + bookID + "?");
         if(confirmation===true){
             let url = root_url + book_url + bookID;
             //Deletes the book from the database
             await deleteRequest(url); 
             alert(bookDeleted);
             removeTable("headingsRow", "bodyRows");           
             }
         
         else{
             return;
         }
         }
         else{
             alert(cantDeleteOnLoan);
         }
     }
     else{
         alert(inputEmpty);
     }
     }
 
 document.getElementById("deleteBookBtn").addEventListener("click", deleteBookProcess);
 