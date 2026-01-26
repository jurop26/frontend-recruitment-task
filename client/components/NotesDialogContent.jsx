import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";

const ADD_NOTE = gql`
  mutation AddNote($data: JSON!) {
    addNote(data: $data) {
      id
      data
    }
  }
`;

const NOTES = gql`
  query Notes($projectId: String!) {
    notes(projectId: $projectId) {
      id
      data
    }
  }
`;

export default function NotesDialogContent({ projectId, dialogClose }) {
  const [note, setNote] = useState("");
  const [addNote, { loading }] = useMutation(ADD_NOTE);
  const { data } = useQuery(NOTES, { variables: { projectId } });

  const handleAddNote = async () => {
    const res = await addNote({ variables: { data: { projectId, note } } });

    if (res.data) {
      dialogClose();
      alert("Note added");
    }
  };

  return (
    <>
      {data?.notes &&
        data.notes.map(({ id, data }, i) => (
          <div key={id}>{`${i + 1}. ${data.note}`}</div>
        ))}
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
