import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function NotesDialogContent({ id, dialogClose }) {
  const [note, setNote] = useState("");

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
      <Button disabled={!note} variant="default" onClick={() => {}}>
        Save
      </Button>
    </>
  );
}
