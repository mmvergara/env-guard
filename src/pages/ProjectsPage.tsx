import { Input } from "@/components/ui/input";
import { useUserData } from "@/context";
import {
  ArrowLeftRightIcon,
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
    <main className="mx-auto mt-[3vh] w-full max-w-[1200px] px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="hidden items-center gap-2 rounded-md rounded-r-none border-y-[2px] border-l-[2px] border-r-[0px] border-white bg-blueMain px-4 py-[8.2px] text-sm font-semibold text-white sm:flex">
            <ArrowLeftRightIcon className="h-4 w-4" /> Projects
          </h1>
          <Input
            placeholder="Search"
            className="mr-2 rounded-md rounded-l-none border-y-[2px] border-l-[0px] border-r-[2px] border-white bg-zinc-100 text-sm font-medium shadow-none outline-none placeholder:font-medium focus:ring-0"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-md bg-blueMain p-2 text-sm font-semibold text-white hover:shadow-md sm:px-4">
            <span className="hidden sm:block">See Modules</span>{" "}
            <ServerCogIcon className="mt-[3px] h-4 w-4" />
          </button>{" "}
          <button className="flex items-center gap-2 rounded-md bg-blueMain p-2 text-sm font-semibold text-white hover:shadow-md sm:px-4">
            <span className="hidden sm:block">Add New Project</span>{" "}
            <PlusSquareIcon className="mt-[3px] h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="my-2 mb-2 h-[1px] w-full bg-blueMain"></div>
      <section className="flex h-fit flex-wrap gap-2">
        {
          // 50 array of projects
          Array.from({ length: 200 }).map((_, idx) => (
            <article className="group flex h-[110px] w-[235px] grow cursor-pointer flex-col justify-between  rounded-md border-[2px] border-white bg-zinc-100 p-2 text-black transition-colors hover:border-blueMain hover:border-opacity-40 ">
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
