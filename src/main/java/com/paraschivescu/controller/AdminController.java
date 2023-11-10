package com.paraschivescu.controller;

import com.paraschivescu.dto.HeaderResponse;
import com.paraschivescu.dto.order.OrderResponse;
import com.paraschivescu.dto.product.FullProductResponse;
import com.paraschivescu.dto.product.ProductRequest;
import com.paraschivescu.dto.user.BaseUserResponse;
import com.paraschivescu.dto.user.UserResponse;
import com.paraschivescu.mapper.OrderMapper;
import com.paraschivescu.mapper.ProductMapper;
import com.paraschivescu.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('ADMIN')")
@RequestMapping("/api/admin")
public class AdminController {

    private final UserMapper userMapper;
    private final ProductMapper productMapper;
    private final OrderMapper orderMapper;

    @PostMapping(value = "/add", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<FullProductResponse> addProduct(@RequestPart(name = "file", required = false) MultipartFile file,
                                                          @RequestPart("product") @Valid ProductRequest product,
                                                          BindingResult bindingResult) {
        return ResponseEntity.ok(productMapper.saveProduct(product, file, bindingResult, false));
    }

    @PostMapping(value = "/edit", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<FullProductResponse> updateProduct(@RequestPart(name = "file", required = false) MultipartFile file,
                                                             @RequestPart("product") @Valid ProductRequest product,
                                                             BindingResult bindingResult) {
        return ResponseEntity.ok(productMapper.saveProduct(product, file, bindingResult, true));
    }

    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(productMapper.deleteProduct(productId));
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderResponse>> getAllOrders(@PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<OrderResponse> response = orderMapper.getAllOrders(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping("/order/{userEmail}")
    public ResponseEntity<List<OrderResponse>> getUserOrdersByEmail(@PathVariable String userEmail,
                                                                    @PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<OrderResponse> response = orderMapper.getUserOrders(userEmail, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @DeleteMapping("/order/delete/{orderId}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderMapper.deleteOrder(orderId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long userId) {
        return ResponseEntity.ok(userMapper.getUserById(userId));
    }

    @GetMapping("/user/all")
    public ResponseEntity<List<BaseUserResponse>> getAllUsers(@PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<BaseUserResponse> response = userMapper.getAllUsers(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }
}
