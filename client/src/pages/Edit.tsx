import NotesForm from "../components/NotesForm.tsx";
import {useGetNotesbyId} from "../lib/react-query/query.ts";
import {useParams} from "react-router-dom";



export default function Edit() {
  const {id} = useParams();
  const { data:notes } = useGetNotesbyId(id || '');


  return (
      <div className="w-full p-10">
        <p className="text-slate-100 text-xl mb-4">Notiz hinzufügen</p>
        <NotesForm action="Update" notes={notes}/>
      </div>
  );
}
