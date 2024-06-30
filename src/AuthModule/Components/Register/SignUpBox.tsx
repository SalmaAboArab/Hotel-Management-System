import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';

const SignUpBox = () => {
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: '724092012175-12usg1hrtdb0arudc8aoiv66dn9de2ih.apps.googleusercontent.com',
      callback: handleCredentialResponse,
      auto_select: false,
      context: 'signup'  
    });
    window.google.accounts.id.renderButton(
      document.getElementById('google-signup-button'),
      {
        theme: 'outline',
        size: 'large',
        text: 'signup_with'
      }
    );
  }, []);

  const handleCredentialResponse = async (response) => {
    console.log(jwtDecode(response.credential));
   
    
  };

  return (
    <div style={{ width:"100%", display:"flex", justifyContent:"center" }}>
      <div id="google-signup-button"></div>
    </div>
  );
};

export default SignUpBox;
