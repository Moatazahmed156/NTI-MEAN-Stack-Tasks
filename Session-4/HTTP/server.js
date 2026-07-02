const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const filePath = path.join(__dirname, "books.json");

// Helper Functions
function readBooks(callback) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }

    try {
      const books = data ? JSON.parse(data) : [];
      callback(null, books);
    } catch (error) {
      callback(error, null);
    }
  });
}

function writeBooks(books, callback) {
  fs.writeFile(filePath, JSON.stringify(books, null, 2), (err) => {
    callback(err);
  });
}

function sendResponse(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(data));
}

// Server
const server = http.createServer((req, res) => {
  const urlParts = req.url.split("/");
  const id = Number(urlParts[2]);

  // GET /books
  if (req.method === "GET" && req.url === "/books") {
    readBooks((err, books) => {
      if (err) {
        return sendResponse(res, 500, {
          error: "Failed to read books.",
        });
      }

      sendResponse(res, 200, books);
    });
  }

  // GET /books/:id (Bonus)
  else if (
    req.method === "GET" &&
    urlParts[1] === "books" &&
    urlParts[2]
  ) {
    readBooks((err, books) => {
      if (err)
        return sendResponse(res, 500, {
          error: "Failed to read books.",
        });

      const book = books.find((b) => b.id === id);

      if (!book) {
        return sendResponse(res, 404, {
          error: "Book not found.",
        });
      }

      sendResponse(res, 200, book);
    });
  }

  // POST /books
  else if (req.method === "POST" && req.url === "/books") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      let newBook;

      try {
        newBook = JSON.parse(body);
      } catch {
        return sendResponse(res, 400, {
          error: "Invalid JSON.",
        });
      }

      readBooks((err, books) => {
        if (err) {
          return sendResponse(res, 500, {
            error: "Failed to read books.",
          });
        }

        const newId =
          books.length > 0
            ? Math.max(...books.map((b) => b.id)) + 1
            : 1;

        const book = {
          id: newId,
          title: newBook.title,
          author: newBook.author,
          price: newBook.price,
          available: newBook.available,
        };

        books.push(book);

        writeBooks(books, (err) => {
          if (err) {
            return sendResponse(res, 500, {
              error: "Failed to save book.",
            });
          }

          sendResponse(res, 201, book);
        });
      });
    });
  }

  // DELETE /books/:id
  else if (
    req.method === "DELETE" &&
    urlParts[1] === "books" &&
    urlParts[2]
  ) {
    readBooks((err, books) => {
      if (err)
        return sendResponse(res, 500, {
          error: "Failed to read books.",
        });

      const index = books.findIndex((book) => book.id === id);

      if (index === -1) {
        return sendResponse(res, 404, {
          error: "Book not found.",
        });
      }

      const deletedBook = books.splice(index, 1);

      writeBooks(books, (err) => {
        if (err) {
          return sendResponse(res, 500, {
            error: "Failed to update file.",
          });
        }

        sendResponse(res, 200, {
          message: "Book deleted successfully.",
          book: deletedBook[0],
        });
      });
    });
  }

  // PUT /books/:id (Bonus)
  else if (
    req.method === "PUT" &&
    urlParts[1] === "books" &&
    urlParts[2]
  ) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      let updatedData;

      try {
        updatedData = JSON.parse(body);
      } catch {
        return sendResponse(res, 400, {
          error: "Invalid JSON.",
        });
      }

      readBooks((err, books) => {
        if (err)
          return sendResponse(res, 500, {
            error: "Failed to read books.",
          });

        const book = books.find((b) => b.id === id);

        if (!book) {
          return sendResponse(res, 404, {
            error: "Book not found.",
          });
        }

        if (updatedData.title !== undefined)
          book.title = updatedData.title;

        if (updatedData.author !== undefined)
          book.author = updatedData.author;

        if (updatedData.price !== undefined)
          book.price = updatedData.price;

        if (updatedData.available !== undefined)
          book.available = updatedData.available;

        writeBooks(books, (err) => {
          if (err)
            return sendResponse(res, 500, {
              error: "Failed to save updates.",
            });

          sendResponse(res, 200, book);
        });
      });
    });
  }

  // Invalid Route
  else {
    sendResponse(res, 404, {
      error: "Route not found.",
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});