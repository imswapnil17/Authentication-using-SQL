// Checks if uesrname already exist in the database (on sign-up only)
username.addEventListener("input",e=>{
    for(let index=0;index<jsonStr.length;index++){
        const existing_username=jsonStr[index]["username"];
        if(username.value.toLowerCase()==existing_username){
            e.preventDefault();
            avail_nonavail.innerHTML = "Not Available &#10006;";
            avail_nonavail.style.color="red";
            break
        }
        else if(username.value.toLowerCase()!=existing_username){
            avail_nonavail.innerHTML = "Available &#10003;";
            avail_nonavail.style.color="#15FF00"}
        }
    }
);
form.addEventListener("submit",e=>{
    for(let index=0;index<jsonStr.length;index++){
        const existing_username=jsonStr[index]["username"];
        if(username.value.toLowerCase()==existing_username){
            e.preventDefault();
            avail_nonavail.innerHTML = "Not Available &#10006;";
            avail_nonavail.style.color="red";
            break
        }
        else if(username.value!=existing_username){
            avail_nonavail.innerHTML = "Available &#10003;";
            avail_nonavail.style.color="#15FF00"
        }
        
        }
    }
);;