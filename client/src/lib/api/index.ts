import {VNote} from "../validations";

export const getNotes = async () => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await fetch("http://localhost:8080/api/notes");
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = (await response.json()) as VNote[];
        console.log(data)
        return data;
    } catch (error) {
        throw new Error(`Fetching data failed: ${error}`);
    }
};

//fetch single note

export const getNotesbyId = async (id: string) => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await fetch(`http://localhost:8080/api/notes/${id}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = (await response.json()) as VNote;
        return data;
    } catch (error) {
        throw new Error(`Fetching data failed: ${error}`);
    }
};


export const updateNote = async (note: VNote) => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await fetch(`http://localhost:8080/api/notes/${note.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = (await response.json()) as VNote;
        return data;
    } catch (error) {
        throw new Error(`Updating data failed: ${error}`);
    }
};



export const createNote = async (note: VNote) => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await fetch("http://localhost:8080/api/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = (await response.json()) as VNote;
        return data;
    } catch (error) {
        throw new Error(`Creating data failed: ${error}`);
    }
};
//delete notes
export const deleteNote = async (id: string) => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await fetch(`http://localhost:8080/api/notes/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return id;
    } catch (error) {
        throw new Error(`Deleting data failed: ${error}`);
    }
};