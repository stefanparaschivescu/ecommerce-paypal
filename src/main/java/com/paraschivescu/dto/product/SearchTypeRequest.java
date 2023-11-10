package com.paraschivescu.dto.product;

import com.paraschivescu.enums.SearchProduct;
import lombok.Data;

@Data
public class SearchTypeRequest {
    private SearchProduct searchType;
    private String text;
}
