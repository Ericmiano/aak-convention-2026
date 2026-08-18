/** Coastal Civic Modernism: every route lives inside a single Convention-only shell. */
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ConventionFooter, ConventionHeader } from "./components/ConventionShell";
import { MotionDirector } from "./components/MotionDirector";
import Home from "./pages/Home";

const ProgrammePage = lazy(() => import("./pages/ConventionPages").then((module) => ({ default: module.ProgrammePage })));
const ThemePage = lazy(() => import("./pages/ConventionPages").then((module) => ({ default: module.ThemePage })));
const SpeakersPage = lazy(() => import("./pages/ConventionPages").then((module) => ({ default: module.SpeakersPage })));
const ExperiencePage = lazy(() => import("./pages/ConventionPages").then((module) => ({ default: module.ExperiencePage })));
const VenuePage = lazy(() => import("./pages/ConventionPages").then((module) => ({ default: module.VenuePage })));
const BuildToursPage = lazy(() => import("./pages/ConventionPages").then((module) => ({ default: module.BuildToursPage })));
const RegisterPage = lazy(() => import("./pages/ConventionPages").then((module) => ({ default: module.RegisterPage })));

function LoadingRoute() { return <div className="route-loading" aria-live="polite">Loading the Convention experience…</div>; }

function App() {
  return <ErrorBoundary><MotionDirector /><ConventionHeader /><main><Suspense fallback={<LoadingRoute />}><Switch>
    <Route path="/" component={Home} /><Route path="/programme" component={ProgrammePage} /><Route path="/theme" component={ThemePage} />
    <Route path="/speakers" component={SpeakersPage} /><Route path="/experience" component={ExperiencePage} /><Route path="/venue" component={VenuePage} />
    <Route path="/build-tours" component={BuildToursPage} /><Route path="/register" component={RegisterPage} /><Route component={Home} />
  </Switch></Suspense></main><ConventionFooter /></ErrorBoundary>;
}

export default App;
