$(document).ready(() => {
    $.validator.addMethod("customEmail", function(value, element) {
        var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return this.optional(element) || emailRegex.test(value);
    }, "Please enter a valid email address.");

    $.validator.addMethod("nowhitespace", function(value, element) {
        return this.optional(element) || /^\S+$/i.test(value);
    }, "Space is not allowed.");

    $("#signup-form").validate({
        rules: {
            userName: {
                required: true
            },
            email: {
                required: true,
                customEmail: true,
                nowhitespace: true
            },
            pass: {
                required: true,
                nowhitespace: true
            },
            confPass: {
                required: true,
                equalTo: "#pass"
            }
        },
        messages: {
            email: {
                required: "Please enter your email address."
            },
            userName: {
                required: "Please enter your User Name."
            },
            pass: {
                required: "Please enter your Password."
            },
            confPass: {
                required: "Please confirm your password",
                equalTo: "Passwords do not match"
            }
        },
        errorPlacement: function(error, element) {
            $("#username-error").html(error);
        }
    });
});
