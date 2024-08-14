package kte.notes.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "notes")
public class Note {

          @Id
          @GeneratedValue( strategy = GenerationType.IDENTITY )
          private int id;
          private String title;
          private String subtitle;
          private String bodyText;

}
