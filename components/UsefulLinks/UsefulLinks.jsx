import React from "react";

import { links } from "data/usefulLinks.json";

const UsefulLinks = () => (
  <div className="govuk-body">
    <h2>Useful links</h2>
    {links.map(({ link, title }) => (
      <p key={link}>
        <a className="govuk-link" href={link}>
          {title}
        </a>
      </p>
    ))}
  </div>
);

export default UsefulLinks;
