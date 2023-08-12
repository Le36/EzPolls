package com.ezpolls.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaController implements ErrorController {

    @GetMapping({"/", "/login", "/register", "/create", "/polls/**", "/users/**", "/error"})
    public String redirect() {
        return "forward:/index.html";
    }

}