// const req = require("express/lib/request");
const pool = require("../config/db");
const prisma = require("../lib/prisma");

const allowedFields = ["title", "author", "genre", "price", "published_year"];

// const createBook = async ({ title, author, genre, price, published_year }) => {
//   const query = `INSERT INTO books(
//   title,
//   author,
//   genre,
//   price,
//   published_year
//   )
//   VALUES($1, $2, $3, $4, $5)
//   RETURNING *;
//   `;

//   const values = [title, author, genre, price, published_year];

//   const result = await pool.query(query, values);

//   return result.rows[0];
// };

const createBook = async ({ title, author, genre, price, published_year }) => {
  const book = await prisma.books.create({
    data: {
      title,
      author,
      genre,
      price,
      published_year,
    },
  });
  return book;
};

// const getAllBooks = async () => {
//   const query = `SELECT * FROM books`;

//   const result = await pool.query(query);
//   return result.rows;
// };

const getAllBooks = async () => {
  const books = await prisma.books.findMany();
  return books;
};

// const getBookById = async (id) => {
//   const query = `SELECT * FROM books WHERE id = $1`;
//   const result = await pool.query(query, [id]);
//   return result.rows[0];
// };

const getBookById = async (id) => {
  const book = await prisma.books.findUnique({
    where: { id: Number(id) },
  });
  return book;
};

// const updateBook = async (
//   id,
//   { title, author, genre, price, published_year },
// ) => {
//   const query = `UPDATE books
//   SET
//   title = $1,
//   author = $2,
//   genre = $3,
//   price = $4,
//   published_year = $5,
//   updated_at = CURRENT_TIMESTAMP
//   WHERE id = $6
//   RETURNING *;
//   `;

//   const values = [title, author, genre, price, published_year, id];
//   const result = await pool.query(query, values);
//   return result.rows[0];
// };

const updateBook = async (
  id,
  { title, author, price, genre, published_year },
) => {
  const updatedBook = prisma.books.update({
    where: { id: Number(id) },
    data: {
      title,
      author,
      genre,
      price,
      published_year,
    },
  });
  return updatedBook;
};

// const deleteBook = async (id) => {
//   const query = `DELETE FROM books WHERE id=$1 RETURNING *;`;
//   const result = await pool.query(query, [id]);
//   return result.rows;
// };

const deleteBook = async (id) => {
  const deletedBook = prisma.books.delete({
    where: { id: Number(id) },
  });
  return deletedBook;
};

// const patchBook = async (id, updates) => {
//   const fields = [];
//   const values = [];
//   let index = 1;
//   for (const key of allowedFields) {
//     if (updates[key] !== undefined) {
//       fields.push(`${key} = $${index}`);
//       values.push(updates[key]);
//       index++;
//     }
//   }
//   if (fields.length === 0) {
//     throw new Error("No fields provided for update");
//   }

//   fields.push(`updated_at = CURRENT_TIMESTAMP`);

//   values.push(id);

//   const query = `
//         UPDATE books
//         SET ${fields.join(", ")}
//         WHERE id = $${index}
//         RETURNING *;
//     `;

//   const result = await pool.query(query, values);
//   return result.rows[0];
// };

const patchBook = async (id, updates) => {
  const allowedFields = ["title", "author", "genre", "price", "publishedYear"];
  const data = {};
  for (const key of allowedFields) {
    if (updates[key] !== undefined) {
      data[key] = updates[key];
    }
  }
  if (Object.keys(data).length === 0) {
    throw new Error("No fields provided for update");
  }
  const updatedBook = await prisma.book.update({
    where: { id: Number(id) },
    data,
  });

  return updatedBook;
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  patchBook,
  deleteBook,
};
