import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const ADD_NOTE = gql`
  mutation AddNote($data: JSON!) {
    addNote(data: $data) {
      id
      data
    }
  }
`;

export default function NotesDialogContent({ id, dialogClose }) {
  const [note, setNote] = useState("");
  const [addNote, { loading, error }] = useMutation(ADD_NOTE);

  const handleAddNote = async () => {
    const res = await addNote({ variables: { data: { note } } });

    if (res.data) {
      dialogClose();
      alert("Note added");
    }
  };

  return (
    <>
      <div>
        <Textarea
          autoComplete="off"
          placeholder="Add project notes"
          name="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <Button
        disabled={!note || loading}
        variant="default"
        onClick={async () => await handleAddNote()}
      >
        Save
      </Button>
    </>
  );
}
