var resCopy;
var orderItems = [];
var currentDish;
var orderTotal = 0;
var user;

$(document).ready(function () {
    //loading user info
    $.ajax("/api/user_data", {
        type: "GET",
    }).then(function(response){
        user = response;
    });
    //populating menu in ordering page.
    $.ajax("/api/menu", {
        type: "GET",
    }).then(
        function (response) {
            resCopy = response;
            // Reload the page to get the updated list
            for (var i = 0; i < response.length; i++) {
                var dishid = response[i].id;
                var name = response[i].item_name;
                var description = response[i].description;
                var price = response[i].item_price;
                var image = response[i].icon_id;
                $("#fill-tables").append(
                    "<div class='card" + i + "'>" +
                    "<div class='col-12'>" + " " +
                    "<div class='row'>" +
                    "<div class='col-2'>" +
                    "<img src='/asset/images/" + image + ".jpg' alt='Avatar' width='250' height='250'>" +
                    "</div>" +
                    "<div class='offset-1 col-8'>" +
                    "<ol>" +
                    "<li>Dish: " + name + "</li>" +
                    "<li>Description: " + description + "</li>" +
                    "<li>Price: " + price + "</li>" +
                    "<li><button id='buy-button' onclick=orderAdd(" + dishid + ") dishid='" + dishid + "'> Add to Order </button></li>" +
                    "</ol>" +
                    "<div>" +
                    "</div>" +
                    "</div>" +
                    "</div>");
            }
        }
    );
    //populating order tables in cooks page.
    $.ajax("/api/orders", {
        type: "GET",
    }).then(
        function (response) {
            // Reload the page to get the updated list
            for (var i = 0; i < response.length; i++) {

                var orderid = response[i].id;
                var order = response[i].order;
                var status = response[i].status;
                $("#fill-cards").append(
                    "<tr>" +
                    "<th scope='row'>" + orderid + "</th>" +
                    "<td>" + order + "</td>" +
                    "<td>" + status + "</td>" +
                    "<td><button id='change-status' onclick='updateOrderStatus("+orderid+")'>Done</button>"+
                    "</tr>"
                );
            }
        }
    );

    $.ajax("/api/table", {
        type: "GET",
    }).then(
        function (response) {
            console.log(response);
            // Reload the page to get the updated list
            for (var i = 0; i < response.length; i++) {

                var tableid = response[i].id;
                var numppl = response[i].number_people;
                var timeres = response[i].time_reserved;
                $("#fill-tables").append(
                    "<tr>" +
                    "<th scope='row'>" + tableid + "</th>" +
                    "<td>" + numppl + "</td>" +
                    "<td>" + timeres + "</td>" +
                    "<td><button id='change-status' onclick='updateTableStatus("+tableid+")'>Clear</button>"+
                    "</tr>"
                );
            }
        }
    );
});

function orderAdd(a) {
    currentDish = resCopy[a - 1];
    console.log(orderTotal);
    orderItems.push(currentDish.item_name);
    updateOrderList()
    updateOrderTotal()
}

function updateOrderList() {
    $("#item-list").append(
        "<div>" +
        orderItems[currentDish.id - 1] +
        ": $" + currentDish.item_price +
        "</div>");
}

function updateOrderTotal() {
    orderTotal += parseInt(currentDish.item_price);
    $("#total-price").replaceWith("<span id='total-price'>" + "Total: $" + orderTotal + "</span>");
}



function completeOrder() {
    //var currOrder = orderItems.toString();
    var currId = user.id;
    console.log(currId);

    var test = {
        order: orderItems,
        customer_id: currId
    };
    
    // Send the POST request.
    $.ajax("/api/order", {
        type: "POST",
        data: test
    }).then(
        function () {
            console.log("New burger submitted");
            // Reload the page to get the updated list
            location.reload();
        }
    );
}

function toggleTab(a) {
    if (a == "order") {
        $(".order-container").show();
        $(".view-container").hide();
        $(".reserve-container").hide();
        $(".lead").text("Create an Order");
    }
    if (a == "reserve") {
        $(".reserve-container").show();
        $(".view-container").hide();
        $(".order-container").hide();
        $(".lead").text("Reserve a Table");
    }
    if (a == "view") {
        $(".view-container").show();
        $(".reserve-container").hide();
        $(".order-container").hide();
        $(".lead").text("View Current Orders");
    }
}

function completeTable() {
    var currId = user.id;
    var number = $("#people").val();
    var time = $("#time").val();

    var test2 = {
        customer_id: currId,
        number_people: number,
        time_reserved: time
    };
    
    // Send the POST request.
    $.ajax("/api/table", {
        type: "POST",
        data: test2
    }).then(
        function () {
            console.log("New table submitted");
            // Reload the page to get the updated list
            location.reload();
        }
    );
}

function updateOrderStatus(a) {
    $.ajax("/api/order", {
        type: "PUT",
        data: a
    }).then(
        function () {
            console.log("New table submitted");
            // Reload the page to get the updated list
            location.reload();
        }
    );
}