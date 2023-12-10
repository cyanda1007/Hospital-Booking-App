
// store the patient info into localStorage 
let uniqueID=localStorage.getItem("patientIfo");


//declare a function class called Booking
function Booking(){
	
	//store patient info
    var patientInfo = [];
    var patientId=[];
  
//test the name input field
let regexName= /^([a-zA-Z ]{7,})$/;

//initialise error message
    var errorMessage="success";    
   
   // retrieve patient information 
    function setPatientInfo(patientID, name, age,gender, email, contact){
    
// check if parameters are not empty  or null	
    if(patientID && name && age && gender && email && contact){
    	
    //check if name parameter  passes the regex test
    if(regexName.test(name)){
    
    //check if ID number is the correct length  
   if(patientID.length==13){
    	
    //check if ID number is the correct lengt
    if(contact.length===10){
    	
    //check if ID number is the correct lengt
    if(email.length>12){
    
    errorMessage ="success";

//check if  the patientInfo array is empty
        if(patientInfo.length === 0){
        	
        //create new patient object 
            var patientFormat = {
                id: patientID,
                patientName: name,
                patientAge: age,
                patientGender: gender,
                patientEmail: email,
                patientContact: contact
               
            }

//add information  into the arrays
            patientInfo.push(patientFormat);
         patientId.push(patientID);
            localStorage.setItem("patientInfo",JSON.stringify(patientInfo));
                
            
        } else { 
        	
          //the array is NOT empty
            //loop through patient Id array   
            for(let i = 0; i < patientId.length; i++){
                if(patientId.includes(patientID) == false){
                	
                //create a new patient object 
                    var patientFormat = {
                        id: patientID,
                        patientName: name,
                        patientAge: age,
                        patientGender: gender,
                        patientEmail: email,
                        patientContact: contact
                    }
        // add information  into the arrays
                    patientInfo.push(patientFormat);
                    patientId.push(patientID);
                    
                    localStorage.setItem("patientInfo",JSON.stringify(patientInfo));
                    
          
                }
            }
        }

}

//update errorMessage  accordingly
else {errorMessage="Please enter valid email address";
}

   }     

else{
	//update errorMessage  accordingly
errorMessage="Please enter valid contact number";

}        
   }
else{
//update errorMessage  accordingly
errorMessage="enter valid ID or passport  number";

}
 
 }
 
 
 else {
//update errorMessage  accordingly
errorMessage="Please enter a valid name & surname";

}
       
}
//update errorMessage  accordingly
else{  errorMessage="Please complete  all fields";
}       
   console.log(errorMessage);	

}
    

        //getters
        
        //get patient information 
        function getPatientInfo(){
            return patientInfo;
        }

// get patient IDs
        function getPatientIDs(){
            return patientId;
        }
        
        //get errorMessage 
        function  getErrorMessage(){
         return errorMessage;
     }
        
  // return the closures      
    return{
     
        setPatientInfo,
        getPatientInfo,
        getPatientIDs,
        getErrorMessage         
    }

}