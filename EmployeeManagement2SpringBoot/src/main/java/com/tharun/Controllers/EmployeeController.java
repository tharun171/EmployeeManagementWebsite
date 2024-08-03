package com.tharun.Controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tharun.Entities.EmployeeBean;
import com.tharun.Entities.EmployeeEntity;
import com.tharun.Exceptions.ResourceNotFoundException;
import com.tharun.Repositories.EmployeeRepository;

@RestController
//Root Mapping
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

	@Autowired
	private EmployeeRepository empRepo;
	
	//Get All Employees
	@GetMapping("/employees")
	public ResponseEntity<List<EmployeeBean>> getAllEmployees()
	{
		List<EmployeeEntity> listEntity =  empRepo.findAll();
		List<EmployeeBean> listBean = listEntity.stream()
				.map(ele -> convertEntityToBean(ele))
				.collect(Collectors.toList());
		return new ResponseEntity<List<EmployeeBean>>(listBean,HttpStatus.OK);
	}
	
	//Post Employee
	@PostMapping("/employee")
	public ResponseEntity<EmployeeBean> addEmployee(
			@RequestBody EmployeeBean empBean)
	{
		EmployeeEntity entity = convertBeanToEntity(empBean);
		EmployeeEntity savedEmp = empRepo.save(entity);
		EmployeeBean savedBean = convertEntityToBean(savedEmp);
		return new ResponseEntity<EmployeeBean>(savedBean,HttpStatus.OK);
	}
	
	//Get By EmployeeId
	@GetMapping("/employee/{empId}")
	public ResponseEntity<Object> getEmployeeById(
			@PathVariable("empId") long id) throws ResourceNotFoundException
	{
		EmployeeEntity entity = empRepo.findById(id).orElse(null);
		if(entity == null)
			throw new ResourceNotFoundException("id doesnt exist");
		else
		{
			EmployeeBean bean = convertEntityToBean(entity);
			return new ResponseEntity<Object>(bean,HttpStatus.OK);
		}
	}
	
	//Delete Employee By Id
	@DeleteMapping("/employee/{empId}")
	public ResponseEntity<Object> deleteEmployeeById(
			@PathVariable("empId") long id) throws ResourceNotFoundException
	{
		EmployeeEntity entity = empRepo.findById(id).orElse(null);
		if(entity == null)
			throw new ResourceNotFoundException("id doesnt exist");
		else
		{
			empRepo.delete(entity);
			return new ResponseEntity<Object>("deleted",HttpStatus.OK);
		}
	} 
	
	//update Employee By Id
	@PutMapping("/employee/{empId}")
	public ResponseEntity<EmployeeBean> updateElementById(
			@PathVariable("empId") long id,
			@RequestBody EmployeeBean updatedBean) throws ResourceNotFoundException
	{
		System.out.println("updated Bean - "+updatedBean);
		EmployeeEntity entity = empRepo.findById(id).orElse(null);
		if(entity == null)
			throw new ResourceNotFoundException("id doesnt exist");
		else
		{
			EmployeeEntity updatedEntity = convertBeanToEntity(updatedBean);
			updatedEntity.setId(id);
			EmployeeEntity savedEntity = empRepo.save(updatedEntity);
			EmployeeBean savedBean = convertEntityToBean(savedEntity);
			System.out.println("saved Bean -> "+savedBean);
			return new ResponseEntity<EmployeeBean>(savedBean,HttpStatus.OK);
		}
	}
	
	public EmployeeEntity convertBeanToEntity(EmployeeBean bean)
	{
		EmployeeEntity entity = new EmployeeEntity();
		BeanUtils.copyProperties(bean, entity);
		return entity;
	}
	public EmployeeBean convertEntityToBean(EmployeeEntity entity)
	{
		EmployeeBean bean = new EmployeeBean();
		BeanUtils.copyProperties(entity, bean);
		return bean;
	}
	
}
