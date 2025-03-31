const calendar = {
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth(),
    calendarOpen: false,

    init: function () {
        this.generateYearOptions();
        this.renderCalendar();
        document.getElementById("group").addEventListener("change", (e) => {
            const field = e.target;
            if (field.value) {
                setFieldValidity(field, true); // Если значение выбрано, зелёная подсветка
            } else {
                setFieldValidity(field, false); // Если пусто, красная подсветка
            }
        });
        
        document.getElementById("prevMonth").addEventListener("click", (e) => {
            e.stopPropagation();
            this.changeMonth(-1);
        });

        document.getElementById("nextMonth").addEventListener("click", (e) => {
            e.stopPropagation();
            this.changeMonth(1);
        });

        document.getElementById("yearSelect").addEventListener("change", (e) => {
            e.stopPropagation();
            this.changeYear(e.target.value);
        });

        const birthdayInput = document.getElementById("birthday");
        const calendarEl = document.getElementById("calendar");

        birthdayInput.addEventListener("focus", () => {
            this.calendarOpen = true;
            calendarEl.style.display = "block";
            const rect = birthdayInput.getBoundingClientRect();
            calendarEl.style.position = "absolute";
            calendarEl.style.left = `${rect.left}px`;
            calendarEl.style.top = `${rect.bottom + window.scrollY}px`;
        });

        document.addEventListener("mousedown", (e) => {
            if (!calendarEl.contains(e.target) && e.target !== birthdayInput) {
                this.calendarOpen = false;
            }
        });

        document.addEventListener("mouseup", (e) => {
            if (!this.calendarOpen && !calendarEl.contains(e.target) && e.target !== birthdayInput) {
                calendarEl.style.display = "none";
            }
        });
    },

    generateYearOptions: function () {
        const yearSelect = document.getElementById("yearSelect");
        for (let i = 1970; i <= 2025; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.text = i;
            if (i === this.currentYear) {
                option.selected = true;
            }
            yearSelect.appendChild(option);
        }
    },

    renderCalendar: function () {
        const monthNames = [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь",
        ];
        const daysOfWeek = ["Mn", "Tu", "We", "Th", "Fr", "Sa", "Su"];
        const monthDisplay = document.getElementById("monthDisplay");
        const daysOfWeekContainer = document.getElementById("daysOfWeek");
        const calendarDays = document.getElementById("calendarDays");
        const selectedDateField = document.getElementById("birthday");

        monthDisplay.innerText = `${monthNames[this.currentMonth]} ${this.currentYear}`;
        daysOfWeekContainer.innerHTML = "";
        calendarDays.innerHTML = "";

        daysOfWeek.forEach(day => {
            const dayElement = document.createElement("div");
            dayElement.innerText = day;
            daysOfWeekContainer.appendChild(dayElement);
        });

        const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        const daysInPrevMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();

        for (let i = 0; i < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); i++) {
            const dayElement = document.createElement("div");
            dayElement.innerText = daysInPrevMonth - ((firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1) - i);
            dayElement.classList.add("prev-month-day");
            calendarDays.appendChild(dayElement);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement("div");
            dayElement.innerText = i;
            dayElement.addEventListener("click", () => {
                const selectedDate = `${i}-${monthNames[this.currentMonth]}-${this.currentYear}`;
                selectedDateField.value = selectedDate;
                selectedDateField.dispatchEvent(new Event("input")); // Для обновления валидации
                document.getElementById("calendar").style.display = "none";
            });
            calendarDays.appendChild(dayElement);
        }
    },

    changeMonth: function (offset) {
        this.currentMonth += offset;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        } else if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.renderCalendar();
    },

    changeYear: function (year) {
        this.currentYear = parseInt(year, 10);
        this.renderCalendar();
    },
};
