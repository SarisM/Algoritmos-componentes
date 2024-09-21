// Enum para los atributos que queremos manejar en el componente de búsqueda
export enum SearchAttribute {
    'placeholder' = 'placeholder', // para personalizar el texto en el input
}

class SearchBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });  // Adjuntar Shadow DOM
    }

    static get observedAttributes() {
        return Object.values(SearchAttribute); // Atributos observados para el componente
    }

    attributeChangedCallback(propName: SearchAttribute, oldValue: string | undefined, newValue: string | undefined) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    connectedCallback() {
        this.render();  // Renderiza la barra de búsqueda
    }

    render() {
        if (this.shadowRoot) {
            const placeholder = this.getAttribute(SearchAttribute.placeholder) || 'Search...';

            this.shadowRoot.innerHTML = `
                <div class="search-bar">
                    <input type="text" class="search-input" placeholder="${placeholder}">
                    <button class="search-button">Search</button>
                </div>
            `;
        }
    }
}

// Definir el nuevo custom element
customElements.define('search-bar', SearchBar);
export default SearchBar;
