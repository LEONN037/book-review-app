package com.reviews.bookreview.model;

import java.util.ArrayList;
import java.util.List;

public class Book {

    private String id;
    private String title;
    private String author;
    private int year;
    private String coverUrl;

    private List<Review> reviews = new ArrayList<>();

    public Book() {}

    public Book(String id, String title, String author, int year, String coverUrl) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
        this.coverUrl = coverUrl;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public String getCoverUrl() { return coverUrl; }
    public void setCoverUrl(String coverUrl) { this.coverUrl = coverUrl; }

    public List<Review> getReviews() { return reviews; }
    public void setReviews(List<Review> reviews) { this.reviews = reviews; }
}