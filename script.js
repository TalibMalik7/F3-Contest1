let arrayOfDishes=[];
async function getData(){
let res;
try{
    //qs api not working so friend gave me his api with same data
    const response = await fetch("https://sandeep836.github.io/json/food.json");
    res = await response.json();
}
catch(error){
    alert("api error :"+error);
}

 getMenu(res);
}  

async function getMenu(data) {
document.getElementById("menu-btn").style.display = "none";
document.getElementById("poster1").style.display = "none";
// const response = await fetch("https://sandeep836.github.io/json/food.json");
// const data = await response.json();
const menu = document.getElementById("menu");
data.forEach((item) => {
    menu.innerHTML += `
    <div class="card-body">
        <img src="${item.imgSrc}" alt="${item.imageAlt}" width="50%">
        <h4>${item.name}</h4>
        <p> $${item.price} /-</p>
    </div>
    `;
    arrayOfDishes.push(item.name);
});
}

function takeOrder() {
return new Promise((resolve, reject) => {
    setTimeout(() => {
    const order = {
        // burgers: [arrayOfDishes[Math.floor(Math.random() * arrayOfDishes.length)], arrayOfDishes[Math.floor(Math.random() * arrayOfDishes.length)], arrayOfDishes[Math.floor(Math.random() * arrayOfDishes.length)]]
        //choosing cheeseburger as there is only one
        burgers: [arrayOfDishes[0], arrayOfDishes[0], arrayOfDishes[0]]
    };
    console.log(order.burgers);
    resolve(order);
    }, 2500);
});
}

function orderPrep() {
return new Promise((resolve, reject) => {
    setTimeout(() => {
    resolve({order_status: true, paid: false});
    }, 1500);
});
}

function payOrder() {
return new Promise((resolve, reject) => {
    setTimeout(() => {
    resolve({order_status: true, paid: true});
    }, 1000);
});
}

function thankyouFnc() {
alert("Thank you for eating with us today!");
}

// Attach event listener to order button
const orderBtn = document.getElementById("order-btn");
orderBtn.addEventListener("click", async () => {
try {
    const order = await takeOrder();
    console.log("Order placed: ", order);

    const orderStatus = await orderPrep();
    console.log("Order status: ", orderStatus);


} catch (error) {
    console.error(error);
}
});
const paybtn = document.getElementById("pay-btn");
paybtn.addEventListener("click", async () => {
    try {
    const payment = await payOrder();
    console.log("Payment status: ", payment);

    if (payment.paid) {
        thankyouFnc();
    }
    } catch (error) {
    console.error(error);
    }
});

