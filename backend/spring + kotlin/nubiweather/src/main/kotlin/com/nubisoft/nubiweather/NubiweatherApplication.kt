package com.nubisoft.nubiweather

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class NubiweatherApplication

fun main(args: Array<String>) {
	runApplication<NubiweatherApplication>(*args)
}
