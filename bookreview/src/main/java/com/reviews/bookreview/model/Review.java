package com.reviews.bookreview.model;

public class Review {

    private String id;
    private String text;
    private int score;

    private Book book;

    public Review() {}

    public Review(String text, int score, Book book) {
        this.text = text;
        this.score = score;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }
}