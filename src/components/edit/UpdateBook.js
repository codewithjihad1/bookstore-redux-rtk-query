import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../../features/api/booksApi";
import From from "./From";
import Error from "../ui/Error";

export default function UpdateBook() {
  const { bookId } = useParams();
  const { data: book, isLoading, isError } = useGetBookQuery(bookId);
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (!isLoading && isError) content = <Error massage="There was an error!" />;

  if (!isLoading && !isError && book?.id) {
    content = <From book={book} />;
  }
  return (
    <main className="py-6 2xl:px-6">
      <div className="container">
        <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
          <h4 className="mb-8 text-xl font-bold text-center">Edit Book</h4>
          {content}
        </div>
      </div>
    </main>
  );
}
