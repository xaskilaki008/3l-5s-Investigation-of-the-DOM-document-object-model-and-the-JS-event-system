document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const fullnameInput = document.getElementById('fullname');
    const phoneInput = document.getElementById('phone');
    const fullnameError = document.getElementById('fullnameError');
    const phoneError = document.getElementById('phoneError');
    // Проверка валидности формы
    function validateForm() {
        let valid = true;
        // Сброс сообщений об ошибках
        fullnameError.style.display = 'none';
        phoneError.style.display = 'none';
        fullnameInput.classList.remove('error');
        phoneInput.classList.remove('error');
        // Валидация ФИО
        const fullnameValue = fullnameInput.value.trim();
        const fullnameRegex = /^[А-Яа-яЁё]+\s[А-Яа-яЁё]+\s[А-Яа-яЁё]+$/;
        if (!fullnameRegex.test(fullnameValue)) {
            valid = false;
            fullnameInput.classList.add('error');
            fullnameError.style.display = 'inline';
        }
        // Валидация телефона
        const phoneValue = phoneInput.value.trim();
        const phoneRegex = /^(\+7|\+3)\d{7,9}$/;
        if (!phoneRegex.test(phoneValue)) {
            valid = false;
            phoneInput.classList.add('error');
            phoneError.style.display = 'inline';
        }

        return valid;
    }
    // Проверка формы при отправке
    form.addEventListener('submit', function (event) {
        if (!validateForm()) {
            event.preventDefault(); // Предотвращение отправки формы при ошибке
        }
    });
    // Проверка при потере фокуса
    fullnameInput.addEventListener('blur', validateForm);
    phoneInput.addEventListener('blur', validateForm);
});
//календарь
document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('birthdate');
    const calendar = document.getElementById('calendar');

    let selectedDate = new Date();

    function createCalendar(date) {
        calendar.innerHTML = ''; // Очистить содержимое календаря

        const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        const daysInWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

        // Создаем заголовок
        const header = document.createElement('div');
        header.classList.add('calendar-header');
        header.innerHTML = `
            <button id="prev-month">&lt;</button>
            <span>${monthNames[month]} ${year}</span>
            <button id="next-month">&gt;</button>
        `;
        calendar.appendChild(header);

        // Создаем дни недели
        const daysRow = document.createElement('div');
        daysRow.classList.add('calendar-days');
        daysInWeek.forEach(day => {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = day;
            dayDiv.style.fontWeight = 'bold';
            daysRow.appendChild(dayDiv);
        });
        calendar.appendChild(daysRow);

        // Создаем ячейки календаря
        const daysContainer = document.createElement('div');
        daysContainer.classList.add('calendar-days');

        // Добавляем пустые ячейки перед первым днем месяца
        for (let i = 0; i < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('inactive');
            daysContainer.appendChild(emptyCell);
        }

        // Добавляем дни месяца
        for (let day = 1; day <= lastDateOfMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.textContent = day;
            dayCell.addEventListener('click', function () {
                input.value = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                calendar.style.display = 'none';
            });
            if (
                year === new Date().getFullYear() &&
                month === new Date().getMonth() &&
                day === new Date().getDate()
            ) {
                dayCell.classList.add('active');
            }
            daysContainer.appendChild(dayCell);
        }

        calendar.appendChild(daysContainer);

        // Навигация
        document.getElementById('prev-month').addEventListener('click', function () {
            createCalendar(new Date(year, month - 1, 1));
        });

        document.getElementById('next-month').addEventListener('click', function () {
            createCalendar(new Date(year, month + 1, 1));
        });
    }

    input.addEventListener('focus', function () {
        const rect = input.getBoundingClientRect();
        calendar.style.top = `${rect.bottom + window.scrollY}px`;
        calendar.style.left = `${rect.left}px`;
        calendar.style.display = 'block';
        createCalendar(selectedDate);
    });

    document.addEventListener('click', function (event) {
        if (!calendar.contains(event.target) && event.target !== input) {
            calendar.style.display = 'none';
        }
    });
});
