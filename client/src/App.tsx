import { PhoneFrame } from './components/PhoneFrame';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { LoginModal } from './components/LoginModal';
import { ErrorBanner } from './components/ErrorBanner';
import { useApp } from './state/AppContext';
import { HomeScreen } from './screens/HomeScreen';
import { InputScreen } from './screens/InputScreen';
import { ClarifyScreen } from './screens/ClarifyScreen';
import { ConfirmScreen } from './screens/ConfirmScreen';
import { FlipScreen } from './screens/FlipScreen';
import { MotifScreen } from './screens/MotifScreen';
import { EchoesScreen } from './screens/EchoesScreen';
import { DetailScreen } from './screens/DetailScreen';
import { RiverScreen } from './screens/RiverScreen';
import { ProfileScreen } from './screens/ProfileScreen';

function ActiveScreen() {
  const { state } = useApp();
  switch (state.screen) {
    case 'home':
      return <HomeScreen />;
    case 'input':
      return <InputScreen />;
    case 'clarify':
      return <ClarifyScreen />;
    case 'confirm':
      return <ConfirmScreen />;
    case 'flip':
      return <FlipScreen />;
    case 'motif':
      return <MotifScreen />;
    case 'echoes':
      return <EchoesScreen />;
    case 'detail':
      return <DetailScreen />;
    case 'river':
      return <RiverScreen />;
    case 'profile':
      return <ProfileScreen />;
    default:
      return null;
  }
}

function App() {
  return (
    <PhoneFrame>
      <ActiveScreen />
      <BottomNav />
      <Toast />
      <ErrorBanner />
      <LoginModal />
    </PhoneFrame>
  );
}

export default App;
