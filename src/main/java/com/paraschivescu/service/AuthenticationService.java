package com.paraschivescu.service;

import com.paraschivescu.model.User;

import java.util.Map;

public interface AuthenticationService {

    Map<String, Object> login(String email, String password);

    String registerUser(User user, String password);
}
