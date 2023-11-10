package com.paraschivescu.mapper;

import com.paraschivescu.dto.HeaderResponse;
import com.paraschivescu.dto.product.FullProductResponse;
import com.paraschivescu.dto.product.ProductRequest;
import com.paraschivescu.dto.product.ProductResponse;
import com.paraschivescu.dto.product.ProductSearchRequest;
import com.paraschivescu.enums.SearchProduct;
import com.paraschivescu.exception.InputFieldException;
import com.paraschivescu.model.Product;
import com.paraschivescu.repository.ProductProjection;
import com.paraschivescu.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ProductMapper {

    private final CommonMapper commonMapper;
    private final ProductService productService;

    public FullProductResponse getProductById(Long productId) {
        return commonMapper.convertToResponse(productService.getProductById(productId), FullProductResponse.class);
    }

    public List<ProductResponse> getProductsByIds(List<Long> productsId) {
        return commonMapper.convertToResponseList(productService.getProductsByIds(productsId), ProductResponse.class);
    }

    public HeaderResponse<ProductResponse> getAllProducts(Pageable pageable) {
        Page<ProductProjection> products = productService.getAllProducts(pageable);
        return commonMapper.getHeaderResponse(products.getContent(), products.getTotalPages(), products.getTotalElements(), ProductResponse.class);
    }

    public HeaderResponse<ProductResponse> findProductsByFilterParams(ProductSearchRequest filter, Pageable pageable) {
        Page<ProductProjection> products = productService.findProductsByFilterParams(filter, pageable);
        return commonMapper.getHeaderResponse(products.getContent(), products.getTotalPages(), products.getTotalElements(), ProductResponse.class);
    }

    public List<ProductResponse> findByProductSeller(String productSeller) {
        return commonMapper.convertToResponseList(productService.findByProductSeller(productSeller), ProductResponse.class);
    }

    public List<ProductResponse> findByProductCountry(String productCountry) {
        return commonMapper.convertToResponseList(productService.findByProductCountry(productCountry), ProductResponse.class);
    }
    
    public HeaderResponse<ProductResponse> findByInputText(SearchProduct searchType, String text, Pageable pageable) {
        Page<ProductProjection> products = productService.findByInputText(searchType, text, pageable);
        return commonMapper.getHeaderResponse(products.getContent(), products.getTotalPages(), products.getTotalElements(), ProductResponse.class);
    }

    public FullProductResponse saveProduct(ProductRequest productRequest, MultipartFile file, BindingResult bindingResult, boolean edit) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        Product product = commonMapper.convertToEntity(productRequest, Product.class);
        return commonMapper.convertToResponse(productService.saveProduct(product, file, edit), FullProductResponse.class);
    }

    public String deleteProduct(Long productId) {
        return productService.deleteProduct(productId);
    }
}
