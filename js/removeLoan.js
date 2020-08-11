//-------------------------Remove Loan/Return book -----------------------------------

let returnBookProcess = async function(){
    "use strict";
  let bookId = document.getElementsByClassName("bookId")[2].value;
  //Checks for empty input fields
  if(bookId !== ""){
      let url = root_url + book_url + bookId + allEntitiesQuestionMark;
      //Get request to check that the book is in fact currently on loan
      let response = await getRequest(url);
      if (response.Loan !== null){
          let loanId = response.Loan.id;
          let url2 = root_url + loans_url + loanId;
          //Deletes the loan from the database
          await deleteRequest(url2);
          alert(bookReturned);
          removeTable("headingsRow", "bodyRows");
      }
      else{
          alert(notOnLoan);
      }
  }
  else{
      alert(inputEmpty);
  }
};

document.getElementById("returnBookBtn").addEventListener("click", returnBookProcess);