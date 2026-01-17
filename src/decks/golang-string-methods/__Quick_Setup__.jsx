bash
# 1. Install dependencies
npm install framer-motion lucide-react

# 2. Create components folder
mkdir -p src/components

# 3. Copy all slide files into src/components/

# 4. Use in your app
import MainDeck from './components/MainDeck';

export default function App() {
  return <MainDeck />;
}