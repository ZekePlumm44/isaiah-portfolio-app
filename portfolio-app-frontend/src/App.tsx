import Intro from './components/home/intro';
import Resume from './components/home/resume';
import Writing from './components/home/writing';
import Listening from './components/home/listening';
import Reading from './components/home/reading';
import Footer from './components/home/footer';

function App() {
  return (
    <article>
      <Intro />
      <Resume />
      <Writing />
      <Listening />
      <Reading />
      <Footer />
    </article>
  );
}
export default App;
