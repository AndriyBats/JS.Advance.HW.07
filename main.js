regExpFirstName = /^[a-zA-z]{2,20}$/;
regExpLastName = /^[a-zA-z]{2,20}$/;
regExpEmailAddress = /^[\w-]*@[\w-]*\.[\w-]*$/;
regExpPassword = /^\w{8,15}$/;

let getSel = function(selector){
    return document.querySelector(selector);
};

let f1 = document.forms.f1;
let f2 = document.forms.f2;
let f3 = document.forms.f3;

function validateForm(selector1, selector2, selector3){
    getSel(selector1).classList.remove('red-frame');
    getSel(selector1).classList.add('green-frame');
    getSel(selector2).style.display = 'none';
    getSel(selector3).style.display = 'block';
}
function invalideForm(selector1, selector2, selector3){
    getSel(selector1).classList.remove('green-frame');
    getSel(selector1).classList.add('red-frame');
    getSel(selector2).style.display = 'none';
    getSel(selector3).style.display = 'block';
}
function displayNoneBlock(selector1, selector2){
    getSel(selector1).style.display = 'none';
    getSel(selector2).style.display = 'block';
}
class SignUp{
    constructor(name, surname, email, password){
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
    };
}
const SIGN_UP_ARR = [];

f1.buttonSignUp.addEventListener('click', function(){
    if(regExpFirstName.test(f1.firstName.value) == true ){
        validateForm('.first-name', '.image-delete-1', '.image-checkmark-1');
    }else{
        invalideForm('.first-name', '.image-checkmark-1', '.image-delete-1');
    }

    if(regExpLastName.test(f1.lastName.value) == true ){
        validateForm('.last-name', '.image-delete-2', '.image-checkmark-2');
    }else{
        invalideForm('.last-name', '.image-checkmark-2', '.image-delete-2');
    }

    if(regExpEmailAddress.test(f1.emailAddress.value) == true ){
        validateForm('.email-address', '.image-delete-3', '.image-checkmark-3');
    }else{
        invalideForm('.email-address','.image-checkmark-3', '.image-delete-3');
    }

    if(regExpPassword.test(f1.password.value) == true ){
        validateForm('.password', '.image-delete-4', '.image-checkmark-4');
    }else{
        invalideForm('.password', '.image-checkmark-4', '.image-delete-4');
    }
    
    if(regExpFirstName.test(f1.firstName.value) == true && regExpLastName.test(f1.lastName.value) == true && regExpEmailAddress.test(f1.emailAddress.value) == true && regExpPassword.test(f1.password.value) == true ){
        if(!localStorage.getItem(f1.emailAddress.value)){
            getSel('.sign-up-message').style.display = 'none';
            let myName = f1.firstName.value;
            let mySurname = f1.lastName.value;
            let myEmail = f1.emailAddress.value;
            let myPassword = f1.password.value;
            let mySignUp = new SignUp(myName, mySurname, myEmail, myPassword);
            SIGN_UP_ARR.push(mySignUp);
            f1.reset();   
            for(i=0; i<f1.children.length; i++){
                f1.children[i].classList.remove('green-frame')
            }
            getSel('.image-checkmark-1').style.display = 'none';
            getSel('.image-checkmark-2').style.display = 'none';
            getSel('.image-checkmark-3').style.display = 'none';
            getSel('.image-checkmark-4').style.display = 'none';
            localStorage.setItem(myEmail, JSON.stringify(mySignUp));
        }else{
            getSel('.sign-up-message').style.display = 'block';
            invalideForm('.email-address','.image-checkmark-3', '.image-delete-3');
        }
    }
})

f2.buttonSignIn.addEventListener('click', function(){
    if(localStorage.length == 0){
        getSel('.sign-in-message1').style.display = 'block';
    }else if(localStorage.getItem(f2.emailAddressSignIn.value)){
        let mySignIn = JSON.parse(localStorage.getItem(f2.emailAddressSignIn.value));
        if(mySignIn.password == f2.passwordSignIn.value){
            getSel('.sign-in-message1').style.display = 'none';
            getSel('.sign-in-message2').style.display = 'none';
            f3.reset();
            displayNoneBlock('.block-sign-in', '.block-profile');
            getSel('.name-and-surname').textContent = mySignIn.name +' '+ mySignIn.surname;
            getSel('.his-email').textContent = mySignIn.email;
        }else{
            getSel('.sign-in-message1').style.display = 'none';
            getSel('.sign-in-message2').style.display = 'block';
        }   
    }else{
        getSel('.sign-in-message1').style.display = 'none';
        getSel('.sign-in-message2').style.display = 'block';
    } 
})
f1.toSignIn.addEventListener('click', function(){
    displayNoneBlock('.block-sign-up', '.block-sign-in')
})

f2.toSignUp.addEventListener('click', function(){
    displayNoneBlock('.block-sign-in', '.block-sign-up');
})
f3.buttonSignOut.addEventListener('click', function(){
    displayNoneBlock('.block-profile', '.block-sign-in')
})