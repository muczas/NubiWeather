package com.nubisoft.nubiweather.controllers

import com.nubisoft.nubiweather.models.BasicMessage
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class HelloController {

    @GetMapping("/")
    fun index(): BasicMessage {
        return BasicMessage("Nubiweather API");
    }

}