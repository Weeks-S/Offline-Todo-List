import { Error } from "./components/error/Error";
import { useAppSelector } from "./hooks/hooks";
import TodoPages from "./pages/TodoPages";


function App() {
  const {  globalError } = useAppSelector(
    (state) => state.ui
  );

  return (
    <div className="p-4">
      {globalError && <Error message={globalError} />}
      <TodoPages />
    </div>
  );
}

export default App
