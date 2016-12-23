$(document).ready(function() {



    $('#bee').bind('click', function(e) {
        e.preventDefault();
        $.Zebra_Dialog('<strong>A Wikipedia page</strong><br><br>', {
            source: {'iframe': {
                'src':  'http://en.m.wikipedia.org/wiki/Dialog_box',
                'height': 500
            }},
            width: 800,
            title:  'External content loaded in an iFrame'
        });
    });


});
