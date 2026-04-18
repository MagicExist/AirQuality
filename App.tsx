import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/views/screens/HomeScreen';

export default function App() {
  return (
    <>
      <HomeScreen />
      <StatusBar style="auto" />
    </>
  );
}
