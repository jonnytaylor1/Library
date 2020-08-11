//-------------------------Search Loans -----------------------------------


//Creates Table

//ParentsHeadingsElementId is the ID of the parent element of the th values which will normally be the ID of table - thead - tr
//tableHeadings is an array of all of the table headings
//parentBodyElementId is the ID of the parent element of the tr values of the table body which will normally be the ID of table - tbody
//cellValuesObject is the array of objects that contain the information you want to be in the table body cells
//For example [{userID: 1, barcode: 123456}, {userID:2, barcode:654321}] it must be written in this format

function createTable(parentHeadingsElementId, tableHeadings, parentBodyElementId, cellValuesObject){
    "use strict";
  return new Promise((resolve,reject)=>{
      let tableHead = document.getElementById(parentHeadingsElementId);
      let headingsRow = document.createElement("tr");
      //Creates the headings
  for (let i=0; i<tableHeadings.length; i++){
      let newCell = document.createElement("th");
      let cellValue = document.createTextNode(tableHeadings[i]);
      newCell.appendChild(cellValue);
      headingsRow.appendChild(newCell);
  }
  tableHead.appendChild(headingsRow);

  let bodyRows = document.getElementById(parentBodyElementId);
  cellValuesObject.forEach(element => {
      //Creates the table body rows
      let newRow = document.createElement("tr");
      Object.values(element).forEach(value=>{
          //Creates the data cells and appends the values to from the cellValuesObject to them
          let newCell = document.createElement("td");
          let newCellValue = document.createTextNode(value);
          newCell.appendChild(newCellValue);
          newRow.appendChild(newCell);
       });
       bodyRows.appendChild(newRow);
  });
  resolve();
  });
}

//-------------------------See users loans -----------------------------------

async function seeUsersLoansProcess() {
"use strict";
  //Removes any tables that are already in place
  removeTable("headingsRow", "bodyRows");
  let userBarcode = document.getElementById("userBarcode").value;
  //Checks if there is an input value
  if(userBarcode !== ""){
      let url = root_url + search_user_by_barcode_url + userBarcode;
      //Searches for user
      let response = await getRequest(url);
      //Checks if a user with this barcode exists.
      if (response.length !== 0) {
          let userId = response[0].id;
          let userName = response[0].name;
          //Searches for users loans
          let url2 = root_url + users_url + userId + slash_loans_url;
          let response2 = await getRequest(url2);
          //Checks if there are any loans for this user and if there isn't displays a message explaining this.
          if(response2.length !==0){
              //userLoanInfo is the information used when creating the table
              let userLoanInfo = [];
              let tableHeadingsArray = ["User Name", "Book ID", "Book Title", "Due Date"];
              for (let i=0; i<response2.length;i++){
                  let date = new Date(response2[i].dueDate);
                  //Changes the due date to string format
                  let stringDate = date.toDateString();
                  //Gets the book information for the users loans
                  let url3 = root_url + "books/" + response2[i].BookId;
                  let response3 = await getRequest(url3); 
                  //Creates an object and adds it the userLoanInfo array
                  userLoanInfo.push({
                      userName: userName,
                      bookId: response3.id, 
                      bookTitle: response3.title, 
                      dueDate: stringDate});
              }
              //Creates a table using the userLoanInfo array of objects    
              await createTable("headingsRow", tableHeadingsArray, "bodyRows", userLoanInfo);
              //Adds data label attributes to the data cells (these are the heading names)
              addDataLabelAttributes(tableHeadingsArray);
              }
          else{
              alert(userNoLoans);
          }
      }
      else{
          alert(userNotFound);
          }
      }
  else{
      alert("You must enter a barcode before searching for the users loans");
  }
}

document.getElementById("seeCurrentLoansBtn").addEventListener("click", seeUsersLoansProcess);


//-------------------------See User Loaning Book -----------------------------------


//Get input of bookID

async function userLoaningBookProcess() {
"use strict";
  //Removes any tables that are already in place
  removeTable("headingsRow", "bodyRows");
  let bookId = document.getElementsByClassName("bookId")[1].value;
  //Checks if the input field has been filled in
  if(bookId!==""){
      let url = root_url + book_url + bookId + allEntitiesQuestionMark;
      //Gets the book information (including Loan information about the book)
      let bookInfo = await getRequest(url);
      //Checks if the book exists
       if (bookInfo){
          //Checks if the book is currently on loan
       if (bookInfo.Loan !== null){
      //Gets the user ID of the loan
      let userId = bookInfo.Loan.UserId;
      let url2 = root_url + users_url + userId;
      //Gets the users information
      let userInfo = await getRequest(url2);
      let userObject = [{
          bookId: bookId,
          name: userInfo.name,
          barcode: userInfo.barcode,
          email: userInfo.email,
          memberType: userInfo.memberType
      }];
      let tableHeadings = ["Book ID", "Name", "Barcode", "Email", "Member Type"];
      //Creates a table using the userObject information
      createTable("headingsRow", tableHeadings, "bodyRows", userObject);
      //Adds data label attributes
      addDataLabelAttributes(tableHeadings);
  }
  else{
      alert(notOnLoan);
  }
  }
  else{
      alert(bookNotFound);
  }
  }
  else{
      alert(inputEmpty);
  }
}


document.getElementById("seeUserLoaningBookBtn").addEventListener("click", userLoaningBookProcess);