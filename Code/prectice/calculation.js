var a;
var b;

function add() {
  a = parseInt(document.getElementById("num1").value);
  b = parseInt(document.getElementById("num2").value);
  document.getElementById("result").innerHTML = "Sum: " + (a + b);
}
function sub() {
  a = parseInt(document.getElementById("num1").value);
  b = parseInt(document.getElementById("num2").value);
  document.getElementById("result").innerHTML = "Sub: " + (a - b);
}
function mul() {
  a = parseInt(document.getElementById("num1").value);
  b = parseInt(document.getElementById("num2").value);
  document.getElementById("result").innerHTML = "Mul: " + (a * b);
}
function div() {
  a = parseInt(document.getElementById("num1").value);
  b = parseInt(document.getElementById("num2").value);
  document.getElementById("result").innerHTML = "Div: " + (a / b);
}

function myfuntion()
{
  const str = "HelloWorld!";

  if(true)
  {
    const str = "2";
    console.log(str);
  }
  console.log(str);

  let str2;
  console.log(str2);
}