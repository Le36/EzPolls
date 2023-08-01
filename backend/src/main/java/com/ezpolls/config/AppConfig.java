package com.ezpolls.config;

import com.ezpolls.service.RateLimiter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

@Configuration
@EnableScheduling
public class AppConfig {

    @Bean
    public RateLimiter rateLimiterBean() {
        return new RateLimiter();
    }
}