package com.paraschivescu.repository;

import com.paraschivescu.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<ProductProjection> findAllByOrderByIdAsc();
    
    @Query("SELECT product FROM Product product ORDER BY product.id ASC")
    Page<ProductProjection> findAllByOrderByIdAsc(Pageable pageable);

    List<Product> findBySellerOrderByPriceDesc(String productSeller);

    List<Product> findByCountryOrderByPriceDesc(String productCountry);

    List<Product> findByIdIn(List<Long> productsIds);

    @Query("SELECT product FROM Product product WHERE product.id IN :productsIds")
    List<ProductProjection> getProductsByIds(List<Long> productsIds);

    @Query("SELECT product FROM Product product " +
            "WHERE (coalesce(:sellers, null) IS NULL OR product.seller IN :sellers) " +
            "AND (coalesce(:countries, null) IS NULL OR product.country IN :countries) " +
            "AND (coalesce(:priceStart, null) IS NULL OR product.price BETWEEN :priceStart AND :priceEnd) " +
            "ORDER BY CASE WHEN :sortByPrice = true THEN product.price ELSE -product.price END ASC")
    Page<ProductProjection> findProductsByFilterParams(
            List<String> sellers,
            List<String> countries,
            Integer priceStart, 
            Integer priceEnd, 
            boolean sortByPrice,
            Pageable pageable);

    @Query("SELECT product FROM Product product " +
            "WHERE UPPER(product.seller) LIKE UPPER(CONCAT('%',:text,'%')) " +
            "ORDER BY product.price DESC")
    Page<ProductProjection> findByProductSeller(String text, Pageable pageable);

    @Query("SELECT product FROM Product product " +
            "WHERE UPPER(product.productName) LIKE UPPER(CONCAT('%',:text,'%')) " +
            "ORDER BY product.price DESC")
    Page<ProductProjection> findByProductName(String text, Pageable pageable);

    @Query("SELECT product FROM Product product " +
            "WHERE UPPER(product.country) LIKE UPPER(CONCAT('%',:text,'%')) " +
            "ORDER BY product.price DESC")
    Page<ProductProjection> findByProductCountry(String text, Pageable pageable);
}
