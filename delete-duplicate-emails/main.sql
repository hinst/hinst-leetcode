use LeetCode196;
Create table If Not Exists Person (Id int, Email varchar(255));
Truncate table Person;
insert into Person (id, email) values ('1', 'john@example.com');
insert into Person (id, email) values ('2', 'bob@example.com');
insert into Person (id, email) values ('3', 'john@example.com');

delete from Person mainPerson where 0 <
  (select COUNT(*) from
    (select * from Person subPerson where mainPerson.email=subPerson.email and mainPerson.id > subPerson.id)
  as temporaryTable);
