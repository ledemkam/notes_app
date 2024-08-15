import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { useCreateNote, useUpdateNote } from "../lib/react-query/query.ts";
import { noteSchema } from "../lib/validations";
//import Loader from "./Loader.tsx";

type FormFields = z.infer<typeof noteSchema>;

type FormProps = {
  action: "Create" | "Update";
  notes: FormFields | undefined;
};

const NotesForm = ({ action, notes }: FormProps) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      title: notes ? notes?.title : "",
      subtitle: notes ? notes?.subtitle : "",
      body_text: notes ? notes?.body_text : "",
    },
    resolver: zodResolver(noteSchema),
  });

  //query
  const { mutateAsync: createNote } = useCreateNote();
  const { mutateAsync: updateNote } = useUpdateNote();

  const onSubmit = async (data: FormFields) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    // Action = update
    if (notes && action === "Update") {
      const updatedNote = updateNote({
        ...data,
        id: notes?.id,
        title: notes.title,
        subtitle: notes.subtitle,
        body_text: notes.body_text,
      });
      if (!updatedNote) {
        toast.error(
          `${action} Änderungen fehlgeschlagen. Bitte versuchen Sie es erneut.`
        );
      }
      navigate(`/editer/${notes.id}`);
    }
    // Action = create
    const newNote = createNote({
      ...data,
    });
    if (!newNote) {
      toast.error(
        `${action} Änderungen fehlgeschlagen. Bitte versuchen Sie es erneut.`
      );
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title" className="mb-2 block text-slate-100">
        der Titel
      </label>
      <input
        {...register("title")}
        className="p-2 text-md block w-full rounded bg-slate-200"
        type="text"
        id="title"
        spellCheck="false"
      />{" "}
      {errors.title && (
        <div className="text-red-500">{errors.title.message}</div>
      )}
      <label htmlFor="subtitle" className="mb-2 mt-4 block text-slate-100">
        der undertitel
      </label>
      <input
        {...register("subtitle")}
        className="p-2 text-md block w-full rounded bg-slate-200"
        type="text"
        id="subtitle"
        spellCheck="false"
      />
      {errors.subtitle && (
        <div className="text-red-500">{errors.subtitle.message}</div>
      )}
      <label htmlFor="body_text" className="mb-2 mt-4 block text-slate-100">
        Inhalt der Notiz
      </label>
      <textarea
        {...register("body_text")}
        spellCheck="false"
        id="body_text"
        className="w-full min-h-[300px] p-2 rounded bg-slate-200"
      ></textarea>
      {errors.body_text && (
        <div className="text-red-500">{errors.body_text.message}</div>
      )}
      <button type="submit">{action} Note Erstellen</button>
      {errors.root && <div className="text-red-500">{errors.root.message}</div>}
    </form>
  );
};

export default NotesForm;
