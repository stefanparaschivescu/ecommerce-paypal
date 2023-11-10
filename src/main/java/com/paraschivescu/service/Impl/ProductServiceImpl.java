package com.paraschivescu.service.Impl;


import com.paraschivescu.dto.product.ProductSearchRequest;
import com.paraschivescu.enums.SearchProduct;
import com.paraschivescu.exception.ApiRequestException;
import com.paraschivescu.model.Product;
import com.paraschivescu.repository.ProductProjection;
import com.paraschivescu.repository.ProductRepository;
import com.paraschivescu.service.ProductService;
import graphql.schema.DataFetcher;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public Product getProductById(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new ApiRequestException("Product not found.", HttpStatus.NOT_FOUND));
    }

    @Override
    public Page<ProductProjection> getAllProducts(Pageable pageable) {
        return productRepository.findAllByOrderByIdAsc(pageable);
    }

    @Override
    public List<ProductProjection> getProductsByIds(List<Long> productsId) {
        return productRepository.getProductsByIds(productsId);
    }

    @Override
    public Page<ProductProjection> findProductsByFilterParams(ProductSearchRequest filter, Pageable pageable) {
        return productRepository.findProductsByFilterParams(
                filter.getSellers(),
                filter.getCountries(),
                filter.getPrices().get(0),
                filter.getPrices().get(1),
                filter.getSortByPrice(),
                pageable);
    }

    @Override
    public List<Product> findByProductSeller(String productSeller) {
        return productRepository.findBySellerOrderByPriceDesc(productSeller);
    }

    @Override
    public List<Product> findByProductCountry(String productCountry) {
        return productRepository.findByCountryOrderByPriceDesc(productCountry);
    }

    @Override
    public Page<ProductProjection> findByInputText(SearchProduct searchType, String text, Pageable pageable) {
        if (searchType.equals(SearchProduct.SELLER)) {
            return productRepository.findByProductSeller(text, pageable);
        } else if (searchType.equals(SearchProduct.PRODUCT_NAME)) {
            return productRepository.findByProductName(text, pageable);
        } else {
            return productRepository.findByProductCountry(text, pageable);
        }
    }

    @Override
    @Transactional
    public Product saveProduct(Product product, MultipartFile multipartFile, boolean edit) {
        if (multipartFile == null && !edit) {
            product.setFilename("empty.jpg");
        } else {
            try {
                String originalFileName = multipartFile.getOriginalFilename();
                String fileName = UUID.randomUUID() + "_" + originalFileName;

                String localFilePath = "src/main/resources/static/images/" + fileName;

                File localFile = new File(localFilePath);

                try (FileOutputStream fos = new FileOutputStream(localFile)) {
                    fos.write(multipartFile.getBytes());
                }

                product.setFilename("http://localhost:8080/api/products/images/" + fileName);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return productRepository.save(product);
    }

    @Override
    @Transactional
    public String deleteProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ApiRequestException("Product not found.", HttpStatus.NOT_FOUND));
        productRepository.delete(product);
        return "Product deleted successfully";
    }

    @Override
    public DataFetcher<Product> getProductByQuery() {
        return dataFetchingEnvironment -> {
            Long productId = Long.parseLong(dataFetchingEnvironment.getArgument("id"));
            return productRepository.findById(productId).get();
        };
    }

    @Override
    public DataFetcher<List<ProductProjection>> getAllProductsByQuery() {
        return dataFetchingEnvironment -> productRepository.findAllByOrderByIdAsc();
    }

    @Override
    public DataFetcher<List<Product>> getAllProductsByIdsQuery() {
        return dataFetchingEnvironment -> {
            List<String> objects = dataFetchingEnvironment.getArgument("ids");
            List<Long> productsId = objects.stream()
                    .map(Long::parseLong)
                    .collect(Collectors.toList());
            return productRepository.findByIdIn(productsId);
        };
    }
}
