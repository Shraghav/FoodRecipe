import View from "./View";
import icons from 'url:../../img/icons.svg';
class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe')
    _btnClose = document.querySelector('.btn--close-modal')

    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerRemoveWindow();
    }
    toggleWindow() {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }
    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this))
    }
    _addHandlerRemoveWindow() {
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this))
        this._overlay.addEventListener('click', this.toggleWindow.bind(this))
    }
    addHandlerUpload(handler) {
        this._parentElement.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(this._parentElement);
            const dataArray = [...new FormData(this._parentElement)];
            const data = Object.fromEntries(dataArray);
            handler(data);
        })
    }
    _generateMarkup() {
        
    }
    #generatePreButton(currentPage) {
        return `
            <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
            `
    }
    #generatePostButton(currentPage) {
        return `
            <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
            <span>Page ${currentPage + 1}</span>
          </button>
            `
    }
}

export default new AddRecipeView();