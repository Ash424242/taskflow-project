// Array para almacenar gastos
let expenses = [];
let searchQuery = '';
const ALLOWED_CATEGORIES = ['Ocio', 'Supermercado', 'Hogar', 'Transporte'];
const MAX_TITLE_LENGTH = 60;
const MAX_AMOUNT = 1000000;
const dom = {};

/**
 * Inicializa la aplicación y registra todos los listeners.
 *
 * @returns {void}
 */
function initializeApp() {
    cacheDomElements();
    initializeEventListeners();

    // Aplicar el tema guardado al iniciar
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }

    loadExpenses();
}

/**
 * Cachea los nodos del DOM utilizados repetidamente.
 *
 * @returns {void}
 */
function cacheDomElements() {
    dom.expenseForm = document.getElementById('expense-form');
    dom.expenseInput = document.getElementById('expense-input');
    dom.amountInput = document.getElementById('expense-amount');
    dom.categoryInput = document.getElementById('expense-category');
    dom.formError = document.getElementById('form-error');
    dom.expenseList = document.getElementById('expense-list');
    dom.searchInput = document.getElementById('search-input');
    dom.resetExpensesButton = document.getElementById('reset-expenses-button');
    dom.themeToggle = document.getElementById('theme-toggle');
}

/**
 * Vincula los eventos de UI con handlers con nombre.
 *
 * @returns {void}
 */
function initializeEventListeners() {
    dom.expenseForm.addEventListener('submit', handleFormSubmit);
    dom.expenseInput.addEventListener('input', clearFormError);
    dom.amountInput.addEventListener('input', clearFormError);
    dom.categoryInput.addEventListener('change', clearFormError);

    dom.expenseList.addEventListener('click', handleExpenseListClick);
    dom.expenseList.addEventListener('dragstart', handleExpenseListDragStart);
    dom.expenseList.addEventListener('dragover', handleExpenseListDragOver);
    dom.expenseList.addEventListener('dragend', handleExpenseListDragEnd);
    dom.expenseList.addEventListener('drop', handleExpenseListDrop);

    dom.searchInput.addEventListener('input', handleSearchInput);
    dom.resetExpensesButton.addEventListener('click', handleResetExpensesClick);
    dom.themeToggle.addEventListener('click', handleThemeToggleClick);
}

document.addEventListener('DOMContentLoaded', initializeApp);

/**
 * Carga los gastos guardados en localStorage y normaliza su estructura
 * antes de pintar la lista.
 *
 * @returns {void}
 */
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

/**
 * Comprueba si un objeto tiene la forma mínima necesaria para tratarse
 * como un gasto válido dentro de la aplicación.
 *
 * @param {{ title?: string, amount?: number|string, category?: string } | null | undefined} expense
 * @returns {boolean}
 */
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

/**
 * Convierte un gasto crudo a la estructura usada internamente por la app.
 *
 * @param {{ title: string, amount: number|string, category: string }} expense
 * @returns {{ title: string, amount: number, category: string }}
 */
function normalizeExpense(expense) {
    return {
        title: expense.title.trim(),
        amount: Number(expense.amount),
        category: expense.category
    };
}

/**
 * Valida los datos de un gasto antes de guardarlo o reutilizarlo.
 *
 * @param {{ title: string, amount: number, category: string }} expense
 * @returns {string | null}
 */
function validateExpenseData(expense) {
    const normalizedTitle = typeof expense.title === 'string' ? expense.title.trim() : '';

    const validationRules = [
        {
            isInvalid: () => normalizedTitle.length < 2,
            message: 'El nombre del gasto debe tener al menos 2 caracteres.'
        },
        {
            isInvalid: () => normalizedTitle.length > MAX_TITLE_LENGTH,
            message: `El nombre del gasto no puede superar los ${MAX_TITLE_LENGTH} caracteres.`
        },
        {
            isInvalid: () => !Number.isFinite(expense.amount) || expense.amount <= 0,
            message: 'El importe debe ser un número mayor que 0.'
        },
        {
            isInvalid: () => expense.amount > MAX_AMOUNT,
            message: `El importe no puede superar ${MAX_AMOUNT.toLocaleString('es-ES')} €.`
        },
        {
            isInvalid: () => !ALLOWED_CATEGORIES.includes(expense.category),
            message: 'La categoría seleccionada no es válida.'
        }
    ];

    const failedRule = validationRules.find((rule) => rule.isInvalid());
    if (failedRule) {
        return failedRule.message;
    }

    return null;
}

