package kte.notes.backend.controller;

import kte.notes.backend.entity.Note;
import kte.notes.backend.service.NoteService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;


@AllArgsConstructor
@RestController
@RequestMapping(path = "notes")
public class NoteController {

    final NoteService noteService;


    @PostMapping(consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<String>createNote(@RequestBody Note note) {
     this.noteService.createNote(note);
     return new ResponseEntity<>("Note created", HttpStatus.CREATED);
    }


    @GetMapping(produces = APPLICATION_JSON_VALUE)
    public ResponseEntity <List<Note>> list() {
        return new ResponseEntity<>(this.noteService.suchen(), HttpStatus.OK);
    }



    @GetMapping(path = "{id}", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Note> suchen(@PathVariable("id") int id) {
        Note addNote = this.noteService.suchen(id);
        return new ResponseEntity<>(addNote, HttpStatus.OK);
    }


    @PutMapping(path = "{id}",consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Note> update(@PathVariable("id") int id, @RequestBody Note note) {
        Note updateNote = this.noteService.update(id, note);
        return new ResponseEntity<>(updateNote, HttpStatus.OK);
    }


    @DeleteMapping(path = "{id}", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Note> delete(@PathVariable("id") int id) {
        Note deleteNote =  this.noteService.delete(id);
        return new ResponseEntity<>(deleteNote, HttpStatus.NOT_FOUND);
    }
}
