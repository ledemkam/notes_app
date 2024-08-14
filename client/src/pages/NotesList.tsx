import {useGetNotes} from "../lib/react-query/query.ts";
import {Link} from "react-router-dom";

export default function NotesList() {
    const { data:notes } = useGetNotes();
  return (
    <div className="p-10 w-full">
      <p className="text-xl text-slate-200 mb-6">Wilkommen auf Notes101</p>

      <ul className="grid lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {notes  &&
              notes?.map(note => (
                  <li
                      key={note.id}
                      className="bg-slate-100 hover:bg-slate-50 rounded cursor-pointer"
                  >
                      <Link to={`/note/${note.id}`} className="block p-4 w-full h-full ">
                          <p className="text-lg font-semibold">{note.title}</p>
                          <p className="text-gray-700">{note.subtitle}</p>
                      </Link>
                  </li>
              ))}
      </ul>
    </div>
  );
}
