select Department.name as Department, employee.name as Employee, employee.salary as Salary from Employee 
  inner join Department on Employee.departmentId=Department.id
  inner join (select MAX(salary) as salary, departmentId from Employee group by departmentId) maxSalaries 
  on Employee.salary=maxSalaries.salary and Employee.departmentId=maxSalaries.departmentId
