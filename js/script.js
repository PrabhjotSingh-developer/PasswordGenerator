const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector(".data-length");
const passwordDisplay = document.querySelector("#passwordDisplay")
const copyBtn = document.querySelector(".copyBtn");
const copyMsg = document.querySelector("[data-copyMsg]")
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");


const generateBtn = document.querySelector(".generatePassword");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~@$*#'
let password = "";
let passwordLength = 10;
let checkCount = 0;
setIndicator("#ccc")
// set Password length
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength -min) * 100/(max-min)) + "% 100%";
}
handleSlider();

function setIndicator(color) {
    console.log("Hello ");
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px $(color)`;
    //shadow
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function generateRandomNumber() {
    return getRndInteger(0, 9)
}
function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97, 123));
}
function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65, 91));
}
function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked )
    {
        console.log("Yes true")
        hasUpper = true;
    }
    if (lowercaseCheck.checked)
    {

        hasLower = true;
    }
    if (numbersCheck.checked)
    {
            hasNum = true;
    }
    if (symbolsCheck.checked)
    {
          hasSym = true;
    }  

    if ((hasLower && hasUpper) && (hasNum || hasSym) && (passwordLength >= 8))
    {
        setIndicator("#0f0");
    }
     else if ((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6)
     {

         setIndicator("#ff0");
     }
    else
    {
        console.log("firstif true")

        setIndicator("#f00");
    }

}
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
        
    }
    catch (e) {
        copyMsg.innerText = "Failed"
    }
    copyMsg.classList.add("active")
    setTimeout(() => {

        copyMsg.classList.remove("active");
    }, 2000);
     
}
function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++;
    });
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}
function shufflePassword(arrayshuffle) {
    for (let i = arrayshuffle.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arrayshuffle[i];
        arrayshuffle[i] = arrayshuffle[j];
        arrayshuffle[j] = temp;

    }
    let str = "";
    arrayshuffle.forEach((pass) => (str += pass))
    return str;
}
allCheckBox.forEach((checkbox) => {
    
      checkbox.addEventListener('change', handleCheckBoxChange)
})
inputSlider.addEventListener('input', (e) => {

    passwordLength = e.target.value;
    handleSlider();
})
copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) {
        copyContent();
    }
})
generateBtn.addEventListener('click', () => {
    //  if no checkbox is selected 
    if (checkCount <= 0)
        return;
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
    // let start the journey to find new password
    password = "";
    let funcArr = [];
    if (uppercaseCheck.checked)
        funcArr.push(generateUpperCase);
    if (lowercaseCheck.checked)
        funcArr.push(generateLowerCase);
    if (numbersCheck.checked)
        funcArr.push(generateRandomNumber);
    if (symbolsCheck.checked)
        funcArr.push(generateSymbol);


    //Compulsory addition
    for (let i = 0; i < funcArr.length; i++)
        password += funcArr[i]();

    // remaining addition
    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randIndex = getRndInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }
    //  shuffle the Password
    password = shufflePassword(Array.from(password));
    //Show in UI
    passwordDisplay.value = password;
    //Calculate Strength
    calcStrength();
})

