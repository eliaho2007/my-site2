//ДАННЫЕ (ИМИТАЦИЯ БАЗЫ ДАННЫХ)
const productsData = [
    {
        id: 1,
        name: 'Медовик "Ставропольский"',
        description: 'Нежный медовик с кремом из сметаны и вареной сгущенки. По бабушкиному рецепту.',
        price: 1200,
        weight: '1 кг',
        category: 'cake',
        image: 'img/medovik.webp',
        isPopular: true
    },
    {
        id: 2,
        name: 'Птичье молоко',
        description: 'Нежнейшее суфле на агар-агаре с шоколадной глазурью. Тает во рту!',
        price: 950,
        weight: '0.8 кг',
        category: 'cake',
        image: 'img/moloko.webp',
        isPopular: true
    },
    {
        id: 3,
        name: 'Наполеон',
        description: 'Классический слоеный торт с заварным кремом. 12 слоев теста!',
        price: 1100,
        weight: '1 кг',
        category: 'cake',
        image: 'img/napoleon.webp',
        isPopular: false
    },
    {
        id: 4,
        name: 'Красный бархат',
        description: 'Американская классика. Бархатистый бисквит со сливочным сыром.',
        price: 1350,
        weight: '1 кг',
        category: 'cake',
        image: 'img/redb.webp',
        isPopular: true
    },
    {
        id: 5,
        name: 'Макарунс (6 шт)',
        description: 'Французские пирожные из миндальной муки. Набор из 6 штук.',
        price: 650,
        weight: '0.2 кг',
        category: 'pastry',
        image: 'img/makaroons.jpg',
        isPopular: true
    },
    {
        id: 6,
        name: 'Эклеры (4 шт)',
        description: 'Заварные пирожные с заварным кремом и шоколадной глазурью.',
        price: 450,
        weight: '0.3 кг',
        category: 'pastry',
        image: 'img/eclers.jpg',
        isPopular: false
    },
    {
        id: 7,
        name: 'Чизкейк Нью-Йорк',
        description: 'Классический американский чизкейк с песочной основой.',
        price: 1400,
        weight: '1 кг',
        category: 'cake',
        image: 'img/cheesecake.png',
        isPopular: false
    },
    {
        id: 8,
        name: 'Печенье "Шоколадное"',
        description: 'Домашнее печенье с кусочками темного шоколада и морской солью.',
        price: 350,
        weight: '0.25 кг',
        category: 'cookie',
        image: 'img/shokobake.jpg',
        isPopular: false
    },
    {
        id: 9,
        name: 'Тирамису',
        description: 'Итальянский десерт с маскарпоне и кофе. Порция 200г.',
        price: 390,
        weight: '0.2 кг',
        category: 'pastry',
        image: 'img/tiramisu.webp',
        isPopular: true
    }
];

//ОТЗЫВЫ
const reviewsData = [
    {
        name: 'Елена',
        text: 'Заказывала медовик на день рождения мужа. Торт просто волшебный! Очень нежный, тает во рту. Доставка вовремя, курьер вежливый. Спасибо вашим кондитерам!',
        rating: 5
    },
    {
        name: 'Дмитрий',
        text: 'Пробовал макарунс - это любовь с первой секунды! Нежные, хрустящие, с правильной текстурой. Лучшие в Ставрополе, однозначно!',
        rating: 5
    },
    {
        name: 'Анна',
        text: 'Заказывала детский торт в виде мишки. Ребенок был в восторге! Вкусно и красиво. Спасибо за профессиональную работу!',
        rating: 5
    },
    {
        name: 'Сергей',
        text: 'Постоянно беру тут эклеры к чаю. Очень вкусные, нежные, крем как облачко. Рекомендую!',
        rating: 4
    }
];

//ПЕРЕМЕННЫЕ ДЛЯ МОДАЛЬНОГО ОКНА
let currentProduct = null;

//ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
function getCategoryName(category) {
    const names = {
        'cake': '🍰 Торт',
        'pastry': '🍮 Пирожное',
        'cookie': '🍪 Печенье'
    };
    return names[category] || category;
}

