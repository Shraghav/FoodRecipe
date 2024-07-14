class SearchView {
    #parentEl = document.querySelector('.search');
    getQuery() {
        const val = this.#parentEl.querySelector('.search__field').value;
        this.#clearInput();
        return val;
    }
    #clearInput() {
        return this.#parentEl.querySelector('.search__field').value = ' ';
    }
    addHandlerSearch(handler) {
        this.#parentEl.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        })
    }
}
//exporting just the obj and not the entire class
export default new SearchView();