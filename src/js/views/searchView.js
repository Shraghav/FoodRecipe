class SearchView {
    _parentEl = document.querySelector('.search');
    getQuery() {
        const val = this._parentEl.querySelector('.search__field').value;
        this._clearInput();
        return val;
    }
    _clearInput() {
        return this._parentEl.querySelector('.search__field').value = ' ';
    }
    addHandlerSearch(handler) {
        this._parentEl.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        })
    }
}
//exporting just the obj and not the entire class
export default new SearchView();