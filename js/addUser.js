//-------------------------Adding Users -----------------------------------

async function addNewUser(){
    "use strict";
  let url = root_url + users_url;
  let paramsKey = ["name", "email", "password", "memberType"];
  let inputIds = ["name", "email", "password", "memberType"];
  let params = await paramsGenerator(paramsKey, inputIds);
  let values = Object.values(params);
  //Checks to make sure all inputs are filled
  if (values.includes("")){
      alert("All fields must be entered before the user can be added");
  }
  else{
      //Posts everything except the barcode
      let response = await postRequest(params, url);
      //The barcode is generated (which is the new user ID + 10000000000)
      let params2 = {
          barcode: (10000000000 + response.id)
      }; 
      let url2 = root_url + users_url + response.id;
      //A patch request is made to add the new barcode to the user
      let response2 = await patchRequest(url2, params2);
      //Message: User has been added, and also the barcode information
      alertMessage("userAdded",response2.barcode);
  }
}

//Process above is initiated by a user clicking the add user button
document.getElementById("addUserBtn").addEventListener("click", addNewUser);




