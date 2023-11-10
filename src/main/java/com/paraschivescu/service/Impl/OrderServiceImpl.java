package com.paraschivescu.service.Impl;

import com.paraschivescu.exception.ApiRequestException;
import com.paraschivescu.model.Order;
import com.paraschivescu.model.OrderItem;
import com.paraschivescu.model.Product;
import com.paraschivescu.repository.OrderItemRepository;
import com.paraschivescu.repository.OrderRepository;
import com.paraschivescu.repository.ProductRepository;
import com.paraschivescu.service.OrderService;
import com.paraschivescu.service.PaypalService;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import graphql.schema.DataFetcher;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final PaypalService paypalService;

    @Override
    public Order getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ApiRequestException("Order was not found", HttpStatus.NOT_FOUND));
        boolean orderPaid = paypalService.isOrderPaid(order.getPaypalOrderId());
        order.setIsPaid(orderPaid);
        return orderRepository.save(order);
    }

    @Override
    public Order getOrderByPaymentId(String paymentId) {
        Order order = orderRepository.findByPaypalOrderId(paymentId)
                .orElseThrow(() -> new ApiRequestException("Order was not found", HttpStatus.NOT_FOUND));
        boolean orderPaid = paypalService.isOrderPaid(order.getPaypalOrderId());
        order.setIsPaid(orderPaid);
        return orderRepository.save(order);
    }

    @Override
    public List<OrderItem> getOrderItemsByOrderId(Long orderId) {
        Order order = getOrderById(orderId);
        return order.getOrderItems();
    }

    @Override
    public Page<Order> getAllOrders(Pageable pageable) {
        return orderRepository.findAllByOrderByIdAsc(pageable);
    }

    @Override
    public Page<Order> getUserOrders(String email, Pageable pageable) {
        return orderRepository.findOrderByEmail(email, pageable);
    }

    @Override
    @Transactional
    public Order postOrder(Order order, Map<Long, Long> productsId) {
        List<OrderItem> orderItemList = new ArrayList<>();
        double totalPrice = 0;

        for (Map.Entry<Long, Long> entry : productsId.entrySet()) {
            Product product = productRepository.findById(entry.getKey()).get();

            totalPrice += product.getPrice() * entry.getValue();

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setAmount((product.getPrice() * entry.getValue()));
            orderItem.setQuantity(entry.getValue());
            orderItemList.add(orderItem);
            orderItemRepository.save(orderItem);
        }
        order.getOrderItems().addAll(orderItemList);

        Order updatedOrder = paypalService.createPayment(order, totalPrice);

        orderRepository.save(updatedOrder);

        return order;
    }

    @Override
    @Transactional
    public String deleteOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ApiRequestException("Order was not found", HttpStatus.NOT_FOUND));
        orderRepository.delete(order);
        return "Order deleted successfully";
    }

    @Override
    public DataFetcher<List<Order>> getAllOrdersByQuery() {
        return dataFetchingEnvironment -> orderRepository.findAllByOrderByIdAsc();
    }

    @Override
    public DataFetcher<List<Order>> getUserOrdersByEmailQuery() {
        return dataFetchingEnvironment -> {
            String email = dataFetchingEnvironment.getArgument("email").toString();
            return orderRepository.findOrderByEmail(email);
        };
    }
}
