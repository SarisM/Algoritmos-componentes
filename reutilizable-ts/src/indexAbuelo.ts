import recipes from './data/data';
import Post, { Attribute } from './components/card/card';
import { SearchBar } from './components/search-bar/searchBar'; //Aqui se pone rojito y no he podido arreglarlo

class AppContainer extends HTMLElement {
    recipesList: Post[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Crear el listado de recetas y asociarlas a los componentes Post
        recipes.forEach(recipe => {
            const postElement = this.ownerDocument.createElement("component-post") as Post;
            postElement.setAttribute(Attribute.photo, recipe.photo);
            postElement.setAttribute(Attribute.userName, recipe.userName);
            postElement.setAttribute(Attribute.recipeName, recipe.recipeName);
            
            this.recipesList.push(postElement);
        });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../src/styles.css">
                
                <search-bar placeholder="Search for a recipe..."></search-bar>

                <div id="component-post"></div>
            `;

            const container = this.shadowRoot.querySelector("#component-post");

            this.recipesList.forEach(recipe => {
                if (container) {
                    container.appendChild(recipe);
                }
            });
        }
    }
}

customElements.define('app-container', AppContainer);
export default AppContainer;
