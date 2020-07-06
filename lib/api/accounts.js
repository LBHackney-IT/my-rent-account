import axios from "axios";

import { getAuthToken } from "lib/api/auth";
import { getPrivacyString } from "utils/string";
import { getNextMonday } from "utils/date";

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
  return data.value[0];
};

export const getAccountName = async ({ accountNumber }) => {
  const auth = await getAuthToken();
  const { data } = await axios.get(API_URL, {
    params: {
      fetchXml: `<fetch> <entity name='account'> <attribute name='housing_prop_ref'/> <attribute name='housing_house_ref'/> <attribute name='housing_rent'/> <attribute name='housing_directdebit'/> <attribute name='housing_tag_ref'/> <attribute name='housing_cur_bal'/> <attribute name='housing_anticipated'/> <filter type='and'> <condition attribute='housing_u_saff_rentacc' operator='eq' value='${accountNumber}' /> </filter> <link-entity name='contact' from='parentcustomerid' to='accountid' link-type='inner'> <attribute name='housing_forename'/> <attribute name='housing_surname'/> <attribute name='hackney_title'/> <attribute name='hackney_responsible'/> <attribute name='lastname'/> <attribute name='firstname'/> <order attribute='lastname' descending='true'/> <filter type='and'> <condition attribute='hackney_responsible' operator='eq' value='1'/> </filter> </link-entity> </entity> </fetch>`,
    },
    headers: {
      Authorization: auth,
    },
  });

  const firstName = data.value[0].contact1_x002e_firstname;
  const lastName = data.value[0].contact1_x002e_lastname;
  return {
    name: `${getPrivacyString(firstName)} ${getPrivacyString(lastName)}`,
    currentBalance: parseFloat(data.value[0].housing_cur_bal).toFixed(2),
    rent: data.value[0].housing_rent,
    hasArrears: data.value[0].housing_cur_bal < 0,
    isHackneyResponsible: data.value[0].contact1_x002e_hackney_responsible,
    nextPayment: getNextMonday(),
  };
};
