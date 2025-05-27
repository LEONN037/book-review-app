package com.reviews.bookreview.controller;

import com.reviews.bookreview.model.Book;
import com.reviews.bookreview.model.Review;
import com.reviews.bookreview.service.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<Book> getAllBooks() throws ExecutionException, InterruptedException {
        return bookService.getAllBooks();
    }

    @GetMapping("/{id}")
    public Book getBook(@PathVariable String id) throws ExecutionException, InterruptedException {
        return bookService.getBook(id);
    }

    @GetMapping("/{id}/reviews")
    public List<Review> getReviews(@PathVariable String id) throws ExecutionException, InterruptedException {
        return bookService.getReviews(id);
    }

    @PostMapping("/{id}/reviews")
    public Review addReview(@PathVariable String id, @RequestBody Review review) throws ExecutionException, InterruptedException {
        return bookService.addReview(id, review);
    }

    @PostMapping
    public Book addBook(@RequestBody Book book) throws ExecutionException, InterruptedException {
        return bookService.addBook(book);
    }
}