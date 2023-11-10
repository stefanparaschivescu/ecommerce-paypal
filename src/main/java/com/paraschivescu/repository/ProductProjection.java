package com.paraschivescu.repository;

public interface ProductProjection {
    Long getId();
    String getProductName();
    String getSeller();
    Integer getPrice();
    String getFilename();
    Double getProductRating();
    void setSeller(String productSeller);
    void setCountry(String productCountry);
    void setPrice(Integer price);
}
