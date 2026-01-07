 select * from employee employees 
   join (select MAX(salary) as salary, departmentId from Employee group by departmentId) maxSalaries 
   on employees.salary=maxSalaries.salary