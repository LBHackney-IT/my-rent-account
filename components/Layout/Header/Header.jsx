import React from "react";
import PropTypes from "prop-types";

const Header = ({ serviceName }) => (
  <header className="govuk-header" role="banner" data-module="govuk-header">
    <div className="govuk-header__container govuk-width-container lbh-header__container">
      <div className="govuk-header__logo">
        <a href="/" className="govuk-header__link govuk-header__link--homepage">
          <span className="govuk-header__logotype lbh-header__logotype">
            <svg
              alt="Hackney Council"
              viewBox="0 0 208 37"
              role="presentation"
              focusable="false"
              aria-labelledby="lbh-logo-svg-title"
            >
              <title id="lbh-logo-svg-title">London Borough of Hackney</title>
              <g fillRule="evenodd" fill="currentColor">
                <path d="M36 15.999C36 9.039 32.058 3.005 26.291 0v12.033H9.709V0C3.941 3.005 0 9.04 0 15.999 0 22.96 3.94 28.996 9.709 32V19.967h16.582V32C32.058 28.996 36 22.96 36 15.999M42 1h8.859v10.13h8.28V1H68v29h-8.862V18.57H50.86V30H42V1M91.015 16.185c0-4.032.08-8.185-10.085-8.185-5.042 0-10.7.968-10.945 6.855h7.542c.043-.913.534-2.173 3.035-2.173 1.31 0 2.663.527 2.663 1.95 0 1.34-1.107 1.665-2.213 1.869C76.87 17.273 69 17.029 69 23.689 69 28.076 72.402 30 76.504 30c2.622 0 5.12-.564 6.842-2.485h.084c-.043.522.082 1.37.286 1.934H92c-.905-1.333-.985-3.109-.985-4.681v-8.583zm-7.79 5.802c-.123 2.177-1.556 3.266-3.403 3.266-1.473 0-2.54-.97-2.54-1.936 0-1.411.944-1.854 2.746-2.256 1.106-.241 2.213-.525 3.197-1.007v1.933zM106.909 16.48c-.085-.848-.376-1.533-.92-1.965-.5-.443-1.208-.684-2.084-.684-3.169 0-3.63 2.656-3.63 5.191 0 2.535.461 5.147 3.63 5.147 1.792 0 3.044-1.409 3.211-3.055H115c-.794 5.693-5.422 8.886-11.262 8.886C97.224 30 92 25.638 92 19.017 92 12.402 97.224 8 103.738 8c5.671 0 10.511 2.706 11.011 8.48h-7.84M115 1h8.246v14.016l5.238-6.08h9.31l-7.69 7.945L139 30h-9.893l-4.406-7.649-1.455 1.545V30H115V1M139 8.552h7.794v2.716h.08C148.376 9.118 150.529 8 153.737 8 157.53 8 161 10.358 161 15.286V30h-8.08V18.756c0-2.478-.285-4.215-2.636-4.215-1.38 0-3.206.702-3.206 4.134V30H139V8.552M185 20.765C185 12.609 181.403 8 173.076 8 166.446 8 162 12.93 162 19.034 162 26.062 167.055 30 173.763 30c4.769 0 9.176-2.09 10.794-6.588h-7.48c-.64 1.001-2.057 1.494-3.35 1.494-2.508 0-3.882-1.725-4.086-4.141H185zm-15.315-4.143c.361-2.273 1.735-3.531 4.117-3.531 2.063 0 3.516 1.582 3.516 3.531h-7.633z M200.955 28.522c-.656 1.874-1.392 4.277-2.662 5.87-2.129 2.649-5.405 2.608-8.56 2.608h-3.685v-6.442h1.882c.82 0 1.884.083 2.46-.203.49-.243.776-.652.776-1.588 0-1.02-3.112-8.803-3.562-10.026L184 9h8.681l3.401 12.145h.082L199.604 9H208l-7.045 19.522"></path>
              </g>
            </svg>
          </span>
        </a>
      </div>
      <div className="govuk-header__content">
        <a
          href="/"
          className="govuk-header__link govuk-header__link--service-name"
        >
          {serviceName}
        </a>
      </div>
    </div>
  </header>
);

Header.propTypes = {
  serviceName: PropTypes.string,
};

export default Header;
