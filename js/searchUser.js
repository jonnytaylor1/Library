//-------------------------Searching Users and Saving Users -----------------------------------


//Creates a table that has prepopulated input fields as the data cells and includes save and delete buttons
//ParentsHeadingsElementId is the ID of the parent element of the th values which will normally be table - thead - tr
//tableHeadings is an array of the table headings
//parentBodyElementId is the ID of the parent element of the tr values of the table body which will normally be the ID of table - tbody
//cellValuesObject is the array of objects that contain the information you want to be in the table body cells
//For example [{userID: 1, barcode: 123456}, {userID:2, barcode:654321}] it must be written in this format
function createTableOfInputs(parentHeadingsElementId, tableHeadings, parentBodyElementId, cellValuesObject){
    "use strict";
      let tableHead = document.getElementById(parentHeadingsElementId);
      let headingsRow = document.createElement("tr");
      for (let i=0; i<tableHeadings.length; i++){
          let newCell = document.createElement("th");
          let cellValue = document.createTextNode(tableHeadings[i]);
          newCell.appendChild(cellValue);
          headingsRow.appendChild(newCell);
      }
      tableHead.appendChild(headingsRow);
  
      let bodyRows = document.getElementById(parentBodyElementId);
  
      cellValuesObject.forEach(element => {
          //For each object in the array a row is created
          let newRow = document.createElement("tr");
          Object.values(element).forEach(value=>{
              //For each value in the object an input is created and placed inside a cell
              let newCell = document.createElement("td");
              let newInput = document.createElement("input");
              newInput.value = value;
              newCell.appendChild(newInput);
              newRow.appendChild(newCell);
           });
   
           //For each object a set of buttons are created (save and delete) and added to the row
           let btnTitles =["Save", "Remove"];
           let btnClasses = ["saveBtn", "deleteBtn"];
           for (let i=0; i<btnTitles.length; i++){
              let newCell = document.createElement("td");
              let btn = document.createElement("button");
              btn.innerHTML = btnTitles[i];
              btn.className = btnClasses[i];
              newCell.appendChild(btn);
              newRow.appendChild(newCell);
           }
           bodyRows.appendChild(newRow);
      });
  }
  
  
  //-------------------------Searching Users By Name or Barcode -----------------------------------
  
  
  //Searches user by either name or barcode depending on the arguments passed into the function
  async function searchUserByNameOrBarcode(inputId, middleSectionUrl) {
      "use strict";
      removeTable("headingsRow","bodyRows");
      //Blank headings are for the save and delete columns of the table
      let tableHeadingsArray = ["User ID", "Name", "Barcode", "Member Type", "Email", "", ""];
      let inputValue = document.getElementById(inputId).value; 
      let userInfoObjects = [];
      //Checks if there is an input value (either user name or barcode)
      if(inputValue){
          let url = root_url + middleSectionUrl + inputValue;
          //Gets the user using the input of users name or barcode
          let response = await getRequest(url);
          //Checks if the user searched is in the system
          if (response.length !==0){
          //If it is then an object is generated to input into the createTableOfInputs function
          for (let i=0; i<response.length;i++){
              userInfoObjects.push({
                  id: response[i].id, 
                  name: response[i].name, 
                  barcode: response[i].barcode,
                  memberType: response[i].memberType,
                  email: response[i].email
              });
          }
          
          //Table of inputs is generated
          createTableOfInputs("headingsRow", tableHeadingsArray, "bodyRows", userInfoObjects);
          let bodyRows = document.getElementById("bodyRows");
          if (bodyRows.hasChildNodes()) {
              let children = bodyRows.childNodes;
              //changes the first and third column cells in the table to readonly and grey background
              for (let i = 0; i < children.length; i++) {
                let firstColumnCells = children[i].children[0].children[0];
                firstColumnCells.readOnly = true;
                firstColumnCells.style.backgroundColor = "lightgrey";
                let thirdColumnCells = children[i].children[2].children[0];
                thirdColumnCells.readOnly = true;
                thirdColumnCells.style.backgroundColor = "lightgrey";
              }
            }
      }
      else{
          alert(userNotFound);
      }
          }
          
      else{
          alert(inputEmpty);
      }
      //Adds data label attributes to each of the cells which is needed to make the table responsive with CSS.
      addDataLabelAttributes(tableHeadingsArray);
    }
  
    //Search user by name
    document.getElementById("searchUserByNameBtn").addEventListener("click", function(){
        "use strict";
      searchUserByNameOrBarcode('userNameSearch', search_user_by_name_url);
    });
  
    //Search user by barcode
    document.getElementById("searchUserByBarcodeBtn").addEventListener("click", function(){
       "use strict";
      searchUserByNameOrBarcode('userBarcodeSearch', search_user_by_barcode_url);});
  
  
  
  //-------------------------Saving users details -----------------------------------
  
  
  $(document).on('click','.saveBtn',function() {
           "use strict";
      let row = $(this).closest("tr");    // Finds the row of the save button
      let columnTitles = ['id', 'name', 'barcode', 'memberType', 'email'];
      let params = {};
      for (let i=0; i<columnTitles.length; i++){
          //Finds the input values of the save button row and creates a key:value pair using the columnTitles array
          params[columnTitles[i]] = row.find("input").eq(i).val(); 
      }
      let userId = params.id;
      let url = root_url + users_url + userId;
      //Put request is made with the params generated above
      putRequest(url, params);
      alert(detailsUpdated);
      //The user may want to continue modifying other users in the table so this gives them the option to do so
      let confirmation2 = confirm(continueModifyingTableConfirmation);
          if (confirmation2===false){
              removeTable("headingsRow","bodyRows");
          }
  
  });
  
  
  
  