const clicked = document.getElementsByClassName("nav-mob");

function check(){
    for (let i = 0; i < clicked.length; i++) {
        clicked[i].addEventListener("click",function (event){
            document.getElementById("checkbox-burger").checked = false;
            
        });
    }
}
check();
