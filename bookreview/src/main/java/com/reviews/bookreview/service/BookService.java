package com.reviews.bookreview.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.reviews.bookreview.model.Book;
import com.reviews.bookreview.model.Review;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class BookService {

    private static final String BOOKS_COLLECTION = "books";
    private static final String REVIEWS_SUBCOLLECTION = "reviews";

    public List<Book> getAllBooks() throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = db.collection(BOOKS_COLLECTION).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        List<Book> books = new ArrayList<>();
        for (QueryDocumentSnapshot doc : documents) {
            Book book = doc.toObject(Book.class);
            book.setId(doc.getId());
            books.add(book);
        }
        return books;
    }

    public Book getBook(String id) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection(BOOKS_COLLECTION).document(id);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();

        if (document.exists()) {
            Book book = document.toObject(Book.class);
            if (book != null) {
                book.setId(document.getId());
                return book;
            }
        }
        throw new RuntimeException("Book not found with ID: " + id);
    }

    public Book addBook(Book book) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection(BOOKS_COLLECTION).document();
        book.setId(docRef.getId());
        ApiFuture<WriteResult> result = docRef.set(book);
        result.get();
        return book;
    }

    public List<Review> getReviews(String bookId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        CollectionReference reviewsRef = db.collection(BOOKS_COLLECTION).document(bookId).collection(REVIEWS_SUBCOLLECTION);
        ApiFuture<QuerySnapshot> future = reviewsRef.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        List<Review> reviews = new ArrayList<>();
        for (QueryDocumentSnapshot doc : documents) {
            Review review = doc.toObject(Review.class);
            review.setId(doc.getId());
            reviews.add(review);
        }
        return reviews;
    }

    public Review addReview(String bookId, Review review) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        CollectionReference reviewsRef = db.collection(BOOKS_COLLECTION).document(bookId).collection(REVIEWS_SUBCOLLECTION);
        DocumentReference docRef = reviewsRef.document();
        review.setId(docRef.getId());
        ApiFuture<WriteResult> result = docRef.set(review);
        result.get();
        return review;
    }
}