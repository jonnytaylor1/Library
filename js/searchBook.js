//------------------------- Search Books -----------------------------------


//Creates a cell with a value and appends it to a row
function createCellWithValue(value, row){
    "use strict";
      let newCell = document.createElement("td");
      let cellValue = document.createTextNode(value);
      newCell.appendChild(cellValue);
      row.appendChild(newCell);
  }
  
  //Creates a cell with a value, appends it to a row, then appends the row to the table body.
  function addCellToRowToTableBody(cellValue, newRow, tableBody){
      "use strict";
      createCellWithValue(cellValue, newRow);
      tableBody.appendChild(newRow);
  }
  
  //Creates a table to display the books searched (including the correct amount of columns based on the number of authors)
  let createTableBooks = function(maxAuthors, numberOfBooks, response){
      "use strict";
      let tableHead = document.getElementById("headingsRow");
      let newRow = document.createElement("tr");
      let headings = ["Book ID","Book Title", "ISBN", "Availability"];
      let bodyRows = document.getElementById("bodyRows");
      let objectKeys = ["id", "title", "isbn"];
      let availability = "";
  
      //Creates the correct number of headings based on the number of authors
      for (let i=0; i<maxAuthors; i++){
          headings.push("Author "+ (i+1));
      }
      for (let i=0; i<=maxAuthors+(objectKeys.length); i++){
          let heading = document.createElement("th");
          let textContent = document.createTextNode(headings[i]);
          heading.appendChild(textContent);
          newRow.appendChild(heading);
      }
      tableHead.appendChild(newRow);
      
  
      for (let i=0; i<numberOfBooks; i++){
          //Creates a row for each book
          let bookInfoRow = document.createElement("tr");
          bookInfoRow.id = "book " + i + " row";
          let bookInfo = response[i];
          //Creates the cells and values for ID, Title, and ISBN
          for (let j=0; j<objectKeys.length; j++){
              createCellWithValue(bookInfo[objectKeys[j]], bookInfoRow);
   
          }
          //Creates the cells and values for availability
       
          if (bookInfo.Loan === null){
              availability = "Available";
          }
          else{
              availability = "Unavailable";
          }
          createCellWithValue(availability, bookInfoRow);
         
  
          //Creates the cells and values for the author
          let authors = bookInfo.Authors;
          authors.forEach(author => {
              createCellWithValue(author.name, bookInfoRow);
              });
  
          bodyRows.appendChild(bookInfoRow);
      }
      //See function in allPages.js for further details
      addDataLabelAttributes(headings);
  };
  
  //-------------------------Search By Title -----------------------------------
  
  
  async function searchBookProcess() {
      "use strict";
      //Removes the table if one is already is displaying
      removeTable("headingsRow", "bodyRows");
      let bookName = document.getElementById("bookTitle").value;
      let url = root_url + search_by_book_name_url + bookName + allEntities;
      //Checks if there was an input value
      if(bookName!==""){
      let response = await getRequest(url);
  
      //Checks if there was a response with data. If there was no response data the system displays a messaage explaining the item searched could not be found.
      if(response.length!==0){
          let maxAuthors = 0;
              let numberOfBooks = response.length;
              for (let i=0; i<response.length; i++){
                  if (response[i].Authors.length>maxAuthors){
                      maxAuthors = response[i].Authors.length;
                  }
              }
              //Creates a table (more information above the function below)
              createTableBooks(maxAuthors, numberOfBooks, response);  
              }
          else{
              alert(notFound);
          }
          }
      else{
          alert(inputEmpty);
      }
  }
  
  document.getElementById("searchBookByTitle").addEventListener("click", searchBookProcess);
  
  
  
  
  
  //-------------------------Search By Author -----------------------------------
  
  
  async function searchBookProcessAuthor(){
      "use strict";
      removeTable("headingsRow", "bodyRows");
      let availability = "";
      let bookAuthor = document.getElementById("bookAuthor").value;
      //Checks if there is an input value
      if(bookAuthor!==""){
          let url = root_url + search_book_by_author_url + bookAuthor + allEntities;
          let response = await getRequest(url);
          let authorsWithNoBooks = 0;
      //Checks if the authors searched have any books in the system
          for(let i=0; i<response.length; i++){
              if(response[i].Books.length===0){
                  authorsWithNoBooks += 1;
              }
          }
          //If all the authors from the search have no books then a message displays explaining this.
          if(response.length!==0){
              if(authorsWithNoBooks<response.length){
              
              let headings = ["Author Searched","Book ID","Book Title", "ISBN", "Availability"];
              let bodyRows = document.getElementById("bodyRows");
              let numberOfAuthors = response.length;
  
          //Creates the headings and appends to the headings row.
          let headingsRow = document.createElement("tr");
          for(let i=0; i<headings.length; i++){
              let newHeading = document.createElement("th");
              let newHeadingTitle = document.createTextNode(headings[i]);
              newHeading.appendChild(newHeadingTitle);
              headingsRow.appendChild(newHeading);
          }
          let tableHead = document.getElementById("headingsRow");
          tableHead.appendChild(headingsRow);
  
          //Creates a row for each book related to a specific author.
          //Then creates cells with values of ID, Title, ISBN, and availability 
          for (let i=0; i<numberOfAuthors; i++){
              let numberOfBooks = response[i].Books.length;
              for (let j=0; j<numberOfBooks;j++){
                  let matchedAuthorName = response[i].name;
                  let newRow = document.createElement("tr");
                  addCellToRowToTableBody(matchedAuthorName, newRow, bodyRows);
                  let bookId = response[i].Books[j].id;
                  addCellToRowToTableBody(bookId, newRow, bodyRows);
                  let bookTitle = response[i].Books[j].title;
                  addCellToRowToTableBody(bookTitle, newRow, bodyRows);
                  let bookIsbn = response[i].Books[j].isbn;
                  addCellToRowToTableBody(bookIsbn, newRow, bodyRows);
                  if (response[i].Books[j].Loan === null){
                      availability = "Available";
                  }
                  else{
                      availability = "Unavailable";
                  }
                  let bookAvailability = availability;
                  //Adds an additional column with the availability
                  addCellToRowToTableBody(bookAvailability, newRow, bodyRows);
              }
          }
          addDataLabelAttributes(headings);
      }
      else{
          alert(authorHasNoBooks);
      }
  
      }
      else{
          alert(notFound);
      }
  }
      else{
          alert(inputEmpty);
      } 
  }
  
  document.getElementById("searchBookByAuthor").addEventListener("click",searchBookProcessAuthor);