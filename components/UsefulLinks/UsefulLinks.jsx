import React from "react";

import { links } from "data/usefulLinks.json";

const UsefulLinks = () => (
  <>
    <h2>Useful links</h2>
    {links.map(({ link, title }) => (
      <p key={link}>
        <a className="govuk-link" href={link}>
          {title}
        </a>
      </p>
    ))}
  </>
);

export default UsefulLinks;
