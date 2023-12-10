//Get reference to the output elements
const patientNames = document.querySelector('#name-surname-output');
const patientGender = document.querySelector('#gender-output');
const patientAge = document.querySelector('#age-output');
const patientContact = document.querySelector('#contact-output'); 
const patientEmail = document.querySelector('#email-output');
const patientID = document.querySelector('#id-number-output');
const acceptBtn = document.querySelector('#accept-patient');

//Get reference to the patient details division
const personalDetails = document.querySelector('#patient-details');

//QR scanner

function onScanSuccess(decodedText) {
    //populate the patient details division with the values contained in 'decodedText' 
    var decodedObject = JSON.parse(decodedText);
    patientNames.innerHTML = decodedObject.patientName;
    patientGender.innerHTML = decodedObject.patientGender;
    patientAge.innerHTML = decodedObject.patientAge;
    patientContact.innerHTML = decodedObject.patientContact;
    patientEmail.innerHTML = decodedObject.patientEmail;
    patientID.innerHTML = decodedObject.id;
    html5QrcodeScanner.clear();
    personalDetails.style.visibility = 'visible';
}
var html5QrcodeScanner = new Html5QrcodeScanner(
	"qr-reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess);

acceptBtn.addEventListener('click', function(){
   alert('The patient has been accepted successfully!');
   personalDetails.style.visibility = 'hidden'; 
   location.reload();
});