/* Steven Haenchen
   Due 3/30/2025
 
    In your js file, declare the following items to store data. After each declaration, add a console.log statement to review the data in the browser console.

    A variable to store your full name
    A variable to store your desired annual salary
    A variable to store your veteran status (hint: either you are a veteran or you are not a veteran)
    An array to store the names of three of your friends.
    An array to store the value of the desired annual salary for your three friends
    A literal object to store the first name, last name, and desired annual salary of yet another friend
 */

    alert("Open the console log to see output from this assignment");
    var fullname = "Steve Haenchen";
    console.log(fullname);
    console.log("Full Name: " + fullname);
    
    var salary = 123456.78;
    console.log(salary);
    console.log("Salary: " + salary);
    
    var vet = true;
    console.log(vet);
    console.log("Vet status: " + vet);
    
    var names = ["Larry","Moe","Curly"];
    console.log(names);
    console.log("Additional Names: " + names);
    
    var salaries = [5, 7.5, 0.25];
    console.log(salaries);
    console.log("Additional Salaries: " + salaries);
    
    var person = {
      first: "Lilly",
      last: "Haenchen",
      salary: 50000
    }
    console.log(person);
    
    document.getElementById('myString').innerHTML = fullname;
    
    document.getElementById('myNumber').innerHTML = salary;
    
    document.getElementById('myBoolean').innerHTML = vet;
    
    document.getElementById('myStringArray').innerHTML = names;
    
    document.getElementById('myNumberArray').innerHTML = salaries;
    
    document.getElementById('myObject').innerHTML = person.first + ' ' + person.last + "<br>" + person.salary;
    
     
    
     
    