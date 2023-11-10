package com.paraschivescu.dto.product;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class ProductRequest {

    private Long id;
    private String filename;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String productName;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String seller;

    @NotNull(message = "Fill in the input field")
    private Integer year;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String country;

    @NotNull(message = "Fill in the input field")
    private Integer price;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String type;
}
