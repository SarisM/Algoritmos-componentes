// Enum para los atributos que queremos mostrar
export enum Attribute {
    'photo' = 'photo',
}

class Storie extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.values(Attribute);
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    connectedCallback() { 
        this.render();   
    }

    render() {
        if (this.shadowRoot) {
            const photo = this.getAttribute(Attribute.photo) || 'Not found';
            

            this.shadowRoot.innerHTML = `
              <link rel="stylesheet" href="../src/components/card/card.css">
                <div class="post">
                    <div id="photo">
                        <img id="img" src="${photo}">
                    </div>
                    
                </div>
            `;
        }
    }

    
};

customElements.define('profile-storie', Storie);
export default Storie;
