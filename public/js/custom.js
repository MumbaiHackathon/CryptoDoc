/* global $ */
$(document).ready(function() {
    $('.chatbot-hover-button').on('click', function() {
        $('.chatbot-dialog').toggleClass('hidden');
        $('.chatbot-hover-button').toggleClass('bg-green bg-red');
        if($('.chatbot-hover-button').hasClass('bg-red'))
            $('.chatbot-hover-button i').html('close');
        else
            $('.chatbot-hover-button i').html('chat');
    });
});
