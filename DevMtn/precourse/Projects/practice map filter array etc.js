var jobs = [{receptionist: "James"}, 
{programmer: "Steve"},
{designer: "Alicia"}];

var solution = jobs.filter(item => item.programmer);
solution;

const words = ["spray", "limit", "elite", "exuberant", "destruction", "present", "happy"];

let longWords = words.filter(word => word.length > 6);
longWords;


var numbers = [2,3,4,5,6,7,8,9,10];

var evens = numbers.filter(num => num%2===0);
evens



var ages2016 = [53, 50, 29, 22, 16];

var ages2017 = ages2016.map(function(element){
    return element+1;
})
console.log(ages2016)

var myName = [{first:"Cody",last:"Mayo"}]

function makeName(firstName, lastName){
  return firstName + " " + lastName;
}

var firstLast =  myName.map(name => {
    return makeName(name.first,name.last)
})

firstLast


