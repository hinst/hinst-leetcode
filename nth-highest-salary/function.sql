CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
  declare theOffset int;
  set theOffset = N-1;
  RETURN (
    (select distinct salary from Employee order by salary desc limit 1 offset theOffset) union (select null) limit 1
  );
END