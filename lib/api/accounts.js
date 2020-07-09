import axios from "axios";

import { getAuthToken } from "lib/api/auth";
import { getPrivacyString } from "utils/string";
import { getNextMonday } from "utils/date";

const { API_URL, SANDBOX_DOMAIN, SANDBOX_LINK_ACCOUNT } = process.env;

export const getAccount = async ({ accountNumber, postcode }) => {
  const auth = await getAuthToken();
  const { data } = await axios.get(`${API_URL}/accounts`, {
    params: {
      fetchXml: `
        <fetch top='1'>
          <entity name='account'>
            <attribute name='housing_u_saff_rentacc'/>
            <filter type='and'>
              <condition attribute='housing_u_saff_rentacc' operator='eq' value='${accountNumber}' />
            </filter>
            <link-entity name='contact' from='parentcustomerid' to='accountid' link-type='inner' >
              <attribute name='address1_postalcode' />
              <attribute name='address1_line1' />
              <attribute name='address1_line2' />
              <attribute name='address1_line3' />
              <filter type='and' >
                <condition attribute='address1_postalcode' operator='eq' value='${postcode}' />
              </filter>
            </link-entity>
          </entity>
        </fetch>
      `,
    },
    headers: {
      Authorization: auth,
    },
  });
  return {
    tagReference: data.value[0].housing_tag_ref,
  };
};

export const getAccountName = async ({ accountNumber }) => {
  const auth = await getAuthToken();
  const { data } = await axios.get(`${API_URL}/accounts`, {
    params: {
      fetchXml: `
        <fetch>
          <entity name='account'>
            <attribute name='housing_prop_ref'/>
            <attribute name='housing_house_ref'/>
            <attribute name='housing_rent'/>
            <attribute name='housing_directdebit'/>
            <attribute name='housing_tag_ref'/>
            <attribute name='housing_cur_bal'/>
            <attribute name='housing_anticipated'/>
            <filter type='and'>
              <condition attribute='housing_u_saff_rentacc' operator='eq' value='${accountNumber}' />
            </filter>
            <link-entity name='contact' from='parentcustomerid' to='accountid' link-type='inner'>
              <attribute name='housing_forename'/>
              <attribute name='housing_surname'/>
              <attribute name='hackney_title'/>
              <attribute name='hackney_responsible'/>
              <attribute name='lastname'/>
              <attribute name='firstname'/>
              <order attribute='lastname' descending='true'/>
              <filter type='and'>
                <condition attribute='hackney_responsible' operator='eq' value='1'/>
              </filter>
            </link-entity>
          </entity>
        </fetch>
      `,
    },
    headers: {
      Authorization: auth,
    },
  });
  const firstName = data.value[0].contact1_x002e_firstname;
  const lastName = data.value[0].contact1_x002e_lastname;
  const currentBalance = data.value[0].housing_cur_bal;
  return {
    name: `${getPrivacyString(firstName)} ${getPrivacyString(lastName)}`,
    currentBalance: parseFloat(
      currentBalance > 0 ? currentBalance : currentBalance * -1
    ).toFixed(2),
    rent: data.value[0].housing_rent,
    toPay: parseFloat(
      data.value[0].housing_rent - data.value[0].housing_anticipated
    ).toFixed(2),
    benefits: parseFloat(data.value[0].housing_anticipated).toFixed(2),
    hasArrears: data.value[0].housing_cur_bal > 0,
    isHackneyResponsible: data.value[0].contact1_x002e_hackney_responsible,
    nextPayment: getNextMonday(),
  };
};

export const getLinkedAccount = async ({ cssoId }) => {
  const auth = await getAuthToken();
  const { data } = await axios.get(
    `${API_URL}/hackney_csso_linked_rent_accounts`,
    {
      params: {
        fetchXml: `
          <fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>
            <entity name='hackney_csso_linked_rent_account'>
              <attribute name='hackney_csso_linked_rent_accountid' />
              <attribute name='hackney_csso_id' alias='csso_id' />
              <filter type='and'>
                <condition attribute='hackney_csso_id' operator='eq' value='${cssoId}'/>
              </filter>
              <link-entity name='account' to='hackney_account_id' from='accountid' link-type='inner'>
                <attribute name='housing_u_saff_rentacc' alias='rent_account_number' />
              </link-entity>
            </entity>
          </fetch>
        `,
      },
      headers: {
        Authorization: auth,
      },
    }
  );
  return data;
};

export const linkAccount = async ({ accountNumber, cssoId }) => {
  const { data } = await axios.post(
    `${SANDBOX_DOMAIN}${SANDBOX_LINK_ACCOUNT}`,
    {
      accountNumber,
      cssoId,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const unlinkAccount = async ({ linkId }) => {
  const auth = await getAuthToken();
  await axios.delete(
    `${API_URL}/hackney_csso_linked_rent_accounts(${linkId})`,
    {
      headers: {
        Authorization: auth,
      },
    }
  );
};
