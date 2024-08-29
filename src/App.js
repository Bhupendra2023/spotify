import Logo from "./components/Logo";
import SongAlbum from "./components/SongAlbum";

function App() {
  return (
    <div className="flex flex-col md:flex-row md:gap-[30px] lg:gap-[60px] p-[32px]  h-full">
      <Logo />
      <SongAlbum />
    </div>
  );
}

export default App;
