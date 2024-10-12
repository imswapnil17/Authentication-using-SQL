window.setTimeout(function() {
    document.querySelector('.sidebar_container').style.visibility = 'visible';
}, 1100);
function getCookieUser(){
    user = document.cookie.replace("username=","")
    return user
}
if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
  }
user = document.getElementById("title")

user.textContent +=", "+getCookieUser()
sidebar_back = document.querySelector(".backBtn")
switch_button = document.querySelector(".show")
switch_button1 = document.querySelector(".no")
sidebar = document.querySelector(".sidebar_container")


 sidebar_back.addEventListener("click",async (e)=>{
    sidebar.classList.toggle("openDrawer")
    switch_button.classList.toggle("hide")
    switch_button1.classList.toggle("no")
   
    
})
function delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
function logout(){
    delete_cookie("username")
    localStorage.clear();
    window.location.href ="/login"
}