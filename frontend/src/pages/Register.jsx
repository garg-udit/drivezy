// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { registerUser, registerCompany } from '../api/auth';
// import PasswordField from '../components/forms/PasswordField';
// import UserFields from '../components/forms/UserFields';
// import CompanyFields from '../components/forms/CompanyFields';

// const Register = () => {
//   const [accountType, setAccountType] = useState('user');
//   const [supplierType, setSupplierType] = useState('individual');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   // Company-specific fields
//   const [companyName, setCompanyName] = useState('');
//   const [companyEmail, setCompanyEmail] = useState('');
//   const [companyPhone, setCompanyPhone] = useState('');
//   const [addressLine, setAddressLine] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [country, setCountry] = useState('');
//   const [pinCode, setPinCode] = useState('');
//   const [adminName, setAdminName] = useState('');

//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) return setMessage('❌ Passwords do not match');

//     let data = {};
//     let apiCall = registerUser;

//     if (accountType === 'user') {
//       data = { name, email, phone, password, role: 'USER', isCompanyAdmin: false };
//     } else if (accountType === 'supplier' && supplierType === 'individual') {
//       data = { name, email, phone, password, role: 'PROVIDER', isCompanyAdmin: false };
//     } else if (accountType === 'supplier' && supplierType === 'company') {
//       apiCall = registerCompany;
//       data = {
//         companyName,
//         companyEmail,
//         companyPhone,
//         addressLine,
//         city,
//         state,
//         country,
//         pinCode,
//         adminName,
//         adminEmail: email,
//         adminPassword: password,
//         adminPhone: companyPhone,
//       };
//     }

//     try {
//       setLoading(true);
//       setMessage('');
//       const res = await apiCall(data);
//       setMessage('✅ Registration successful! Redirecting...');
//       setTimeout(() => navigate('/login'), 1500);
//     } catch (err) {
//       const msg = err.response?.data?.message || err.message;
//       console.log(err.response)
//       setMessage(`❌ ${msg}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center px-4">
//       <div className="bg-white/90 shadow-xl rounded-2xl px-8 py-10 max-w-md w-full">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>

//         {/* Account Type */}
//         <div className="mb-4">
//           <label className="block text-sm mb-1">Register as:</label>
//           <div className="flex gap-4">
//             <label><input type="radio" checked={accountType === 'user'} onChange={() => setAccountType('user')} /> User</label>
//             <label><input type="radio" checked={accountType === 'supplier'} onChange={() => setAccountType('supplier')} /> Supplier</label>
//           </div>
//         </div>

