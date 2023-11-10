package com.paraschivescu.dto.order;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Map;

@Data
public class OrderRequest {

    private Double totalPrice;
    private Map<Long, Long> productsId;

    @NotBlank(message = "Fill in the input field")
    private String firstName;

    @NotBlank(message = "Fill in the input field")
    private String lastName;

    @NotBlank(message = "Fill in the input field")
    private String city;

    @NotBlank(message = "Fill in the input field")
    private String address;

    @Email(message = "Incorrect email")
    @NotBlank(message = "Fill in the input field")
    private String email;

    @NotBlank(message = "Fill in the phone number")
    private String phoneNumber;

    @NotNull(message = "Empty post index")
    @Min(value = 5, message = "Post index must contain 5 digits")
    private Integer postIndex;
}
