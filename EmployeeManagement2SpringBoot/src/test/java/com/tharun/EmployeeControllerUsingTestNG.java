package com.tharun;


import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.assertj.core.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.testng.Assert;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import com.tharun.Controllers.EmployeeController;
import com.tharun.Entities.EmployeeBean;
import com.tharun.Exceptions.ResourceNotFoundException;

import jakarta.transaction.Transactional;

@SpringBootTest(classes = EmployeeManagement2SpringBootApplication.class)
@DirtiesContext
@Transactional
public class EmployeeControllerUsingTestNG extends AbstractTestNGSpringContextTests{
	
	
	@Autowired
	private EmployeeController controller;

		//Data Driven Testing
		//Sending multiple sets of data
		//Creating DataProvider to send multiple data
		@DataProvider
		public Object[][] data1()
		{
			Object[][] data = 
			{
					{123660},{123661},{123556},{123662}
			};
			return data;
		}
		
		//Using dataProvider checking if id exist or not
		@Test(dataProvider="data1")
		public void checkingIds(long id) throws ResourceNotFoundException
		{
			ResponseEntity<List<EmployeeBean>> allEmployees = controller.getAllEmployees();
			List<Long> allEmpIds = allEmployees.getBody().stream()
					.map(ele -> ele.getId())
					.collect(Collectors.toList());
			Assert.assertNotNull(allEmpIds);
		}
}
