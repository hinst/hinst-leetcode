select * from logs logs1 inner join logs logs2 on (logs1.id = logs2.id + 1) and (logs1.num = logs2.num) order by logs1.id
