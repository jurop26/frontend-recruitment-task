import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ProjectContext } from "./App";
import useFetch from "../hooks/useFetch";

const ACTION = {
  projets: "project",
  clips: "clip",
};

export default function OpenCreateDialogContent({
  collection,
  closeDialog,
  setState,
}) {
  const [docName, setDocName] = useState("");
  const [docs, setDocs] = useState([]);
  const existing = _.find(docs, { data: { name: docName } });
  const text = ACTION[collection];
  const { setProject } = useContext(ProjectContext);
  const { open, create, readAll, loading, errors } = useFetch(collection);

  const handleCreate = async (docName) => {
    const body = {
      name: docName,
      ...(ACTION[collection] === "clip" ? { duration: 60, tracks: [] } : {}),
    };
    const data = await create(body);
    await handleOpen(data.id);
  };

  const handleOpen = async (id) => {
    const data = await open(id);

    ACTION[collection] === "clip"
      ? setState((prev) => _.uniqBy([...prev, data], "id"))
      : setProject(data);
    closeDialog();
  };

  useEffect(() => {
    const getAll = async () => {
      const data = await readAll();
      setDocs(data);
    };
    getAll();
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <h5>Loading ...</h5>
        ) : errors ? (
          <h5 className="text-red-400">{errors}</h5>
        ) : (
          docs.map(({ id, data: { name } }) => (
            <Button
              key={id}
              variant={name === docName ? "link" : "ghost"}
              onClick={() => setDocName(name)}
            >
              {name}
            </Button>
          ))
        )}
      </div>
      <div>
        <Input
          autoComplete="off"
          placeholder={`New ${text} name`}
          name="name"
          value={docName}
          onChange={(e) => setDocName(e.target.value)}
        />
      </div>
      <Button
        disabled={!docName}
        variant={docName ? "default" : "destructive"}
        onClick={async () => {
          existing
            ? await handleOpen(existing.id)
            : await handleCreate(docName);
        }}
      >
        {docName && existing ? "Open" : "Create"}
      </Button>
    </>
  );
}
