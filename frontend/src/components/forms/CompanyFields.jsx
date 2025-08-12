import React from 'react';

const CompanyFields = ({
    companyName, setCompanyName,
    companyEmail, setCompanyEmail,
    companyPhone, setCompanyPhone,
    addressLine, setAddressLine,
    city, setCity, state, setState,
    country, setCountry, pinCode, setPinCode,
    adminName, setAdminName, email, setEmail
}) => (
    <>
        <input type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="input" required />
        <input type="email" placeholder="Company Email" value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} className="input" required />
        <input type="tel" placeholder="Company Phone" value={companyPhone} onChange={(e) => setCompanyPhone(e.target.value)} className="input" required />
        <input type="text" placeholder="Address Line" value={addressLine} onChange={(e) => setAddressLine(e.target.value)} className="input" required />
        <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="input" required />
        <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} className="input" required />
        <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} className="input" required />
        <input type="text" placeholder="Pin Code" value={pinCode} onChange={(e) => setPinCode(e.target.value)} pattern="\d{6}" className="input" required />
        <input type="text" placeholder="Admin Full Name" value={adminName} onChange={(e) => setAdminName(e.target.value)} className="input" required />
        <input type="email" placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" required />
    </>
);

export default CompanyFields;
