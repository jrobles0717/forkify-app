import * as model from '../model.js';

import View from "./View.js";
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');
    _errorMessage = 'No recipes found for your query! Please try again ;)';
    _message = '';

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;
            const gotToPage = +btn.dataset.goto;
            handler(gotToPage);
        });
    }
    
    _generateMarkup() {
        const curPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        // Page 1, and there are other pages
        if (curPage === 1 && numPages > 1) {
            return this._generateMarkupButton(curPage, 'right');
        }
        
        
        // Last page
        if (curPage === numPages && numPages > 1) {
            return this._generateMarkupButton(curPage,'left');
        }
        // Other page
        if (curPage < numPages) {
            return this._generateMarkupButton(curPage,'both');
        }
        
        // Page 1, and there are NO other pages
        return '';
        
    }

    _generateMarkupButton(curPage, button) {
        const btnPage = button === 'left' ? curPage - 1 : curPage + 1;

        if (button === 'left' || button === 'right') {
            return `
            <button data-goto="${btnPage}" class="btn--inline pagination__btn--${button === 'left' ? 'prev' : 'next'}">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-${button}"></use>
                </svg>
                <span>Page ${btnPage}</span>
            </button>
            `;
        }
        if (button === 'both') {
            return `
            <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button>
            <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `;
        }
        return '';
    }
}

export default new PaginationView();