//СОЗДАНИЕ МОДАЛЬНОГО ОКНА
function createModal() {
    if (document.getElementById('orderModal')) return;
    
    const modalHTML = `
        <div id="orderModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3><span>🍰</span> Оформление заказа</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="order-summary" id="orderSummary">
                        <p>Вы заказываете:</p>
                        <p class="product-name" id="modalProductName">-</p>
                    </div>
                    <form id="orderForm">
                        <div class="form-group">
                            <label>Ваше имя <span>*</span></label>
                            <input type="text" id="customerName" required placeholder="Иван Иванов">
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Телефон <span>*</span></label>
                                <input type="tel" id="customerPhone" required placeholder="+7 (XXX) XXX-XX-XX">
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" id="customerEmail" placeholder="ivan@mail.ru">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Дата доставки</label>
                            <input type="date" id="deliveryDate">
                        </div>
                        <div class="form-group">
                            <label>Пожелания к заказу</label>
                            <textarea id="customerComment" placeholder="Например: надпись на торте, особенности декора..."></textarea>
                        </div>
                        <button type="submit" class="submit-btn">Отправить заявку</button>
                    </form>
                </div>
                <div class="modal-footer">
                    <p>📞 После отправки заявки наш кондитер свяжется с вами для уточнения деталей</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('orderModal');
    const closeBtn = modal.querySelector('.close-modal');
    const form = document.getElementById('orderForm');
    
    closeBtn.addEventListener('click', () => closeModal());
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    form.addEventListener('submit', handleOrderSubmit);
    
    const dateInput = document.getElementById('deliveryDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
}

//ОТКРЫТИЕ МОДАЛЬНОГО ОКНА
function openModal(productName) {
    currentProduct = productName;
    const modal = document.getElementById('orderModal');
    const productNameSpan = document.getElementById('modalProductName');
    
    if (productNameSpan) {
        productNameSpan.textContent = productName;
    }
    
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

//ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА
function closeModal() {
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        const form = document.getElementById('orderForm');
        if (form) form.reset();
        
        const modalBody = modal.querySelector('.modal-body');
        const originalContent = modal.querySelector('#orderForm');
        if (originalContent && modalBody.contains(originalContent)) {

        }
    }
}

//ОБРАБОТКА ОТПРАВКИ ЗАКАЗА
function handleOrderSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('customerName')?.value.trim();
    const phone = document.getElementById('customerPhone')?.value.trim();
    const email = document.getElementById('customerEmail')?.value.trim();
    const deliveryDate = document.getElementById('deliveryDate')?.value;
    const comment = document.getElementById('customerComment')?.value.trim();
    
    if (!name) {
        alert('Пожалуйста, введите ваше имя');
        return;
    }
    
    if (!phone) {
        alert('Пожалуйста, введите номер телефона');
        return;
    }
    
    const orderMessage = `
        🍰 НОВЫЙ ЗАКАЗ!
        
        📦 Товар: ${currentProduct}
        👤 Имя: ${name}
        📞 Телефон: ${phone}
        📧 Email: ${email || 'не указан'}
        📅 Дата доставки: ${deliveryDate || 'не указана'}
        💬 Пожелания: ${comment || 'нет'}
        
        ⏰ Отправлено из формы заказа кондитерской "Сладкая сказка" (Ставрополь)
    `;
    
    console.log('=== ЗАКАЗ ОТПРАВЛЕН ===');
    console.log(orderMessage);
    console.log('========================');

    
    showSuccessMessage(name, currentProduct);
}

//СООБЩЕНИЕ ОБ УСПЕШНОЙ ОТПРАВКЕ
function showSuccessMessage(customerName, productName) {
    const modal = document.getElementById('orderModal');
    const modalBody = modal.querySelector('.modal-body');
    const form = document.getElementById('orderForm');
    
    form.style.display = 'none';
    
    const successHTML = `
        <div class="success-message">
            <div class="success-icon">✅</div>
            <h4>Спасибо, ${customerName}!</h4>
            <p>Ваша заявка на <strong>${productName}</strong> успешно отправлена.</p>
            <p>Наш кондитер свяжется с вами в ближайшее время для уточнения деталей заказа.</p>
            <button class="btn" id="closeSuccessBtn" style="margin-top: 1.5rem;">Закрыть</button>
        </div>
    `;
    
    modalBody.insertAdjacentHTML('beforeend', successHTML);

    const closeBtn = document.getElementById('closeSuccessBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            form.style.display = 'block';
            const successMsg = modalBody.querySelector('.success-message');
            if (successMsg) successMsg.remove();
            closeModal();
        });
    }
    
    setTimeout(() => {
        if (modal.style.display === 'flex') {
            const closeBtn = document.getElementById('closeSuccessBtn');
            if (closeBtn) {
                closeBtn.click();
            } else {
                closeModal();
            }
        }
    }, 5000);
}

//ОТРИСОВКА ТОВАРОВ
function renderProducts(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = '<div class="empty-message">😢 Товары не найдены</div>';
        return;
    }
    
    container.innerHTML = products.map(product => `
        <div class="product-card" data-category="${product.category}" data-price="${product.price}" data-name="${product.name}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <span class="product-category">${getCategoryName(product.category)}</span>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">${product.price.toLocaleString()} ₽</div>
                <div class="product-weight">${product.weight}</div>
                <button class="btn order-btn" data-name="${product.name}">Заказать</button>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.order-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const cakeName = btn.dataset.name;
            openModal(cakeName);
        });
    });
}

