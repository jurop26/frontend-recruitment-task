import { Button } from "./ui/button";
import {Input} from './ui/input'
import {useEffect} from 'react'
import {Undo} from 'lucide-react'


export function App() {
  useEffect(()=> {
    fetch("http://localhost:3000/health").then(res => res.json())
  }, [])

  return (
    <div className="container w-6xl p-4 mx-auto">
      <div className="flex w-full gap-2 items-center justify-center">
        <div>
          <Button variant="outline">
            <Undo />
            Undo</Button>
        </div>
        <div className="flex-1 align-middle ">Design</div>
        <div>
          <Button variant="outline">Save</Button>
          <Input />
        </div>
      </div>
    </div>
  );
}
