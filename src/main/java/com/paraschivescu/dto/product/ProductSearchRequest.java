package com.paraschivescu.dto.product;

import lombok.Data;

import java.util.List;

@Data
public class ProductSearchRequest {
    private List<String> sellers;
    private List<String> countries;
    private List<Integer> prices;
    private Boolean sortByPrice;
    private String seller;
    private String country;
}
