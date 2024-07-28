import View from "./View";
import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    _generateMarkup() {
        const currentPage = this._data.page;
        //page 1 -> There are other pages
        const numPages =  Math.ceil( this._data.results.length / this._data.resultsPerPage);
        if (currentPage == 1 && numPages > 1) {
            return this.#generatePostButton(currentPage);
        }
        
        //last page
        if (currentPage == numPages && numPages>1) {
            return this.#generatePreButton(currentPage);
        }
        //other page

        if (currentPage < numPages) {
            return `
            ${this.#generatePreButton(currentPage)}
            ${this.#generatePostButton(currentPage)}
            `
        }
        //page 1 -> There are no other pages
        return ""
    }
    #generatePreButton(currentPage) {
        return `
            <button data-goto="${currentPage - 1 }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage -1 }</span>
          </button>
            `
    }
    #generatePostButton(currentPage) {
        return `
            <button data-goto="${currentPage + 1 }" class="btn--inline pagination__btn--next">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
            <span>Page ${currentPage + 1 }</span>
          </button>
            `
    }

/**
 * 
 * @param {*} handler comes from controller for pagination
 */
    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (e) {
            //closts looks for parents
            const btn = e.target.closest('.btn--inline');
            
            if (!btn) return;

            const goToPage = +btn.dataset.goto;
            console.log(goToPage);
            handler(goToPage);
        })
    }
}

export default new PaginationView();