/**
 * Muestra un mensaje de error visible en el formulario.
 *
 * @param {string} message
 * @returns {void}
 */
function setFormError(message) {
    dom.formError.textContent = message;
    dom.formError.classList.remove('hidden');
}

/**
 * Limpia el mensaje de error activo del formulario.
 *
 * @returns {void}
 */
function clearFormError() {
    dom.formError.textContent = '';
    dom.formError.classList.add('hidden');
}

/**
 * Persiste la lista actual de gastos en localStorage.
 *
 * @returns {void}
 */
function saveExpenses() {
    localStorage.setItem('gastos', JSON.stringify(expenses));
}

// Variable para rastrear el elemento que se está arrastrando
let draggedExpenseIndex = null;
let draggedExpenseElement = null;

/**
 * Devuelve la clase de color correspondiente a una categoría.
 *
 * @param {string} category
 * @returns {string}
 */
function getCategoryBg(category) {
    switch (category) {
        case 'Ocio': return 'bg-purple-100 dark:bg-purple-700';
        case 'Hogar': return 'bg-green-100 dark:bg-green-700';
        case 'Transporte': return 'bg-blue-100 dark:bg-blue-700';
        case 'Supermercado': return 'bg-yellow-100 dark:bg-yellow-700';
        default: return 'bg-gray-100 dark:bg-gray-700';
    }
}

/**
 * Crea un span configurado para el título del gasto.
 *
 * @param {string} title
 * @returns {HTMLSpanElement}
 */
function createExpenseTitleElement(title) {
    const titleElement = document.createElement('span');
    titleElement.className = 'flex-1 font-semibold text-gray-800 dark:text-gray-100 truncate pr-4';
    titleElement.textContent = title;
    return titleElement;
}

/**
 * Crea el badge visual del importe.
 *
 * @param {number} amount
 * @returns {HTMLSpanElement}
 */
function createExpenseAmountElement(amount) {
    const amountElement = document.createElement('span');
    amountElement.className = 'w-24 text-right font-bold text-blue-600 dark:text-blue-400 px-3 py-1 bg-blue-50 dark:bg-blue-950 rounded-full mr-2';
    amountElement.textContent = `${parseFloat(amount).toFixed(2)} €`;
    return amountElement;
}

/**
 * Crea el badge visual de la categoría.
 *
 * @param {string} category
 * @returns {HTMLSpanElement}
 */
function createExpenseCategoryElement(category) {
    const categoryElement = document.createElement('span');
    categoryElement.className = `w-32 text-center px-3 py-1 ${getCategoryBg(category)} text-gray-600 dark:text-gray-300 rounded-full text-xs font-semibold`;
    categoryElement.textContent = category;
    return categoryElement;
}

/**
 * Crea el botón de borrado de una fila de gasto.
 *
 * @param {number} index
 * @returns {HTMLButtonElement}
 */
function createExpenseDeleteButton(index) {
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'expense-delete w-10 text-center text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:rounded focus-visible:outline-none';
    deleteButton.setAttribute('data-index', index);
    deleteButton.setAttribute('aria-label', 'Eliminar gasto');
    deleteButton.textContent = '×';
    return deleteButton;
}

/**
 * Construye el nodo DOM que representa un gasto dentro del listado.
 *
 * @param {{ title: string, amount: number, category: string }} expense
 * @param {number} index
 * @returns {HTMLDivElement}
 */
