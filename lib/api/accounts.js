import axios from "axios";

import { getAuthToken } from "lib/api/auth";

const { API_URL } = process.env;

export const getAccount = async ({ accountNumber, postcode }) => {
  const auth = await getAuthToken();
  const { data } = await axios.get(API_URL, {
    params: {
      fetchXml: `<fetch top='1'><entity name='account'><attribute name='housing_u_saff_rentacc'/><filter type='and'><condition attribute='housing_u_saff_rentacc' operator='eq' value='${accountNumber}' /></filter><link-entity name='contact' from='parentcustomerid' to='accountid' link-type='inner' ><attribute name='address1_line3' /><attribute name='address1_postalcode' /><attribute name='address1_line1' /><attribute name='address1_line2' /><filter type='and' > <condition attribute='address1_postalcode' operator='eq' value='${postcode}' /></filter></link-entity></entity></fetch>`,
    },
    headers: {
      Authorization: auth,
    },
  });
  return data;
};
