package com.paraschivescu.service;

import com.paraschivescu.dto.product.ProductSearchRequest;
import com.paraschivescu.enums.SearchProduct;
import com.paraschivescu.model.Product;
import com.paraschivescu.repository.ProductProjection;
import graphql.schema.DataFetcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    Product getProductById(Long productId);

    Page<ProductProjection> getAllProducts(Pageable pageable);

    List<ProductProjection> getProductsByIds(List<Long> productsId);

    Page<ProductProjection> findProductsByFilterParams(ProductSearchRequest filter, Pageable pageable);

    List<Product> findByProductSeller(String productSeller);

    List<Product> findByProductCountry(String productCountry);
    
    Page<ProductProjection> findByInputText(SearchProduct searchType, String text, Pageable pageable);

    Product saveProduct(Product product, MultipartFile file, boolean edit);

    String deleteProduct(Long productId);

    DataFetcher<Product> getProductByQuery();

    DataFetcher<List<ProductProjection>> getAllProductsByQuery();

    DataFetcher<List<Product>> getAllProductsByIdsQuery();
}
