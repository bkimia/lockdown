import { html } from 'htm/preact';
import { useState, useRef, useEffect } from 'preact/compat';
import css from 'csz';

export function Expandable(props) {
  const [expanded, setExpanded] = useState(false);
  const detail = useRef(null);

  useEffect(() => {
    if (expanded) {
      detail.current.focus({ preventScroll: true });
    }
  }, [expanded]);

  useEffect(() => {
    if (props.currentDropdown !== props.toggle) {
      setExpanded(false);
    }
  }, [props.currentDropdown]);

  return html`
    <div class="${styles}">
      <div class="ld-expandable">
        <button
          onClick=${() => {
            props.onDropDown(expanded ? false : props.toggle);
            setExpanded(!expanded);
          }}
          class="ld-expandable--toggle"
          aria-expanded="${expanded}"
        >
          <div class="ld-expandable--icon">
            ${expanded ? chevronDown : chevronRight}
          </div>
          <div class="ld-expandable--toggle-content">
            <h2>${props.toggle}</h2>
          </div>
        </button>

        <div
          ref=${detail}
          class="ld-expandable--detail ${expanded ? 'ld-expandable--expanded' : 'ld-expandable--closed'}"
          role="region"
          tabindex="-1"
        >
          ${props.detail}
        </div>
      </div>
    </div>
  `;
}

const styles = css`
  .ld-expandable {
    width: 100%;
    height: auto;
    border-bottom: lightgrey solid 1px;
    .dark & {
      border-bottom: var(--ld-gray-2) solid 1px;
    }
  }

  .ld-expandable a {
    color: var(--ld-active);
  }

  .ld-expandable--icon {
    height: 60px;
    display: flex;
    align-items: center;
  }

  .ld-expandable--toggle-content {
    flex: 1;
    font-family: 'Montserrat', sans-serif;
    display: flex;
    align-items: center;
    height: 60px;
  }

  .ld-expandable button {
    color: var(--ld-text);
    text-align: left;
    width: 100%;
    display: flex;

    border: none;
    margin: 0;
    padding: 0;
    overflow: visible;
    background: transparent;
  }

  .ld-expandable--toggle {
    height: 60px;
  }

  .ld-expandable--toggle:hover {
    background-color: var(--ld-hover);
  }

  .ld-expandable--detail {
  }

  .ld-expandable--expanded {
    display: block;
    padding: 10px;
  }

  .ld-expandable--closed {
    display: none;
  }
`;

const chevronRight = html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-chevron-right"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <polyline points="9 6 15 12 9 18" />
  </svg>
`;

const chevronDown = html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-chevron-down"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <polyline points="6 9 12 15 18 9" />
  </svg>
`;
