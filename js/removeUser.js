//-------------------------Remove User -----------------------------------

//When a delete button in the table is clicked this function runs

$(document).on("click",".deleteBtn", function() {
    "use strict";
        let row = $(this).closest("tr");    // Finds the closest row above the delete button on the DOM
        let userId = row.find("input").eq(0).val(); //Finds the value of the first input (which is the user ID)
        let confirmation = confirm("Are you sure that you want to delete this user?");
        if(confirmation===true){
            removeUser(userId, row);
        }  
});

async function removeUser(userId, row){
  "use strict";
    let url2 = root_url + users_url + userId + slash_loans_url;
    //URL is for users loans
    let response = await getRequest(url2);
    //If the user has any loans the user won't be deleted until the loans have been returned
    if(response.length !==0){
        alert("User can't be deleted because they have outstanding books on loan");
    }
    else{
    //Deletes the user from the database
        let url = root_url + users_url + userId;
        deleteRequest(url);
        //Removes the users row from the table
        row.remove();
        let confirmation2 = confirm(continueModifyingTableConfirmation);
        if (confirmation2===false){
            removeTable("headingsRow","bodyRows");
        }
    }

}