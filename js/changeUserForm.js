//-------------------------Switching between form displayed-----------------------------------


//Changes one element to be displayed while simultaneously
//hiding the other.

function changeForm(classToBeViewed, classToBeHidden){
    "use strict";
          $(classToBeViewed).addClass("displayGrid");
          $(classToBeViewed).removeClass("displayNone");
          $(classToBeHidden).addClass("displayNone");
      }
  
  let displayAddUserForm = "#displayAddBtn";
  let displayModifyUserForm = "#displaySearchBtn";
  
  //Changes one button to white with purple text, and the other
  //to purple with white text.
  function changeButtonColor(changeWhite, changePurple){
    "use strict";
      $(changeWhite).addClass("unselectedFormBtn");
      $(changePurple).addClass("selectedFormBtn");
      $(changeWhite).removeClass("selectedFormBtn");
      $(changePurple).removeClass("unselectedFormBtn");
  }
  
  
  //When the displaySearchBtn button is clicked it will display the
  //search user/book/loan forms.
  document.getElementById("displaySearchBtn").addEventListener('click', function(){
    "use strict";
      changeForm(".displayTwo", ".displayOne");
      changeButtonColor(displayAddUserForm, displayModifyUserForm);
  });
  
  //When the displayAddBtn button is clicked it will display the
  //add user/books/loans forms.
  document.getElementById("displayAddBtn").addEventListener("click", function(){
    "use strict";
      changeForm(".displayOne", ".displayTwo");
      changeButtonColor(displayModifyUserForm, displayAddUserForm);
      removeTable("headingsRow", "bodyRows");
  });
  
  
  