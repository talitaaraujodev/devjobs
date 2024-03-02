import { AppProvider } from './contexts/AppContext';
import { MainRoutes } from './routes/Route';

function App() {
  return (
    <div className="flex flex-col w-full h-[100vh] bg-[#f5f6f8] overflow-x-hidden">
      <AppProvider>
        <MainRoutes />
      </AppProvider>
    </div>
  );
}

export default App;