function createExpenseElement(expense, index) {
    const expenseElement = document.createElement('div');

    expenseElement.className = `flex items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:shadow-md ${searchQuery ? 'cursor-default' : 'cursor-move'}`;
    expenseElement.draggable = !searchQuery;
    expenseElement.setAttribute('data-expense-index', index);

    const titleElement = createExpenseTitleElement(expense.title);
    const amountElement = createExpenseAmountElement(expense.amount);
    const categoryElement = createExpenseCategoryElement(expense.category);
    const deleteButton = createExpenseDeleteButton(index);

    expenseElement.append(titleElement, amountElement, categoryElement, deleteButton);

    return expenseElement;
}

/**
 * Indica si un gasto coincide con la búsqueda activa.
 *
 * @param {{ title: string, category: string }} expense
 * @returns {boolean}
 */
function matchesSearchQuery(expense) {
    if (!searchQuery) {
        return true;
    }

    const normalizedQuery = searchQuery.toLowerCase();
    const titleMatch = expense.title.toLowerCase().includes(normalizedQuery);
    const categoryMatch = expense.category.toLowerCase().includes(normalizedQuery);

    return titleMatch || categoryMatch;
}

/**
 * Crea un mensaje de estado vacío contextual según el filtro activo.
 *
 * @returns {HTMLDivElement}
 */
function createEmptyStateElement() {
    const emptyStateElement = document.createElement('div');
    emptyStateElement.className = 'rounded-xl border border-dashed border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 p-6 text-center text-gray-600 dark:text-gray-300';

    const titleElement = document.createElement('p');
    titleElement.className = 'font-semibold text-gray-800 dark:text-gray-100';

    const descriptionElement = document.createElement('p');
    descriptionElement.className = 'mt-1 text-sm';

    if (searchQuery) {
        titleElement.textContent = 'No hay resultados para esta búsqueda.';
        descriptionElement.textContent = 'Prueba con otro término o borra el filtro para ver todos los gastos.';
    } else {
        titleElement.textContent = 'Aún no has registrado gastos.';
        descriptionElement.textContent = 'Añade tu primer gasto desde el formulario lateral.';
    }

    emptyStateElement.append(titleElement, descriptionElement);
    return emptyStateElement;
}

/**
 * Renderiza la lista visible de gastos teniendo en cuenta el filtro actual.
 *
 * @returns {void}
 */
function renderExpenses() {
    dom.expenseList.innerHTML = '';
    let visibleExpenses = 0;
    
    expenses.forEach((expense, index) => {
        if (!matchesSearchQuery(expense)) {
            return;
        }

        const expenseElement = createExpenseElement(expense, index);
        dom.expenseList.appendChild(expenseElement);
        visibleExpenses += 1;
    });

    if (visibleExpenses === 0) {
        dom.expenseList.appendChild(createEmptyStateElement());
    }
}

/**
 * Lee y normaliza los datos actuales del formulario.
 *
 * @returns {{ title: string, amount: number, category: string }}
 */
function getExpenseDataFromForm() {
    return {
        title: dom.expenseInput.value,
        amount: Number(dom.amountInput.value),
        category: dom.categoryInput.value
    };
}

/**
 * Enfoca el campo del formulario asociado al error de validación.
 *
 * @param {string} validationError
 * @returns {void}
 */
function focusFieldForValidationError(validationError) {
    if (validationError.includes('nombre')) {
        dom.expenseInput.focus();
        return;
    }

    if (validationError.includes('importe')) {
        dom.amountInput.focus();
        return;
    }

    dom.categoryInput.focus();
}

/**
 * Guarda un gasto válido y actualiza la vista.
 *
 * @param {{ title: string, amount: number, category: string }} expenseData
 * @returns {void}
 */
function persistExpense(expenseData) {
    expenses.push(normalizeExpense(expenseData));
    saveExpenses();
    renderExpenses();
}

/**
 * Restaura el formulario a su estado inicial tras un guardado exitoso.
 *
 * @returns {void}
 */
function resetExpenseForm() {
    dom.expenseInput.value = '';
    dom.amountInput.value = '';
    dom.categoryInput.value = ALLOWED_CATEGORIES[0];
    dom.expenseInput.focus();
}

/**
 * Maneja el envío del formulario de alta de gasto.
 *
 * @param {SubmitEvent} e
 * @returns {void}
 */
