import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Preloader from './components/layout/Preloader'
import WhatsAppButton from './components/ui/WhatsAppButton'
import Home from './pages/Home'
import About from './pages/About'
import Events from './pages/Events'
import Projects from './pages/Projects'
import Committee from './pages/Committee'
import Gallery from './pages/Gallery'
import Support from './pages/Support'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import StudentBoard from './pages/StudentBoard'

export default function App() {
  return (
    <>
      <Preloader />
      <WhatsAppButton />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/committee" element={<Committee />} />
          <Route path="/committee/student-board" element={<StudentBoard />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}