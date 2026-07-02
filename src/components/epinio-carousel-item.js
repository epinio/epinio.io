import { LitElement, html, css } from 'lit';

export class EpinioCarouselItem extends LitElement {
    static get properties() {
        return {
            eyebrow:     { type: String, attribute: true },
            title:       { type: String, attribute: true },
            description: { type: String, attribute: true },
            buttonText:  { type: String, attribute: 'button-text' },
            buttonUrl:   { type: String, attribute: 'button-url' },
            img:         { type: String, attribute: true },
        };
    }

    constructor() {
        super();
        this.eyebrow     = '';
        this.title       = '';
        this.description = '';
        this.buttonText  = 'Learn More';
        this.buttonUrl   = '';
        this.img         = '';
    }

    static get styles() {
        return css`
            :host {
                display: flex;
                flex: 1;
                min-width: 0;
                align-self: stretch;
            }

            .card {
                display: flex;
                flex-direction: row;
                flex: 1;
                background-color: #1A1A2E;
                border-radius: 12px;
                overflow: hidden;
                margin: 0 60px;
                min-height: 300px;
            }

            .card-text {
                flex: 3;
                display: flex;
                flex-direction: column;
                justify-content: center;
                gap: 12px;
                padding: 56px;
            }

            .card-eyebrow {
                color: #badeff;
                font-family: 'Poppins', system-ui, sans-serif;
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1.5px;
                margin: 0;
            }

            .card-title {
                color: #ffffff;
                font-family: 'Poppins', system-ui, sans-serif;
                font-size: 30px;
                font-weight: 600;
                line-height: 1.2;
                margin: 0;
            }

            .card-description {
                color: #C0C0D8;
                font-family: 'Poppins', system-ui, sans-serif;
                font-size: 15px;
                font-weight: 400;
                line-height: 1.65;
                margin: 0 0 8px;
            }

            .card-button {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                background-color: #0086FF;
                color: #ffffff;
                font-family: 'Poppins', system-ui, sans-serif;
                font-size: 14px;
                font-weight: 600;
                text-decoration: none;
                border-radius: 4px;
                padding: 0 24px;
                height: 44px;
                width: fit-content;
                transition: background-color 0.15s ease;
            }

            .card-button:hover {
                background-color: #005580;
            }

            .card-image-panel {
                flex: 2;
                background:
                    radial-gradient(ellipse at 50% 50%, rgba(0, 134, 255, 0.25) 0%, transparent 70%),
                    #2E2E4A;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 40px;
                min-width: 0;
            }

            .card-image-panel img {
                max-width: 100%;
                max-height: 180px;
                width: auto;
                height: auto;
                object-fit: contain;
                display: block;
            }

            @media (max-width: 900px) {
                .card {
                    flex-direction: column;
                    margin: 0;
                }
                .card-image-panel {
                    min-height: 140px;
                }
                .card-text {
                    padding: 32px 24px;
                }
                .card-title {
                    font-size: 22px;
                }
            }
        `;
    }

    render() {
        return html`
            <div class="card">
                <div class="card-text">
                    ${this.eyebrow ? html`<p class="card-eyebrow">${this.eyebrow}</p>` : ''}
                    <h2 class="card-title">${this.title}</h2>
                    <p class="card-description">${this.description}</p>
                    ${this.buttonUrl ? html`
                        <a href="${this.buttonUrl}" class="card-button" target="_blank" rel="noopener noreferrer">
                            ${this.buttonText}
                        </a>
                    ` : ''}
                </div>
                ${this.img ? html`
                    <div class="card-image-panel">
                        <img src="${this.img}" alt="${this.title}" />
                    </div>
                ` : ''}
            </div>
        `;
    }
}

customElements.define('epinio-carousel-item', EpinioCarouselItem);
