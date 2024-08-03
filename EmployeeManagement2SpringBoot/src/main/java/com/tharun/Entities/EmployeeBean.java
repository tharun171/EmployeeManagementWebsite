package com.tharun.Entities;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Component
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EmployeeBean {

	private long id;
	private String firstName;
	private String lastName;
	private String emailId;
}
