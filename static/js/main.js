/**
 * Smart Car Dealership - Main JavaScript
 * Handles frontend interactions, AJAX calls, and UI enhancements
 */

// Auto-dismiss alerts after 4 seconds
document.addEventListener('DOMContentLoaded', function () {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(function (alert) {
        setTimeout(function () {
            alert.classList.add('fade');
            setTimeout(function () {
                alert.remove();
            }, 300);
        }, 4000);
    });
});

// Confirm destructive actions (reject, cancel, remove)
document.querySelectorAll('form').forEach(function (form) {
    const rejectBtn = form.querySelector('[value="reject"]');
    if (rejectBtn) {
        rejectBtn.addEventListener('click', function (e) {
            if (!confirm('Are you sure you want to reject this transaction?')) {
                e.preventDefault();
            }
        });
    }
});

// Add confirmation for cancel buttons
document.querySelectorAll('button[data-confirm]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        if (!confirm(btn.dataset.confirm)) {
            e.preventDefault();
        }
    });
});

// Car Filter - live search with debounce
const searchInput = document.querySelector('input[name="search"]');
let debounceTimer;

if (searchInput) {
    searchInput.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function () {
            // Optionally auto-submit the form after typing
            // form = searchInput.closest('form');
            // if (form && searchInput.value.length > 2) form.submit();
        }, 500);
    });
}

// API helper for fetching car data (used in search, filters)
async function fetchCars(params) {
    try {
        const url = new URL('/cars/api/list', window.location.origin);
        Object.keys(params).forEach(key => {
            if (params[key]) url.searchParams.append(key, params[key]);
        });

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch cars');

        return await response.json();
    } catch (error) {
        console.error('Error fetching cars:', error);
        return [];
    }
}

// Toggle password visibility on login/register pages
const toggleBtns = document.querySelectorAll('[data-toggle-password]');
toggleBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        const target = document.querySelector(btn.dataset.target);
        if (target) {
            const type = target.type === 'password' ? 'text' : 'password';
            target.type = type;
            btn.innerHTML = type === 'password' ? '<i class="bi bi-eye"></i>' : '<i class="bi bi-eye-slash"></i>';
        }
    });
});

// Set minimum date for test drive booking to today
const dateInput = document.querySelector('input[type="datetime-local"]');
if (dateInput) {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    dateInput.min = now.toISOString().slice(0, 16);
}

// Highlight active nav item based on current URL
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-link').forEach(function (link) {
    if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
    }
});