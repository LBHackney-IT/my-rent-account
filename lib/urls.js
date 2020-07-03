const { PAYMENT_URL } = process.env;

export const getPaymentUrl = ({ sourceUrl, accountNumber, amount }) =>
  `${PAYMENT_URL}?returnurl=${sourceUrl}&returntext=Back to Order Certificate&ignoreconfirmation=true&data=keep this and return it at the end&payforbasketmode=true&showcontactpage=no&recordxml=<records><record><reference>${accountNumber}</reference><fund>07</fund><amount>${amount}</amount></record></records>`;
