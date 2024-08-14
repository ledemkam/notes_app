package kte.notes.backend.service;

import kte.notes.backend.entity.Note;
import kte.notes.backend.repository.NoteRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class NoteService {

    final NoteRepository noteRepository;

    public void createNote(Note note) {
        this.noteRepository.save(note);
    }

    public List<Note> suchen() {
        return this.noteRepository.findAll();
    }

    public Note suchen(int id) {
        Optional<Note> note = this.noteRepository.findById(id);
        return note.orElse(null);
    }

    public Note update(int id, Note note) {
        Optional<Note> noteOptional = this.noteRepository.findById(id);
        if (noteOptional.isPresent()) {
            Note noteToUpdate = noteOptional.get();
            noteToUpdate.setTitle(note.getTitle());
            noteToUpdate.setSubtitle(note.getSubtitle());
            noteToUpdate.setBodyText(note.getBodyText());
            return this.noteRepository.save(noteToUpdate);
        }
        return null;
    }

    public Note delete(int id) {
        Optional<Note> note = this.noteRepository.findById(id);
        //note.ifPresent(this.noteRepository::delete); // this is the same as the next line
        if (note.isPresent()) {
            this.noteRepository.delete(note.get());
            return note.get();
        }
        return null;
    }
}
