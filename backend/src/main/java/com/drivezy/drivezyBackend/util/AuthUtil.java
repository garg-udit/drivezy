package com.drivezy.drivezyBackend.util;



import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import com.drivezy.drivezyBackend.config.JwtUtils;

@Component
public class AuthUtil {

    @Autowired
    private JwtUtils jwtUtils;

    public Long getLoggedInUserId(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            if (jwtUtils.validateToken(token)) {
                return jwtUtils.extractUserId(token);
            }
        }
        return null;
    }
}

