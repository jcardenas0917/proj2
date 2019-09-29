var $email = $("#email");
$(document).on("submit", "#subscribe", subscribe);

function subscribe(event) {
    event.preventDefault();
    if ($email.val() === "") {
        alert('Please enter a valid E-mail')
    } else {
        var emails = {
            email: $email.val(),
        };
        console.log(emails.email);

        $.post("/api/emails", emails);
        alert("Thank You For Subscribing")
        location.reload();
    }
}