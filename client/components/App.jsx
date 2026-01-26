import { createContext, useState } from "react";
import Header from "./Header";
import MainContent from "./MainContent";
import SideBar from "./SideBar";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:3000/graphql" }),
  cache: new InMemoryCache(),
});

export const ProjectContext = createContext({
  project: null,
  setProject: (value) => setProject(value),
});
export function App() {
  const [project, setProject] = useState(null);

  return (
    <ApolloProvider client={client}>
      <ProjectContext.Provider value={{ project, setProject }}>
        <div className="w-full mx-auto">
          <Header />
          <div className="flex">
            <SideBar />
            <MainContent />
          </div>
        </div>
      </ProjectContext.Provider>
    </ApolloProvider>
  );
}
