let userId = getUserId();

function checkUserLogin(){
if(!userId){
    window.location.href = "/log-in.html";
}

}


window.onload = function() {
checkUserLogin();
};