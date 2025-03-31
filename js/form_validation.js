// Функция проверки заполненности всех полей формы
function validateForm(formId) {
    let form = document.getElementById(formId);
    let inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    for (let input of inputs) {
        if (!input.value.trim()) {
            alert(`Поле ${input.name} должно быть заполнено`);
            input.focus();
            return false;
        }
    }
    return true;
}

// Пример вызова для проверки формы при отправке
document.getElementById('submitButton').addEventListener('click', function(event) {
    if (!validateForm('contactForm')) {
        event.preventDefault();
    }
});
