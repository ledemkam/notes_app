
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {createNote, deleteNote, getNotes, getNotesbyId} from '../api';
import { useMutation } from '@tanstack/react-query';
import { updateNote } from '../api';
import {VNote} from "../validations";

//geht notes
export const useGetNotes = () => {
    return useQuery({
        queryKey: ['api', 'notes'],
        queryFn: async () => await getNotes(),
    });
};

//get single note

export const useGetNotesbyId = (id:string) => {
    return useQuery({
        queryKey: ['api', 'notes', id],
        queryFn: async () => await getNotesbyId(id),
    });
};

//delete notes

export const useDeleteNote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => await deleteNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["api", "notes"],
            });
        },
    });
};





//update notes

export const useUpdateNote = () => {
    const  queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (note: VNote) => await updateNote(note),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["api", "notes", data.id],
            });
        }
    });
};

//create notes

export const useCreateNote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (note: VNote) => await createNote(note),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["api", "notes"],
            });
        }
})
}
