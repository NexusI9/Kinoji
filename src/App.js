
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { useLocation, useRoutes } from 'react-router-dom';
import { Footer, TopBar } from './components/static';
import Home from './pages/home';
import Worldmap from './pages/worldmap';
import Glossary from './pages/glossary'
import Tags from './pages/tags';
import Contribute from './pages/contribute';
import About from './pages/about';
import Contact from './pages/contact';
import Movie from './pages/movie';
import Collections from './pages/collections';
import Director from './pages/director';
import FullView from './pages/fullview';
import Search from './pages/search';


const routes = [
  { path:'/', element:<Home /> },
  { path: '/world', element: <Worldmap /> },
  { path:'/list', element:<Glossary /> },
  { path:'/tags', element:<Tags /> },
  { path:'/about', element:<About /> },
  { path:'/contribute', element:<Contribute /> },
  { path:'/contact', element:<Contact /> },
  { path:'/movies', element: <Movie /> },
  { path:'/movies/:id/*', element: <Movie /> },
  { path:'/collections/:genre', element: <Collections /> },
  { path:'/collections', element: <Collections /> },
  { path:'/director/:id', element: <Director /> },
  { path:'/search', element: <Search /> },
  { path:'/movie/:id/shot/:shot', element: <FullView /> }
];


function App() {

  const element = useRoutes(routes);

  return (
    <>
      <AnimatePresence exitBeforeEnter> {element} </AnimatePresence>
      <TopBar />
      <Footer />
    </>
  );
}

export default App;