//         {/* Supplier Type */}
//         {accountType === 'supplier' && (
//           <div className="mb-4">
//             <label className="block text-sm mb-1">Supplier Type:</label>
//             <div className="flex gap-4">
//               <label><input type="radio" checked={supplierType === 'individual'} onChange={() => setSupplierType('individual')} /> Individual</label>
//               <label><input type="radio" checked={supplierType === 'company'} onChange={() => setSupplierType('company')} /> Company</label>
//             </div>
//           </div>
//         )}

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           {accountType === 'supplier' && supplierType === 'company' ? (
//             <CompanyFields
//               companyName={companyName} setCompanyName={setCompanyName}
//               companyEmail={companyEmail} setCompanyEmail={setCompanyEmail}
//               companyPhone={companyPhone} setCompanyPhone={setCompanyPhone}
//               addressLine={addressLine} setAddressLine={setAddressLine}
//               city={city} setCity={setCity}
//               state={state} setState={setState}
//               country={country} setCountry={setCountry}
//               pinCode={pinCode} setPinCode={setPinCode}
//               adminName={adminName} setAdminName={setAdminName}
//               email={email} setEmail={setEmail}
//             />
//           ) : (
//             <UserFields name={name} setName={setName} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} />
//           )}

//           <PasswordField value={password} onChange={(e) => setPassword(e.target.value)} />
//           <PasswordField value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />

//           <button type="submit" disabled={loading} className={`w-full py-2 rounded-md text-white font-semibold ${loading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'}`}>
//             {loading ? 'Registering...' : 'Register'}
//           </button>
//         </form>

//         {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}

//         <p className="text-center mt-4 text-gray-600">
//           Already have an account? <Link to="/login" className="text-purple-600 hover:underline font-medium">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, registerCompany } from '../api/auth';
import PasswordField from '../components/forms/PasswordField';
import UserFields from '../components/forms/UserFields';
import CompanyFields from '../components/forms/CompanyFields';

const Register = () => {
  const [accountType, setAccountType] = useState('user');
  const [supplierType, setSupplierType] = useState('individual');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Company-specific fields
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [adminName, setAdminName] = useState('');

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return setMessage('❌ Passwords do not match');

    let data = {};
    let apiCall = registerUser;

    if (accountType === 'user') {
      data = { name, email, phone, password, role: 'USER', isCompanyAdmin: false };
    } else if (accountType === 'supplier' && supplierType === 'individual') {
      data = { name, email, phone, password, role: 'PROVIDER', isCompanyAdmin: false };
    } else if (accountType === 'supplier' && supplierType === 'company') {
      apiCall = registerCompany;
      data = {
        companyName,
        companyEmail,
        companyPhone,
        addressLine,
        city,
        state,
        country,
        pinCode,
        adminName,
        adminEmail: email,
        adminPassword: password,
        adminPhone: companyPhone,
      };
    }

    try {
      setLoading(true);
      setMessage('');
      const res = await apiCall(data);
      setMessage('✅ Registration successful! Redirecting...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      console.log(err.response);
      setMessage(`❌ ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center px-4 py-10 mt-16">
      <div className="bg-white/90 shadow-2xl rounded-2xl px-10 py-12 max-w-xl w-full transition-all duration-300 ease-in-out">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 tracking-tight">Create Your Account</h2>

        {/* Account Type */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">Register as:</label>
          <div className="flex gap-6">
            <label className="flex items-center space-x-2">
              <input type="radio" checked={accountType === 'user'} onChange={() => setAccountType('user')} className="accent-purple-600" />
              <span>User</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" checked={accountType === 'supplier'} onChange={() => setAccountType('supplier')} className="accent-purple-600" />
              <span>Supplier</span>
            </label>
          </div>
        </div>

        {/* Supplier Type */}
        {accountType === 'supplier' && (
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Supplier Type:</label>
            <div className="flex gap-6">
              <label className="flex items-center space-x-2">
                <input type="radio" checked={supplierType === 'individual'} onChange={() => setSupplierType('individual')} className="accent-purple-600" />
                <span>Individual</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" checked={supplierType === 'company'} onChange={() => setSupplierType('company')} className="accent-purple-600" />
                <span>Company</span>
              </label>
            </div>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {accountType === 'supplier' && supplierType === 'company' ? (
            <CompanyFields
              companyName={companyName} setCompanyName={setCompanyName}
              companyEmail={companyEmail} setCompanyEmail={setCompanyEmail}
              companyPhone={companyPhone} setCompanyPhone={setCompanyPhone}
              addressLine={addressLine} setAddressLine={setAddressLine}
              city={city} setCity={setCity}
              state={state} setState={setState}
              country={country} setCountry={setCountry}
              pinCode={pinCode} setPinCode={setPinCode}
              adminName={adminName} setAdminName={setAdminName}
              email={email} setEmail={setEmail}
            />
          ) : (
            <UserFields name={name} setName={setName} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} />
          )}

          <PasswordField value={password} onChange={(e) => setPassword(e.target.value)} />
          <PasswordField value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold shadow-md transition-transform duration-200 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 hover:scale-[1.02]'
              }`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {message && (
          <div className="mt-5 text-center text-sm font-medium text-gray-700 bg-gray-100 rounded-md py-2 px-3">
            {message}
          </div>
        )}

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-700 hover:underline font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
