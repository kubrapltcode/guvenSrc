
/*
 Template Name: Agroxa - Bootstrap 4 Admin Dashboard
 Author: Themesbrand
 File: Calendar Init
 */


$(document).ready(function() {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    /*  className colors

     className: default(transparent), important(red), chill(pink), success(green), info(blue)

     */


    /* initialize the external events
     -----------------------------------------------------------------*/

    $('#external-events div.external-event').each(function() {

        // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
        // it doesn't need to have a start or end
        var eventObject = {
            title: $.trim($(this).text()) // use the element's text as the event title
        };

        // store the Event Object in the DOM element so we can get to it later
        $(this).data('eventObject', eventObject);

        // make the event draggable using jQuery UI
        $(this).draggable({
            zIndex: 999,
            revert: true,      // will cause the event to go back to its
            revertDuration: 0  //  original position after the drag
        });

    });


    /* initialize the calendar
     -----------------------------------------------------------------*/

    var calendar =  $('#calendar').fullCalendar({
        lang: 'tr',
        header: {
            left: 'title',
            center: 'agendaDay,agendaWeek,month',
            right: 'prev,next today'
        },
        editable: true,
        firstDay: 1, //  1(Monday) this can be changed to 0(Sunday) for the USA system
        selectable: true,
        defaultView: 'month',

        axisFormat: 'h:mm',
        columnFormat: {
            month: 'ddd',    // Mon
            week: 'ddd d', // Mon 7
            day: 'dddd M/d',  // Monday 9/7
            agendaDay: 'dddd d'
        },
        titleFormat: {
            month: 'MMMM YYYY', // September 2009
            week: "MMMM YYYY", // September 2009
            day: 'MMMM YYYY'                  // Tuesday, Sep 8, 2009
        },
        allDaySlot: false,
        selectHelper: true,
        select: function(start, end, allDay) {
            var title = prompt('Event Title:');
            if (title) {
                calendar.fullCalendar('renderEvent',
                    {
                        title: title,
                        start: start,
                        end: end,
                        allDay: allDay
                    },
                    true // make the event "stick"
                );
            }
            calendar.fullCalendar('unselect');
        },
        droppable: true, // this allows things to be dropped onto the calendar !!!
        drop: function(date, allDay) { // this function is called when something is dropped

            // retrieve the dropped element's stored Event Object
            var originalEventObject = $(this).data('eventObject');

            // we need to copy it, so that multiple events don't have a reference to the same object
            var copiedEventObject = $.extend({}, originalEventObject);

            // assign it the date that was reported
            copiedEventObject.start = date;
            copiedEventObject.allDay = allDay;

            // render the event on the calendar
            // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

            // is the "remove after drop" checkbox checked?
            if ($('#drop-remove').is(':checked')) {
                // if so, remove the element from the "Draggable Events" list
                $(this).remove();
            }

        },

        events: [
            {
                title: 'Trafik Dersi',
                start: new Date(y, m, 10,10,10),
                className: 'bg-secondary'
            },
            {
                id: 999,
                title: 'İlk Yardım Dersi',
                start: new Date(y, m, 12, 18, 0),
                allDay: false,
                className: 'bg-teal'
            },
            {
                id: 999,
                title: 'Direksiyon Dersi',
                start: new Date(y, m, 20, 16, 0),
                end: new Date(y, m, 23, 14, 0),

                allDay: false,
                className: 'bg-info'
            },
            {
                id: 999,
                title: 'Motor Dersi',
                start: new Date(y, m, 14, 16, 0),
                allDay: false,
                className: 'bg-warning'
            },
            {
                title: 'Direksiyon Sınavı',
                start: new Date(y, m, 28,12, 10),
                allDay: false,
                className: 'bg-dark'
            },
            {
                title: 'Teorik Sınav',
                start: new Date(y, m, 17, 12, 10),
                allDay: false,
                className: 'bg-danger'
            },


        ],
        timeFormat: 'H(:mm)'
    });


});