package com.tharun.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="employeeTable2")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EmployeeEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "employeeTable2Seq")
	@SequenceGenerator(name = "employeeTable2Seq",initialValue = 123651,allocationSize = 1)
	private long id;
	private String firstName;
	private String lastName;
	@Column(nullable = false)
	private String emailId;

}
