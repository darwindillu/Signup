const form= document.getElementById('form');
const username= document.getElementById('username');
const email=document.getElementById('email');
const password=document.getElementById('password');

form.addEventListener('submit',e =>{
    e.preventDefault();
    validateInputs();
});

const setError= (element,message)=>{
    const inputControl=element.parentElement;
    const errorDisplay=inputControl.querySelector('.error');

    errorDisplay.innerText=message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess= element=>{
    const inputControl=element.parentElement;
    const errorDisplay=inputControl.querySelector('.error');

    errorDisplay.innerText='';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const isValidEmail=email=>{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs=()=>{
    const usernameValue=username.value.trim();
    const emailValue=email.value.trim();
    const passwordValue=password.value.trim();
    let flag = false;

    if(usernameValue===''){
        setError(username,'username is required')
        flag = false;
    }else{
        setSuccess(username);
        flag = true;
    }

    if(emailValue===''){
        setError(email,'email is required')
        flag = false;
    }else if(!isValidEmail(emailValue)){
        setError(email,'enter valid email')
        flag = false;
    }
    else{setSuccess(email);
        flag = true;
    }
    
    if(passwordValue===''){
        setError(password,'cannot be empty')
        flag = false;
    }else if(passwordValue.length<4){
        setError(password,'must contain at least 4 character')
        flag = false;
    }else{
        setSuccess(password);
        flag = true;
    }

    if (flag) {
        form.submit();
    }
}