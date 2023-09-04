$(document).ready(function () {
    console.log("clicked");
    $.validator.addMethod("customEmail", function(value, element) {
        var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return this.optional(element) || emailRegex.test(value);
    }, "Please enter a valid email address.");

    $.validator.addMethod("nowhitespace", function(value, element) {
        return this.optional(element) || /^\S+$/i.test(value);
    }, "Space is not allowed.");
    

    $("#login-form").validate({
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
                required: "Please enter your Password."
            }
        },
        errorPlacement: function(error, element) {
            $("#username-error").html(error); 
        }
    });
    //SignUp Validationsssssssss
    
        
    
});


// $(document).ready(() => {
//     $.validator.addMethod("customEmail", function(value, element) {
//         var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//         return this.optional(element) || emailRegex.test(value);
//     }, "Please enter a valid email address.");

//     $.validator.addMethod("nowhitespace", function(value, element) {
//         return this.optional(element) || /^\S+$/i.test(value);
//     }, "Space is not allowed.");

//     $.validator.addMethod("notEqualTo", function(value, element, param) {
//         return this.optional(element) || value !== $(param).val();
//     }, "Passwords cannot match.");

//     $("#signup-form").validate({
//         rules: {
//             userName: {
//                 required: true
//             },
//             email: {
//                 required: true,
//                 customEmail: true,
//                 nowhitespace: true
//             },
//             pass: {
//                 required: true,
//                 nowhitespace: true
//             },
//             confPass: {
//                 required: true,
//                 notEqualTo: "#pass"
//             }
//         },
//         messages: {
//             email: {
//                 required: "Please enter your email address."
//             },
//             userName: {
//                 required: "Please enter your User Name."
//             },
//             pass: {
//                 required: "Please enter your Password."
//             },
//             confPass: {
//                 required: "Please enter your Confirm Password.",
//                 notEqualTo: "Passwords cannot match."
//             }
//         },
//         errorPlacement: function(error, element) {
//             $("#username-error").html(error);
//         }
//     });
// });