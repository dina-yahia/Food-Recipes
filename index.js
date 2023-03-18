let rowData = document.getElementById("rowData");
let loading=document.getElementById("loading")
let searchContainer = document.getElementById("searchContainer");
let submitBtn;



var open=document.getElementById("open");

$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")
       
    })
    new WOW().init();
});
// loading



function openSideNav() {
    $("#sideBar").animate({
        left: 0
    }, 500)


    $("#open").removeClass("fa-align-justify");
    $("#open").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {
    let boxWidth = $(".navbar-nav").outerWidth()
    $("#sideBar").animate({
        left: -boxWidth
    }, 500)

    $("#open").addClass("fa-align-justify");
    $("#open").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}

closeSideNav()
$("#open").click(() => {
    if ($("#sideBar").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})






// let sideBarPosition=$(".sideBar-content").innerWidth();
// $("#sideBar").animate({left:-sideBarPosition},1000);

// $("#open").click(function(){
//     console.log($("#sideBar").css("left"));
//     let sideBarPosition=$(".sideBar-content").innerWidth();
   
// if($("#sideBar").css("left")=="0px"){
//     $("#sideBar").animate({left:-sideBarPosition},1000);
//     $("#open").addClass("fa-align-justify");
//     $("#open").removeClass("fa-x");
    
// }else{
//     $("#sideBar").animate({left:"0px"},1000);
//     $("#open").removeClass("fa-align-justify");
//     $("#open").addClass("fa-x");
// }

// });


// $("#close").click(function(){
//     console.log($("#sideBar").css("left"));
//     let sideBarPosition=$(".sideBar-content").innerWidth();
// if($("#sideBar").css("left")=="0px"){
//     $("#sideBar").animate({left:-sideBarPosition},1000);
// }else{
//     $("#sideBar").animate({left:"0px"},1000);
// }

// });

// $("#open").click(function(){
//     $("#open").toggle(10)
//     $("#close").hide(10)
//     $("#close").show(10)
// });
// $("#close").click(function(){
//     $("#close").hide(10)
//     $("#open").show(10)
// });

// end sideBar

async function category() {
    rowData.innerHTML = ""
    // $(".inner-loading-screen").fadeIn(300)
    loading.classList.remove("d-none")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    response = await response.json()

    displayMeals(response.meals)
    loading.classList.add("d-none")
    console.log(response);
    $(".inner-loading-screen").fadeOut(300)

}
category()
function displayMeals(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
       
        <div class="col-md-3 position-relative">
                <div id="click" onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
    rowData.innerHTML = cartoona
}
$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")
       
    })
    new WOW().init();
});
// end allCategory
async function getMealDetails(mealDeatails) {
    closeSideNav()
  loading.classList.remove("d-none")
    rowData.innerHTML = ""
    rowData.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealDeatails}`);
    response = await response.json();
    loading.classList.add("d-none")
    displayMealDetails(response.meals[0])
   

}
function displayMealDetails(meal) {
    searchContainer.innerHTML ="";
rowData.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
  
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = cartoona
}

// end details section
function displaySearchInputs(){
    searchContainer.innerHTML =`   <div class="row py-4 ">
    <div class="col-md-6 ">
        <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
    </div>
    <div class="col-md-6">
        <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
    </div>
</div>`
        rowData.innerHTML = "";
}

 async function searchByName(nameS){
    closeSideNav()
  rowData.innerHTML="";
//   $(".inner-loading-screen").fadeIn(300)
loading.classList.remove("d-none")
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameS}`);
   
      response = await response.json()
      loading.classList.add("d-none")
      response.meals ? displayMeals(response.meals) : displayMeals([])
    //   $(".inner-loading-screen").fadeOut(300)
}

async function searchByFLetter(Fname){
    closeSideNav()
    rowData.innerHTML="";
    // $(".inner-loading-screen").fadeIn(300)
    loading.classList.remove("d-none")
    Fname == "" ? Fname = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${Fname}`);
        response = await response.json();
        response.meals ? displayMeals(response.meals) : displayMeals([])
        // $(".inner-loading-screen").fadeOut(300)
        loading.classList.add("d-none")
  }
 
  $("#Search").click(function(){
    displaySearchInputs()
 
})

// end search

  async function getCategories(){
    loading.classList.remove("d-none")
    rowData.innerHTML = "";
    searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    response = await response.json();
    loading.classList.add("d-none")
    console.log(response);
    displayCategories(response.categories);
  }
//   getCategories()


  function displayCategories(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }
    rowData.innerHTML = cartoona
}


async function getCategoryMeals(category) {
    rowData.innerHTML = ""
    // $(".inner-loading-screen").fadeIn(300)
    loading.classList.remove("d-none")

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    // $(".inner-loading-screen").fadeOut(300)
    loading.classList.add("d-none")

}

$("#Categories").click(function(){
    getCategories()

if($("#sideBar").css("left")=="0px"){
    $("#sideBar").animate({left:-sideBarPosition},1000);
    $("#open").addClass("fa-align-justify");
    $("#open").removeClass("fa-x");
}
    console.log("he");
})
// end categories

async function getArea() {
    rowData.innerHTML = ""
    // $(".inner-loading-screen").fadeIn(300)
    loading.classList.remove("d-none")

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayArea(respone.meals)
    // $(".inner-loading-screen").fadeOut(300)
    loading.classList.add("d-none")

}
// getArea()

function displayArea(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}

async function getAreaMeals(area) {
    rowData.innerHTML = ""
    // $(".inner-loading-screen").fadeIn(300)
    loading.classList.remove("d-none")

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    // $(".inner-loading-screen").fadeOut(300)
    loading.classList.remove("d-none")

}
$("#Area").click(function(){
    getArea()

if($("#sideBar").css("left")=="0px"){
    $("#sideBar").animate({left:-sideBarPosition},1000);
    $("#open").addClass("fa-align-justify");
    $("#open").removeClass("fa-x");
}
    console.log("he");
})
// end area

async function getIngredients() {
    rowData.innerHTML = ""
    // $(".inner-loading-screen").fadeIn(300)
    loading.classList.remove("d-none")

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 20))
    // $(".inner-loading-screen").fadeOut(300)
    loading.classList.add("d-none")

}
// getIngredients()


function displayIngredients(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}

async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ""
    // $(".inner-loading-screen").fadeIn(300)
    loading.classList.remove("d-none")

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    // $(".inner-loading-screen").fadeOut(300)
    loading.classList.add("d-none")

}

$("#Ingredients").click(function(){
    getIngredients()

if($("#sideBar").css("left")=="0px"){
    $("#sideBar").animate({left:-sideBarPosition},1000);
    $("#open").addClass("fa-align-justify");
    $("#open").removeClass("fa-x");
}
    console.log("he");
})
// end ingredients

function showContacts() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")

// arrow function
    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}
showContacts()

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}

$("#Contact").click(function(){
    showContacts()

if($("#sideBar").css("left")=="0px"){
    $("#sideBar").animate({left:-sideBarPosition},1000);
    $("#open").addClass("fa-align-justify");
    $("#open").removeClass("fa-x");
}
    console.log("he");
})

// end validation

$("#open").click(function(){
    $(".navbar-nav").fadeIn();
  });


    $("#open").click(function(){
    //   $(".navbar-nav").removeClass("d-none");
     
      $(".navbar-nav").fadeInUp("slow");
      $("#Area").fadeInUp(3000);
    });
  