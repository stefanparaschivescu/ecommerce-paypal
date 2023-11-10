package com.paraschivescu.service;

import com.paraschivescu.model.Order;

public interface PaypalService {
    Order createPayment(Order order, double totalPrice);

    boolean isOrderPaid(String paypalOrderId);
}
