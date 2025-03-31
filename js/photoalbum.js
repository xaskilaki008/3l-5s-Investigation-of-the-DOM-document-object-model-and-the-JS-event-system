// Массивы с фото и подписями
const fotos = [
    "images/image1.jpg", "images/image2.jpg", "images/image3.jpg",
    "images/image4.jpg", "images/image5.jpg", "images/image6.jpg",
    "images/image7.jpg", "images/image8.jpg", "images/image9.jpg",
    "images/image10.jpg", "images/image11.jpg", "images/image12.jpg",
    "images/image13.jpg", "images/image14.jpg", "images/image15.jpg"
];

const titles = [
    "Хижина в футуризме", "Котик арт", "Дом в небесах",
    "Женщина из газет", "Мозг вселенной", "Домик на закате тьмы",
    "Подальше от земной коры", "Летающий над водой", "Небосклон под горой и солнцем",
    "Робот аплодирующий осени", "Интерес к искусству", "Русалка",
    "Я буду твоим домом", "Медуза из космоса", "Мазки реальности"
];

const descriptions = [
    "Лучший дом который можно придумать", "Очаровательный кот", "Скрытое убежище среди облаков",
    "Коллаж из газетных фрагментов", "Абстрактное мышление", "Мир в закате",
    "На высоте", "Красивая природа", "Закат за горизонтом",
    "Осенний робот", "Наслаждение искусством", "Мифическое существо",
    "Сказочный дом", "Космическая медуза", "Реалистическая живопись"
];

// Функция для генерации таблицы с фотоальбомом
function generatePhotoAlbum() {
    const gallery = document.querySelector('.gallery');

    // Если галерея уже существует, очищать её не обязательно
    if (gallery && gallery.children.length === 0) {
        for (let i = 0; i < fotos.length; i++) {
            const imageDiv = document.createElement('div');
            imageDiv.classList.add('image');

            const img = document.createElement('img');
            img.src = fotos[i];
            img.alt = titles[i];
            img.classList.add('smallPhoto');

            const hoverText = document.createElement('p');
            hoverText.classList.add('hover_image');
            hoverText.textContent = titles[i];

            const underText = document.createElement('p');
            underText.classList.add('under_image');
            underText.textContent = descriptions[i];

            imageDiv.appendChild(img);
            imageDiv.appendChild(hoverText);
            imageDiv.appendChild(underText);
            gallery.appendChild(imageDiv);
        }
    }

    // Назначение обработчиков событий для всех изображений
    document.querySelectorAll('.smallPhoto').forEach((photo, index) => {
        photo.addEventListener('click', () => showPhoto(index));
    });
}

// Вызов функции при загрузке страницы
window.onload = generatePhotoAlbum;

let currentIndex = 0;
const bigPhotoDiv = document.getElementById('bigPhoto');
const bigPhotoImage = document.getElementById('bigPhotoImage');

function showPhoto(index) {
    currentIndex = index;
    bigPhotoImage.src = fotos[currentIndex];
    bigPhotoDiv.style.display = 'flex';
    bigPhotoDiv.scrollTop = 0; // Сбрасывает скролл к началу
}

function closePhoto() {
    bigPhotoDiv.style.display = 'none';
}

function navigatePhoto(direction) {
    currentIndex = (currentIndex + direction + fotos.length) % fotos.length;
    showPhoto(currentIndex);
}

// Event Listeners
document.getElementById('closeBtn')?.addEventListener('click', closePhoto);
document.getElementById('prevBtn')?.addEventListener('click', () => navigatePhoto(-1));
document.getElementById('nextBtn')?.addEventListener('click', () => navigatePhoto(1));
bigPhotoDiv.addEventListener('click', (event) => {
    if (event.target === bigPhotoDiv) {
        closePhoto();
    }
});
