import { LitElement, html, css, unsafeCSS } from 'lit';
import './epinio-carousel-item.js';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import carouselCSS from '../styles/carousel-styles.css?inline';

export class EpinioCarousel extends LitElement {
    static properties = {
        swiper: { type: Object },
        items:  { type: Array },
    };

    constructor() {
        super();
        this.swiper = null;
        this.items  = [];
    }

    static styles = [
        unsafeCSS(carouselCSS),
        css`
            :host {
                --swiper-theme-color: #0086FF;
            }

            .swiper-slide {
                display: flex;
                align-items: stretch;
                height: auto;
            }

            .swiper {
                padding-bottom: 48px !important;
            }

            .swiper-wrapper {
                align-items: stretch;
            }

            .swiper-pagination-bullet {
                background-color: #9898B8;
                width: 10px !important;
                height: 10px !important;
                opacity: 1;
            }

            .swiper-pagination-bullet-active {
                background-color: #0086FF;
            }

            .swiper-button-next,
            .swiper-button-prev {
                color: #0086FF;
            }

            @media (max-width: 815px) {
                .swiper-button-prev {
                    display: none;
                }
            }

            @media (max-width: 600px) {
                .swiper-button-next {
                    display: none;
                }
            }
        `
    ];

    firstUpdated() {
        const container  = this.renderRoot.querySelector('.swiper');
        const nextButton = this.renderRoot.querySelector('.swiper-button-next');
        const prevButton = this.renderRoot.querySelector('.swiper-button-prev');
        const pagination = this.renderRoot.querySelector('.swiper-pagination');

        this.swiper = new Swiper(container, {
            modules: [Navigation, Pagination, Autoplay],
            slidesPerView: 1,
            loop: true,
            spaceBetween: 20,
            autoplay: {
                delay: 7000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: nextButton,
                prevEl: prevButton,
            },
            pagination: {
                el: pagination,
                clickable: true,
            },
        });
    }

    render() {
        return html`
            <div class="swiper">
                <div class="swiper-wrapper">
                    ${this.items.map(item => html`
                        <div class="swiper-slide">
                            <epinio-carousel-item
                                eyebrow="${item.eyebrow || ''}"
                                title="${item.title}"
                                description="${item.description}"
                                button-text="${item.buttonText || 'Learn More'}"
                                button-url="${item.buttonUrl || ''}">
                            </epinio-carousel-item>
                        </div>
                    `)}
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-pagination"></div>
            </div>
        `;
    }
}

customElements.define('epinio-carousel', EpinioCarousel);
