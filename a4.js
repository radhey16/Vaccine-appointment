function valid_postal_code() {
  var pc = document.getElementById("postal_code").value;
  postalCodeRegex = /^([A-Za-z][0-9][A-Za-z])\s?([0-9][A-Za-z][0-9])$/;
  if (!postalCodeRegex.test(pc)) {
    alert("enter valid postal code");
  }
}

function first_dose() {
  valid_postal_code();
  valid_date("date_of_birth"); 
  ageDifference("date_of_birth");
  var p_c = document.getElementById("postal_code").value;
  var d_b = document.getElementById("date_of_birth").value;
  var i_d = $("input[type='radio'][name='identity']:checked").val();
  var h_c_t = $("input[type='radio'][name='health_card_type']:checked").val();
  alert("Postal code: "+p_c+"\nDate of Birth: "+d_b+"\nDo you identify as First Nations, Inuit, or Métis? "
    +i_d+"\nHealth card type: "+h_c_t);
}
function second_dose() {
  valid_date("1st_dose_date");
  dateDifference("1st_dose_date");
  valid_postal_code();
  valid_date("date_of_birth"); 
  ageDifference("date_of_birth");
  var dose_t = $("input[type='radio'][name='dose_type']:checked").val();
  var dose_date = document.getElementById("1st_dose_date").value;
  var p_c = document.getElementById("postal_code").value;
  var d_b = document.getElementById("date_of_birth").value;
  var i_d = $("input[type='radio'][name='identity']:checked").val();
  var h_c_t = $("input[type='radio'][name='health_card_type']:checked").val();
  alert("First dose type: "+dose_t+"\nFist dose date: "+dose_date+"\nPostal code: "+p_c+"\nDate of Birth: "+d_b+"\nDo you identify as First Nations, Inuit, or Métis? "
    +i_d+"\nHealth card type: "+h_c_t);
}
function update() {
  var loc = $("input[type='radio'][name='location']:checked").val();
  var a_t = document.getElementById("dates").value;
  var update = document.getElementById("update").value;
  alert("Apppointment to update: "+update+"\nPreferred appointment time: "+a_t+"\nSelected location: "+loc);
  decide();
}
function decide() {
  var update = document.getElementById("update").value;
  if (update === "Second Dose") {
    location.replace("step1_second_dose.html"); 
  }
  else if (update === "First Dose") {
    location.replace("step1_first_dose.html");
  }
  else {
    location.replace("page1.html");
  }
}
function step2() {
  var h_c_n = document.getElementById("health_card_number").value;
  var c_9 = document.getElementById("code").value;
  var l_2 = document.getElementById("2-letter-code").value;
  var loc = $("input[type='radio'][name='location']:checked").val();
  var a_t = document.getElementById("dates").value;
  h_c_n_Regex = /^[0-9]{4}\-?[0-9]{3}\-?[0-9]{3}$/;
  character9_Regex = /^[A-Z0-9]{9}$/;
  letter2_Regex = /^([A-Z]{2})$/;
  if (!h_c_n_Regex.test(h_c_n)) {
    alert("Enter a valid health card number");
  }
  if (!character9_Regex.test(c_9)) {
    alert("Enter a valid 9-character code");
  }
  if (!letter2_Regex.test(l_2)) {
    alert("Enter a valid 2-letter version code");
  }
  alert("Health card number: "+h_c_n+"\n 9-character code: "+c_9+"\n2-letter version code: "
    +l_2+"\nPreferred appointment time: "+a_t+"\nSelected location: "+loc);
}
function ageDifference(id) {
  // For calculating age of the user.
  var db_1 = document.getElementById(id).value;
  var dob_1 = new Date(db_1);
  var month_diff = Date.now() - dob_1.getTime();
  var age_dt = new Date(month_diff); 
  var year_diff = age_dt.getUTCFullYear();
  var age_obtained = Math.abs(year_diff - 1970);
  if (age_obtained < 16) {
    alert("You must be above 16 years to book the appointment");
  }
}
function dateDifference(id) {
  var dose_date = document.getElementById(id).value;
  const date1 = new Date(dose_date);
  const date2 = new Date();
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  if (diffDays < 14) {
    alert("Second dose will be provided after 14 days from your first dose\nYou have "+Math.abs(14-diffDays)+" days remaining");
  }
}
function valid_date(id) {
  var db = document.getElementById(id).value;
  const d = new Date();
  dateRegex = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
  if (!dateRegex.test(db)) {
    alert("Enter the value in valid date format for "+id);
  }
  var leapyear = 0;
  var arr = db.split("/");
  var year = parseInt(arr[0]);
  var month = parseInt(arr[1]);
  var date = parseInt(arr[2]);
  if (year < 1900 || year > d.getFullYear) {
    alert("Enter valid year for "+id);
  }
  if (month > 12 || month < 1 ) {
    alert("Enter valid month for "+id);
  }
  if (date > 31 || date < 1 ) {
    alert("Enter valid date for "+id);
  }
  if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
    leapyear = 1;  
  }
  if (month == 2 && leapyear == 1 && date > 29){
    alert("Invalid date for "+id);
  }
  if (month == 2 && leapyear == 0 && date > 28){
    alert("Invalid date for "+id);
  }
  const arr_month = [4,6,9,11];
  if (arr_month.includes(month) && date > 30) {
    alert("Invalid date for "+id);
  }
}
function appointmentTimes(d){
  // var dates = document.getElementById(id).value; or push
  var appointmentsArray = [];
  var date = new Date(d);
  if (date.getDate() % 2 == 0) {
    appointmentsArray.push('10:00');
  }
  if (date.getDate() % 3 == 0) {
    appointmentsArray.push('11:20');
  }
  if (date.getDate() % 5 == 0) {
    appointmentsArray.push('14:10');
  }
  if (date.getDate() % 7 == 0) {
    appointmentsArray.push('15:40');
  }
  if (date.getDate() % 11 == 0) {
    appointmentsArray.push('17:30');
  }
  return appointmentsArray;
  
}
function appointments() {
  appointments = function(){}; // To make it only runs once
  var today = new Date();
  var temp = new Date();
  for (let i = 0; i < 10; i++) {
    temp.setDate(today.getDate() + i);
    var a = appointmentTimes(temp.toDateString()); // Array of available times
    for (let j = 0; j < a.length; j++) {
      var node = document.createElement("OPTION");
      var textnode = document.createTextNode(temp.toDateString() +" - "+ a[j]);
      node.setAttribute('id', 'times');
      node.appendChild(textnode);
      document.getElementById("dates").appendChild(node);
      document.getElementById("times").value = textnode;
    }
    
  } 
}
