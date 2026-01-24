import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import _ from "lodash";

export default function ProjectDialogContent(props) {
  const [name, setName] = useState("");
  const { data } = props;
  const isExisting = _.find(data, { name });

  return (
    <>
      <div>
        {data.map(({ id, name }) => (
          <Button key={id} variant="ghost" onClick={() => setName(name)}>
            {name}
          </Button>
        ))}
      </div>
      <div>
        <Input
          autoComplete="off"
          placeholder="New project name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <Button
        disabled={!name}
        variant={name ? "default" : "destructive"}
        onClick={() => {}}
      >
        {name && isExisting ? "Open" : "Create"}
      </Button>
    </>
  );
}
