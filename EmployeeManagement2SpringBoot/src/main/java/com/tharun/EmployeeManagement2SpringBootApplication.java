package com.tharun;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy
public class EmployeeManagement2SpringBootApplication {
	
	
	private static final Logger log = LoggerFactory.getLogger(EmployeeManagement2SpringBootApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(EmployeeManagement2SpringBootApplication.class, args);
	
		log.info("--> Employee Management Spring Boot - started");
	}

}
