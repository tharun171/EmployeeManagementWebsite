package com.tharun.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


//Api will return this, if resource not found
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends Exception{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public ResourceNotFoundException(String message)
	{
		super(message);
	}

}
