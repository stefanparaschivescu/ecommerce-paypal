package com.paraschivescu.service.Impl;

import com.paraschivescu.exception.ApiRequestException;
import com.paraschivescu.model.Order;
import com.paraschivescu.service.PaypalService;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaypalServiceImpl implements PaypalService {

    private final APIContext apiContext = new APIContext("AcuMo5h7n2Ad9b_BcuPTLh79ivXH1QQA8CwSbzuh9_wanIYdar0LgV4Jd6plAmj-PWwcbYZYLNq3FpiO",
            "EDH446qYLBeOcw023p9ubkyeoNczvPx4UVUDDbc0pCZNz-r1fuwg4fNkKgNARDnf-5PaUsmbQMOZ6mul", "sandbox");

    @Override
    public Order createPayment(Order order, double totalPrice) {
        Payment payment = new Payment();
        payment.setIntent("sale");
        List<Transaction> transactions = new ArrayList<>();

        Transaction transaction = new Transaction();
        Amount amount = new Amount();
        amount.setCurrency("USD");
        amount.setTotal(String.valueOf(totalPrice));
        transaction.setAmount(amount);
        transactions.add(transaction);

        payment.setTransactions(transactions);

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setReturnUrl("http://localhost:3000/account/user/orders/payment");
        redirectUrls.setCancelUrl("http://localhost:3000/account/user/orders");
        payment.setRedirectUrls(redirectUrls);

        Payer payer = new Payer();
        payer.setPaymentMethod("paypal");
        payment.setPayer(payer);
        payment.setExperienceProfileId("XP-PYRT-JHMN-X6TB-6ZK8");

        try {
            Payment createdPayment = payment.create(apiContext);
            List<Links> links = createdPayment.getLinks();
            String approvalUrl = null;
            for (Links link : links) {
                if (link.getRel().equals("approval_url")) {
                    approvalUrl = link.getHref();
                    break;
                }
            }
            order.setPaypalUrl(approvalUrl);
            order.setPaypalOrderId(createdPayment.getId());
        } catch (Exception e) {
            throw new ApiRequestException("Payment couldn't be initialized", HttpStatus.BAD_REQUEST);
        }
        return order;
    }

    @Override
    public boolean isOrderPaid(String paypalOrderId) {
        try {
            Payment payment = Payment.get(apiContext, paypalOrderId);
            String state = payment.getPayer().getStatus();
            return "VERIFIED".equalsIgnoreCase(state);
        } catch (Exception e) {
            return false;
        }
    }
}
