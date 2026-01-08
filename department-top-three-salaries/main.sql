select Department, Employee, Salary from (
  select Department.name as Department, Employee.name as Employee, Employee.salary as Salary, dense_rank() over (partition by departmentId order by salary desc) salaryDepartmentRank from Employee
  inner join Department on Employee.departmentId = Department.id
) as DetailedEmployee
  where DetailedEmployee.salaryDepartmentRank <= 3
