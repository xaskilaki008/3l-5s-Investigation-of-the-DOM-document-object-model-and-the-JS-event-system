//Файл test.js
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contact-form');
    const resetButton = form.querySelector('button[type="reset"]');
    const inputs = form.querySelectorAll('input[required], select[required]');
    const radioButtons = form.querySelectorAll('input[name="option"]');
    const correctAnswers = {
        question1: 'Компьютерные игры',
        question2: 'Люстры',
        question3: 'История',
        option: 'option1' // Белого ящика
    };

    // Подтверждение перед сбросом формы
    resetButton.addEventListener('click', function (event) {
        const confirmReset = confirm('Вы точно хотите очистить форму?');
        if (!confirmReset) {
            event.preventDefault();
        }
    });

    // Проверка формы при отправке
    form.addEventListener('submit', function (event) {
        let isValid = true;

        // Снимаем подсветку ошибок
        inputs.forEach(input => input.classList.remove('error'));
        radioButtons.forEach(radio => radio.parentElement.classList.remove('error'));

        // Проверка поля "Фамилия Имя Отчество"
        const fioField = form.querySelector('#fio');
        const fioValue = fioField.value.trim();
        const fioRegex = /^[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+$/;
        if (!fioRegex.test(fioValue)) {
            isValid = false;
            fioField.classList.add('error');
        }

        // Проверка текстовых вопросов
        inputs.forEach(input => {
            if (input.id.startsWith('question')) {
                const correctAnswer = correctAnswers[input.name];
                if (input.value.trim() !== correctAnswer) {
                    isValid = false;
                    input.classList.add('error');
                }
            }
        });

        // Проверка радиокнопок
        const selectedRadio = [...radioButtons].find(radio => radio.checked);
        if (!selectedRadio || selectedRadio.value !== correctAnswers.option) {
            isValid = false;
            radioButtons.forEach(radio => radio.parentElement.classList.add('error'));
        }

        // Предотвращение отправки формы
        if (!isValid) {
            event.preventDefault();
            alert('Некоторые поля заполнены неверно. Проверьте и попробуйте снова.');
        }
    });
});
