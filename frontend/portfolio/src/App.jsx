import { BrowserRouter, Routes, Route, Link } from "react-router";
import Home from "./pages/Home.jsx";
import DomainHealthChecker from "./pages/DomainHealthChecker.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5 top-0 backdrop-blur">

          <Link to="/" className="text-xl font-extrabold tracking-tight text-slate-900">Jem Tekin</Link>
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">

            <Link to="/" className="transition hover:text-blue-600">Home</Link>

            <Link to="/tools/domain-health" className="transition hover:text-blue-600">Domain Health Tool</Link>

            <div className="relative group">
                  <button className="transition hover:text-blue-600">Projects ▾</button>

                  <div className="invisible absolute right-0 top-full mt-3 w-56 rounded-xl border border-slate-200 bg-white p-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">

                  <Link
                  to="/tools/domain-health"
                  className="
                  block
                  rounded-lg
                  px-4
                  py-2
                  text-sm
                  text-slate-700
                  hover:bg-slate-100
                   "
                  > 
                    Domain Health Checker
                  </Link>

                  <Link
                    to="/projects/trello"
                    className="
                    block
                    rounded-lg
                    px-4
                    py-2
                    text-sm
                    text-slate-700
                    hover:bg-slate-100
                    "
                  >
                      Trello Clone
                    </Link>

                    <Link
                    to="/projects/task-manager"
                    className="
                    block
                    rounded-lg
                    px-4
                    py-2
                    text-sm
                    text-slate-700
                    hover:bg-slate-100
                    "
                  >
                      Task Manager
                    </Link>

                    <Link
                    to="/projects/rs-bots"
                    className="
                    block
                    rounded-lg
                    px-4
                    py-2
                    text-sm
                    text-slate-700
                    hover:bg-slate-100
                    "
                  >
                      Game Automation
                    </Link>
                  </div>
            </div>

            <a 
            href="https://github.com/JemScripts" target="_blank" rel="noreferrer" 
            className="text-slate-600
              hover:text-black
                transition-colors
                duration-200
                font-medium
            ">
              GitHub ↗
            </a>
          </nav>
        </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools/domain-health" element={<DomainHealthChecker />} />
          </Routes>

      </header>
    </BrowserRouter>
  );
}