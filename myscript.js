var calendar;
var view;

$(document).ready(function(){
    // creating an init function to be run when HTML is loaded via AJAX and addint to global variable of init functions
    var init_function = {timetable: timetable_init}
    // see: https://stackoverflow.com/questions/1168807/how-can-i-add-a-key-value-pair-to-a-javascript-object
    init_functions = {...init_functions, ...init_function};
    
    view = $('#timetable-view').val();
    var user_id = 21012890;
    
    timetable_init(user_id);
});

function timetable_init(user_id){
    var user_type = $('#timetable-user-type').val();
    console.log(1);
    console.log($('#timetable-user-type'));
    console.log($('#timetable-user-type').val());
    var calendarEl = document.getElementById('acc-timetable');
    var $event_modal = $('#event-modal');

    if (calendarEl == null){
        return false;
    }


    var defaultView = 'timeGridDay';
    if (view == 'full') {
        defaultView = 'timeGridWeek';
    }

    calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: [ 'timeGrid', 'bootstrap' ],
        defaultView: defaultView,
        themeSystem: 'bootstrap',
        allDaySlot: false, 
        minTime: "08:00:00",
        maxTime: "20:00:00",
        height: 639,
        editable: false, 
        nowIndicator:true, 
        eventTextColor: "#ffffff",
        events: {
            url: config.base_url + "Main/timetable_json",
            method: "GET",
            extraParams: {
                user_id: user_id,
                user_type: $('#timetable-user-type').val()
            }
        }, 
        header: {
            right: 'today, prev,next'
        },
        loading: function(bool) {
            if (bool){
                $('#timetable-loading').removeClass('d-none');
            } else {
                $('#timetable-loading').addClass('d-none');
            }
        },
        eventClick: function(info) {
            var event = info.event;

            $event_modal.find('.modal-title').text(event.extendedProps.date_text + ' (' + event.extendedProps.start_time + ' - ' + event.extendedProps.end_time +')');

            $event_modal.find('.event-date').text(event.extendedProps.date_text);
            $event_modal.find('.event-time').text(event.extendedProps.start_time + ' - ' + event.extendedProps.end_time);
            $event_modal.find('.event-room').text(event.extendedProps.room);
            $event_modal.find('.event-module').text(event.extendedProps.module);
            $event_modal.find('.event-name').text(event.extendedProps.module_title);
            $event_modal.find('.event-description').text(event.extendedProps.description);
            $event_modal.modal('show');
        }
    });

    calendar.render();
}   