//ОТРИСОВКА ОТЗЫВОВ
function renderReviews() {
    const container = document.getElementById('reviewsSlider');
    if (!container) return;
    
    container.innerHTML = reviewsData.map(review => `
        <div class="review-card">
            <div class="review-rating">${'⭐'.repeat(review.rating)}</div>
            <p class="review-text">"${review.text}"</p>
            <p class="review-author">— ${review.name}</p>
        </div>
    `).join('');
}

//ПОПУЛЯРНЫЕ ТОВАРЫ (ДЛЯ ГЛАВНОЙ)
function renderPopularProducts() {
    const popular = productsData.filter(p => p.isPopular).slice(0, 3);
    renderProducts(popular, 'featuredGrid');
}

//ВСЕ ТОВАРЫ (ДЛЯ КАТАЛОГА)
let currentFilter = 'all';
let currentSort = 'default';

function renderCatalog() {
    let filtered = [...productsData];
    
    if (currentFilter !== 'all') {
        filtered = filtered.filter(p => p.category === currentFilter);
    }
    
    switch(currentSort) {
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            filtered.sort((a, b) => a.id - b.id);
    }
    
    renderProducts(filtered, 'catalogGrid');
}

//КАЛЬКУЛЯТОР ВЕСА ТОРТА
function calculateCakePrice() {
    const diameter = parseFloat(document.getElementById('diameter')?.value) || 20;
    const layers = parseFloat(document.getElementById('layers')?.value) || 1;
    const complexity = parseFloat(document.getElementById('complexity')?.value) || 1;
    const resultDiv = document.getElementById('weightResult');
    
    if (!resultDiv) return;
    
    if (diameter < 10) {
        resultDiv.innerHTML = '❌ Диаметр должен быть не менее 10 см';
        return;
    }
    
    if (layers < 1 || layers > 3) {
        resultDiv.innerHTML = '❌ Количество ярусов от 1 до 3';
        return;
    }
    
    const radiusCm = diameter / 2;
    const area = Math.PI * radiusCm * radiusCm;
    const weightPerCm = 0.025; // кг на кв. см на ярус
    let weight = (area * weightPerCm * layers).toFixed(1);
    let basePrice = weight * 1300; // 1300 руб/кг
    let finalPrice = basePrice * complexity;
    
    resultDiv.innerHTML = `
        🎂 Ваш торт: ${diameter} см, ${layers} ярус(а)<br>
        📦 Примерный вес: ${weight} кг<br>
        💰 Стоимость: ${Math.round(finalPrice).toLocaleString()} ₽
    `;
}

//АНИМАЦИЯ ПРИ СКРОЛЛЕ
function initScrollAnimation() {
    const animatedElements = document.querySelectorAll('.animate');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
}

//ИНИЦИАЛИЗАЦИЯ
document.addEventListener('DOMContentLoaded', () => {
    createModal();
    
    initScrollAnimation();
    
    renderReviews();
    renderPopularProducts();
    
    if (document.getElementById('catalogGrid')) {
        renderCatalog();
        
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                renderCatalog();
            });
        });
        
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                currentSort = e.target.value;
                renderCatalog();
            });
        }
    }
    
    const calcBtn = document.getElementById('calcWeightBtn');
    if (calcBtn) {
        calcBtn.addEventListener('click', calculateCakePrice);
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});