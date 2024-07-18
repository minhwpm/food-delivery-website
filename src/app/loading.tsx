import { AiOutlineLoading3Quarters } from "react-icons/ai";
export default async function NotFound() {
  return (
    <main>
      <div className="container loading-screen">
        <AiOutlineLoading3Quarters className="animate-spin" size={40} />
      </div>
    </main>
  );
}