package com.tharun;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.testng.annotations.DataProvider;

import com.tharun.Controllers.EmployeeController;
import com.tharun.Entities.EmployeeBean;

import jakarta.transaction.Transactional;


@SpringBootTest(classes = EmployeeManagement2SpringBootApplication.class)
@DirtiesContext
@Transactional
public class TestEmployeeController {
	
	@Autowired
	private EmployeeController controller;
	
	//ASSERT NOT NULL
	@Test
	public void getAllEmployee() 
	{
		ResponseEntity<List<EmployeeBean>> allEmployees =  controller.getAllEmployees();
		assertNotNull(allEmployees);
	}
	
	//Employee Id should start with 123651 - ASSERT EQUAL
	//Employee Id doesnt match with given id - ASSERT NOT EQUAL
	@Test
	public void empIdStartwithGiven()
	{
		ResponseEntity<List<EmployeeBean>> allEmployees =  controller.getAllEmployees();
		//(actual,expected)
		assertEquals(allEmployees.getBody().get(0).getId(),123651);
		//allEmployees.getBody().get(0).getId() - returns 123651
		assertNotEquals(allEmployees.getBody().get(0).getId(),123652);
	}
	
	
	
	


}
