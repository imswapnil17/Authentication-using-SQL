const username_login = document.getElementById("username")
const form = document.querySelector("form")
var jsonUser = []
form.addEventListener("submit",e=>{
    localStorage.setItem("u",username.value.toLowerCase())
    var username1 = localStorage.getItem("u")
    console.log(username1)
    if(username1.length!=0||username1!=undefined){
        document.cookie=`username=${localStorage.getItem("u")}`
    }
})
if(document.cookie.length==0 || document.cookie.length==undefined){
    
}
else{
  window.location.href = "/Dashboard"
}
