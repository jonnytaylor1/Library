 //-------------------------Adding Loans -----------------------------------


 async function newLoanProcess(){
    "use strict";
      //Takes bookID, userID and due Date
      let bookId = document.getElementsByClassName("bookId")[0].value;
      let userId = document.getElementById("userId").value;
      let dueDate = document.getElementById("dueDate").value;
      //Checks that all input fields are filled
      if(bookId!=="" && userId!=="" && dueDate!==""){
        //Checks if the user exists
        let url1 = root_url + users_url + userId;
        await getRequest(url1);


          
      let url2 = root_url + book_url + bookId + allEntitiesQuestionMark;
      //Request made to check if the book is currently on loan
      let response = await getRequest(url2);
  
      //Creates a new loan using the userID and bookID but only if the book is not currently on loan
      let url3 = root_url + users_url + userId + slash_loans_url + bookId;
      let params = {
          dueDate: dueDate
      };
      if (response.Loan == null){
          await postRequest(params, url3);
          alert(loanAdded);
      }
      //If the book is on loan a message appears showing when the book is on loan until
      //a specific date
      else {
          let date = new Date(response.Loan.dueDate);
          let stringDate = date.toDateString();
          alertMessage("onLoan",stringDate);
      }
      }
      else{
          alert(inputsEmpty);
      }
  }
  
  //When the loan button is clicked the process above is run (which adds a new loan to the system)
  document.getElementById("loanBook").addEventListener("click", newLoanProcess);
  


  //When the due date input field is clicked the date format appears and has a max 
  //value of "9999-12-31". This prevents the year being more than 4 digits long.

  document.getElementById("dueDate").addEventListener("focus", function() {
    "use strict";
        this.type = "date";
        this.setAttribute("max", "9999-12-31");
  });

  document.getElementById("dueDate").addEventListener("blur", function() {
        "use strict";
      this.type = "text";
      this.removeAttribute("max");
  });