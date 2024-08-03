package com.tharun.AOPDemo;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class BeforeAllMethods {

	public final Logger log = LoggerFactory.getLogger(this.getClass());


	//for all methods inside com.tharun
	//Before executing a method
	//first * is returnType package methodParameters(..)
	@Before("execution(* com.tharun..*(..))")
	public void forAllMethods(JoinPoint jp)
	{
		String methodName = jp.getSignature().getName();
		String className = jp.getSignature().getDeclaringTypeName();
		String packageName = className.substring(0,className.lastIndexOf('.'));
		
		log.info("\nLOG --> package:{},class:{},method:{}",
				packageName,
				className,
				methodName);
	}
	
}
