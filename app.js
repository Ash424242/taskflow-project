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
    if (!storedExpenses) {
        renderExpenses();
        return;
    }

    try {
        const parsedExpenses = JSON.parse(storedExpenses);

        if (!Array.isArray(parsedExpenses)) {
            throw new Error('La lista de gastos almacenada no es válida');
        }

        expenses = parsedExpenses.filter(isValidExpense).map(normalizeExpense);
    } catch (error) {
        console.error('No se pudieron cargar los gastos guardados:', error);
        expenses = [];
        localStorage.removeItem('gastos');
    }

    renderExpenses();
}

function isValidExpense(expense) {
    return Boolean(
        expense
        && typeof expense.title === 'string'
        && expense.title.trim()
        && Number.isFinite(Number(expense.amount))
        && typeof expense.category === 'string'
    );
}

function normalizeExpense(expense) {
    return {
        title: expense.title.trim(),
        amount: Number(expense.amount),
        category: expense.category
    };
}

// Función para guardar gastos en localStorage
function saveExpenses() {
    localStorage.setItem('gastos', JSON.stringify(expenses));
}

// Variable para rastrear el elemento que se está arrastrando
let draggedExpenseIndex = null;

function getCategoryBg(category) {
    switch (category) {
        case 'Ocio': return 'bg-purple-100 dark:bg-purple-700';
        case 'Hogar': return 'bg-green-100 dark:bg-green-700';
        case 'Transporte': return 'bg-blue-100 dark:bg-blue-700';
        case 'Supermercado': return 'bg-yellow-100 dark:bg-yellow-700';
        default: return 'bg-gray-100 dark:bg-gray-700';
    }
}

function createExpenseElement(expense, index) {
    const expenseElement = document.createElement('div');
    const titleElement = document.createElement('span');
    const amountElement = document.createElement('span');
    const categoryElement = document.createElement('span');
    const deleteButton = document.createElement('button');

    expenseElement.className = 'flex items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:shadow-md cursor-move';
    expenseElement.draggable = true;
    expenseElement.setAttribute('data-expense-index', index);

    titleElement.className = 'flex-1 font-semibold text-gray-800 dark:text-gray-100 truncate pr-4';
    titleElement.textContent = expense.title;

    amountElement.className = 'w-24 text-right font-bold text-blue-600 dark:text-blue-400 px-3 py-1 bg-blue-50 dark:bg-blue-950 rounded-full mr-2';
    amountElement.textContent = `${parseFloat(expense.amount).toFixed(2)} €`;

    categoryElement.className = `w-32 text-center px-3 py-1 ${getCategoryBg(expense.category)} text-gray-600 dark:text-gray-300 rounded-full text-xs font-semibold`;
    categoryElement.textContent = expense.category;

    deleteButton.type = 'button';
    deleteButton.className = 'expense-delete w-10 text-center text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:rounded focus-visible:outline-none';
    deleteButton.setAttribute('data-index', index);
    deleteButton.setAttribute('aria-label', 'Eliminar gasto');
    deleteButton.textContent = '×';

    expenseElement.append(titleElement, amountElement, categoryElement, deleteButton);

    return expenseElement;
}

// Función para renderizar gastos
function renderExpenses() {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';
    
    expenses.forEach((expense, index) => {
        const expenseElement = createExpenseElement(expense, index);
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

// Delegación de eventos para eliminar y drag & drop
document.getElementById('expense-list').addEventListener('click', function(e) {
    if (e.target.classList.contains('expense-delete')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        expenses.splice(index, 1);
        saveExpenses();
        renderExpenses();
    }
});

// Eventos de drag & drop
document.getElementById('expense-list').addEventListener('dragstart', function(e) {
    if (e.target.getAttribute('data-expense-index') !== null) {
        draggedExpenseIndex = parseInt(e.target.getAttribute('data-expense-index'));
        e.target.style.opacity = '0.5';
        e.dataTransfer.effectAllowed = 'move';
    }
});

document.getElementById('expense-list').addEventListener('dragover', function(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    const afterElement = getDragAfterElement(this, e.clientY);
    const expenseList = this;
    const draggedElement = document.querySelector(`[data-expense-index="${draggedExpenseIndex}"]`);
    
    if (afterElement == null) {
        expenseList.appendChild(draggedElement);
    } else {
        expenseList.insertBefore(draggedElement, afterElement);
    }
});

document.getElementById('expense-list').addEventListener('dragend', function(e) {
    const draggingElement = document.querySelector('[data-expense-index]');
    if (draggingElement) {
        draggingElement.style.opacity = '1';
    }
});

document.getElementById('expense-list').addEventListener('drop', function(e) {
    e.preventDefault();
    
    const draggedElement = document.querySelector(`[data-expense-index="${draggedExpenseIndex}"]`);
    const allExpenseElements = document.querySelectorAll('#expense-list > div');
    
    // Encontrar el nuevo índice basado en la posición del elemento
    let newIndex = 0;
    allExpenseElements.forEach((element, index) => {
        if (element === draggedElement) {
            newIndex = index;
        }
    });
    
    // Reordenar el array de gastos
    if (draggedExpenseIndex !== newIndex && draggedExpenseIndex !== null) {
        const [draggedExpense] = expenses.splice(draggedExpenseIndex, 1);
        expenses.splice(newIndex, 0, draggedExpense);
        saveExpenses();
        renderExpenses();
    }
    
    draggedExpenseIndex = null;
});

// Función auxiliar para determinar después de cuál elemento debe insertarse
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('[data-expense-index]:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

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