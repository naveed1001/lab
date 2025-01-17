import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/Cartslice';

const books = [
  { id: 1, name: 'The Great Gatsby', price: 10.99, image: '/images/gatsby.jpg' },
  { id: 2, name: '1984', price: 8.99, image: '/images/1984.jpg' },
  { id: 3, name: 'To Kill a Mockingbird', price: 12.99, image: '/images/mockingbird.jpg' },
  { id: 4, name: 'Moby-Dick', price: 15.49, image: '/images/mobydick.jpg' },
  { id: 5, name: 'Pride and Prejudice', price: 9.99, image: '/images/pride.jpg' },
  { id: 6, name: 'War and Peace', price: 18.99, image: '/images/warpeace.jpg' },
];

const BookList = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center px-6 py-4 bg-blue-800 text-white">
        <h1 className="text-lg font-bold">Books Store</h1>
      </header>

      <main className="px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
            >
              <img
                src={book.image}
                alt={book.name}
                className="w-32 h-40 object-cover mb-4"
              />
              <h3 className="text-lg font-bold">{book.name}</h3>
              <p className="text-gray-600 font-semibold mb-4">
                Price: ${book.price.toFixed(2)}
              </p>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                onClick={() => handleAddToCart(book)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BookList;
