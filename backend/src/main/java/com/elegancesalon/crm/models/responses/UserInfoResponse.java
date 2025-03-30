package com.elegancesalon.crm.models.responses;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class UserInfoResponse {
    private Long id;
    private String username;
    private String name;
    private String email;
    private List<String> roles;
}