function handleFormSubmit(e) {
    e.preventDefault();
    const expenseData = getExpenseDataFromForm();
    const validationError = validateExpenseData(expenseData);

    if (validationError) {
        setFormError(validationError);
        focusFieldForValidationError(validationError);
        return;
    }

    clearFormError();
    persistExpense(expenseData);
    resetExpenseForm();
}

/**
 * Maneja las acciones delegadas del listado (por ahora, eliminar gasto).
 *
 * @param {MouseEvent} e
 * @returns {void}
 */
function handleExpenseListClick(e) {
    const deleteButton = e.target.closest('.expense-delete');
    if (!deleteButton) {
        return;
    }

    const index = parseInt(deleteButton.getAttribute('data-index'), 10);
    expenses.splice(index, 1);
    saveExpenses();
    renderExpenses();
}

/**
 * Inicia el estado de drag sobre un gasto.
 *
 * @param {DragEvent} e
 * @returns {void}
 */
function handleExpenseListDragStart(e) {
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
}

/**
 * Reposiciona visualmente el elemento arrastrado durante el movimiento.
 *
 * @param {DragEvent} e
 * @returns {void}
 */
function handleExpenseListDragOver(e) {
    if (!draggedExpenseElement) {
        return;
    }

    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    const afterElement = getDragAfterElement(dom.expenseList, e.clientY);
    const expenseList = dom.expenseList;
    
    if (afterElement == null) {
        expenseList.appendChild(draggedExpenseElement);
    } else {
        expenseList.insertBefore(draggedExpenseElement, afterElement);
    }
}

/**
 * Limpia el estado del drag al finalizar una interacción.
 *
 * @returns {void}
 */
function handleExpenseListDragEnd() {
    if (!draggedExpenseElement) {
        return;
    }

    draggedExpenseElement.classList.remove('dragging');
    draggedExpenseElement.style.opacity = '1';
    draggedExpenseElement = null;
    draggedExpenseIndex = null;
}

/**
 * Confirma el nuevo orden de gastos cuando se suelta un elemento.
 *
 * @param {DragEvent} e
 * @returns {void}
 */
function handleExpenseListDrop(e) {
    if (!draggedExpenseElement || searchQuery) {
        return;
    }

    e.preventDefault();
    
    const allExpenseElements = [...dom.expenseList.children];
    
    // Encontrar el nuevo índice basado en la posición del elemento
    const newIndex = allExpenseElements.indexOf(draggedExpenseElement);

    if (newIndex === -1) {
        return;
    }
    
    // Reordenar el array de gastos
    if (draggedExpenseIndex !== newIndex && draggedExpenseIndex !== null) {
        const [draggedExpense] = expenses.splice(draggedExpenseIndex, 1);
        expenses.splice(newIndex, 0, draggedExpense);
        saveExpenses();
        renderExpenses();
    }
}

/**
 * Calcula el elemento de referencia sobre el que debe insertarse el gasto
 * arrastrado según la posición vertical del cursor.
 *
 * @param {HTMLElement} container
 * @param {number} y
 * @returns {Element | undefined}
 */
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

/**
 * Actualiza el texto de búsqueda y repinta la lista.
 *
 * @param {Event} e
 * @returns {void}
 */
function handleSearchInput(e) {
    searchQuery = e.target.value.trim().toLowerCase();
    renderExpenses();
}

/**
 * Elimina todos los gastos tras confirmar la acción con el usuario.
 *
 * @returns {void}
 */
function handleResetExpensesClick() {
    if (expenses.length === 0) {
        return;
    }

    const userConfirmed = window.confirm('¿Seguro que quieres borrar todos los gastos? Esta acción no se puede deshacer.');
    if (!userConfirmed) {
        return;
    }

    expenses = [];
    searchQuery = '';
    dom.searchInput.value = '';
    saveExpenses();
    renderExpenses();
}

/**
 * Alterna entre tema claro y oscuro y persiste la preferencia.
 *
 * @returns {void}
 */
function handleThemeToggleClick() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}