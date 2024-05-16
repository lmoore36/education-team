import Nav from '../nav';
import '../globals.css';

export default function Home() {
  return (
      <main>
        <Nav/> 
        <div id='body'> 
          <p> This is your feed </p>
        </div>
      </main>
    );
  }