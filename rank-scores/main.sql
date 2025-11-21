select
  scores1.score,
  (select count(distinct scores2.score) from scores scores2 where scores1.score <= scores2.score) as 'rank'
from scores scores1 order by score desc