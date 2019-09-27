var $email = $("#email");
$(document).on("submit", "#subscribe", subscribe);

function subscribe(event) {
    event.preventDefault();
    var emails = {
        email: $email.val(),
    };
    console.log(emails.email);
    
    $.post("/api/emails", emails);
    alert("Thank You For Subscribing")
    // location.reload();
}