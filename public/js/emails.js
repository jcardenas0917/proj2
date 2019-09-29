var $email = $("#email");
$(document).on("submit", "#subscribe", subscribe);
$(document).on("click", "#clear", clear);

function subscribe(event) {
    event.preventDefault();
    if ($email.val() === "") {
        $('#errorModal').modal({
            show: true,
        });
        $('#error').text("Please Enter An E-mail 😐");
    } else {
        var emails = {
            email: $email.val(),
        };
        $.post("/api/emails", emails);
        $('#errorModal').modal({
            show: true,
        });
        $('#error').text("Thank you for subscribing! 👍");
    }   
}

function clear(){
    location.reload();
}