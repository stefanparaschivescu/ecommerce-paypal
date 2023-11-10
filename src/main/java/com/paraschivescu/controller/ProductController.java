package com.paraschivescu.controller;

import com.paraschivescu.dto.HeaderResponse;
import com.paraschivescu.dto.product.FullProductResponse;
import com.paraschivescu.dto.product.ProductResponse;
import com.paraschivescu.dto.product.ProductSearchRequest;
import com.paraschivescu.dto.product.SearchTypeRequest;
import com.paraschivescu.mapper.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    private final ProductMapper productMapper;

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts(@PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<ProductResponse> response = productMapper.getAllProducts(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping("/{productId}")
    public ResponseEntity<FullProductResponse> getProductById(@PathVariable Long productId) {
        return ResponseEntity.ok(productMapper.getProductById(productId));
    }

    @PostMapping("/ids")
    public ResponseEntity<List<ProductResponse>> getProductsByIds(@RequestBody List<Long> productsIds) {
        return ResponseEntity.ok(productMapper.getProductsByIds(productsIds));
    }

    @PostMapping("/search")
    public ResponseEntity<List<ProductResponse>> findProductsByFilterParams(@RequestBody ProductSearchRequest filter,
                                                                            @PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<ProductResponse> response = productMapper.findProductsByFilterParams(filter, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @PostMapping("/search/country")
    public ResponseEntity<List<ProductResponse>> findByProductCountry(@RequestBody ProductSearchRequest filter) {
        return ResponseEntity.ok(productMapper.findByProductCountry(filter.getCountry()));
    }

    @PostMapping("/search/seller")
    public ResponseEntity<List<ProductResponse>> findByProductSeller(@RequestBody ProductSearchRequest filter) {
        return ResponseEntity.ok(productMapper.findByProductSeller(filter.getSeller()));
    }

    @PostMapping("/search/text")
    public ResponseEntity<List<ProductResponse>> findByInputText(@RequestBody SearchTypeRequest searchType,
                                                                 @PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<ProductResponse> response = productMapper.findByInputText(searchType.getSearchType(), searchType.getText(), pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping(value = "/images/{image}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getImage(@PathVariable String image) throws IOException {

        String filePath="C:/Users/Stefan/Documents/Proiect_ecommerce/ecommerce/src/main/resources/static/images/" + image;
        byte[] images = Files.readAllBytes(new File(filePath).toPath());

        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(images);
    }
}
