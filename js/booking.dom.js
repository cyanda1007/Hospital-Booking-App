// DOM element(s) references
const departmentElem = document.getElementById("departments"); 
const dateElem = document.querySelector("#appointmentDate");
const nextBtnElem = document.querySelector(".nextBtn");
const nameSurnameElem = document.querySelector("#nameSurname");
const genderElem = document.getElementById("gender");
const ageElem = document.querySelector("#age");
const contactNumberElem = document.querySelector("#contactNumber");
const emailAddressElem = document.querySelector("#email");
let idNumberElem = document.querySelector("#idNumber");
const backBtnElem = document.querySelector(".backBtn");
const bookNowBtnElem = document.querySelector(".bookNowBtn");
const landingInfoElem = document.getElementsByClassName("landingInfo");
const personalInfoElem = document.getElementsByClassName("personalInfo");
const successInfoElem = document.getElementsByClassName("successInfo");
const errorMessage= document.querySelector(".errorMessage");



// Add event listeners to buttons
nextBtnElem.addEventListener('click',nextBtn_onClick);
backBtnElem.addEventListener('click',backBtn_onClick);
bookNowBtnElem.addEventListener('click',bookNowBtn_onClick);

// Keyup event for the ID Number field
idNumberElem.addEventListener("keyup",idNumber_keyUp)

// Instantiate the factory function
const bookingApp = Booking();

// DOM events
function idNumber_keyUp() {
	
    if(idNumberElem.value.length === 13){
    	
        var event = new Event("change");
        var result = getAgeAndGender(idNumberElem.value);
        
        ageElem.value = result.age;
        
        genderElem.selectedIndex = result.gender;
        genderElem.dispatchEvent(event);
    }
}

function getAgeAndGender(idNumber) {
	
    var birthdate = idNumber.substr(0, 6);
  
    // Extract gender and citizenship information from ID number
    var genderCode = idNumber.substr(6, 4);
    
    // Extract birth year, month, and day from birthdate
    var year = birthdate.substr(0, 2);
    var month = parseInt(birthdate.substr(2, 2), 10);
    var day = parseInt(birthdate.substr(4, 2), 10);
  
    // Calculate current year, month, and day
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear()% 100; // Get the last two digits of the current year
    var currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1
    var currentDay = currentDate.getDate();
  
    //build full birth year
    if(year >= currentYear){
        year = "19"+year;
    }
    else{
        year = "20"+year;
    }
    
    //get full currentYear for age calculation
    currentYear = currentDate.getFullYear();
    
    // Calculate age
    var age = currentYear - parseInt(year,10);
  
    // Adjust age based on current month and day
    if (currentMonth < month || (currentMonth === month && currentDay < day)) {
        age--;
    }
  
    // Determine gender based on the gender code
    var gender = genderCode >= 5000 ? 1 : 2;
    return { age: age, gender: gender };
}

function nextBtn_onClick() {
	
	var departmentSelected = departmentElem.options[departmentElem.selectedIndex].value;
	
	//check if all input fields were correctly filled in
	if(dateElem.value !=="" &&  dateElem.value!==null && (departmentSelected =="endocrine" || departmentSelected=="mva" || departmentSelected=="neurology")){
		
		
    // Hide first section
    landingInfoElem[0].style.visibility = 'hidden';
    landingInfoElem[0].style.display = 'none';
    
    // Show second section
    personalInfoElem[0].style.visibility = 'visible';
    personalInfoElem[0].style.display = 'flex';
    
    // Hide third section
    successInfoElem[0].style.visibility = 'hidden';
    successInfoElem[0].style.display = 'none';
    
  }
  
  else{
  //input fields were not filled correctly 
  //show error message 
errorMessage.style.visibility="visible";
errorMessage.style.display="block";
errorMessage.innerHTML="Please complete  all fields";

//clear any existing timeout methods 
clearTimeout();
//create new timeout method for the error message
setTimeout(function(){
errorMessage.style.visibility="hidden";
errorMessage.style.display="none";

},4000);
}



}

function backBtn_onClick() {
    // Show first section
    landingInfoElem[0].style.visibility = 'visible';
    landingInfoElem[0].style.display = 'flex';
    
    // Hide second section
    personalInfoElem[0].style.visibility = 'hidden';
    personalInfoElem[0].style.display = 'none';
    
    // Hide third section
    successInfoElem[0].style.visibility = 'hidden';
    successInfoElem[0].style.display = 'none';
}

function bookNowBtn_onClick() {
	
	   // get selected department
    var departmentSelected = departmentElem.options[departmentElem.selectedIndex].value;

    // get selected gender
    var genderSelected = genderElem.options[genderElem.selectedIndex].value;
    
    //create instance of getAgeAndGender function 
    
    let getInfo= getAgeAndGender(idNumberElem.value);

	    //retrieve  information  from user
	    var name= nameSurnameElem.value;
    var patientID= idNumberElem.value;
    var email = emailAddressElem.value;
    var age=getInfo.age;
    var gender= getInfo.gender;
    
    //set appropriate gender based on selection 
    if(gender===1){
    gender="male"
      }

   else if(gender===2){
    gender="female";
    }

  else{

   gender="other";}
    var contact= contactNumberElem.value;
    
    //Retrieve information  from input fields
    bookingApp.setPatientInfo(patientID,name,age,gender, email,contact);  
    
        // check if there are any errors
	if(bookingApp.getErrorMessage()=="success"){
	
    // Hide first section
    landingInfoElem[0].style.visibility = 'hidden';
    landingInfoElem[0].style.display = 'none';

    // Hide second section
    personalInfoElem[0].style.visibility = 'hidden';
    personalInfoElem[0].style.display = 'none';

    // Show third section
    successInfoElem[0].style.visibility = 'visible';
    successInfoElem[0].style.display = 'flex';
     
//set email subject and message
    var subject="CONFIRMATION OF BOOKING";
    var message="Your booking for the " + departmentSelected + " department at "+dateElem.value+" has been confirmed. Click the link below to find your unique  QR code to scan at the hospital." + "\n \nhttps://kaydrew.github.io/Hospital-Booking-App/qrcode.html";

//set parameter for the email function 
            var params={
            name: name,
            from_name: "Baragwanath Hospital Management",
            email: email,
            subject:subject,
            message: message
        }

//email site credentials 
        const serviceID="service_jjy4npj";
        const templateID="template_nm641b6";

//send an email
        emailjs.send(serviceID,templateID,params).
        then(
            res=>{
            name.value="";
            email.value="";
            message.value="";
            console.log(res);

            alert("email sent successfully!");

            return "sent successfully";
            }

        ).catch((err)=> console.log(err));
            
}   
    else{
    	
    //there was an error. do not show next section
errorMessage.style.visibility="visible";
    landingInfoElem[0].style.visibility = 'hidden';
    landingInfoElem[0].style.display = 'none';

    // Hide second section
    personalInfoElem[0].style.visibility = 'visible';
    personalInfoElem[0].style.display = 'flex';
    
    //display error messages
    errorMessage.innerHTML=bookingApp.getErrorMessage();
    
    
    //clear any existing timeout methods 
clearTimeout();
//create new timeout method for the error message
    setTimeout(function(){
errorMessage.style.visibility="hidden";

},4000);

}
}
