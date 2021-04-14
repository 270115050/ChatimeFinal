window.onload = function(){
  const iconShopping = document.querySelector('.iconShopping');
  const cartBox = document.querySelector('.cartBox');
  const cartCloseBtn = document.querySelector('i.fa-close');
  let sum = 0.00; //total cost for items

  const attToCartBtn = document.getElementsByClassName('attToCart');
  let items = [];
  //add items to local storage
  for(let i=0; i<attToCartBtn.length; i++){
      attToCartBtn[i].addEventListener("click",function(e){
        if(typeof(Storage) !== 'undefined'){
          let item =  {
            img: e.target.parentElement.children[3].textContent,
            id:i+1,
            name:e.target.parentElement.children[0].textContent,
            price:e.target.parentElement.children[1].children[0].textContent,
            no:1
          };
          //checks if storage is empty so if it is not empty it will not overwrite the exisitng data
          if(JSON.parse(localStorage.getItem('items')) === null){//if storage is empty add item
            items.push(item);
            localStorage.setItem("items",JSON.stringify(items));
            window.location.reload();
          }else{ //if storage is not empty add items
            const localItems = JSON.parse(localStorage.getItem("items"))
            localItems.map(data=>{
              if(item.id == data.id){
                item.no = data.no + 1;
              }else{
                items.push(data);
              }
            });
            items.push(item);
            localStorage.setItem('items',JSON.stringify(items));
            window.location.reload();
          }
        }else{
          alert('storage is not working');
        }
    });
  }

  //add item to shopping cart
  const iconShoppingP = document.querySelector('.iconShopping p');
  let no = 0;
  JSON.parse(localStorage.getItem('items')).map(data=>{
    no = no+data.no;
  });
  iconShoppingP.innerHTML = no;

  // run code if chatime cart page is open
  if(window.location.href.indexOf("chatimecart.html") > -1){
    //add items in chatime cart window
    const cardBoxTable = document.querySelector('.productContainer');
    let tableData = '';

    if(JSON.parse(localStorage.getItem('items'))[0] === null){
    }else{
      totalCost();
      JSON.parse(localStorage.getItem('items')).map(data=>{
        tableData +=`<div class="product">
                        <div class="pImage">
                          <span><img src="image/${data.img}.png"><span>
                        </div>
                        <div class="pName">
                          <span>${data.name}</span>
                        </div>
                        <div class="pQuantity">
                          <span>${data.no}</span>
                        </div>
                        <div class="pPrice">
                          <span>$${data.price}</span>
                        </div>
                        <div class="pDelete">
                          <span><a href="#" onclick=Delete(this)>Delete</a></span>
                        </div>
                     </div>`;
      });
    }

    cardBoxTable.innerHTML = tableData;
    const cartWindow = document.querySelector('.main');
    const tCost= cartWindow.querySelector('.totalCost');
    tCost.innerHTML = '$' + sum.toFixed(2); //print cost to user
  }

  function totalCost(){
    let cart;
    cart = JSON.parse(localStorage.getItem('items'))

    for(i=0; i < cart.length; i++){
      sum += parseFloat(cart[i].price)*parseFloat(cart[i].no);
    }
  }

  //delete items in cart
  const pDelete = document.querySelectorAll('.pDelete');
  for(let i=0; i<pDelete.length; i++){
    pDelete[i].addEventListener("click",function(e){
      let items = [];
      let name = e.target.parentElement.parentElement.parentElement.children[1].children[0].textContent;
      JSON.parse(localStorage.getItem('items')).map(data=>{
        if(data.name != name){
          items.push(data);
        }
      });
      localStorage.setItem('items',JSON.stringify(items));
      window.location.reload();
    });
  }
}

// Sort drinks
$(document).ready(function(){
  $(".allDrink").click(function(){ //show all drinks
    $(".catMilkTea, .catSmoothieTea, .catHotTea").css("width", "100%");
    $(".catMilkTea, .catSmoothieTea, .catHotTea").show();
  });

  $(".milkTea").click(function(){
    $(".catMilkTea").show(); //show milktea category
    $(".catMilkTea").css("max-width", "35%");
    $(".catSmoothieTea, .catHotTea").hide();
  });

  $(".smoothie").click(function(){
    $(".catSmoothieTea").show();// show smoothie category
    $(".catSmoothieTea").css("max-width", "35%");
    $(".catMilkTea, .catHotTea").hide();
  });

  $(".hotDrink").click(function(){
    $(".catHotTea").show(); //show hot tea category
    $(".catHotTea").css("max-width", "35%");
    $(".catSmoothieTea, .catMilkTea").hide();
  });
});
