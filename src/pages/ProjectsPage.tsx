import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserData } from "@/context";
import {
  ChevronRight,
  ChevronRightIcon,
  ChevronsRightIcon,
  GlobeIcon,
  PlusSquareIcon,
  ServerCogIcon,
} from "lucide-react";
import { Navigate } from "react-router-dom";

const ProjectsPage = () => {
  const { session } = useUserData();
  if (!session) {
    return <Navigate to="/" />;
  }
  return (
    <main className="mx-2 mt-[5vh] flex h-[70vh] max-w-[800px] flex-col rounded-xl bg-zinc-200 p-4 md:mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="hidden items-center gap-2 rounded-l-3xl  border-y-[2px] border-l-[2px] border-white bg-blueMain px-4 py-[0.54rem] text-sm font-semibold text-white sm:flex">
            <GlobeIcon className="h-4 w-4" /> Projects
          </h1>
          <Input
            placeholder="Search"
            className="outlinenone mr-2 rounded-l-3xl rounded-r-3xl border-y-[2px] border-r-[2px] border-white bg-zinc-100 text-sm focus:ring-0 sm:rounded-l-none "
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-sm bg-blueMain p-2 text-sm font-semibold text-white hover:shadow-md sm:px-4">
            <span className="hidden sm:block">See Modules</span>{" "}
            <ServerCogIcon className="h-4 w-4" />
          </button>{" "}
          <button className="flex items-center gap-2 rounded-sm bg-blueMain p-2 text-sm font-semibold text-white hover:shadow-md">
            <span className="hidden sm:block">Add New Project</span>{" "}
            <PlusSquareIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="my-2 mb-2 h-[1px] w-full bg-blueMain"></div>
      <section className="flex h-full flex-grow flex-col flex-wrap gap-2 overflow-x-scroll">
        {
          // 50 array of projects
          Array.from({ length: 10 }).map((_, idx) => (
            <article className="group mr-2 flex h-[110px] w-[235px] cursor-pointer flex-col justify-between rounded-lg border-[2px] border-white bg-zinc-100 p-2 text-black transition-colors hover:border-blueMain hover:border-opacity-40 ">
              <h3 className="text-md font-semibold">Project 1</h3>
              <p className="group ml-auto text-3xl">
                <ChevronsRightIcon className="text-blueMain opacity-70 transition-transform group-hover:translate-x-[2px] group-hover:opacity-100" />
              </p>
            </article>
          ))
        }
      </section>
    </main>
  );
};

export default ProjectsPage;
