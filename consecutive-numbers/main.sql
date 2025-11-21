select distinct(logs1.num) as ConsecutiveNums from logs logs1
  inner join logs logs2 on (logs1.id = logs2.id + 1) and (logs1.num = logs2.num)
  inner join logs logs3 on (logs2.id = logs3.id + 1) and (logs2.num = logs3.num)