$(document).ready(function () {
    console.log("clicked");
    $.validator.addMethod("customEmail", function(value, element) {
        var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return this.optional(element) || emailRegex.test(value);
    }, "Please enter a valid email address.");

    $.validator.addMethod("nowhitespace", function(value, element) {
        return this.optional(element) || /^\S+$/i.test(value);
    }, "Space is not allowed.");

    $("#submit-form").validate({
        rules: {
            email: {
                required: true,
                customEmail: true,
                nowhitespace: true 
            },
            pass: {
                required: true,
                nowhitespace: true 
            }
        },
        messages: {
            email: {
                required: "Please enter your email address."
            },
            pass: {
                required: "Please enter your Password address."
            }
        },
        errorPlacement: function(error, element) {
            $("#username-error").html(error); 
        }
    });
});
