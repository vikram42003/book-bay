import BooksGrid from "@/components/homepage/BooksGrid";

export default function HomePage() {
  return (
    <div>
      <h3 className="text-3xl font-merriweather text-center my-12 font-semibold text-blue-500">Showing All Books</h3>
      <BooksGrid />
    </div>
  );
}
