import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import SideNotes from "./components/SideNotes";
import DisplayedNote from "./pages/DisplayedNote";
import Edit from "./pages/Edit";
import NotesList from "./pages/NotesList";

const App = () => {
  return (
    <div className="bg-slate-800 min-h-screen flex">
      <>
        <Sidebar />
        <SideNotes />

        <Routes>
          <Route path="/" element={<NotesList />} />
          <Route path="/note/:id" element={<DisplayedNote />} />
          <Route path="/editer" element={<Edit />} />
          <Route path="/editer/:id" element={<Edit />} />
        </Routes>
      </>
    </div>
  );
};
export default App;
