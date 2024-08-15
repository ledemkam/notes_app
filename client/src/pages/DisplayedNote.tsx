import { Link, useParams } from 'react-router-dom';
import { useDeleteNote, useGetNotes} from '../lib/react-query/query';
import { toast } from 'sonner';


export default function DisplayedNote() {
    const { id } = useParams();
    const { data: notes } = useGetNotes();

    const { mutateAsync: deleteOneNote } = useDeleteNote();

    const aktuelNote = notes?.find((note) => note.id === Number(id));

   // if (!aktuelNote) {
    //    toast.error('Note not found');
      //  return;
    //}

    const handleDelete = async (id:number) => {
     const noteTodelete = notes?.find((note) => note.id === id);
        if (noteTodelete) {
            try {
                await deleteOneNote(noteTodelete.id.toString());
                toast.success('Note deleted successfully');
            } catch {
                toast.error('Failed to delete note');
            }
        }
    };

    return (
        <div className="p-10">
            <Link to="/" className="px-2 py-1 text-slate-800 bg-slate-300 rounded mr-2">
                Noten
            </Link>
            <Link
                to={`/editer/${id}`}
                className="px-2 py-1 text-slate-200 bg-green-600 rounded mr-2"
            >
                Ändern
            </Link>
            <button className="px-2 py-1 text-slate-200 bg-red-600 rounded mr-2" onClick={()=>handleDelete(Number(id))}>
                delete
            </button>
            <p className="text-slate-100 text-4xl mb-2 mt-8">{aktuelNote?.title}</p>
            <p className="text-slate-200 text-xl mb-4">{aktuelNote?.subtitle}</p>
            <p className="text-slate-300">{aktuelNote?.body_text}</p>
        </div>
    );
}
