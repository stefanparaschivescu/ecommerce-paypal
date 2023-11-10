package com.paraschivescu.mapper;

import com.paraschivescu.dto.RegistrationRequest;
import com.paraschivescu.dto.auth.AuthenticationRequest;
import com.paraschivescu.dto.auth.AuthenticationResponse;
import com.paraschivescu.dto.user.UserResponse;
import com.paraschivescu.exception.InputFieldException;
import com.paraschivescu.model.User;
import com.paraschivescu.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class AuthenticationMapper {

    private final AuthenticationService authenticationService;
    private final CommonMapper commonMapper;

    public AuthenticationResponse login(AuthenticationRequest request) {
        Map<String, Object> credentials = authenticationService.login(request.getEmail(), request.getPassword());
        AuthenticationResponse response = new AuthenticationResponse();
        response.setUser(commonMapper.convertToResponse(credentials.get("user"), UserResponse.class));
        response.setToken((String) credentials.get("token"));
        return response;
    }

    public String registerUser(RegistrationRequest registrationRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        User user = commonMapper.convertToEntity(registrationRequest, User.class);
        return authenticationService.registerUser(user, registrationRequest.getPassword2());
    }
}
