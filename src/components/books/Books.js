import { useGetBooksQuery } from "../../features/api/booksApi";
import BookCard from "./BookCard";
import Error from "../ui/Error";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterFeatured, getBooks } from "../../features/filter/filterSlice";

export default function Books() {
  const { data: books, isLoading, isError } = useGetBooksQuery();
  const { filterBooks } = useSelector((state) => state.filter);
  const [feature, setFeature] = useState("all");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks(books));
  }, [books, dispatch]);

  // decide what to render
  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  if (!isLoading && isError) content = <Error massage="There was an error!" />;

  if (!isLoading && !isError && filterBooks?.length === 0)
    content = <Error massage="Books not found!" />;
  if (!isLoading && !isError && filterBooks?.length > 0) {
    content = filterBooks.map((book) => <BookCard key={book.id} book={book} />);
  }

  // handle featured
  const handleFeatured = (val) => {
    setFeature(val);
    dispatch(filterFeatured(val));
  };

  return (
    <main className="py-12 px-6 2xl:px-6 container">
      <div className="order-2 xl:-order-1">
        <div className="flex items-center justify-between mb-12">
          <h4 className="mt-2 text-xl font-bold">Book List</h4>

          <div className="flex items-center space-x-4">
            <button
              className={
                feature === "all"
                  ? "lws-filter-btn active-filter"
                  : "lws-filter-btn"
              }
              onClick={() => handleFeatured("all")}
            >
              All
            </button>
            <button
              className={
                feature === "featured"
                  ? "lws-filter-btn active-filter"
                  : "lws-filter-btn"
              }
              onClick={() => handleFeatured("featured")}
            >
              Featured
            </button>
          </div>
        </div>
        <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* <!-- Card 1 --> */}
          {content}
        </div>
      </div>
    </main>
  );
}
