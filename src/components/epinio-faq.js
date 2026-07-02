import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export class FaqItem extends LitElement {
  static get properties() {
    return {
      question: { type: String, attribute: true },
      answer: { type: String, attribute: true },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
        border-bottom: 1px solid var(--epinio-grayscale-200, #E0E0F0);
      }

      .faq-item {
        padding: 24px 0;
      }

      .faq-checkbox {
        position: absolute;
        opacity: 0;
        z-index: -1;
      }

      .faq-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        cursor: pointer;
        user-select: none;
      }

      .faq-question {
        color: var(--epinio-primary-dark, #005580);
        font-family: 'Poppins', sans-serif;
        font-size: 18px;
        font-weight: 600;
        line-height: 1.4;
      }

      .faq-icon {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--epinio-primary-color, #0086FF);
        width: 24px;
        height: 24px;
        transition: transform 0.3s ease;
      }

      .faq-icon svg {
        width: 20px;
        height: 20px;
        stroke: var(--epinio-primary-color, #0086FF);
        stroke-width: 2.5;
        fill: none;
      }

      .faq-checkbox:checked ~ .faq-header .faq-icon {
        transform: rotate(180deg);
      }

      .faq-answer {
        color: var(--epinio-accent-color, #1A4A76);
        font-family: 'Poppins', sans-serif;
        font-size: 15px;
        font-weight: 400;
        line-height: 1.75;
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        padding-top: 0;
        transition: max-height 0.3s ease, padding-top 0.3s ease, opacity 0.3s ease;
      }

      .faq-answer ol,
      .faq-answer ul {
        margin: 0;
        padding-left: 20px;
      }

      .faq-answer li {
        margin-bottom: 8px;
      }

      .faq-answer a {
        color: var(--epinio-primary-color, #0086FF);
        text-decoration: none;
      }

      .faq-answer a:hover {
        color: var(--epinio-primary-dark, #005580);
      }

      .faq-checkbox:checked ~ .faq-answer {
        max-height: 1000px;
        opacity: 1;
        padding-top: 16px;
      }
    `;
  }

  constructor() {
    super();
    this._uid = Math.random().toString(36).substring(2, 9);
  }

  render() {
    return html`
      <div class="faq-item">
        <input type="checkbox" id="faq-${this._uid}" class="faq-checkbox" />
        <label for="faq-${this._uid}" class="faq-header">
          <div class="faq-question">${this.question}</div>
          <div class="faq-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </label>
        <div class="faq-answer">${unsafeHTML(this.answer)}</div>
      </div>
    `;
  }
}

customElements.define('faq-item', FaqItem);
