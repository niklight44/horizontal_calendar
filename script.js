const calendarMonth = document.querySelector('.calendar__month');
const calendarWeek = document.querySelector('.calendar__week');
const calendarDays = document.querySelector('.calendar__days');
const calendarWeekDays = document.querySelectorAll('.calendar__weekdays > div');
calendarDays.style.marginLeft = '0px'; // Без этой строчки календарь работать не будет


const date = new Date();

function numberOfWeeks(date){
    let daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(),1).getDay();
    return Math.ceil( ((daysInMonth + firstDayOfMonth) / 7) )
}

function renderCalendar(){
    console.log(`Margin-left: ${calendarDays.style.marginLeft}`);
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
    let month = months[date.getMonth()];
    calendarMonth.innerHTML = month;

    let days = "";          // Массив дней -> "<div>...</div> <div>...</div>"
    let counter = 0;  // Счётчик созданных дней
    let weeksInMonth = numberOfWeeks(date);
    console.log(weeksInMonth);
    calendarDays.style.width = `${weeksInMonth*100}%`


    // Дни прошлого месяца
    let first_day_index = new Date(date.getFullYear(), date.getMonth(), 1).getDay();        // 0...6
    let prev_month_length = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    for(let i = first_day_index; i > 0; i--){
        // days += `<div class="calendar__prev-month">${prev_month_length-i+1}</div>`; // "+1" - это костыль
        days += `<div class="calendar__prev-month"></div>`;
        counter++;
    }


    // Дни настоящего месяца
    let month_length = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();         // 30 или 31
    let today = new Date().getDate();   // 1...31
    for(let i=1; i<=month_length; i++){
        // Проверка на текущую дату
        if(i == today){
            days += `<div class="today">${i}</div>`;
        }
        else{
            days += `<div>${i}</div>`;
        }
        counter++;
    }

    // Дни будущего месяца
    let next_days = (weeksInMonth*7) - counter;
    for(let i = 1; i <=next_days; i++){
        // days += `<div class="calendar__next-month">${i}</div>`;
        days += `<div class="calendar__next-month"></div>`;

    }

// Заполнение календаря днями
    calendarDays.innerHTML = days;


    // Вешаем обратчик кликов по датам
    // Через него мы будем получать список занятий в какой то день
    // Через него мы будем получать список занятий в какой то день
    document.querySelectorAll('.calendar__days > div').forEach(calendarDay => {
        calendarDay.addEventListener("click", event => {
            let year = date.getFullYear();
            let month = date.getMonth()+1; // 1...12
            let day = event.target.innerText;
            console.log(new Date(`${year}-${month}-${day} GMT`).toUTCString());
        })
    });

}

renderCalendar();

let divOffset = 0; // Смещение элемента
// Прокрутка календаря назад
document.addEventListener('swiped-right', function(e) {
    if(divOffset >= (numberOfWeeks(date)*100) || calendarDays.style.marginLeft == '0px' || calendarDays.style.marginLeft == '0%'){
        date.setMonth(date.getMonth() - 1);
        divOffset = -(numberOfWeeks(date)*100);
        divOffset += 100; // Смещаем календарь на последнюю неделю месяца
        renderCalendar();
        calendarDays.style.marginLeft = `${-(numberOfWeeks(date)*100 -100)}%`;
        console.log(`Смещение: ${divOffset}%`);
        console.log('Конец прошлого месяца');
    }
    else{
        divOffset += 100;
        calendarDays.style.marginLeft = `${divOffset}%`;
    }
    console.log('Свайп вправо');
});

// Прокрутка календаря вперёд
document.addEventListener('swiped-left', function(e) {
    let limiter = -(numberOfWeeks(date)*100 - 100);
    console.log(`Limiter: ${limiter}`);
    if(divOffset <= limiter){
        divOffset = 0;
        calendarDays.style.marginLeft = '0px';
        date.setMonth(date.getMonth() + 1);
        renderCalendar();
        // console.log(month);
    }
    else{
        divOffset -= 100;
        calendarDays.style.marginLeft = `${divOffset}%`;
    }
    console.log('Свайп влево');
});

function get_date(event){
    console.log(event);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = parseInt(event.target.innerHTML);
    console.log('Элемент кликнут');
    console.log(new Date(year, month, day));

    // return  new Date(year, month, day);
}

document.querySelectorAll('.calendar__days > div').forEach(calendarDay => {
    calendarDay.addEventListener("onclick", event => {
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = parseInt(event.target.innerHTML);
        console.log('Элемент кликнут');
        console.log(new Date(year, month, day));
    })
});

// fetch('/show_calendar_data', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: date.toUTCString()
// })
//     .then(res => res.json())
//     .then(result => console.log(result))