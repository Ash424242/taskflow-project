// Array para almacenar gastos
let expenses = [];

// Cargar gastos desde localStorage al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Aplicar el tema guardado al iniciar
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }
    loadExpenses();
});

// Función para cargar gastos desde localStorage
function loadExpenses() {
    const storedExpenses = localStorage.getItem('gastos');
    if (storedExpenses) {
        expenses = JSON.parse(storedExpenses);
        renderExpenses();
    }
}

// Función para guardar gastos en localStorage
function saveExpenses() {
    localStorage.setItem('gastos', JSON.stringify(expenses));
}

// Función para renderizar gastos
function renderExpenses() {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';
    
    expenses.forEach((expense, index) => {
        const expenseElement = document.createElement('div');
        // Estructura Flexbox para alinear todo en columnas:
        // 1. Título (flex-1)
        // 2. Importe (w-24)
        // 3. Categoría (w-32)
        // 4. Botón (w-10)
        expenseElement.className = 'flex items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:shadow-md';
        
        const amountText = parseFloat(expense.amount).toFixed(2);

        // Función para obtener el color de fondo de la categoría
        function getCategoryBg(category) {
            switch (category) {
                case 'Ocio': return 'bg-purple-100 dark:bg-purple-700';
                case 'Hogar': return 'bg-green-100 dark:bg-green-700';
                case 'Transporte': return 'bg-blue-100 dark:bg-blue-700';
                case 'Supermercado': return 'bg-yellow-100 dark:bg-yellow-700';
                default: return 'bg-gray-100 dark:bg-gray-700';
            }
        }

        const categoryBg = getCategoryBg(expense.category);

        expenseElement.innerHTML = `
            <span class="flex-1 font-semibold text-gray-800 dark:text-gray-100 truncate pr-4">${expense.title}</span>
            
            <!-- Columna Importe (ancho fijo para alineación) -->
            <span class="w-24 text-right font-bold text-blue-600 dark:text-blue-400 px-3 py-1 bg-blue-50 dark:bg-blue-950 rounded-full mr-2">
                ${amountText} €
            </span>
            
            <!-- Columna Categoría (ancho fijo) -->
            <span class="w-32 text-center px-3 py-1 ${categoryBg} text-gray-600 dark:text-gray-300 rounded-full text-xs font-semibold">
                ${expense.category}
            </span>
            
            <!-- Columna Botón -->
            <button class="expense-delete w-10 text-center text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors" data-index="${index}">&times;</button>
        `;
        expenseList.appendChild(expenseElement);
    });
}

// Añadir event listener al formulario
document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('expense-input');
    const amountInput = document.getElementById('expense-amount');
    const category = document.getElementById('expense-category').value;
    
    const title = input.value.trim();
    const amount = parseFloat(amountInput.value);

    if (title && !isNaN(amount)) {
        expenses.push({ title, amount, category });
        saveExpenses();
        renderExpenses();
        
        input.value = '';
        amountInput.value = '';
    }
});

// Delegación de eventos para eliminar
document.getElementById('expense-list').addEventListener('click', function(e) {
    if (e.target.classList.contains('expense-delete')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        expenses.splice(index, 1);
        saveExpenses();
        renderExpenses();
    }
});

// Funcionalidad de búsqueda
document.getElementById('search-input').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const expenseElements = document.querySelectorAll('#expense-list > div');
    expenseElements.forEach(expense => {
        const title = expense.querySelector('span:first-child').textContent.toLowerCase();
        expense.style.display = title.includes(query) ? 'flex' : 'none';
    });
});

// Alternar tema y guardar en localStorage
document.getElementById('theme-toggle').addEventListener('click', function() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});