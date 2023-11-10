package com.paraschivescu.dto.auth;

import com.paraschivescu.dto.user.UserResponse;
import lombok.Data;

@Data
public class AuthenticationResponse {
    private UserResponse user;
    private String token;
}
