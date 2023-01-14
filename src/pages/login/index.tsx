import LoginTemplate from '../../components/templates/LoginTemplate';

import { FirebaseAuthType } from '../../types/firebase';
import { googleLogin } from '../../apis/firebaseAuth';

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    try {
      const { user } = await googleLogin();
      saveUserData(user);
    } catch (error) {
      const { code, message } = error as unknown as FirebaseAuthType.error;
      console.error(`Google Login ${code} error: ${message}`);
    }
  };

  const saveUserData = (user: FirebaseAuthType.user) => {
    console.log(user);
  };

  return (
    <LoginTemplate
      logoURL="/assets/images/logo.png"
      buttonLabel="Google Login"
      decorationColor="#e8d1ac"
      loginEvent={handleGoogleLogin}
    />
  );
}
