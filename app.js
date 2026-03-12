// Array para almacenar gastos
let expenses = [];
let searchQuery = '';
const ALLOWED_CATEGORIES = ['Ocio', 'Supermercado', 'Hogar', 'Transporte'];
const MAX_TITLE_LENGTH = 60;
const MAX_AMOUNT = 1000000;

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
    if (!expense || typeof expense.title !== 'string' || typeof expense.category !== 'string') {
        return false;
    }

    return validateExpenseData({
        title: expense.title,
        amount: Number(expense.amount),
        category: expense.category
    }) === null;
}

function normalizeExpense(expense) {
    return {
        title: expense.title.trim(),
        amount: Number(expense.amount),
        category: expense.category
    };
}

function validateExpenseData(expense) {
    const normalizedTitle = typeof expense.title === 'string' ? expense.title.trim() : '';

    if (normalizedTitle.length < 2) {
        return 'El nombre del gasto debe tener al menos 2 caracteres.';
    }

    if (normalizedTitle.length > MAX_TITLE_LENGTH) {
        return `El nombre del gasto no puede superar los ${MAX_TITLE_LENGTH} caracteres.`;
    }

    if (!Number.isFinite(expense.amount) || expense.amount <= 0) {
        return 'El importe debe ser un número mayor que 0.';
    }

    if (expense.amount > MAX_AMOUNT) {
        return `El importe no puede superar ${MAX_AMOUNT.toLocaleString('es-ES')} €.`;
    }

    if (!ALLOWED_CATEGORIES.includes(expense.category)) {
        return 'La categoría seleccionada no es válida.';
    }

    return null;
}

function setFormError(message) {
    const errorElement = document.getElementById('form-error');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

function clearFormError() {
    const errorElement = document.getElementById('form-error');
    errorElement.textContent = '';
    errorElement.classList.add('hidden');
}

// Función para guardar gastos en localStorage
function saveExpenses() {
    localStorage.setItem('gastos', JSON.stringify(expenses));
}

// Variable para rastrear el elemento que se está arrastrando
let draggedExpenseIndex = null;
let draggedExpenseElement = null;

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

    expenseElement.className = `flex items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:shadow-md ${searchQuery ? 'cursor-default' : 'cursor-move'}`;
    expenseElement.draggable = !searchQuery;
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

function matchesSearchQuery(expense) {
    return expense.title.toLowerCase().includes(searchQuery);
}

// Función para renderizar gastos
function renderExpenses() {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';
    
    expenses.forEach((expense, index) => {
        if (!matchesSearchQuery(expense)) {
            return;
        }

        const expenseElement = createExpenseElement(expense, index);
        expenseList.appendChild(expenseElement);
    });
}

// Añadir event listener al formulario
document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('expense-input');
    const amountInput = document.getElementById('expense-amount');
    const categoryInput = document.getElementById('expense-category');
    
    const expenseData = {
        title: input.value,
        amount: Number(amountInput.value),
        category: categoryInput.value
    };
    const validationError = validateExpenseData(expenseData);

    if (validationError) {
        setFormError(validationError);

        if (validationError.includes('nombre')) {
            input.focus();
        } else if (validationError.includes('importe')) {
            amountInput.focus();
        } else {
            categoryInput.focus();
        }

        return;
    }

    clearFormError();
    expenses.push(normalizeExpense(expenseData));
    saveExpenses();
    renderExpenses();

    input.value = '';
    amountInput.value = '';
    categoryInput.value = ALLOWED_CATEGORIES[0];
    input.focus();
});

document.getElementById('expense-input').addEventListener('input', clearFormError);
document.getElementById('expense-amount').addEventListener('input', clearFormError);
document.getElementById('expense-category').addEventListener('change', clearFormError);

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
    const expenseElement = e.target.closest('[data-expense-index]');
    if (!expenseElement || searchQuery) {
        e.preventDefault();
        return;
    }

    draggedExpenseIndex = parseInt(expenseElement.getAttribute('data-expense-index'), 10);
    draggedExpenseElement = expenseElement;
    draggedExpenseElement.classList.add('dragging');
    draggedExpenseElement.style.opacity = '0.5';
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(draggedExpenseIndex));
});

document.getElementById('expense-list').addEventListener('dragover', function(e) {
    if (!draggedExpenseElement) {
        return;
    }

    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    const afterElement = getDragAfterElement(this, e.clientY);
    const expenseList = this;
    
    if (afterElement == null) {
        expenseList.appendChild(draggedExpenseElement);
    } else {
        expenseList.insertBefore(draggedExpenseElement, afterElement);
    }
});

document.getElementById('expense-list').addEventListener('dragend', function(e) {
    if (!draggedExpenseElement) {
        return;
    }

    draggedExpenseElement.classList.remove('dragging');
    draggedExpenseElement.style.opacity = '1';
    draggedExpenseElement = null;
    draggedExpenseIndex = null;
});

document.getElementById('expense-list').addEventListener('drop', function(e) {
    if (!draggedExpenseElement || searchQuery) {
        return;
    }

    e.preventDefault();
    
    const allExpenseElements = document.querySelectorAll('#expense-list > div');
    
    // Encontrar el nuevo índice basado en la posición del elemento
    let newIndex = 0;
    allExpenseElements.forEach((element, index) => {
        if (element === draggedExpenseElement) {
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
    searchQuery = this.value.trim().toLowerCase();
    renderExpenses();
});

// Alternar tema y guardar en localStorage
document.getElementById('theme-toggle').addEventListener('click', function() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});