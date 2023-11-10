package com.paraschivescu.dto.product;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductResponse {
    private Long id;
    private String productName;
    private String seller;
    private Integer price;
    private Double productRating;
    private String filename;
}
