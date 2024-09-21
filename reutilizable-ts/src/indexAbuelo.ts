import recipes from './data/data';
import stories from './data/dataProfile'; 
import Post, { Attribute } from './components/card/card';
import Storie from './components/profileStorie/storie';
import { SearchBar } from './components/search-bar/searchBar'; //Aqui se pone rojito y no he podido arreglarlo

class AppContainer extends HTMLElement {
    recipesList: Post[] = [];
    storiesList: HTMLElement[] = []; // Cambiado a HTMLElement[]

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Crear el listado de recetas
        recipes.forEach(recipe => {
            const postElement = this.ownerDocument.createElement("component-post") as Post;
            postElement.setAttribute(Attribute.photo, recipe.photo);
            postElement.setAttribute(Attribute.userName, recipe.userName);
            postElement.setAttribute(Attribute.recipeName, recipe.recipeName);
            this.recipesList.push(postElement);
        });

        // Crear el listado de historias
        stories.forEach(story => {
            const storyElement = this.ownerDocument.createElement("profile-storie") as Storie; 
            storyElement.setAttribute(Attribute.photo, story.photo);
            this.storiesList.push(storyElement);
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
                <div id="story-container"></div> 
                <div id="component-post"></div>
            `;

            const storyContainer = this.shadowRoot.querySelector("#story-container");
            const postContainer = this.shadowRoot.querySelector("#component-post");

            // Añadir historias al contenedor
            this.storiesList.forEach(story => {
                if (storyContainer) {
                    storyContainer.appendChild(story);
                }
            });

            // Añadir recetas al contenedor
            this.recipesList.forEach(recipe => {
                if (postContainer) {
                    postContainer.appendChild(recipe);
                }
            });
        }
    }
}

customElements.define('app-container', AppContainer);
export default AppContainer;
