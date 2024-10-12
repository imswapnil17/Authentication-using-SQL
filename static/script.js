const submitBtn = document.getElementById("submit")
const form = document.getElementById('form')
const inputs = document.querySelectorAll("input")
const password = document.getElementById("password")
const avail_nonavail = document.getElementById("user_inv")
let regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;


inputs.forEach(input=>{
    input.addEventListener("input",function(){
        if(input.value.length >0){
            input.classList.remove("invalid")
        }
        else if(input.value.length ==0){
            input.classList.add("invalid")
        }

    })
})

const username = document.getElementById("username")
function isUserNameValid(username) {
    /* 
      Usernames can only have: 
      - Lowercase Letters (a-z) 
      - Numbers (0-9)
      - Dots (.)
      - Underscores (_)
    */
    const res = /^[a-z0-9_\.]+$/.exec(username);
    const valid = !!res;
    return valid;
}


username.addEventListener("focus",e=>{
    avail_nonavail.style.display = "block"
    
})
username.addEventListener("blur",e=>{
    avail_nonavail.style.display = "none"
    
})
if (window.history.replaceState) {

    window.history.replaceState(null, null, window.location.href);
    
}


submitBtn.addEventListener("click",e=>{
    if(!regex.test(password.value)){
        password.classList.add("invalid")
        e.preventDefault()
        
        password_invalid.textContent = "\n Make a stronger Password"
    }

    else if(password.value.length<8){
        password_invalid.textContent ="Password is too short"
    }
    else if(password.value.length>12){
        password_invalid.textContent ="Password is too long"
    }
    else if(regex.test(password.value)){
        password.classList.remove("invalid")
    }
    else if(password.value.length ==0){
        password_invalid.textContent = "Invalid!! Empty password."
    }
    else{
        password_invalid.textContent = "Please fill other details."
    }
    
})
function delete_cookiee(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
function logoutt(){
    delete_cookiee("username")
    localStorage.clear();
}
var jsonStr=[]
window.onload = function(){
    logoutt()
    var get =fetch("/updataD")
    get.then((data)=>{
        return data.json()
    }).then(json_data=>{
        json_data.forEach(dat=>{
            jsonStr.push(dat)

        })
    })
    .catch(error=>console.log(error))
    // console.log(jsonStr)
    
   
}
const password_invalid = document.getElementById("pass_inv")


form.addEventListener("submit",(e)=>{
    fetch('/updataD', {method: 'POST'});
    if(!regex.test(password.value)){
        password.classList.add("invalid")
        e.preventDefault()
        if(password.value.length<8){
            password_invalid.textContent ="Password is too short"
        }
        password_invalid.textContent = "\n Make a stronger Password"
    }
    inputs.forEach(element=>{
        if(element.value.length ==0){
            e.preventDefault()
            
            element.classList.add("invalid")
        }
        else if(element.value.length >0){
            element.classList.remove("invalid")

        }
       
    })
    localStorage.setItem("u",username.value.toLowerCase())
    var username1 = localStorage.getItem("u")
    if(username1.length!=0||username1!=undefined){
        document.cookie=`username=${localStorage.getItem("u")}`
        fetch('/database', {method: 'POST'});
    }


})

    
const pass_container = document.getElementById("pass_container")
password.addEventListener("focus",e=>{
    pass_container.style.display="block";
    
})
password.addEventListener("blur",e=>{
    pass_container.style.display="none";
})


